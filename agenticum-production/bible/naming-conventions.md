# Naming Conventions & Approval Protocol

All assets and code layers added to the *Agenticum* production pipeline must follow these strict structural naming standards and lifecycle state definitions to guarantee error-free automated compilation, verification, and audit operations.

---

## 1. Master Prefix Conventions & Patterns

### A. Character Visual Assets
*   **Path**: Reside inside `/agenticum-production/assets/characters/`.
*   **Regex**: `^CH_[A-Z0-9_]+_[a-z0-9_-]+\.png$`
*   **Pattern**: `CH_<CHAR_ID>_<POSE_ID>.png`
*   *Examples*:
    *   `CH_AG_ASTRA_A17_idle.png`
    *   `CH_AG_ASTRA_A17_boot.png`
    *   `CH_AG_NEXUS_idle.png`

### B. World Background Assets
*   **Path**: Reside inside `/agenticum-production/assets/worlds/`.
*   **Regex**: `^WD_[A-Z0-9_]+_[a-z0-9_-]+\.png$`
*   **Pattern**: `WD_<WORLD_ID>_<ANGLE_ID>.png`
*   *Examples*:
    *   `WD_ORB_ORBITAL_RELAY_deck.png`
    *   `WD_SIM_01_core.png`

### C. Audio Soundscapes & Voices
*   **Path**: Reside in specific subfolders of `/agenticum-production/audio-library/` (`music/`, `voiceover/`, `sound-effects/`, `ambience/`).
*   **Music Stem Pattern**: `AM_<MUSIC_ID>_<BPM>_BPM_<KEY>_<STEM_TYPE>.wav`
    *   *Regex*: `^AM_[A-Z0-9_]+_[0-9]+_BPM_[A-G](m)?_[a-z0-9_-]+\.wav$`
    *   *Example*: `AM_EP001_128_BPM_Cm_bass.wav`
*   **Sound Effect Pattern**: `SFX_<CATEGORY>_<DETAIL>_[0-9]{2}\.wav`
    *   *Regex*: `^SFX_[A-Z0-9_]+_[a-z0-9_-]+_[0-9]{2}\.wav$`
    *   *Example*: `SFX_GLITCH_static_01.wav`
*   **Voiceover File Pattern**: `VO_EP[0-9]{3}_[A-Z0-9_]+_[0-9]{2}\.mp3` (or `.wav`)
    *   *Regex*: `^VO_EP[0-9]{3}_[A-Z0-9_]+_[0-9]{2}\.(mp3|wav)$`
    *   *Example*: `VO_EP001_ASTRA_A17_01.mp3`

### D. Animations & Camera Tracks
*   **Path**: Reside inside `/agenticum-production/animation-library/`.
*   **Animation Cycles**: `AN_<CYCLE_ID>.json` (Regex: `^AN_[a-z0-9_-]+\.json$`)
    *   *Example*: `AN_idle-breathing.json`
*   **Camera Movements**: `CAM_<MOVE_ID>.json` (Regex: `^CAM_[a-z0-9_-]+\.json$`)
    *   *Example*: `CAM_slow-vertical-pan.json`

---

## 2. Dynamic Asset Lifecycle States

Every asset registered in the manifests belongs to a specific lifecycle track. Automated builders only compile standard assets with the active state of `approved`:

*   `planned`: The asset is structurally specified and registered in the catalog, but has zero media files. Visual and acoustic parameters are raw placeholding parameters.
*   `briefed`: Detailed artistic instructions (prompts, audio guidelines, timing criteria) are locked in the catalog. Ready for model generation.
*   `generated`: Media output exists as raw files in temp directories but has not been verified for safe margins or technical standards.
*   `imported`: Assets are downloaded and loaded into standard project folders, waiting for pipeline confirmation.
*   `needs-review`: The asset requires active auditing to ensure compliance with safe areas, color distributions, voice profiles, and sound priorities.
*   `approved`: Fully validated asset. Safe, high-quality, and permitted for compilation in active cinematic episodes.
*   `deprecated`: Retained for legacy archiving and historical reference, but strictly barred from use in newly engineered episodes.
*   `rejected`: Fails technical or creative guidelines (organic features, bad margins, wrong BPM). Barred from all pipeline stages.

---

## 3. General Metadata Protocol
*   **No Spaces or Capitals in Sub-identifiers**: Sub-identifiers such as `poseId`, `bgId`, or custom offsets must be entirely lowercase and separate elements using hyphens (`-`).
*   **Absolute Strictness**: Any file that fails regex verification is immediately isolated by the automated validator and prevents build completion.
*   **Version Upgrades**: When modifying an asset, increment its metadata `version` parameter in the JSON manifest (e.g., from `1.0.0` to `1.1.0`), leaving the filename completely unchanged to preserve active code references.
