# Agenticum Production Brain: Phase 0 Foundation

Welcome to the **Agenticum Production Brain and Asset Warehouse**. This directory represents the centralized database, structural rules, narrative foundations, and automated pipeline scripts for compiling high-end vertical cinematic animations for YouTube Shorts.

---

## 1. Project Specs & Technical Standards

To preserve extreme cinematic quality in vertical formats, all assets and tools must respect these specifications:

- **Aspect Ratio**: `9:16` vertical orientation.
- **Resolution**: `1080x1920` (Target screen-fit or scaling bounds).
- **Target Frame Rate**: `30 fps` (all transition curves and loops normalized).
- **Short Duration**: `60 to 90 seconds` max (ideal for vertical audience loops).
- **Audio Standards**: 
  - Music tempo for Episode 001: **128 BPM** (all edit cuts synced to beat counts or sub-multiples).
  - Voiceovers timed via subtitle pacing offsets.
  - Constant low ambient layer to prevent silent voids.
- **Shorts UI Safe Area**: 
  - Top 10% kept clear of headings (profile name/icons space).
  - Bottom 25% kept clear of critical text (Shorts captions overlay, music track badge).
  - Right 15% kept clear of titles (Shorts interaction icons like Like, Comment, Share).
  - *Recommended subtitles zone is horizontally centered at $y = 65\%$ to $75\%$ height.*

---

## 2. Directory Map

The absolute paths and structural purposes are mapped below:

```text
agenticum-production/
├── GEMINI.md               # AI Brain instructions, schemas, prompt recipe
├── PROJECT_STATE.md        # Current phase tracker, roadmap, milestone metrics
├── CHANGELOG.md            # Structural modification history
├── README.md               # You are here - System overview and guide
│
├── bible/                  # Standard-of-truth documents for artistic assets
│   ├── series-bible.md     # Narrative core, lore, simulation layers
│   ├── visual-bible.md     # Safe margins, vector styling, color pairings
│   ├── audio-bible.md      # Soundscape, stems, 128 BPM grids, VO criteria
│   ├── character-bible.md  # Characters registry (specs, dimensions)
│   ├── world-bible.md      # Worlds background list (coordinates, look-and-feel)
│   └── naming-conventions.md # Formal string schemas for all assets
│
├── manifests/              # Live inventory of all assets (JSON databases)
│   ├── asset-manifest.json
│   ├── animation-manifest.json
│   ├── audio-manifest.json
│   ├── episode-manifest.json
│   └── template-manifest.json
│
├── assets/                 # Storage for visual elements (organized by type)
│   ├── characters/         # Character pose files (stable vector PNGs)
│   ├── worlds/             # Environment assets
│   ├── props/              # Foreground interactables
│   ├── icons/              # UI widgets and indicators
│   ├── effects/            # Glitches, speedlines, flares
│   ├── backgrounds/        # Abstract backing plates
│   ├── overlays/           # Vignettes, scanning lines, noise textures
│   └── typography/         # Monospace/expressive font assets
│
├── animation-library/      # Frame calculations & interpolation formulas
│   ├── camera-moves/       # Panning speed tables, zooms
│   └── reusable-animation-cycles/ # Breathing loops, glitch toggles, talking loops
│
├── audio-library/          # Compiled WAV/MP3 files
│   ├── music/              # Synthwave, techno stems and loops
│   ├── voiceover/          # Synthesized character narration pieces
│   ├── sound-effects/      # Swishes, alarms, digital feedback
│   └── ambience/           # Background rumble, server fans
│
├── templates/              # Scene skeletons
│   └── scene-templates/    # Split-screen, focal-zoom, wide-scroll setups
│
├── scripts/                # Node/TypeScript automation routines
│   ├── validation/         # Manifest sanity checkers, naming convention auditors
│   ├── rendering/          # Canvas draw engines
│   └── subtitles/          # Sync helpers
│
├── episodes/               # Timelines of finished Shorts (JSON instructions)
├── exports/                # Output previews and static sequence snapshots
└── archive/                # Deprecated or rejected legacy assets
```

---

## 3. Asset Status Flow

All assets inside `manifests/` start their lifecycle as ideas and move strictly through these states:

```text
[planned] ──> [briefed] ──> [generated] ──> [imported] ──> [needs-review] ──> [approved]
                                                                                │
                                                                   [rejected] ──┘
```

- **planned**: Registered with ID, name, and conceptual brief.
- **briefed**: Prompt string finalized in visual/audio bibles.
- **generated**: Run through asset tools; output file exists.
- **imported**: File copied into correct folder under `/agenticum-production/assets/*` or similar.
- **needs-review**: Flagged for visual checking (safe area compliance, vector quality, transparency).
- **approved**: Verified; unlocked for use in final automated episode pipelines.
- **deprecated**: Replaced by a higher version; kept in catalog but not used in active builds.
- **rejected**: Failed quality checks; moved to `/agenticum-production/archive/`.

*Warning: Scripts will throw a compiler exception if an episode references an asset whose status is NOT `approved`.*

---

## 4. Pipeline Automation Dashboard

To view bibles, manifests, validate files, and inspect the project state, run the development server and open the studio on port 3000. It offers:
1. **Interactive State Monitor**: Tracks Phase metrics and validation passes.
2. **Standard-of-Truth Bible Reader**: Markdown parser to read narratives, dimensions, and naming policies.
3. **Asset Warehouse Explorer**: Displays schemas, lists files in each directory, and displays current asset statuses.
4. **Validation Suite**: Executable rule-checks confirming schema accuracy and naming patterns.
