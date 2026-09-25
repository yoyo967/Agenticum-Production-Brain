# Asset Brief: EF_SIGNAL_EMERGENCY_CYAN ("Emergency Cyan Core Signal")

This document outlines the visual specifications, layout configurations, and image generation prompt blueprints for the Emergency Cyan Signal effect.

---

## 1. Effect Overview & Technical Parameters

*   **Asset ID**: `EF_SIGNAL_EMERGENCY_CYAN`
*   **Asset Type**: Screengrab Overlay/Visual Effect
*   **Version**: `1.0.0`
*   **Target Status (Initial)**: `briefed`
*   **Aspect Ratio**: `1:1` or `9:16` full-frame overlay.
*   **Color Profile**: High-intensity Cyan Signal (`#00ffcc`), representing unverified external data streams, emergent sentient signal bursts, and core intelligence.
*   **Target Position**: Radiant burst centered on the Relay Core ($x = 0.72$, $y = 0.5$), expanding outwards to engulf the lower half of the 9:16 vertical canvas.

---

## 2. Visual Specifications & Layout Configurations

The Emergency Cyan Signal is an energetic, radiating wave signal. It represents a logic-breaking unverified signal from outside the local network.

*   **Geometry**: Concentric circular wave pulses that radiate outwards. The pulses are composed of alternating thick and thin energetic cyan vector rings, interwoven with tiny technical coordinate data grids (`x, y, z` axes).
*   **Materiality**: Luminous, highly bright, neon-intensity flat cyan color. It emits a soft, controlled glow bloom without causing broad white-out artifacts on adjacent assets.
*   **Synchronization**:
    *   Fires as a continuous slow pulse starting at $t = 65.0\text{s}$ of the Episode 001 timeline.
    *   Linked directly with `SFX_SIGNAL_PULSE_01.wav` (clean, resonant high-pitched clicks repeating on the eighth-note beat grid of the 128 BPM track).

---

## 3. Image Generation Prompt Blueprint

These prompt formulas are optimized for generating high-definition vector textures:

### Effect Vector Asset (`EF_SIGNAL_EMERGENCY_CYAN.png`)
*   **Visual Scene**: A radiating energetic circular vector pulse wave in bright neon cyan. The wave expands with geometric clean lines over a pure black backdrop.
*   **Imagen Formula Prompt**:
    > `Flat-vector graphic of EF_SIGNAL_EMERGENCY_CYAN, a radiating concentric circular pulse wave in high-intensity neon cyan. Crisp geometric vector lines, expanding concentric rings, and faint outer coordinate data grids. Pure absolute black background, ultra-high contrast, luminous glowing vector lines, minimal flat sci-fi HUD design, 8k assets, no text --aspect-ratio 1:1`
