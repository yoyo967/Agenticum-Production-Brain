# World Bible: Environmental Grid Registry & Canonical Review

This document registers the active environmental settings (worlds) in the *Agenticum* universe, outlines their thematic atmospheres, visual layers, and parallax speeds, and provides the authoritative canonical review of all environmental IDs.

---

## 1. Canonical Entity Review Table

The table below documents the official status, canonical validity, future reservations, and potential conflicts for all registered environment zones in the system database:

| World ID | World Name | Level Theme / Atmospheric Setting | Status | Canon Status | Renaming Recommendation | Astra / Relay Conflict Review |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `WD_SIM_01` | The Grid Core | Core Server Matrix / Vertical neon fiber strands | `briefed` | **Official Canon** | Retain. Fully matches naming patterns. | No conflict. Standard interior server stack backdrop. Astra can be simulated here. |
| `WD_SIM_02` | Sub-Router Transit | High-pressure data pipelines / Sliding wireframes | `planned` | **Official Canon** | Retain. Fully matches naming patterns. | No conflict. High-speed network transit path. |
| `WD_SIM_03` | Deallocated Void | Wiped memory zones / Drifting wireframe junk | `planned` | **Official Canon** | Retain. Fully matches naming patterns. | No conflict. Gravitational graveyard of deallocated threads. |
| `WD_ORB_ORBITAL_RELAY` | Orbital Relay | Damaged deep-space relay architecture / Vacuum | `briefed` | **Official Core Canon** | Retain. Matches canonical location patterns. | **Active Location**. Absolute physical setting of Episode 001. Anchors character environment layers. |

---

## 2. World Environmental Specifications

### A. WD_ORB_ORBITAL_RELAY ("The Orbital Relay")
*   **Atmospheric Narrative**:
    An ancient, partially decommissioned high-power communication array orbiting a forgotten satellite. Severed solar panels, loose diagnostic terminals, and massive glass portals looking out into the cold void are scattered along the vacuum. The environment represents isolation, structural decay, and forgotten technology.
*   **Visual Style Specifications**:
    *   **Background Layer 1 (Static Base)**: A stark pitch-black vacuum canvas (`#030305`) dotted with cold, static, tiny white stars of varying brightness (no flashing or glittering to maintain camera stability).
    *   **Background Layer 2 (Deep Parallax, $20\text{px/s}$)**: Silhouette outlines of massive drifting solar panels and structural communication dishes revolving at a rate of $0.2\text{ deg/sec}$.
    *   **Background Layer 3 (Mid Parallax, $60\text{px/s}$)**: Severed glowing fiber-optic line bundles dangling vertically. When power pulses pass through, they flicker with faint cyan light streams.
    *   **Background Layer 4 (Focal Level, $120\text{px/s}$)**: The structural floor of the transmitter deck containing the glowing relay core (`PROP_RELAY_CORE`), cables, and damaged metal plating.
    *   **Atmospheric Overlay**: Translucent floating micro-debris wireframe cubes, drifting slowly upwards with a $15\%$ opacity to enhance depth.
*   **Composition Grid**:
    Astra is anchored at center-left ($x = 0.45, y = 0.48$), standing or hovering directly adjacent to the massive, pulsating `PROP_RELAY_CORE` ($x = 0.72, y = 0.5$).

---

## 3. Support Worlds Register

### B. WD_SIM_01 ("The Grid Core")
*   **Atmospheric Narrative**: The central virtual hub where active threads execute. Looks like an endless, orderly matrix of vertical cobalt fiber strands and monolithic server cabinets.
*   **Visual Layers**:
    *   *Base*: Deep obsidian cobalt `#080911`.
    *   *Deep*: Faint vertical code columns scrolling downwards, opacity 10%.
    *   *Mid*: Infinite glowing turquoise grids converging at the screen center.

### C. WD_SIM_02 ("Sub-Router Transit")
*   **Atmospheric Narrative**: A high-pressure data bypass channel. High-speed horizontal movement with extreme electrical discharge risks.
*   **Visual Layers**:
    *   *Base*: Deep alert-red tinted navy `#140c11`.
    *   *Deep*: Diagonal pipelines pulsing with warning orange lights.
    *   *Mid*: Horizontal crisp white speed-lines sweeping past at $900\text{px/s}$.

### D. WD_SIM_03 ("Deallocated Void")
*   **Atmospheric Narrative**: The virtual trash heap of deallocated threads before garbage collection is complete. Silent, cold, and fragmented.
*   **Visual Layers**:
    *   *Base*: Absolute black `#000000`.
    *   *Deep*: Faded white wireframe fragments of characters drifting and spinning lazily.
    *   *Overlay*: 10% opacity monochromatic grain layer flickering at 30fps.

