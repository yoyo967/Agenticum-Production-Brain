# Asset Brief: AN_ASTRA_CYCLES ("Astra Reusable Animation Cycles")

This document outlines the frame-by-frame interpolation formulas, timing properties, and coordinate calculations for Astra's reusable motion cycles.

---

## 1. Cycle Overview & Technical Parameters

*   **Asset Category**: Reusable Animation Cycles (Motion Specs)
*   **Target Status**: `approved` (since these are mathematical definitions that do not require external PNG assets, they are immediately approved for pipeline use).
*   **Master Framerate**: `30 fps` ($33.33\text{ms}$ per frame).
*   **Rhythmic Alignment**: Mapped directly to the divisions of the **128 BPM** beat-grid.

---

## 2. Animation Cycle Specifications

All motion in the *Agenticum* series uses non-deforming, high-contrast structural translations to preserve clean flat-vector outlines:

### Cycle A: Breathing Idle (`AN_IDLE_BREATHING`)
*   **Description**: A gentle, organic vertical hover simulation. Preserves character mass while introducing micro-movement to keep the mobile frame active.
*   **Interpolation Property**: `translateY` (vertical position) and `scaleY` (subtle structural compression).
*   **Timing Grid**: 1 Half Note ($0.9375\text{s}$ at 128 BPM / $28.125$ frames per loop).
*   **Mathematical Formula**:
    $$y(t) = y_0 - 6\text{px} \cdot \sin\left(\frac{2\pi \cdot t}{T}\right)$$
    $$s_y(t) = 1.0 + 0.015 \cdot \sin\left(\frac{2\pi \cdot t}{T} - \frac{\pi}{2}\right)$$
*   **Keyframe Data (30fps)**:
    *   `0.0s` (Frame 0): `translateY(0px) scaleY(0.985)`
    *   `0.234s` (Frame 7): `translateY(-3px) scaleY(1.0)`
    *   `0.469s` (Frame 14): `translateY(-6px) scaleY(1.015)`
    *   `0.703s` (Frame 21): `translateY(-3px) scaleY(1.0)`
    *   `0.938s` (Frame 28): `translateY(0px) scaleY(0.985)`

### Cycle B: Scanning Sweep (`AN_SCANNING_SWEEP`)
*   **Description**: Astra's core scan movement. The character tilts forward slightly while projecting three laser lines downwards. The laser lines sweep horizontally in a continuous pendulum oscillation.
*   **Interpolation Property**: `rotation` (Astra's tilt) and `scaleX` / `opacity` (Laser scan lines).
*   **Timing Grid**: 1 Whole Note ($1.875\text{s}$ at 128 BPM / $56.25$ frames per loop).
*   **Keyframe Data (30fps)**:
    *   `0.0s`: Character rotates 3deg, laser lines opacity = 0.8, laser lines width scale = 1.0
    *   `0.469s` (Beat 1): Character rotates 0deg, laser lines opacity = 0.5, laser lines width scale = 0.8
    *   `0.938s` (Beat 2): Character rotates -3deg, laser lines opacity = 0.8, laser lines width scale = 1.0
    *   `1.406s` (Beat 3): Character rotates 0deg, laser lines opacity = 0.5, laser lines width scale = 0.8
    *   `1.875s` (Beat 4): Character rotates 3deg, laser lines opacity = 0.8, laser lines width scale = 1.0

### Cycle C: Glitch Flicker Trigger (`AN_GLITCH_FLICKER`)
*   **Description**: A quick, high-intensity visual disruption indicating a defensive reaction or system warning.
*   **Interpolation Property**: `opacity` and `transform: skewX` (simulating horizontal pixel slice shift).
*   **Timing Grid**: 1 Eighth Note ($0.2344\text{s}$ at 128 BPM / $7$ frames total). Non-looping.
*   **Keyframe Data (30fps)**:
    *   `Frame 0`: `opacity(1.0) skewX(0deg)`
    *   `Frame 1`: `opacity(0.1) skewX(12deg)`
    *   `Frame 2`: `opacity(0.9) skewX(-8deg)`
    *   `Frame 3`: `opacity(0.3) skewX(0deg)`
    *   `Frame 4`: `opacity(1.0) skewX(15deg)`
    *   `Frame 5`: `opacity(0.2) skewX(-12deg)`
    *   `Frame 7`: `opacity(1.0) skewX(0deg)`
