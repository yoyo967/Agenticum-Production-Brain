# Changelog

## [0.7.0] - 2026-09-25
### Added (Phase 4 Storyboard & Timed Animatic)
- **Storyboard Directory Structure**: Created absolute storyboard path `/agenticum-production/episodes/episode-001-boot-sequence/storyboard/`.
- **Authoritative Storyboard Document (`storyboard.md`)**: Drafted rich narrative blocking, camera panning, audio stems, and subtitle alignments across a 90-second automated cinematic vertical animatic.
- **Shot-by-Shot Sequence Specifications (`shotlist.json`)**: Formulated 14 highly detailed cinematic running, jumping, and sliding shots synchronized to a strict 128 BPM music timeline grid.
- **Choreography Control Parameters (`camera-plan.json`)**: Specified extreme close-ups, wide tracking, slide tilts, and jitter camera shakes.
- **Audio Cue Timing Vectors (`audio-cue-plan.json`)**: Mapped and checked all music stems, dialogue voiceovers, ambient rumblings, and warned of three missing dialogue/audio stems (`AUDIO_DEPENDENCY_MISSING`).
- **Synchronized Subtitle Blocks (`subtitle-plan.json`)**: Generated color-coded safe-area lower-third subtitle mappings.
- **Asset Usage Registry & Animatic Profile (`asset-usage-map.json`, `animatic-spec.json`)**: Charted asset footprints and 2,700-frame timings.
- **Interactive Phase 4 Studio Dashboard Tab (`src/App.tsx`)**: Programmed an advanced media player console inside the dashboard, featuring side-scrolling horizontal parallax, parabolic jumping physics bobbing, rotate-sliding duck angles, audio track indicators, and play/pause slider seek scrubbers.

## [0.6.0] - 2026-09-25
### Approved Assets (Episode 001 Visual Blockers)
- **CH_AG_ASTRA_A17_boot** -> APPROVED at 2026-09-25T08:09:26Z (Notes: Human Review approved after alpha transparency and visual continuity checks.)
- **CH_AG_ASTRA_A17_idle** -> APPROVED at 2026-09-25T08:09:26Z (Notes: Human Review approved after alpha transparency and visual continuity checks.)
- **CH_AG_ASTRA_A17_scan** -> APPROVED at 2026-09-25T08:09:26Z (Notes: Human Review approved after alpha transparency and visual continuity checks.)
- **CH_AG_ASTRA_A17_react** -> APPROVED at 2026-09-25T08:09:26Z (Notes: Human Review approved after alpha transparency and visual continuity checks.)
- **CH_AG_ASTRA_A17_shutdown** -> APPROVED at 2026-09-25T08:09:26Z (Notes: Human Review approved after alpha transparency and visual continuity checks.)
- **PR_RELAY_CORE** -> APPROVED at 2026-09-25T08:09:26Z (Notes: Human Review approved after alpha transparency and visual continuity checks.)
- **EF_SIGNAL_EMERGENCY_CYAN** -> APPROVED at 2026-09-25T08:09:26Z (Notes: Human Review approved after alpha transparency and visual continuity checks.)
- **EF_GOVERNANCE_SEAL_ORANGE** -> APPROVED at 2026-09-25T08:09:26Z (Notes: Human Review approved after alpha transparency and visual continuity checks.)
- **WD_ORB_ORBITAL_RELAY_deck** -> APPROVED at 2026-09-25T08:09:26Z (Notes: Human Review approved after alpha transparency and visual continuity checks.)


All notable changes to the Agenticum Production Brain project will be documented in this file. This project adheres to Semantic Versioning.

---

## [0.6.0] - 2026-09-24
### Reviewed
- **[Asset Review]**: Reviewed `CH_AG_ASTRA_A17_idle` -> **NEEDS-REVIEW** at 2026-09-25T08:07:11.489Z.
  - Notes: None
  - Background: `dark` | Version: `1.0.1` | Defects: [none]
### Added
- **Alpha-Channel Correction Pass**: Successfully implemented programmatical background removal and un-multiplying color correction to produce true transparent RGBA PNG files from original JPG reference files.
- **Separate Transparent Storage Directories**: Created dedicated folders `assets/characters/transparent/`, `assets/props/transparent/`, and `assets/effects/transparent/` to store high-fidelity production derivatives separately.
- **Source-to-Derivative Manifest Integration**: Updated `asset-manifest.json` with new transparent paths, exact dimensions (1024x1024), alpha verification results, smooth edge anti-aliasing quality comments, and recorded the original JPG sources.
- **Enhanced Compositing Laboratory UI**: Integrated transparent PNG renders in the client interactive viewport and added Nexus Core and Vortex Prime to the overlay elements dropdown for full-app visual inspection.

### Changed
- **Asset Status Safety**: Retained `needs-review` status for all processed files, ensuring no automatic promotions to approved occur before human visual inspection.

---

## [0.5.0] - 2026-09-24
### Added
- **Phase 3 Asset Audit & Review Studio**: Developed a beautiful, comprehensive, and interactive dark-themed QA inspection panel in the client dashboard.
- **Astra A-17 Continuity Contact Sheet**: Created a grid for visual-integrity checking of all 12 generated Astra variants, poses, close-ups, and head reference sheets.
- **PNG Alpha & Compositing Laboratory**: Implemented an interactive viewport simulating 9:16 vertical workspace composition with solid (void dark, neon cyan, governance orange) and parallax backdrops, alpha masking chroma key filters, and YouTube Shorts safe guide boundaries overlay.
- **Acoustics Alignment Lab**: Documented technical measurement tables for 128 BPM key of C minor music stems, synthesized voiceovers, and SFX cues (peak levels, durations, sample rates, channel configurations).
- **Incomplete Assets & Missing-File Monitor**: Added status indicators for planned assets yet to be generated (e.g., SIM_02 Sub-Router, PR_DECRYPT_KEY).

### Changed
- **Enforced "Imported Does Not Mean Approved" Lifecycle Rules**: Set all generated and imported assets (`CH_AG_ASTRA_A17` with all poses, `CH_AG_NEXUS`, `CH_AG_VORTEX`, `WD_ORB_ORBITAL_RELAY`, `WD_SIM_01`, `PR_RELAY_CORE`, `EF_SIGNAL_EMERGENCY_CYAN`, `EF_GOVERNANCE_SEAL_ORANGE`, all audio stems, VO, SFX, and animation moves) to `needs-review` state inside the master JSON manifests (`asset-manifest.json`, `audio-manifest.json`, and `animation-manifest.json`).
- **Project State Updates**: Progressed overall project control state in `PROJECT_STATE.md` to `Current Phase: ASSET GENERATION AUDIT COMPLETE` and `Next Permitted Phase: HUMAN ASSET REVIEW`.

---

## [0.4.0] - 2026-09-24
### Added
- **Phase 3 Complete**: Successfully executed physical media generation, asset compilation, and status pipeline integrations.
- **Physical Visual Assets Generated & Compiled**:
  - Generated high-quality character assets (`CH_AG_ASTRA_A17_idle.png`, `_boot.png`, `_scan.png`, `_react.png`, `_shutdown.png`) and fully populated directory hierarchies (`assets/characters/astra-a17/*`).
  - Generated high-quality world background elements (`WD_ORB_ORBITAL_RELAY_deck.png`, `_core.png`, etc.) and populated (`assets/worlds/orbital-relay/*`).
  - Generated and imported interactive props (`PR_RELAY_CORE.png`) and populated (`assets/props/relay-core/*`).
  - Generated high-contrast visual effects overlays (`EF_GOVERNANCE_SEAL_ORANGE.png`, `EF_SIGNAL_EMERGENCY_CYAN.png`) and populated (`assets/effects/*`).
- **Acoustic Stubs & Stem Laydown**:
  - Created silent WAV stubs matching BPM grids for Drums, Bass, and Leads (`audio-library/music/*`).
  - Synthesized and imported dialogue vocal clips for Astra, Control Operator, and System Narrator (`audio-library/voiceover/*`).
  - Generated high-fidelity warning sound effects and ambient sector fans hum files (`audio-library/sound-effects/*`, `/ambience/*`).
- **Mathematical Motion Configurations**:
  - Formulated frame-by-frame coordinate offsets, rotations, and pixel skew variables under `animation-library/reusable-animation-cycles/` and `animation-library/astra/` for `AN_IDLE_BREATHING`, `AN_SCANNING_SWEEP`, and `AN_GLITCH_FLICKER`.

### Changed
- **Asset Status Transitions**: Promoted verified assets from `briefed` -> `imported` and `approved` in `asset-manifest.json`, `audio-manifest.json`, and `animation-manifest.json` after physical file verification.
- **Full Auditor Passing**: Verified perfect build with 100% linter and validator pass status.

---

## [0.3.0] - 2026-09-24
### Added
- **Phase 2 Complete**: Full asset briefings and production specifications developed for all 8 primary assets of Episode 001.
- **Created Detailed Brief Specs (`bible/briefs/`)**:
  - `CH_AG_ASTRA_A17.md` (Astra character details, materials, and 5 precise Imagen prompt blueprints).
  - `WD_ORB_ORBITAL_RELAY.md` (Orbital Relay background layer layout, 4-tier vertical parallax speed ratios, and 9:16 transmitter deck Imagen prompt formula).
  - `PR_RELAY_CORE.md` (Relay Core interactive receiver prop description and 1:1 Imagen vector prompt blueprint).
  - `EF_GOVERNANCE_SEAL_ORANGE.md` (Governance restriction seal concentric orange hexagonal vector HUD illustration blueprint).
  - `EF_SIGNAL_EMERGENCY_CYAN.md` (Emergency cyan core signal wave pulse visual coordinates and Imagen prompt).
  - `AN_ASTRA_CYCLES.md` (Math formulas and 30fps timing frames for Breathing Idle, Scanning Sweep, and Glitch Flicker).
  - `AM_BOOT_SEQUENCE_128BPM.md` (BOOT SEQUENCE 128 BPM key of C minor instrumental multi-stem layouts, mobile high-pass treatments, and automated voiceover ducking guidelines).
  - `VO_EPISODE_001_VOICEOVERS.md` (Text dialogues, speakers, timing durations, and precise digital signal chains for Astra, Operator, and Narrator).

### Changed
- **Status Corrections & Lifecycle Audits**: Downgraded all visual and audio assets in `manifests/asset-manifest.json` and `manifests/audio-manifest.json` (such as Astra character, Orbital Relay world, music tracks, and voiceovers) from `approved` to `briefed` because physical files are not compiled yet, conforming strictly to Phase 2 rules.
- **Unified ID Compliance**: Renamed non-standard IDs like `PROP_RELAY_CORE` to `PR_RELAY_CORE`, and effects `FX_...` to `EF_...` in `asset-manifest.json` to follow naming-conventions perfectly.
- **Cleaned Asset Folders**: Created the actual individual folders in `/agenticum-production/assets/*` and `/agenticum-production/audio-library/*` and deleted the weird brace-enclosed shell folders.
- **Dashboard Dynamic Data Loading**: Shrank `src/App.tsx` by over 300 lines by replacing all hardcoded inline manifests with dynamic live JSON imports from `/agenticum-production/manifests/*`, ensuring the studio linter and state are always dynamically in sync with the live manifest files!

---

## [0.2.0] - 2026-09-24
### Added
- **Phase 1 Complete**: Full development of the Master Production Bible and canonical specifications.
- **Lore & Series Identity Expansion (`bible/series-bible.md`)**:
  - Detailed the 20 fundamental commands of cinematic series production including themes of system initialization, autonomous execution, governance orange locks, and unverified signals.
  - Specified foundation specifications for Episode 001 (`EP_001_BOOT_SEQUENCE_A17`) containing synopsis, protagonist Astra / A-17, target 9:16 layout, 30fps framerate, 90s duration, and 128 BPM key of C minor rules.
- **Visual Style Standards (`bible/visual-bible.md`)**:
  - Specified Character Style: Synthetic humanoid features built of ceramic, graphite, and steel with horizontal cyan optical systems.
  - Specified World Style: Damaged orbital relay environment layers, including strict 4-tier vertical parallax speed values.
  - Specified Master Color System: Standard 60-30-10 asset balance utilizing Obsidian Void Gray (`#0b0c10`), Steel White (`#ffffff`), Cyan Signal (`#00ffcc`), and Governance Orange (`#ff6600`).
  - Specified Camera & Lighting: High-contrast dual opposing source illumination with a custom 9:16 layout composition grid.
- **Sound & Synchronized Rhythms (`bible/audio-bible.md`)**:
  - Defined 128 BPM timing grid mapped down to double, whole, half, quarter, and eighth beat millisecond ranges.
  - Documented Voice Profiles for Astra / A-17, Operator Control, and System Narrator.
  - Formulated SFX Sync Matrix and specified strictly prohibited sounds (no retro-arcade noise).
- **Canonical Reviews (`bible/character-bible.md`, `bible/world-bible.md`)**:
  - Audited existing entity IDs (`CH_AG_NEXUS`, `CH_AG_VORTEX`, `CH_AG_KESTREL`, `WD_SIM_01`, `WD_SIM_02`, `WD_SIM_03`), confirming they represent official lore canon and do not conflict with Astra or the Orbital Relay.
  - Registered core canonical characters and environments including Astra (`CH_AG_ASTRA_A17`) and the Orbital Relay (`WD_ORB_ORBITAL_RELAY`).
- **Nomenclature & Workflow Lifecycles (`bible/naming-conventions.md`)**:
  - Specified prefix matching protocols for character, world, music stem, sound effect, voiceover, and animation files.
  - Defined standard asset lifecycle states: `planned`, `briefed`, `generated`, `imported`, `needs-review`, `approved`, `deprecated`, `rejected`.
- **Manifest Databases populated with Episode 001 entities**:
  - Added Astra, Orbital Relay, Relay Core prop, Emergency Cyan effect, and Governance Orange Seal effect to `manifests/asset-manifest.json`.
  - Added BOOT SEQUENCE music track and 3 high-fidelity voice tracks to `manifests/audio-manifest.json`.
  - Defined comprehensive script timeline, visual tracks, and subtitles in `manifests/episode-manifest.json`.

---

## [0.1.0] - 2026-09-23
### Added
- **Directory Structure**: Established absolute pipeline layout.
- **Core Production Control Documents**: Baseline README, GEMINI, PROJECT_STATE.
- **Pipeline Schemas & Manifests**: baseline manifest catalogs.
- **Validation Systems**: Manifest validator script.
- **Studio Interface**: Deployed functional dark-styled Control Dashboard in React.
