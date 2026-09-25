/**
 * Agenticum Manifest Validator
 * Performs dynamic standard verification on metadata, schemas, IDs, statuses, and naming compliance.
 */

export interface ValidationReport {
  success: boolean;
  errors: string[];
  warnings: string[];
  metrics: {
    totalAssets: number;
    approvedAssets: number;
    pendingAssets: number;
    characters: number;
    worlds: number;
    audios: number;
    cameraMoves: number;
    reusableCycles: number;
  };
}

export function validatePipelineManifests(
  assetManifest: any,
  animationManifest: any,
  audioManifest: any,
  episodeManifest: any,
  templateManifest: any
): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  let totalAssets = 0;
  let approvedAssets = 0;
  let pendingAssets = 0;
  let charactersCount = 0;
  let worldsCount = 0;
  let audiosCount = 0;
  let cameraCount = 0;
  let cyclesCount = 0;

  const validStatuses = new Set([
    "planned",
    "briefed",
    "generated",
    "imported",
    "needs-review",
    "approved",
    "deprecated",
    "rejected"
  ]);

  // Helper to validate status string
  const checkStatus = (id: string, status: string, context: string) => {
    if (!validStatuses.has(status)) {
      errors.push(`[SCHEMA ERROR] ${context} ID "${id}" has invalid status "${status}". Must be one of: [${Array.from(validStatuses).join(", ")}]`);
    } else if (status === "approved") {
      approvedAssets++;
    } else {
      pendingAssets++;
    }
  };

  // 1. Validate Asset Manifest
  if (!assetManifest) {
    errors.push("Asset Manifest is missing or unreadable.");
  } else {
    // Version check
    if (!assetManifest.version) errors.push("Asset Manifest missing 'version' tag.");

    // Validate Characters
    if (Array.isArray(assetManifest.characters)) {
      charactersCount = assetManifest.characters.length;
      assetManifest.characters.forEach((char: any) => {
        totalAssets++;
        const id = char.id || "UNKNOWN";
        
        // ID Regex Check
        if (!/^CH_[A-Z0-9_]+$/.test(id)) {
          errors.push(`[NAMING ERROR] Character ID "${id}" does not conform to "CH_<UPPERCASE_SNAKE>" format.`);
        }

        checkStatus(id, char.status, `Character "${char.name || 'Unnamed'}"`);

        // Validate Poses
        if (Array.isArray(char.poses)) {
          char.poses.forEach((pose: any) => {
            const poseId = pose.poseId || "unknown";
            const posePath = pose.path || "";
            
            // Pose status check
            if (pose.status && !validStatuses.has(pose.status)) {
              errors.push(`[SCHEMA ERROR] Pose "${poseId}" on character "${id}" has invalid status "${pose.status}".`);
            }

            // Pose naming convention check
            const expectedFileName = `${id}_${poseId}.png`;
            if (posePath && !posePath.endsWith(expectedFileName)) {
              warnings.push(`[CONVENTION WARN] Character pose path "${posePath}" does not end with expected filename: "${expectedFileName}".`);
            }
          });
        } else {
          errors.push(`[SCHEMA ERROR] Character "${id}" is missing a valid 'poses' array.`);
        }
      });
    } else {
      errors.push("Asset Manifest missing 'characters' array.");
    }

    // Validate Worlds
    if (Array.isArray(assetManifest.worlds)) {
      worldsCount = assetManifest.worlds.length;
      assetManifest.worlds.forEach((world: any) => {
        totalAssets++;
        const id = world.id || "UNKNOWN";

        if (!/^WD_[A-Z0-9_]+$/.test(id)) {
          errors.push(`[NAMING ERROR] World ID "${id}" does not conform to "WD_<UPPERCASE_SNAKE>" format.`);
        }

        checkStatus(id, world.status, `World "${world.name || 'Unnamed'}"`);

        // Validate backgrounds
        if (Array.isArray(world.backgrounds)) {
          world.backgrounds.forEach((bg: any) => {
            const bgId = bg.bgId || "unknown";
            const bgPath = bg.path || "";

            const expectedFileName = `${id}_${bgId}.png`;
            if (bgPath && !bgPath.endsWith(expectedFileName)) {
              warnings.push(`[CONVENTION WARN] World background path "${bgPath}" does not end with expected filename: "${expectedFileName}".`);
            }
          });
        }
      });
    } else {
      errors.push("Asset Manifest missing 'worlds' array.");
    }
  }

  // 2. Validate Animation Manifest
  if (!animationManifest) {
    errors.push("Animation Manifest is missing or unreadable.");
  } else {
    if (Array.isArray(animationManifest.cameraMoves)) {
      cameraCount = animationManifest.cameraMoves.length;
      animationManifest.cameraMoves.forEach((move: any) => {
        const id = move.id || "UNKNOWN";
        if (!/^CAM_[A-Z0-9_-]+$/.test(id)) {
          errors.push(`[NAMING ERROR] Camera Move ID "${id}" does not conform to "CAM_<UPPERCASE_SNAKE_OR_DASH>" format.`);
        }
        checkStatus(id, move.status, `Camera Move "${move.name || 'Unnamed'}"`);
      });
    }

    if (Array.isArray(animationManifest.animationCycles)) {
      cyclesCount = animationManifest.animationCycles.length;
      animationManifest.animationCycles.forEach((cycle: any) => {
        const id = cycle.id || "UNKNOWN";
        if (!/^AN_[A-Z0-9_-]+$/.test(id)) {
          errors.push(`[NAMING ERROR] Animation Cycle ID "${id}" does not conform to "AN_<UPPERCASE_SNAKE_OR_DASH>" format.`);
        }
        checkStatus(id, cycle.status, `Animation Cycle "${cycle.name || 'Unnamed'}"`);
      });
    }
  }

  // 3. Validate Audio Manifest
  if (!audioManifest) {
    errors.push("Audio Manifest is missing or unreadable.");
  } else {
    // Music
    if (Array.isArray(audioManifest.music)) {
      audioManifest.music.forEach((m: any) => {
        audiosCount++;
        totalAssets++;
        const id = m.id || "UNKNOWN";
        if (!/^AM_[A-Z0-9_]+$/.test(id)) {
          errors.push(`[NAMING ERROR] Music ID "${id}" does not conform to "AM_<UPPERCASE_SNAKE>" format.`);
        }
        checkStatus(id, m.status, `Music track "${m.name || 'Unnamed'}"`);
      });
    }

    // Voiceover
    if (Array.isArray(audioManifest.voiceover)) {
      audioManifest.voiceover.forEach((vo: any) => {
        audiosCount++;
        totalAssets++;
        const id = vo.id || "UNKNOWN";
        if (!/^VO_EP[0-9]{3}_[A-Z0-9_]+_[0-9]{2}$/.test(id)) {
          warnings.push(`[CONVENTION WARN] Voiceover ID "${id}" does not strictly match "VO_EP<EP_NUM>_<CHAR_ID>_<INDEX>" convention.`);
        }
        checkStatus(id, vo.status, `Voiceover line "${id}"`);
      });
    }
  }

  // 4. Validate Episode Manifest & References
  if (episodeManifest && Array.isArray(episodeManifest.episodes)) {
    episodeManifest.episodes.forEach((ep: any) => {
      const epId = ep.id || "UNKNOWN";
      
      // Check Timeline Asset References
      if (ep.scriptTimeline) {
        const timeline = ep.scriptTimeline;

        // Visual checks
        if (Array.isArray(timeline.visualTracks)) {
          timeline.visualTracks.forEach((track: any) => {
            if (track.layer === "background" && track.assetId) {
              // Ensure background world exists
              const worldExists = assetManifest?.worlds?.some((w: any) => w.id === track.assetId);
              if (!worldExists) {
                errors.push(`[INTEGRITY ERROR] Episode "${epId}" references non-existent World background ID "${track.assetId}" in timeline.`);
              }
            } else if (track.layer?.startsWith("character") && track.assetId) {
              // Ensure character exists
              const charExists = assetManifest?.characters?.some((c: any) => c.id === track.assetId);
              if (!charExists) {
                errors.push(`[INTEGRITY ERROR] Episode "${epId}" references non-existent Character ID "${track.assetId}" in timeline.`);
              }
            }
          });
        }
      }
    });
  }

  return {
    success: errors.length === 0,
    errors,
    warnings,
    metrics: {
      totalAssets,
      approvedAssets,
      pendingAssets,
      characters: charactersCount,
      worlds: worldsCount,
      audios: audiosCount,
      cameraMoves: cameraCount,
      reusableCycles: cyclesCount
    }
  };
}
