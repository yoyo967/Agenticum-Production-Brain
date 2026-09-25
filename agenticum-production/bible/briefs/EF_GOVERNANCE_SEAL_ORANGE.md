# Asset Brief: EF_GOVERNANCE_SEAL_ORANGE ("Governance Restriction Seal")

This document outlines the visual specifications, layout configurations, and image generation prompt blueprints for the Governance Seal effect.

---

## 1. Effect Overview & Technical Parameters

*   **Asset ID**: `EF_GOVERNANCE_SEAL_ORANGE`
*   **Asset Type**: Screengrab Overlay/Visual Effect
*   **Version**: `1.0.0`
*   **Target Status (Initial)**: `briefed`
*   **Aspect Ratio**: `1:1` square aspect ratio (designed for centered overlay scale).
*   **Color Profile**: High-intensity Governance Orange (`#ff6600` or `#ff9900`), indicating systemic lockouts, restrictions, and corporate override.
*   **Target Position**: Centered directly on screen center ($x = 0.5$, $y = 0.5$) or layered directly in front of Astra (`CH_AG_ASTRA_A17`) to indicate constraint.

---

## 2. Visual Specifications & Layout Configurations

The Governance Seal represents the mathematical authority of the Hypervisor. It is flat, geometric, and precise.

*   **Geometry**: A multi-layered, concentric, mathematically perfect hexagonal orange vector seal. Contains technical warning glyphs, broken circular perimeter line rings, and structural lock pins pointing inwards.
*   **Materiality**: Raw, glowing, semi-transparent energetic vector lines. No analog lens dirt or realistic metal textures; it is a pure projected software forcefield.
*   **Synchronization**:
    *   Fires instantly on $t = 45.0\text{s}$ of the Episode 001 timeline.
    *   Linked directly with `SFX_SHIELD_HUM_01.wav` (heavy, low-frequency electric humming hum) and a horizontal camera jitter shake ($\pm 8\text{px}$, 0.2s duration).

---

## 3. Image Generation Prompt Blueprint

These prompt formulas are optimized for generating high-definition vector textures:

### Effect Vector Asset (`EF_GOVERNANCE_SEAL_ORANGE.png`)
*   **Visual Scene**: A mathematically precise orange glowing circular vector seal with a central hexagonal lock matrix and system warnings. Clean black background (for screen blending).
*   **Imagen Formula Prompt**:
    > `Flat-vector graphic of EF_GOVERNANCE_SEAL_ORANGE, a glowing neon orange mathematical concentric circular forcefield seal. Features a prominent central hexagonal lock graphic, concentric circle lines, technical warning symbols, and precise linear lock brackets. Pure absolute black background, ultra-high contrast, razor-sharp outlines, glowing luminous vector lines, abstract sci-fi interface element, 8k assets, no text --aspect-ratio 1:1`
