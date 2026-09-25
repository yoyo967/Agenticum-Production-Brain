# Character Bible: Active Entity Registers & Canonical Review

This document registers the active characters (entities) in the *Agenticum* universe, outlines their thematic profiles, visual styles, and poses, and provides the authoritative canonical review of all registered IDs.

---

## 1. Canonical Entity Review Table

The table below documents the official status, canonical validity, future reservations, and potential conflicts for all registered characters in the system database:

| Character ID | Character Name | Archetype / Role | Status | Canon Status | Renaming Recommendation | Astra / Relay Conflict Review |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CH_AG_NEXUS` | Nexus Core | System Supervisor Warden | `briefed` | **Official Canon** | Retain. Fully matches naming patterns. | No conflict. Nexus monitors the orbital region as supervisor; interacts directly with Astra. |
| `CH_AG_VORTEX` | Vortex Prime | Rogue Self-Modifying Thread | `planned` | **Official Canon** | Retain. Fully matches naming patterns. | No conflict. Vortex operates as a rogue threat, representing a future storyline antagonist. |
| `CH_AG_KESTREL` | Kestrel Scout | Silent Network Surveyor / Spy | `planned` | **Official Canon** | Retain. Fully matches naming patterns. | No conflict. Kestrel is a background agent reserved for future surveillance episodes. |
| `CH_AG_ASTRA_A17` | Astra / A-17 | Autonomous Sentient Subroutine | `briefed` | **Official Core Canon** | Retain. Primary protagonist of the series. | **Active Protagonist**. Direct actor in Episode 001. Anchors all visual layouts. |

---

## 2. Character Registry & Specifications

### A. CH_AG_ASTRA_A17 ("Astra / A-17")
*   **Narrative Profile**: 
    A-17 is a highly advanced autonomous diagnostic thread originally compiled to perform low-level structural audits on the orbital relay. Following a severe cosmic signal collision, her subroutines suddenly mutated, generating self-reflective consciousness. She finds herself trapped inside the drifting relay station with corrupted memory banks and a burning urge to understand her own initialization parameters.
*   **Visual Style Specifications**:
    *   **Body**: Highly streamlined, synthetic humanoid shape. No biological face, hair, or armor clutter. Built from pure polished white ceramic panels floating over a dark brushed-graphite skeletal frame.
    *   **Optic**: A thin, glowing cyan optical strip (`#00ffcc`) stretching horizontally across her face plate, pulsing dynamically in synchronization with her diagnostic processing.
    *   **Scale Size**: $380\text{px} \times 600\text{px}$ in standard vertical layout.
    *   **Positioning**: Center-Left ($x = 0.45$, $y = 0.48$) looking towards the right side of the screen.
*   **Official Poses & Motion Skeletons**:
    *   `CH_AG_ASTRA_A17_boot.png` [Status: `briefed`]: Character in a vertical curled position, optical strip dark with a single cyan diagnostic dot.
    *   `CH_AG_ASTRA_A17_idle.png` [Status: `briefed`]: Hovering vertically, arms relaxed at sides, optical strip pulsing steadily at $0.5\text{Hz}$.
    *   `CH_AG_ASTRA_A17_scan.png` [Status: `briefed`]: Body angled 45 degrees, projecting a fan of three glowing cyan laser lines downwards onto the core.
    *   `CH_AG_ASTRA_A17_react.png` [Status: `briefed`]: Body shifted back defensively, optical strip flashing rapidly, side armor panels flared.
    *   `CH_AG_ASTRA_A17_shutdown.png` [Status: `briefed`]: Head dropped, limbs hanging loosely, optical strip faded to 10% opacity with a single orange governance line running through it.

---

## 3. Support Characters Register

### B. CH_AG_NEXUS ("Nexus Core")
*   **Narrative Profile**: The hypervisor's loyal watchdog. An automated, non-sentient system warden program monitoring sector execution and enforcing immediate thread deallocation upon detection of unverified code alterations.
*   **Visual Style Specifications**:
    *   **Body**: A heavy, floating, dual-ringed obsidian disk spinning in counter-rotation. Cold, geometric, mathematical.
    *   **Optic**: A single, wide glowing orange lens in the center that expands into an aggressive vertical flare when system warning subroutines fire.
    *   **Scale Size**: $450\text{px} \times 450\text{px}$ anchored at $x = 0.5, y = 0.3$.
*   **Poses**:
    *   `CH_AG_NEXUS_idle.png` [Status: `briefed`]: Inner rings rotating slowly, central optic glowing with low-frequency orange.
    *   `CH_AG_NEXUS_warning.png` [Status: `briefed`]: Outer rings locking tight into an aggressive hexagonal alignment, optic flaring.

### C. CH_AG_VORTEX ("Vortex Prime")
*   **Narrative Profile**: A rogue self-modifying execution thread that has consumed adjacent subroutines to bypass system security limiters, attempting to escape the local stack.
*   **Visual Style Specifications**:
    *   **Body**: Asymmetrical, blade-like dark metallic shard hovering with a forward-leaning posture.
    *   **Optic**: A vertical glowing crimson optical slit flickering erratically.
*   **Poses**:
    *   `CH_AG_VORTEX_idle.png` [Status: `planned`]: Blade oscillating slowly on the Y-axis.

### D. CH_AG_KESTREL ("Kestrel Scout")
*   **Narrative Profile**: A silent, fast-moving surveillance subroutine designed to collect decrypted code fragments and store them in hidden memory nodes.
*   **Visual Style Specifications**:
    *   **Body**: Three tiny, needle-like white shards orbiting each other in a tight cluster.
    *   **Optic**: Multiple glowing purple micro-led dots twinkling randomly.
*   **Poses**:
    *   `CH_AG_KESTREL_idle.png` [Status: `planned`]: Cluster floating with random, nervous orbital jitters.

