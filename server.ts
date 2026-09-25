import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  const MANIFESTS_DIR = path.join(__dirname, "agenticum-production", "manifests");
  const ASSET_MANIFEST_PATH = path.join(MANIFESTS_DIR, "asset-manifest.json");
  const CHANGELOG_PATH = path.join(__dirname, "agenticum-production", "CHANGELOG.md");
  const PROJECT_STATE_PATH = path.join(__dirname, "agenticum-production", "PROJECT_STATE.md");

  // API: Get initial live data directly from disk to prevent state loss
  app.get("/api/initial-data", (req, res) => {
    try {
      const assetManifest = JSON.parse(fs.readFileSync(ASSET_MANIFEST_PATH, "utf-8"));
      const projectState = fs.readFileSync(PROJECT_STATE_PATH, "utf-8");
      
      // Let's read other manifests if needed
      const animationManifest = JSON.parse(fs.readFileSync(path.join(MANIFESTS_DIR, "animation-manifest.json"), "utf-8"));
      const audioManifest = JSON.parse(fs.readFileSync(path.join(MANIFESTS_DIR, "audio-manifest.json"), "utf-8"));
      const episodeManifest = JSON.parse(fs.readFileSync(path.join(MANIFESTS_DIR, "episode-manifest.json"), "utf-8"));
      const templateManifest = JSON.parse(fs.readFileSync(path.join(MANIFESTS_DIR, "template-manifest.json"), "utf-8"));

      let changelog = "";
      if (fs.existsSync(CHANGELOG_PATH)) {
        changelog = fs.readFileSync(CHANGELOG_PATH, "utf-8");
      }

      res.json({
        success: true,
        assetManifest,
        animationManifest,
        audioManifest,
        episodeManifest,
        templateManifest,
        projectState,
        changelog
      });
    } catch (error: any) {
      console.error("Error reading initial data:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // API: Save asset review decision
  app.post("/api/save-decision", (req, res) => {
    try {
      const { assetId, decision, note, backgroundUsed, defectsFlagged, timestamp, reviewVersion } = req.body;

      if (!assetId || !decision) {
        return res.status(400).json({ success: false, error: "Missing assetId or decision." });
      }

      // 1. Update Asset Manifest
      const manifest = JSON.parse(fs.readFileSync(ASSET_MANIFEST_PATH, "utf-8"));
      let updated = false;

      // Characters poses
      manifest.characters = manifest.characters.map((char: any) => {
        let charUpdated = false;
        const updatedPoses = char.poses.map((pose: any) => {
          const poseFullId = `${char.id}_${pose.poseId}`;
          if (poseFullId === assetId) {
            updated = true;
            charUpdated = true;
            return {
              ...pose,
              status: decision,
              // Record relationship and review metrics inside manifest poses too
              reviewNote: note,
              reviewVersion: reviewVersion,
              lastReviewed: timestamp,
              defectsFlagged
            };
          }
          return pose;
        });

        return {
          ...char,
          poses: updatedPoses,
          // If any pose is updated, we might need to update the character status as well
          status: charUpdated ? "needs-review" : char.status
        };
      });

      // World backgrounds
      manifest.worlds = manifest.worlds.map((world: any) => {
        const updatedBackgrounds = world.backgrounds.map((bg: any) => {
          const bgFullId = `${world.id}_${bg.bgId}`;
          if (bgFullId === assetId) {
            updated = true;
            return {
              ...bg,
              status: decision,
              reviewNote: note,
              reviewVersion,
              lastReviewed: timestamp,
              defectsFlagged
            };
          }
          return bg;
        });
        return { ...world, backgrounds: updatedBackgrounds };
      });

      // Props
      manifest.props = manifest.props.map((prop: any) => {
        if (prop.id === assetId) {
          updated = true;
          return {
            ...prop,
            status: decision,
            reviewNote: note,
            reviewVersion,
            lastReviewed: timestamp,
            defectsFlagged
          };
        }
        return prop;
      });

      // Effects
      manifest.effects = manifest.effects.map((eff: any) => {
        if (eff.id === assetId) {
          updated = true;
          return {
            ...eff,
            status: decision,
            reviewNote: note,
            reviewVersion,
            lastReviewed: timestamp,
            defectsFlagged
          };
        }
        return eff;
      });

      if (!updated) {
        return res.status(404).json({ success: false, error: `Asset ID ${assetId} not found in manifest.` });
      }

      manifest.lastUpdated = timestamp;
      fs.writeFileSync(ASSET_MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");

      // 2. Update CHANGELOG.md
      let changelogContent = fs.readFileSync(CHANGELOG_PATH, "utf-8");
      const logEntry = `\n- **[Asset Review]**: Reviewed \`${assetId}\` -> **${decision.toUpperCase()}** at ${timestamp}.\n  - Notes: ${note || "None"}\n  - Background: \`${backgroundUsed}\` | Version: \`${reviewVersion}\` | Defects: [${defectsFlagged.join(", ") || "none"}]\n`;

      // Find the ## [0.6.0] or insert at the top of changelog after the header
      const targetHeader = "## [0.6.0] - 2026-09-24";
      if (changelogContent.includes(targetHeader)) {
        changelogContent = changelogContent.replace(
          targetHeader,
          `${targetHeader}\n### Reviewed\n${logEntry.trim()}`
        );
      } else {
        changelogContent = changelogContent.replace(
          "# Changelog",
          `# Changelog\n\n## [0.6.0] - 2026-09-24\n### Reviewed\n${logEntry.trim()}`
        );
      }
      fs.writeFileSync(CHANGELOG_PATH, changelogContent, "utf-8");

      res.json({
        success: true,
        assetManifest: manifest,
        changelog: changelogContent
      });
    } catch (error: any) {
      console.error("Error saving asset decision:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // API: Confirm and unlock Phase 4
  app.post("/api/unlock-phase-4", (req, res) => {
    try {
      let projectState = fs.readFileSync(PROJECT_STATE_PATH, "utf-8");

      // Update phase parameters
      projectState = projectState.replace(
        "Current phase: HUMAN ASSET REVIEW",
        "Current phase: PHASE 4 — STORYBOARD AND ANIMATIC"
      );
      projectState = projectState.replace(
        "- **Current Phase**: HUMAN ASSET REVIEW",
        "- **Current Phase**: PHASE 4 — STORYBOARD AND ANIMATIC"
      );
      projectState = projectState.replace(
        "Phase 4 access: LOCKED",
        "Phase 4 access: UNLOCKED"
      );
      projectState = projectState.replace(
        "- **Phase 4 access**: LOCKED",
        "- **Phase 4 access**: UNLOCKED"
      );

      fs.writeFileSync(PROJECT_STATE_PATH, projectState, "utf-8");

      res.json({
        success: true,
        projectState
      });
    } catch (error: any) {
      console.error("Error unlocking Phase 4:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Serve static corrected production assets in both dev and prod
  app.use(
    "/agenticum-production",
    express.static(path.join(__dirname, "agenticum-production"))
  );

  // Serve static assets from src images if needed
  app.use(
    "/src/assets",
    express.static(path.join(__dirname, "src", "assets"))
  );

  const isProd = fs.existsSync(path.join(__dirname, "dist"));

  if (isProd) {
    console.log("[Agenticum Studio Server] Running in PRODUCTION Mode (Serving static assets from /dist)");
    app.use(express.static(path.join(__dirname, "dist")));
    
    // SPA fallback: Serve index.html for all non-API paths
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api/")) {
        return next();
      }
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  } else {
    console.log("[Agenticum Studio Server] Running in DEVELOPMENT Mode (Vite Dev Middleware)");
    // Mount Vite developer middlewares
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }

  const port = 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`[Agenticum Studio Server] Active at http://localhost:${port}`);
  });
}

startServer();
