# Asset Brief: WD_ORB_ORBITAL_RELAY ("The Orbital Relay")

This document outlines the environmental visual brief, layer architectures, multi-tier vertical parallax speed values, and image generation prompt blueprints for the Orbital Relay world.

---

## 1. Environment Overview & Technical Parameters

*   **Asset ID**: `WD_ORB_ORBITAL_RELAY`
*   **Asset Type**: World Environmental Backdrop
*   **Version**: `1.0.0`
*   **Target Status (Initial)**: `briefed`
*   **Layout Format**: `9:16` vertical orientation ($1080 \times 1920$ resolution).
*   **Atmospheric Mood**: Isolation, cosmic scale, cold automated decay, damaged deep-space architecture.
*   **Composition safe margins**: All critical details must respect the **bottom 25%** and **right 15%** boundaries to prevent overlap with YouTube Shorts overlay controls on mobile.

---

## 2. Layer Architecture & Vertical Parallax Speed Values

To achieve high-end cinematic vertical depth when the camera performs vertical pans (e.g., *The Cascade Pan* at $400\text{px/s}$ downwards), the environment is split into 4 independent visual layers moving at separate speeds:

| Layer Number | Name | Speed Ratio | Physical speed at $400\text{px/s}$ pan | Visual Description |
| :--- | :--- | :--- | :--- | :--- |
| **Layer 1** | Static Void Base | $0.0\times$ | $0\text{px/s}$ (Static) | Stark pitch-black space canvas with tiny, sharp, non-glimmering stars. |
| **Layer 2** | Deep Parallax | $0.15\times$ | $60\text{px/s}$ (Downwards) | Silhouette outlines of giant drifting solar arrays, communications dishes, and distant nebulas. |
| **Layer 3** | Mid Parallax | $0.4\times$ | $160\text{px/s}$ (Downwards) | Dangling vertical fiber-optic conduits, exposed cable trunks, and structural supports of the transmitter tower. |
| **Layer 4** | Focal Level | $1.0\times$ | $400\text{px/s}$ (Downwards) | The immediate transmitter deck platform, damaged floor panels, structural brackets, and the Relay Core receiver mount (`PR_RELAY_CORE`). |
| **Layer 5** | Atmospheric Overlay | $1.35\times$ | $540\text{px/s}$ (Downwards) | Translucent floating geometric micro-debris wireframe cubes drifting slowly, creating extreme near-field depth of field. |

---

## 3. Background Specifications & Prompt Blueprints

These prompts are engineered for direct input into Imagen / Gemini to render high-fidelity, flat-vector vertical panels:

### Background A: Transmitter Deck Platform (`WD_ORB_ORBITAL_RELAY_deck.png`)
*   **Visual Scene**: The structural metal platform of a damaged communication array in deep space. Exposed, glowing cables run along the floor; the cold white vacuum of space and giant silhouette arrays are visible in the background.
*   **Imagen Formula Prompt**:
    > `Cinematic 9:16 vertical vector graphic of WD_ORB_ORBITAL_RELAY, a damaged orbital communication deck platform drifting in a deep space vacuum. Foreground transmitter deck with geometric steel paneling, exposed high-voltage fiber-optic cables glowing with faint cyan pulse. Midground silhouette outlines of huge severed solar wings and antenna dishes rotating slowly. Background pitch-black outer space filled with tiny, sharp, crisp white stars. Ultra-clean flat vector illustration, minimalist digital graphic, high contrast, dual opposing side-lighting in cold white and active cyan, no text, no human elements, 8k digital matte --aspect-ratio 9:16`

---

## 4. Visual Safe Areas & Composition Map

```text
+------------------------------------------+  y = 0.0
| [Safe Zone: Abstract Telemetry Tickers]  |  Top 10% Margin
+------------------------------------------+  y = 0.1
|                                          |
|                                          |
|            (FOCAL PORTAL)                |
|      Astra (x = 0.45, y = 0.48)          |
|                                          |  Right 15% Margin
|                                    [X]   |  (Shorts Icons Safe Area)
|                                    [X]   |
|            (SUBTITLE BASKET)             |  y = 0.65
|       "boot sequence initiated"          |  Word-by-word centered text
|                                    [X]   |  y = 0.75
|                                          |
+------------------------------------------+  y = 0.75
| [Safe Zone: Shorts Title & Captions]     |  Bottom 25% Margin
|                                          |
+------------------------------------------+  y = 1.0
  x = 0.0                                    x = 1.0
```
