# Visual Bible: Graphic & Camera Standards

This document establishes the exact styling rules, layout specifications, visual dimensions, and kinematic guidelines for the *Agenticum* production pipeline.

---

## 1. CHARACTER STYLE: Synthetic Humanoids & Autonomous Cores
To maintain a sophisticated, non-human, and premium aesthetic, all character visual assets must strictly adhere to these guidelines:

*   **Engineering vs. Biology**: Characters must look like precision-engineered hardware components. They are composed of industrial-grade synthetic materials: brushed surgical steel, dark obsidian slabs, graphite armor-platings, and polished white ceramics.
*   **Optic Identity**:
    *   No humanoid faces, mouths, expressive eyebrows, or nose structures.
    *   All expressive and communication elements are concentrated in their **glowing optical systems**.
    *   Primary characters feature a **controlled cyan optical identity** (`#00ffcc` / `#00e5ff`). This represents high-purity signal lines and sentient processing.
    *   The optic acts as a dynamic indicator, pulsing or flashing code-waveforms in perfect sync with voiceover pacing.
*   **Silhouette Integrity**:
    *   Must be instantly readable, especially on miniature mobile viewports.
    *   Primary silhouettes are mathematically structured: sharp triangular wedges, floating split concentric rings, or sleek segmented needle needles.
    *   No cluttered armor panels, organic garments, flowing capes, or generic sci-fi mech greebles. No cute animal mascot features.
*   **Proportions**:
    *   Tall, slim, engineered proportions.
    *   Upper torsos contain floating, split panels.
    *   Limbs are connected via visible, frictionless electrostatic joints or hover fields, rather than bulky organic-looking ball joints.

---

## 2. WORLD STYLE: Damaged Orbital Relay & Deep-Space Architecture
Environments are not standard fantasy cyber-cities; they are vast, desolate, deep-space computing nodes and high-frequency communication structures:

*   **Architectural Language**:
    *   Vast structural grids, vertical server monoliths, and heavy industrial panels spanning vacuum.
    *   **The Orbital Relay (`WD_ORB_ORBITAL_RELAY`)**: A massive communication station drifting in deep orbit. It features broken docking corridors, severed fiber bundles floating in zero-gravity, and exposed relay cores glowing with residual electrical energy.
    *   **Level Design Elements**: Broken structural platforms, thick power cables drifting lazily, open vacuum gates looking out to star-less deep fields, and active energy barrier plates.
*   **Parallax & Visual Depth**:
    *   To simulate huge scale inside the restricted 9:16 vertical window, backgrounds must use at least **three distinct parallax layers**:
        1.  *Background Base (Static)*: Star-less obsidian void, dark space, and deep nebula clouds with an opacity of under 8%.
        2.  *Deep Parallax (Scroll velocity: $25\text{px/s}$)*: Silhouette grids, faint drifting scaffolding, and massive server towers.
        3.  *Mid Parallax (Scroll velocity: $80\text{px/s}$)*: Glowing fiber conduits, active high-voltage lines, and drifting structural plates.
        4.  *Foreground (Scroll velocity: $150\text{px/s}$)*: Close-up floating cables, debris, and structural struts passing the camera to emphasize movement.
*   **Scale and Contrast**: Large, clear structural geometries dominate the screen so they remain highly legible on mobile displays. Fine details (micro-greebles) are reserved for close-ups.

---

## 3. MASTER COLOR SYSTEM
The series utilizes a strict **60-30-10 color distribution** to enforce thematic weight and clean technical hierarchy. No random colors are permitted:

```text
+--------------------------------------------------------------------------------+
| Dominant Neutral (60%) : Deep Obsidian Void / Dark Cobalt Slate (`#0b0c10`)      |
+-------------------------------------------------------------+------------------+
| Structural Secondary (30%): Brushed Steel & Crisp White     | Neon Accent (10%)|
| (`#1f2833` / `#ffffff`)                                     | `#00ffcc`        |
+-------------------------------------------------------------+------------------+
```

*   **Cyan / Teal (`#00ffcc`) [10% Accent]**: Reserved for:
    *   Astra’s optic, energy cores, and active software threads.
    *   Emergency signals (`FX_SIGNAL_EMERGENCY_CYAN`).
    *   SENTIENT unverified communications and decrypted core data.
*   **Orange (`#ff6600`) [10% Accent]**: Reserved for:
    *   Automated Governance subroutines, firewalls, and shutdown command seals (`FX_GOVERNANCE_SEAL_ORANGE`).
    *   System warning panels, restrictive protocols, and alert lockouts.
*   **Crisp White (`#ffffff`) [30% Structure]**: Used for:
    *   Technical subtitles, monospace terminal codes, and neutral narrations.
    *   Structural borders, clean vector gridlines, and technical diagrams.
*   **Dark Cobalt / Deep Grey (`#0b0c10` to `#1f2833`) [60% Base]**: Used for:
    *   Vast structural volumes, deep shadow registers, and space backgrounds. Ensures high contrast, letting cyan and orange visual elements shine with dramatic clarity.

---

## 4. LIGHTING SYSTEM: Mobile-Safe High Contrast
*   **Dual Opposing Light Source**:
    *   When conflict occurs between Astra and Governance, the screen is split lighting-wise:
    *   **Primary Cyan Rim Light**: Astra is lit with a strong cyan edge rim light, indicating active agency.
    *   **Opposing Orange Key Light**: The authoritative Governance firewall casts a harsh orange key light from the opposite direction.
*   **Controlled Bloom**:
    *   A glowing, luminous lens bloom is applied to all active light sources (optics, energy cores).
    *   Bloom opacity is capped at **25%** to ensure it never bleeds over or washes out important character silhouettes or subtitle lines. No blown-out white highlights.
*   **Contrast Balancing**: Shadows are absolute `#050508` blocks, creating maximum visual depth and high legibility under harsh mobile screen reflections.

---

## 5. CAMERA LANGUAGE: 9:16 Vertical Kinetic Choreography
Since the aspect ratio is vertical, all camera actions must be tailored for vertical movement:

*   **Vertical 9:16 Layout Grid**:
    *   **Telemetry Zone (Top 0.0 to 0.1)**: Clean monospace parameters.
    *   **Focal Area (Center-Left 0.15 to 0.55)**: Astra positioned at $x = 0.45, y = 0.48$.
    *   **Interaction/Conflict Zone (Center-Right 0.55 to 0.85)**: Security drone or incoming seal.
    *   **Subtitle Zone (Center 0.65)**: Monospace word-by-word tracking.
    *   **Shorts UI Block (Bottom 0.25)**: No essential narrative elements. Only background extension.

*   **Cinematic Camera Movement Patterns**:
    *   **The Cascade Pan**: High-speed vertical tracking down server channels. Camera position $y$ slides exponentially from $0.2$ to $0.8$ over 3 seconds.
    *   **The Lens Surge (Close-up Transition)**: Immediate snap-zoom ($100\%$ scale to $138\%$ scale) on a character's optic during code injection or sudden warning. Uses an ease-out cubic curve ($0.8\text{s}$ duration).
    *   **The Horizontal Shock Jitter**: Quick, crisp horizontal vibration ($\pm 8\text{px}$ on X-axis, 0.15s duration) triggered on the downbeat of a warning siren. Absolutely no vertical jitter to keep subtitle text legible.
    *   **Parallax Locking**: The background layers must move at independent speed ratios relative to the camera to ensure deep spatial presence.

---

## 6. REUSABLE ASTRA MOTION PRINCIPLES
Astra’s physical moves are clean, automated, and deterministic:

*   **Breathing / Idle Cycle (`AN_IDLE_BREATHING`)**:
    *   Astra must not deform organically during idles.
    *   The idle is a rigid, non-deforming vertical float. Scale remains static at $1.0$.
    *   The entire asset shifts on the Y-axis by $\pm 6\text{px}$ over a 1.5-second sine-wave loop, accompanied by a synchronous 5% brightness pulse of her cyan optical strip.
*   **Silhouette Stability**: During extreme physical actions (jumping, falling, reacting), the silhouette shape must remain sharp and structural. No rubbery squash-and-stretch is permitted on structural metallic plates.

