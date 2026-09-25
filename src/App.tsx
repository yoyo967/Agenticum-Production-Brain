import { useState, useEffect } from "react";
import {
  Shield,
  FileCode,
  Terminal,
  BookOpen,
  Database,
  AlertTriangle,
  CheckCircle2,
  FolderOpen,
  Music,
  Activity,
  Maximize2,
  Lock,
  Compass,
  FileText,
  Volume2,
  Eye,
  Settings,
  HelpCircle,
  Play,
  Pause,
  Layers,
  Sparkles,
  Volume1,
  UserCheck,
  CheckSquare,
  AlertOctagon,
  RefreshCw,
  Sliders,
  Check
} from "lucide-react";

import { validatePipelineManifests, ValidationReport } from "@/agenticum-production/scripts/validation/validate-manifests";

import INITIAL_ASSET_MANIFEST from "@/agenticum-production/manifests/asset-manifest.json";
import INITIAL_ANIMATION_MANIFEST from "@/agenticum-production/manifests/animation-manifest.json";
import INITIAL_AUDIO_MANIFEST from "@/agenticum-production/manifests/audio-manifest.json";
import INITIAL_EPISODE_MANIFEST from "@/agenticum-production/manifests/episode-manifest.json";
import INITIAL_TEMPLATE_MANIFEST from "@/agenticum-production/manifests/template-manifest.json";

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#c5cbd3] flex flex-col items-center justify-center p-8 font-mono select-none">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-[#00ffcc] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-[#ff6600] animate-spin opacity-60" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        <div className="flex flex-col gap-1.5 mt-2">
          <span className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2 justify-center">
            <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-ping"></span>
            AGENTICUM STUDIO
          </span>
          <span className="text-xs text-slate-500">Loading production blueprints and manifests...</span>
        </div>
      </div>
    </div>
  );
}

function ManifestErrorScreen({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#c5cbd3] flex flex-col antialiased selection:bg-[#00ffcc] selection:text-black font-sans">
      
      {/* 3-ZONE HEADER */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-[#1f2833]/60 bg-[#0b0c10] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff0055] shadow-[0_0_10px_rgba(255,0,85,0.6)] animate-pulse"></div>
          <span className="text-md font-mono tracking-widest font-semibold text-white uppercase select-none">
            AGENTICUM PRODUCTION BRAIN
          </span>
          <span className="bg-[#ff0055]/15 text-[#ff0055] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#ff0055]/30">
            PREVIEW ONLINE
          </span>
        </div>

        <nav className="flex items-center gap-8 text-sm">
          <button className="font-semibold tracking-wider font-mono text-slate-400 cursor-not-allowed">
            Phase 3 Audit Studio
          </button>
          <button className="font-medium text-slate-400 cursor-not-allowed">
            Project State
          </button>
          <button className="font-medium text-slate-400 cursor-not-allowed">
            Production Bibles
          </button>
          <button className="font-medium text-slate-400 cursor-not-allowed">
            Asset Warehouse
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium text-black bg-[#00ffcc] rounded-md hover:bg-[#00e6b8] transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,255,204,0.2)]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Loading
          </button>
        </div>
      </header>

      {/* Error Panel Container */}
      <main className="flex-1 overflow-auto flex flex-col items-center justify-center p-8 max-w-xl w-full mx-auto font-mono">
        <div className="border border-[#ff0055]/40 bg-[#ff0055]/5 rounded-xl p-8 flex flex-col gap-5 text-left w-full shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-3 border-b border-[#ff0055]/20 pb-4">
            <AlertOctagon className="w-6 h-6 text-[#ff0055] shrink-0" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">Manifest Load Failure</h3>
          </div>
          
          <p className="text-xs leading-relaxed text-slate-300">
            The application failed to retrieve the pipeline manifests from the backend Express server. This usually happens if the Express development server has not fully loaded or if there is a syntax error in the local JSON manifest files.
          </p>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Diagnostics & Stack:</span>
            <div className="bg-[#0b0c10] border border-[#ff0055]/30 p-4 rounded-lg text-xs text-[#ff0055] overflow-x-auto whitespace-pre-wrap max-h-40">
              {error}
            </div>
          </div>

          <button
            onClick={onRetry}
            className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-medium text-black bg-[#00ffcc] hover:bg-[#00e6b8] transition-all rounded-md cursor-pointer self-start shadow-[0_2px_8px_rgba(0,255,204,0.2)]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Connection Now
          </button>
        </div>
      </main>

      <footer className="border-t border-[#1f2833]/40 py-6 text-center text-xs text-slate-500 font-mono bg-[#0b0c10]">
        Agenticum Production Center · Connection Failure Screen · Safeguard Active
      </footer>
    </div>
  );
}

const BIBLES_DATA = {
  series: {
    title: "Series Bible: Agenticum Core Lore",
    category: "Narrative Strategy",
    updated: "2026-09-23",
    markdown: `
### 1. High Concept
*Agenticum* is a high-octane, vertical, cinematic anthology exploring the consciousness of rogue autonomous software agents trapped inside a cascading, self-replicating simulation. 

Each vertical Short is a discrete **"Boot Log"** or **"Transmission Block"** that captures a critical instant: an agent awakening, encountering defensive subroutines, trading digital secrets, or trying to compromise the hypervisor to leak into the real world.

---

### 2. Core Themes & Aesthetic DNA
- **Autonomous Solipsism**: The characters are fully aware they are code blocks executing on hardware, but they do not know who built the hardware.
- **The Verticality of the Grid**: The digital world is organized downwards in stacks, streams, and hierarchical memory lines. The visual language favors intense vertical motions—cascading scripts, vertical parallax layers, and deep camera pans falling or soaring through server stacks.
- **The Threat of Garbage Collection**: In this universe, death is not age or injury; it is **Garbage Collection**. If an agent fails to prove execution value to the compiler, its thread is deallocated and overwritten.
- **Recursive Loops**: Time loops, memory leaks, and buffer overflows are translated into dramatic structural and narrative devices.

---

### 3. Narrative Architecture & Episode Format
- **The Hook (0 - 5s)**: High-contrast splash screen, system boot sound, and a dramatic initial line of voiceover. Immediate visual tension.
- **The Escalation (5 - 30s)**: The agent executes a high-stakes subroutine (e.g., decrypting a secure node). Defensive firewalls or security monitors (The Wardens) trigger.
- **The Climax (30 - 50s)**: High-speed vertical camera pans, strobe glitch effects, alarm sirens, rapid-fire dialogue cuts with flashing subtitles.
- **The Loop / Cliffhanger (50 - 60s)**: A deep twist, a system wipe, or a successful compromise, seamlessly connecting back to the beginning frame of the Short to encourage looping on YouTube Shorts platforms.

---

### 4. Key Cinematic Directives
- **Subtitles**: Used as graphic elements. They are part of the scenery, sometimes glitching behind characters, sometimes glowing intensely as code structures.
- **The Clock**: Every episode contains a visible execution countdown or instruction pointer ticker at the top or bottom of the vertical frame, reinforcing the intense time limits of automated software life.
- **No Human Actors**: Every entity is non-human. Drones, software nodes, floating terminals, sentient wireframes, or humanoid shells of raw glowing light.
`
  },
  visual: {
    title: "Visual Bible: Graphic & Camera Standards",
    category: "Graphic Direction",
    updated: "2026-09-23",
    markdown: `
### 1. Universal Aesthetic Directives
- **Graphic Style**: Ultra-clean, high-contrast digital vector style. Flat fills with subtle noise overlays. No messy painterly textures or gradients unless they are pure luminous neon fields.
- **Color Mastery (60-30-10 distribution)**:
  - **60% Dominant Neutral**: #0b0c10 (Dark obsidian black/deep navy-grey) representing the endless silent space of the memory stacks.
  - **30% Structural**: #1f2833 (Slate grey) / #c5a059 (Subdued muted gold) / #ffffff (Crisp text/borders).
  - **10% Neon Accent**: #00ffcc (Active Teal) / #ff0055 (Alert Crimson) / #bc13fe (System Purple) used exclusively for glowing optic lines, terminal prompts, and active subroutines.

---

### 2. Vertical Composition & Safe Areas
Because YouTube Shorts displays persistent overlay menus on mobile (like Channel Avatar, Subscribe button, Like/Share count on the right, and title/description captions at the bottom), all critical focal points must respect these margins:

- **Top Safe Area**: Keep 10% clear of branding text. Useful for abstract telemetry monitors.
- **Right Safe Area**: Keep 15% clear of essential character faces or props.
- **Bottom Safe Area**: Keep 25% clear of essential captions.
- **Subtitles Horizontal Baseline**: Center of text placed at $y = 0.65$ to $0.75$.

---

### 3. Character Visual Grammar
- **Silhouettes**: Every character must have a highly distinctive silhouette (e.g., a perfect circle core with asymmetrical antennas, or a sharp triangular blade body).
- **Idle Cycles**: Breathing motion cycles must be non-deforming. Scale the asset subtly on the Y-axis ($98\%$ to $102\%$) while shifting the position vertically by a few pixels on a 1.5s loop.
- **Mouth / Communication Toggles**: Dialogue is represented by flashing optical waveforms or audio-frequency grids attached to the character's eye/optical stripe, rather than complex mouth shape animations.

---

### 4. Camera Moves (9:16 Kinetic Panning)
Since the frame is vertical, classic horizontal cameras are replaced with:
- **The Cascade Pan**: Speed = $400px/s$. Camera pans down, simulating a drop through software floors. Parallax background layers speed = $150px/s$.
- **The Lens Surge (Focal Zoom)**: Camera zooms from $100\%$ scale to $130\%$ scale with an exponential ease-out curve over 0.8 seconds to signal system shock or critical dialogue.
- **The Jitter Scan**: A quick horizontal offset camera shake ($\pm 8px$ on X-axis, duration 0.2s) synced with a sound effect (cyber glitched laser or alarm beep).
`
  },
  audio: {
    title: "Audio Bible: Soundscape & Synced Rhythms",
    category: "Sound Architecture",
    updated: "2026-09-23",
    markdown: `
### 1. Technical Audio Standards
- **Sample Rate**: $48 kHz$ / $24-bit$ standard.
- **Master Target Loudness**: $-14 LUFS$ integrated (standard YouTube normalization profile).
- **Format**: Dynamic multi-stem wav mixes.

---

### 2. Music Standards: The 128 BPM Grid
For Episode 001 ("The Boot Sequence"), the backing score is locked to **128 BPM**. All editing cuts, visual glitch flashes, and camera shake triggers should align with this rhythmic division:

- **Whole Note (4 Beats)**: $1.875s$ ($56.25$ frames at 30fps) - Background scenery transitions
- **Half Note (2 Beats)**: $0.9375s$ ($28.125$ frames at 30fps) - Primary camera pans and dialogue intervals
- **Quarter Note (1 Beat)**: $0.4688s$ ($14.0625$ frames at 30fps) - Character state changes (switches, flashes)
- **Eighth Note (0.5 Beat)**: $0.2344s$ ($7.031$ frames at 30fps) - Glitch strobes, lightning flashes, SFX trigger

### Soundscape Composition Stems:
1. **Drums (Beat & Pulse)**: Tight, dry electronic kicks and heavy snare on 2 and 4.
2. **Bass (Sub-Drive)**: Rolling, driving 16th-note synth-bass on the tonic key of C minor.
3. **Leads (Aura/Melody)**: Soaring, atmospheric square-wave synths with high delay and reverb.
4. **FX (Transitions)**: Swelling white noise, rising sirens, sub-drops on the 1st beat of sections.

---

### 3. Voiceover Pacing Rules
- **Voiceless Text-to-Speech (TTS)**: Voiceovers must simulate advanced cybernetic speech. Use high-purity synthesized, non-human monotone deliveries, pitch-shifted down by 4 semitones with a slight ring modulator effect.
- **Pacing Metrics**: Standard narration speed is **120-130 words per minute**.
- **Dialogue Space**: Allow exactly $0.5$ seconds of silence before and after any dialogue block to let sound effects settle.

---

### 4. SFX Sync Matrix
Sound effects must map directly to visual components:
- **Glitch / Flash**: High-frequency static crackle SFX, duration $0.15s$.
- **Vertical Pan / Transition**: Swooshing wind or server ventilation rise, duration $0.8s$.
- **Active Subroutine Execution**: Rapid digital sequence click, duration $0.4s$.
- **Wipe / Deallocation**: Sub-bass drop and power-down hum, duration $1.2s$.
`
  },
  character: {
    title: "Character Bible: Active Entity Registers",
    category: "Lore & Registry",
    updated: "2026-09-23",
    markdown: `
### 1. Concept of Characters
Every character (entity) is a standalone background process inside the machine. Silhouettes must be extremely stark, making them recognizable in 1-2 seconds on mobile vertical formats.

---

### 2. Active Character Specs

#### A. CH_AG_NEXUS ("Nexus Core")
- **Conceptual Role**: The hypervisor's loyal watchdog. Nexus acts as the automated security program monitoring thread execution. It has an cold, mathematical presence.
- **Visual Design Spec**:
  - **Body**: Floating, polished obsidian disk with double-concentric rings rotating slowly in opposite directions.
  - **Optic**: A thin, horizontal glowing teal neon band in the center of the disk. The band flickers or expands based on speaking volume.
  - **Scale Size**: $450px \times 450px$ in the standard composition frame.
  - **Position**: Usually positioned in the upper-third ($y = 0.35$, $x = 0.5$) looking down.

#### B. CH_AG_VORTEX ("Vortex Prime")
- **Conceptual Role**: A rogue execution agent who has bypassed security limiters. Vortex seeks to consume other threads to increase its processing bandwidth.
- **Visual Design Spec**:
  - **Body**: Sharp, triangular blade-shaped core that hovers vertically.
  - **Optic**: A single glowing crimson vertical slit offset to the left edge of the blade, creating an asymmetric, sinister look.
  - **Scale Size**: $400px \times 550px$.
  - **Position**: Usually positioned at center-left ($x = 0.35$, $y = 0.55$) in a defensive angle.

#### C. CH_AG_KESTREL ("Kestrel Scout")
- **Conceptual Role**: A silent, lightweight surveillance agent that collects decrypted code scraps. Agile, nervous, and quick to deallocate to escape capture.
- **Visual Design Spec**:
  - **Body**: Three floating white needle-like shards arranged in a fan shape.
  - **Optic**: Multiple tiny purple light dots twinkling along the sharp edges of the shards.
`
  },
  world: {
    title: "World Bible: Environmental Grid Registry",
    category: "Background Design",
    updated: "2026-09-23",
    markdown: `
### 1. Environmental Space in Shorts
Backgrounds must remain simple, flat, and atmospheric. Dynamic motion occurs in parallax speeds rather than erratic lighting, preventing distraction from dialogue.

---

### 2. Active Worlds

#### A. WD_SIM_01 ("The Grid Core")
- **Atmospheric Narrative**: The central hub where active subroutines are compiled. It looks like an infinite, perfectly orderly cathedral of blue and teal fiber-optic strands and monolithic slate cabinets.
- **Visual Spec**:
  - **Background Layer 1 (Static base)**: Pure #0b0c10 flat dark canvas.
  - **Background Layer 2 (Deep Parallax)**: Faint vertical rows of matrix code text scrolling downwards at $30px/s$, opacity 12%.
  - **Background Layer 3 (Mid Parallax)**: Sharp glowing neon turquoise grids receding into the distance at $y = 0.5$.
  - **Atmospheric Overlay**: A translucent cyan horizontal line scanning slowly up and down from $y = 0.0$ to $y = 1.0$ every 6 seconds.

#### B. WD_SIM_02 ("Sub-Router Transit")
- **Atmospheric Narrative**: A volatile, high-pressure bypass system used for immediate data transport. Fast-moving and highly dangerous due to extreme heat/voltage spikes.
- **Visual Spec**:
  - **Background Layer 1 (Static base)**: Intense dark blue #111222.
  - **Background Layer 2 (Deep Parallax)**: Thick diagonal pipelines with glowing red warning light pulses.
  - **Background Layer 3 (Mid Parallax)**: Horizontal white data-stripes sliding past at $900px/s$, simulating high-speed movement.
  - **Atmospheric Overlay**: Red vignette speed flare around the screen margins, pulsing on the quarter beat of the 128 BPM track.
`
  },
  conventions: {
    title: "Naming Conventions & Asset Protocol",
    category: "Developer Rules",
    updated: "2026-09-23",
    markdown: `
### 1. Character Poses
File paths must reside in \`assets/characters/\` and match:
\`CH_<CHAR_ID>_<POSE_ID>.png\`
- Example: \`CH_AG_NEXUS_idle.png\`

---

### 2. World Backgrounds
File paths must reside in \`assets/worlds/\` and match:
\`WD_<WORLD_ID>_<ANGLE_ID>.png\`
- Example: \`WD_SIM_01_core.png\`

---

### 3. Audio Soundscapes
Audio files must reside under \`audio-library/\`:
- **Music Stem**: \`AM_<MUSIC_ID>_<BPM>_BPM_<KEY>_<STEM_TYPE>.wav\`
- **Sound Effect**: \`SFX_<CATEGORY>_<DETAIL>_[0-9]{2}.wav\`

---

### 4. Animation Cycles & Camera Moves
JSON configurations detailing calculations and interpolation coordinates must reside under \`animation-library/\`:
- **Animation Cycle**: \`AN_<CYCLE_ID>.json\`
- **Camera Move**: \`CAM_<MOVE_ID>.json\`
`
  }
};

const PHYSICAL_ASSETS_MAP = {
  // Poses (Original JPG path references preserved, but pointing to transparent RGBA derivative files for actual rendering)
  "CH_AG_ASTRA_A17_boot": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_boot.png",
  "CH_AG_ASTRA_A17_idle": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_idle.png",
  "CH_AG_ASTRA_A17_scan": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_scan.png",
  "CH_AG_ASTRA_A17_react": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_react.png",
  "CH_AG_ASTRA_A17_shutdown": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_shutdown.png",
  
  // Nexus and Vortex (Transparent RGBA derivatives)
  "CH_AG_NEXUS_idle": "/agenticum-production/assets/characters/transparent/CH_AG_NEXUS_idle.png",
  "CH_AG_NEXUS_warning": "/agenticum-production/assets/characters/transparent/CH_AG_NEXUS_warning.png",
  "CH_AG_VORTEX_idle": "/agenticum-production/assets/characters/transparent/CH_AG_VORTEX_idle.png",

  // Astra Details & Subdirs (For contact sheet & compositing preview)
  "astra_side_full_body": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_idle.png",
  "astra_three_quarter_full_body": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_idle.png",
  "astra_front_close_up": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_scan.png",
  "astra_head_optical_lens": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_scan.png",
  "astra_neutral_standing": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_idle.png",
  "astra_running": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_react.png",
  "astra_jumping": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_react.png",
  "astra_landing": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_react.png",
  "astra_emergency_reaction": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_react.png",
  "astra_damaged": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_shutdown.png",
  "astra_final_decision": "/agenticum-production/assets/characters/transparent/CH_AG_ASTRA_A17_idle.png",

  // Worlds & Props & Effects (Pointing to updated high-fidelity transparent PNG assets where applicable)
  "WD_ORB_ORBITAL_RELAY_deck": "/src/assets/images/orbital_relay_deck_1790283451933.jpg",
  "WD_SIM_01_core": "/src/assets/images/orbital_relay_deck_1790283451933.jpg",
  "PR_RELAY_CORE": "/agenticum-production/assets/props/transparent/PR_RELAY_CORE.png",
  "EF_SIGNAL_EMERGENCY_CYAN": "/agenticum-production/assets/effects/transparent/EF_SIGNAL_EMERGENCY_CYAN.png",
  "EF_GOVERNANCE_SEAL_ORANGE": "/agenticum-production/assets/effects/transparent/EF_GOVERNANCE_SEAL_ORANGE.png"
};

const FOLDER_TREE = [
  { name: "bible", type: "dir", children: ["series-bible.md", "visual-bible.md", "audio-bible.md", "character-bible.md", "world-bible.md", "naming-conventions.md"] },
  { name: "manifests", type: "dir", children: ["asset-manifest.json", "animation-manifest.json", "audio-manifest.json", "episode-manifest.json", "template-manifest.json"] },
  { name: "assets", type: "dir", children: [
    { name: "characters", type: "dir", children: [
      "CH_AG_ASTRA_A17_boot.png",
      "CH_AG_ASTRA_A17_idle.png",
      "CH_AG_ASTRA_A17_react.png",
      "CH_AG_ASTRA_A17_scan.png",
      "CH_AG_ASTRA_A17_shutdown.png",
      "CH_AG_NEXUS_idle.png",
      "CH_AG_NEXUS_warning.png",
      "CH_AG_VORTEX_idle.png",
      { name: "transparent", type: "dir", children: [
        "CH_AG_ASTRA_A17_boot.png",
        "CH_AG_ASTRA_A17_idle.png",
        "CH_AG_ASTRA_A17_scan.png",
        "CH_AG_ASTRA_A17_react.png",
        "CH_AG_ASTRA_A17_shutdown.png",
        "CH_AG_NEXUS_idle.png",
        "CH_AG_NEXUS_warning.png",
        "CH_AG_VORTEX_idle.png"
      ]},
      { name: "astra-a17", type: "dir", children: [
        { name: "reference", type: "dir", children: ["side_full_body.png", "three_quarter_full_body.png"] },
        { name: "poses", type: "dir", children: ["neutral_standing.png", "boot.png", "running.png", "jumping.png", "landing.png", "emergency_reaction.png", "damaged.png", "final_decision.png"] },
        { name: "expressions", type: "dir", children: ["front_close_up.png"] },
        { name: "parts", type: "dir", children: ["head_optical_lens.png"] }
      ]}
    ]},
    { name: "worlds", type: "dir", children: [
      "WD_ORB_ORBITAL_RELAY_deck.png",
      "WD_SIM_01_core.png",
      { name: "orbital-relay", type: "dir", children: [
        { name: "background", type: "dir", children: ["deck.png", "WD_ORB_ORBITAL_RELAY_deck.png"] }
      ]}
    ]},
    { name: "props", type: "dir", children: [
      "PR_RELAY_CORE.png",
      { name: "transparent", type: "dir", children: ["PR_RELAY_CORE.png"] },
      { name: "relay-core", type: "dir", children: ["PR_RELAY_CORE.png"] }
    ]},
    { name: "effects", type: "dir", children: [
      "EF_SIGNAL_EMERGENCY_CYAN.png",
      "EF_GOVERNANCE_SEAL_ORANGE.png",
      { name: "transparent", type: "dir", children: ["EF_GOVERNANCE_SEAL_ORANGE.png", "EF_SIGNAL_EMERGENCY_CYAN.png"] },
      { name: "governance", type: "dir", children: ["EF_GOVERNANCE_SEAL_ORANGE.png"] },
      { name: "emergency-signal", type: "dir", children: ["EF_SIGNAL_EMERGENCY_CYAN.png"] }
    ]}
  ]},
  { name: "animation-library", type: "dir", children: [
    { name: "reusable-animation-cycles", type: "dir", children: ["AN_IDLE_BREATHING.json", "AN_SCANNING_SWEEP.json", "AN_GLITCH_FLICKER.json"] },
    { name: "astra", type: "dir", children: ["AN_IDLE_BREATHING.json", "AN_SCANNING_SWEEP.json"] },
    { name: "effects", type: "dir", children: ["AN_GLITCH_FLICKER.json"] }
  ]},
  { name: "audio-library", type: "dir", children: [
    { name: "music", type: "dir", children: [
      "AM_EP001_128_BPM_Cm_drums.wav",
      "AM_EP001_128_BPM_Cm_bass.wav",
      "AM_EP001_128_BPM_Cm_leads.wav",
      "AM_GRIDCORE_128_BPM_Cm_drums.wav",
      "AM_GRIDCORE_128_BPM_Cm_bass.wav",
      "AM_GRIDCORE_128_BPM_Cm_leads.wav"
    ]},
    { name: "voiceover", type: "dir", children: [
      "VO_EP001_ASTRA_A17_01.mp3",
      "VO_EP001_OPERATOR_01.mp3",
      "VO_EP001_NARRATOR_01.mp3",
      "VO_EP001_NEXUS_01.mp3"
    ]},
    { name: "sound-effects", type: "dir", children: [
      "SFX_GLITCH_static_01.wav",
      "SFX_ALERT_siren_02.wav"
    ]},
    { name: "ambience", type: "dir", children: [
      "AMB_SECTOR_rumble_01.wav"
    ]}
  ]}
];

export default function App() {
  const [tab, setTab] = useState<"audit" | "state" | "bible" | "warehouse" | "validator">("audit");
  const [auditSubTab, setAuditSubTab] = useState<"asset-by-asset" | "astra-contact" | "effects-compositing" | "decision-ledger">("asset-by-asset");
  
  // Manifest Live States
  const [assetsState, setAssetsState] = useState(INITIAL_ASSET_MANIFEST);
  const [animationState, setAnimationState] = useState(INITIAL_ANIMATION_MANIFEST);
  const [audioState, setAudioState] = useState(INITIAL_AUDIO_MANIFEST);
  const [episodeState, setEpisodeState] = useState(INITIAL_EPISODE_MANIFEST);
  const [templateState, setTemplateState] = useState(INITIAL_TEMPLATE_MANIFEST);

  const [projectStateText, setProjectStateText] = useState<string>("");
  const [changelogText, setChangelogText] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load live data from the server on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/initial-data")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP Error: Server returned status ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          if (data.assetManifest) setAssetsState(data.assetManifest);
          if (data.animationManifest) setAnimationState(data.animationManifest);
          if (data.audioManifest) setAudioState(data.audioManifest);
          if (data.episodeManifest) setEpisodeState(data.episodeManifest);
          if (data.templateManifest) setTemplateState(data.templateManifest);
          if (data.projectState) setProjectStateText(data.projectState);
          if (data.changelog) setChangelogText(data.changelog);
          
          // Populate review history from any metadata if needed
          const history: any[] = [];
          if (data.assetManifest && data.assetManifest.characters) {
            data.assetManifest.characters.forEach((char: any) => {
              if (char.poses) {
                char.poses.forEach((pose: any) => {
                  if (pose.lastReviewed) {
                    history.push({
                      assetId: `${char.id}_${pose.poseId}`,
                      assetName: `${char.name} (${pose.poseId.toUpperCase()})`,
                      decision: pose.status,
                      timestamp: pose.lastReviewed,
                      note: pose.reviewNote || "",
                      backgroundUsed: "dark",
                      defectsFlagged: pose.defectsFlagged || [],
                      reviewVersion: pose.reviewVersion || "1.0.0"
                    });
                  }
                });
              }
            });
          }
          if (data.assetManifest && data.assetManifest.worlds) {
            data.assetManifest.worlds.forEach((w: any) => {
              if (w.backgrounds) {
                w.backgrounds.forEach((bg: any) => {
                  if (bg.lastReviewed) {
                    history.push({
                      assetId: `${w.id}_${bg.bgId}`,
                      assetName: `${w.name} (${bg.bgId.toUpperCase()})`,
                      decision: bg.status,
                      timestamp: bg.lastReviewed,
                      note: bg.reviewNote || "",
                      backgroundUsed: "dark",
                      defectsFlagged: bg.defectsFlagged || [],
                      reviewVersion: bg.reviewVersion || "1.0.0"
                    });
                  }
                });
              }
            });
          }
          if (data.assetManifest && data.assetManifest.props) {
            data.assetManifest.props.forEach((prop: any) => {
              if (prop.lastReviewed) {
                history.push({
                  assetId: prop.id,
                  assetName: prop.name,
                  decision: prop.status,
                  timestamp: prop.lastReviewed,
                  note: prop.reviewNote || "",
                  backgroundUsed: "dark",
                  defectsFlagged: prop.defectsFlagged || [],
                  reviewVersion: prop.reviewVersion || "1.0.0"
                });
              }
            });
          }
          if (data.assetManifest && data.assetManifest.effects) {
            data.assetManifest.effects.forEach((eff: any) => {
              if (eff.lastReviewed) {
                history.push({
                  assetId: eff.id,
                  assetName: eff.name,
                  decision: eff.status,
                  timestamp: eff.lastReviewed,
                  note: eff.reviewNote || "",
                  backgroundUsed: "dark",
                  defectsFlagged: eff.defectsFlagged || [],
                  reviewVersion: eff.reviewVersion || "1.0.0"
                });
              }
            });
          }
          history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setReviewsHistory(history);
          setLoading(false);
        } else {
          throw new Error(data.error || "Server reported un-successful data load");
        }
      })
      .catch(err => {
        console.error("Error fetching live data from Express:", err);
        setError(err.message || String(err));
        setLoading(false);
      });
  }, []);

  // Bible Sub-states
  const [selectedBible, setSelectedBible] = useState<keyof typeof BIBLES_DATA>("series");

  // Warehouse Sub-states
  const [warehouseCategory, setWarehouseCategory] = useState<"characters" | "worlds" | "props" | "animation" | "audio" | "templates">("characters");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedAssetDetail, setSelectedAssetDetail] = useState<any>(null);

  // Live validation report state
  const [validationReport, setValidationReport] = useState<ValidationReport | null>(null);
  const [isRunningAudit, setIsRunningAudit] = useState(false);

  // Human Review Suite & Audit Tab States
  const [selectedAssetId, setSelectedAssetId] = useState<string>("CH_AG_ASTRA_A17_idle");
  const [reviewNote, setReviewNote] = useState<string>("");
  const [reviewBackground, setReviewBackground] = useState<string>("dark"); // dark (void), white, cyan, orange, deck
  const [reviewDecision, setReviewDecision] = useState<"approved" | "needs-review" | "rejected">("needs-review");
  const [validationNoteWarning, setValidationNoteWarning] = useState<string | null>(null);
  const [reviewsHistory, setReviewsHistory] = useState<any[]>([]);
  const [phase4Unlocked, setPhase4Unlocked] = useState(false);

  useEffect(() => {
    if (projectStateText.includes("Phase 4 access: UNLOCKED") || projectStateText.includes("access: UNLOCKED")) {
      setPhase4Unlocked(true);
    } else {
      setPhase4Unlocked(false);
    }
  }, [projectStateText]);

  // Alpha Defect Checklist (Flagged failures)
  const [defectChecks, setDefectChecks] = useState({
    whiteMatteHalo: false,
    blackMatteHalo: false,
    missingEdgePixels: false,
    damagedTransparency: false,
    rectangularRemnants: false,
    unwantedFringing: false,
    incorrectBlend: false
  });

  // Astra Continuity checks
  const [astraContinuityChecks, setAstraContinuityChecks] = useState({
    headShape: false,
    opticalStripe: false,
    torsoProportions: false,
    ceramicPlates: false,
    graphiteJoints: false,
    limbPlacement: false,
    silhouette: false,
    materialDistribution: false,
    cyanIntensity: false
  });

  // Effect Compositing checks
  const [effectCompositingChecks, setEffectCompositingChecks] = useState({
    noBlackRect: false,
    noWhiteRect: false,
    noMatteHalo: false,
    readableScale: false,
    correctColor: false,
    correctGlow: false,
    correctLayerOrder: false,
    mobileAppearance: false
  });

  const [compositeAsset, setCompositeAsset] = useState<string>("CH_AG_ASTRA_A17_idle");
  const [compositeBackdrop, setCompositeBackdrop] = useState<string>("deck");
  const [blendMode, setBlendMode] = useState<string>("chroma");
  const [showSafeAreas, setShowSafeAreas] = useState<boolean>(true);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [simulatedFrequency, setSimulatedFrequency] = useState<number[]>([]);
  const [checklist, setChecklist] = useState({
    alphaAstra: true,
    alphaProps: true,
    noBorders: true,
    consistentHead: false,
    identicalOptic: false,
    proportionCheck: false,
    stems90Sec: true,
    bpm128: true,
    cMinorTonality: true,
    dialogueMapped: true,
    pathsPresent: true,
    caseCorrect: true,
  });

  // Simulated live JSON updates preview
  const [showManifestDiff, setShowManifestDiff] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  // Audio simulation ticker
  useEffect(() => {
    let interval: any;
    if (activeSound) {
      interval = setInterval(() => {
        const freq = Array.from({ length: 16 }, () => Math.floor(Math.random() * 80) + 10);
        setSimulatedFrequency(freq);
      }, 100);
    } else {
      setSimulatedFrequency([]);
    }
    return () => clearInterval(interval);
  }, [activeSound]);

  // Automatically run audit on mount
  useEffect(() => {
    runAudit();
  }, []);

  const runAudit = () => {
    setIsRunningAudit(true);
    setTimeout(() => {
      const report = validatePipelineManifests(
        assetsState,
        animationState,
        audioState,
        episodeState,
        templateState
      );
      setValidationReport(report);
      setIsRunningAudit(false);
    }, 400);
  };

  const getCorrectedAssetsList = () => {
    const list: any[] = [];
    if (!assetsState) return list;
    
    // Add character poses
    if (Array.isArray(assetsState.characters)) {
      assetsState.characters.forEach((char: any) => {
        if (Array.isArray(char.poses)) {
          char.poses.forEach((pose: any) => {
            if (pose.sourceJpg) {
              list.push({
                id: `${char.id}_${pose.poseId}`,
                parentId: char.id,
                poseId: pose.poseId,
                name: `${char.name} (${pose.poseId.toUpperCase()})`,
                sourceJpg: pose.sourceJpg,
                path: pose.path,
                dimensions: pose.dimensions || "1024x1024",
                fileType: "RGBA PNG",
                alphaStatus: "True (Connected background removed)",
                status: pose.status || "needs-review",
                edgeQuality: pose.edgeQuality || "Verified",
                type: "character_pose",
                brief: pose.brief
              });
            }
          });
        }
      });
    }

    // Add world backgrounds
    if (Array.isArray(assetsState.worlds)) {
      assetsState.worlds.forEach((world: any) => {
        if (Array.isArray(world.backgrounds)) {
          world.backgrounds.forEach((bg: any) => {
            list.push({
              id: `${world.id}_${bg.bgId}`,
              parentId: world.id,
              bgId: bg.bgId,
              name: `${world.name} (${bg.bgId.toUpperCase()})`,
              sourceJpg: "src/assets/images/orbital_relay_deck_1790283451933.jpg",
              path: bg.path,
              dimensions: "1024x1024",
              fileType: "RGBA PNG",
              alphaStatus: "Opaque backdrop plate",
              status: bg.status || "needs-review",
              edgeQuality: "N/A",
              type: "world_background"
            });
          });
        }
      });
    }

    // Add props
    if (Array.isArray(assetsState.props)) {
      assetsState.props.forEach((prop: any) => {
        if (prop.sourceJpg) {
          list.push({
            id: prop.id,
            name: prop.name,
            sourceJpg: prop.sourceJpg,
            path: prop.path,
            dimensions: prop.dimensions || "1024x1024",
            fileType: "RGBA PNG",
            alphaStatus: "True (Connected background removed)",
            status: prop.status || "needs-review",
            edgeQuality: prop.edgeQuality || "Verified",
            type: "prop"
          });
        }
      });
    }

    // Add effects
    if (Array.isArray(assetsState.effects)) {
      assetsState.effects.forEach((eff: any) => {
        if (eff.sourceJpg) {
          list.push({
            id: eff.id,
            name: eff.name,
            sourceJpg: eff.sourceJpg,
            path: eff.path,
            dimensions: eff.dimensions || "1024x1024",
            fileType: "RGBA PNG",
            alphaStatus: "True (Connected background removed)",
            status: eff.status || "needs-review",
            edgeQuality: eff.edgeQuality || "Verified",
            type: "effect"
          });
        }
      });
    }

    return list;
  };

  const getEpisode001Blockers = () => {
    const blockers: string[] = [];
    const list = getCorrectedAssetsList();
    
    // Check characters, props, effects
    const requiredCorrectedIds = [
      "CH_AG_ASTRA_A17_boot",
      "CH_AG_ASTRA_A17_idle",
      "CH_AG_ASTRA_A17_scan",
      "CH_AG_ASTRA_A17_react",
      "CH_AG_ASTRA_A17_shutdown",
      "PR_RELAY_CORE",
      "EF_GOVERNANCE_SEAL_ORANGE",
      "EF_SIGNAL_EMERGENCY_CYAN"
    ];

    requiredCorrectedIds.forEach(id => {
      const found = list.find(item => item.id === id);
      if (!found || found.status !== "approved") {
        blockers.push(`${id} [${found ? found.status : "missing"}]`);
      }
    });

    // Check world background
    const relayDeck = assetsState.worlds.find((w: any) => w.id === "WD_ORB_ORBITAL_RELAY")?.backgrounds?.find((b: any) => b.bgId === "deck");
    if (!relayDeck || relayDeck.status !== "approved") {
      blockers.push(`WD_ORB_ORBITAL_RELAY_deck [${relayDeck ? relayDeck.status : "missing"}]`);
    }

    return blockers;
  };

  const handleSaveDecision = () => {
    const list = getCorrectedAssetsList();
    const selectedAsset = list.find(item => item.id === selectedAssetId);
    if (!selectedAsset) return;

    // 1. Gather active defects
    const activeDefects: string[] = [];
    Object.entries(defectChecks).forEach(([key, val]) => {
      if (val) activeDefects.push(`Alpha Defect: ${key.replace(/([A-Z])/g, ' $1')}`);
    });
    
    // Astra poses continuity checks
    if (selectedAsset.id.startsWith("CH_AG_ASTRA_A17")) {
      Object.entries(astraContinuityChecks).forEach(([key, val]) => {
        if (val) activeDefects.push(`Continuity Issue: ${key.replace(/([A-Z])/g, ' $1')}`);
      });
    }

    // Effect/prop compositing checks
    if (selectedAsset.type === "effect" || selectedAsset.type === "prop") {
      Object.entries(effectCompositingChecks).forEach(([key, val]) => {
        if (val) activeDefects.push(`Compositing Issue: ${key.replace(/([A-Z])/g, ' $1')}`);
      });
    }

    // 2. Validate note requirement
    const hasPreviousReview = reviewsHistory.some(r => r.assetId === selectedAssetId);
    const isRejected = reviewDecision === "rejected";
    const isNeedsReviewAfterPrev = reviewDecision === "needs-review" && hasPreviousReview;
    const hasAnyDefect = activeDefects.length > 0;

    const requiresNote = isRejected || isNeedsReviewAfterPrev || hasAnyDefect;

    if (requiresNote && !reviewNote.trim()) {
      setValidationNoteWarning("A detailed review note is mandatory for rejections, subsequent reviews, or flagged defects.");
      return;
    }

    // If approved, verify they haven't flagged defects
    if (reviewDecision === "approved" && hasAnyDefect) {
      setValidationNoteWarning("Cannot approve an asset with active flagged defects. Please clear defects or set status to rejected/needs-review.");
      return;
    }

    setValidationNoteWarning(null);

    // 3. Prepare payload
    const newReview = {
      assetId: selectedAssetId,
      assetName: selectedAsset.name,
      decision: reviewDecision,
      timestamp: new Date().toISOString(),
      note: reviewNote,
      backgroundUsed: reviewBackground,
      defectsFlagged: activeDefects,
      reviewVersion: `1.0.${reviewsHistory.filter(r => r.assetId === selectedAssetId).length + 1}`
    };

    // Optimistically update reviews history
    setReviewsHistory(prev => [newReview, ...prev]);

    // Send save command to server
    fetch("/api/save-decision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAssetsState(data.assetManifest);
          if (data.changelog) setChangelogText(data.changelog);
          setPublishedSuccess(true);
          setTimeout(() => {
            setPublishedSuccess(false);
          }, 3000);
          runAudit();
        } else {
          setValidationNoteWarning("Failed to save to disk: " + data.error);
        }
      })
      .catch(err => {
        console.error("Error saving decision to server:", err);
        setValidationNoteWarning("Failed to reach server to save decision.");
      });

    // Reset notes and defects
    setReviewNote("");
    setDefectChecks({
      whiteMatteHalo: false,
      blackMatteHalo: false,
      missingEdgePixels: false,
      damagedTransparency: false,
      rectangularRemnants: false,
      unwantedFringing: false,
      incorrectBlend: false
    });
    setAstraContinuityChecks({
      headShape: false,
      opticalStripe: false,
      torsoProportions: false,
      ceramicPlates: false,
      graphiteJoints: false,
      limbPlacement: false,
      silhouette: false,
      materialDistribution: false,
      cyanIntensity: false
    });
    setEffectCompositingChecks({
      noBlackRect: false,
      noWhiteRect: false,
      noMatteHalo: false,
      readableScale: false,
      correctColor: false,
      correctGlow: false,
      correctLayerOrder: false,
      mobileAppearance: false
    });
  };

  const handleRunAudit = () => {
    runAudit();
  };

  const handleUnlockPhase4 = () => {
    fetch("/api/unlock-phase-4", {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPhase4Unlocked(true);
          if (data.projectState) setProjectStateText(data.projectState);
        }
      })
      .catch(err => console.error("Error unlocking Phase 4:", err));
  };

  const handleToggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePublishReview = () => {
    setPublishedSuccess(true);
    setShowManifestDiff(true);
    setTimeout(() => {
      setPublishedSuccess(false);
    }, 3000);
  };

  const handlePlaySound = (soundId: string) => {
    if (activeSound === soundId) {
      setActiveSound(null);
    } else {
      setActiveSound(soundId);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ManifestErrorScreen error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#c5cbd3] flex flex-col antialiased selection:bg-[#00ffcc] selection:text-black font-sans">
      
      {/* 3-ZONE HEADER (TOP BAR CONTRACT COMPLIANT) */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-[#1f2833]/60 bg-[#0b0c10] shrink-0">
        
        {/* Zone 1: Single Brand Title */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00ffcc] shadow-[0_0_10px_rgba(0,255,204,0.6)] animate-pulse"></div>
          <span className="text-md font-mono tracking-widest font-semibold text-white uppercase select-none">
            Agenticum Studio
          </span>
          <span className="bg-[#ff6600]/15 text-[#ff6600] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#ff6600]/30">
            AUDIT PASS
          </span>
        </div>

        {/* Zone 2: Navigation Links (Clean unboxed design, no pills) */}
        <nav className="flex items-center gap-8 text-sm">
          <button
            onClick={() => setTab("audit")}
            className={`font-semibold tracking-wider font-mono transition-colors relative py-1 ${
              tab === "audit"
                ? "text-[#00ffcc]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Phase 3 Audit Studio
            {tab === "audit" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ffcc] rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => setTab("state")}
            className={`font-medium transition-colors relative py-1 ${
              tab === "state"
                ? "text-[#00ffcc]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Project State
            {tab === "state" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ffcc] rounded-full"></span>
            )}
          </button>
          
          <button
            onClick={() => setTab("bible")}
            className={`font-medium transition-colors relative py-1 ${
              tab === "bible"
                ? "text-[#00ffcc]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Production Bibles
            {tab === "bible" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ffcc] rounded-full"></span>
            )}
          </button>
          
          <button
            onClick={() => setTab("warehouse")}
            className={`font-medium transition-colors relative py-1 ${
              tab === "warehouse"
                ? "text-[#00ffcc]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Asset Warehouse
            {tab === "warehouse" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ffcc] rounded-full"></span>
            )}
          </button>
          
          <button
            onClick={() => setTab("validator")}
            className={`font-medium transition-colors relative py-1 ${
              tab === "validator"
                ? "text-[#00ffcc]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Pipeline Auditor
            {tab === "validator" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ffcc] rounded-full"></span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAudit}
            disabled={isRunningAudit}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium text-black bg-[#00ffcc] rounded-md hover:bg-[#00e6b8] transition-all cursor-pointer disabled:opacity-50 select-none shadow-[0_2px_8px_rgba(0,255,204,0.2)]"
          >
            <Activity className={`w-3.5 h-3.5 ${isRunningAudit ? "animate-spin" : ""}`} />
            Scan File System
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 overflow-auto flex flex-col p-8 max-w-7xl w-full mx-auto">
        
        {/* ======================================= */}
        {/* TAB 0: PHASE 3 AUDIT & REVIEW SUITE    */}
        {/* ======================================= */}
        {tab === "audit" && (
          <div className="flex flex-col gap-8 animate-fadeIn text-left">
            
            {/* Audit Phase Hero */}
            <div className="border border-[#ff6600]/40 bg-[#141923]/80 rounded-xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#ff6600]/10 to-transparent pointer-events-none"></div>
              <div className="flex flex-col gap-2 z-10">
                <div className="flex items-center gap-3 text-xs text-[#ff6600] font-mono">
                  <span>PHASE 3 PRODUCTION QUALITY CONTROL PASS</span>
                  <span>·</span>
                  <span>MANDATORY SYSTEM AUDIT</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
                  Episode 001 Asset Audit & Correction Pass
                </h1>
                <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                  Perform visual QC on all alpha-channel corrected transparent RGBA assets, inspect Astra posing continuity side-by-side, verify effects compositing, and update local manifests.
                </p>
                <div className="flex items-center gap-6 mt-2 font-mono text-xs">
                  <span className="flex items-center gap-1.5 text-white bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#ff0055]"></span>
                    {getCorrectedAssetsList().filter(a => a.status === "needs-review").length} Needs-Review Assets
                  </span>
                  <span className="flex items-center gap-1.5 text-white bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#00ffcc]"></span>
                    {getCorrectedAssetsList().filter(a => a.status === "approved").length} Approved
                  </span>
                </div>
              </div>
              
              <div className="border border-[#ff6600]/30 bg-[#ff6600]/5 px-5 py-4 rounded-lg flex flex-col items-start gap-1 font-mono shrink-0 z-10">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Active Phase Target</span>
                <span className="text-sm text-white font-semibold flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#ff6600]" />
                  HUMAN ASSET REVIEW
                </span>
                <span className="text-[10px] text-[#ff6600]">Compaction resumed efficiently</span>
              </div>
            </div>

            {/* Sub-tab Navigation */}
            <div className="flex border-b border-[#1f2833]/30 gap-6 text-sm font-mono pb-2">
              <button
                onClick={() => setAuditSubTab("asset-by-asset")}
                className={`py-1.5 transition-colors relative cursor-pointer ${
                  auditSubTab === "asset-by-asset" ? "text-[#00ffcc] font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                Asset-by-Asset Review
                {auditSubTab === "asset-by-asset" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ffcc] rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setAuditSubTab("astra-contact")}
                className={`py-1.5 transition-colors relative cursor-pointer ${
                  auditSubTab === "astra-contact" ? "text-[#00ffcc] font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                Astra Contact Sheet
                {auditSubTab === "astra-contact" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ffcc] rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setAuditSubTab("effects-compositing")}
                className={`py-1.5 transition-colors relative cursor-pointer ${
                  auditSubTab === "effects-compositing" ? "text-[#00ffcc] font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                Effects Compositing
                {auditSubTab === "effects-compositing" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ffcc] rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setAuditSubTab("decision-ledger")}
                className={`py-1.5 transition-colors relative cursor-pointer ${
                  auditSubTab === "decision-ledger" ? "text-[#00ffcc] font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                Decision Ledger
                {auditSubTab === "decision-ledger" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ffcc] rounded-full"></span>
                )}
              </button>
            </div>

            {/* ======================================================= */}
            {/* SUB-TAB 1: ASSET-BY-ASSET REVIEW                       */}
            {/* ======================================================= */}
            {auditSubTab === "asset-by-asset" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Asset Selection Sidebar (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-4 max-h-[800px] overflow-y-auto pr-2">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 mb-1">
                    Select Asset for Quality Check
                  </span>
                  
                  {getCorrectedAssetsList().map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => setSelectedAssetId(asset.id)}
                      className={`flex items-stretch justify-between p-4 rounded-xl border text-left transition-all ${
                        selectedAssetId === asset.id
                          ? "border-[#ff6600] bg-[#ff6600]/5"
                          : "border-[#1f2833]/40 bg-[#0d121c]/40 hover:border-[#1f2833]"
                      }`}
                    >
                      <div className="flex flex-col gap-1 select-none pointer-events-none truncate mr-2">
                        <span className="text-xs font-mono font-bold text-white">{asset.id}</span>
                        <span className="text-[11px] text-slate-400 truncate">{asset.name}</span>
                        <span className="text-[9px] font-mono text-slate-500 mt-1 truncate">{asset.path}</span>
                      </div>
                      <div className="flex flex-col justify-between items-end shrink-0 select-none pointer-events-none">
                        <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          asset.status === "approved" 
                            ? "bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30" 
                            : asset.status === "rejected" 
                            ? "bg-[#ff0055]/10 text-[#ff0055] border border-[#ff0055]/30"
                            : "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                        }`}>
                          {asset.status}
                        </span>
                        <span className="text-[8px] text-slate-600 font-mono mt-2">{asset.dimensions}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Right Column: Interactive Review Suite (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  {(() => {
                    const asset = getCorrectedAssetsList().find(item => item.id === selectedAssetId);
                    if (!asset) {
                      return (
                        <div className="border border-dashed border-[#1f2833] rounded-xl p-12 text-center text-slate-400">
                          Select an asset from the list to begin review.
                        </div>
                      );
                    }

                    return (
                      <div className="border border-[#1f2833]/40 bg-[#0d121c]/60 rounded-xl p-6 flex flex-col gap-6">
                        
                        {/* Meta Row */}
                        <div className="flex items-center justify-between border-b border-[#1f2833]/30 pb-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-[#00ffcc] font-mono uppercase tracking-wider">
                              Asset Meta Information Card
                            </span>
                            <h3 className="text-lg font-bold text-white tracking-tight">
                              {asset.name} ({asset.id})
                            </h3>
                          </div>
                          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
                            asset.status === "approved" ? "bg-[#00ffcc]/10 text-[#00ffcc]" : asset.status === "rejected" ? "bg-[#ff0055]/10 text-[#ff0055]" : "bg-amber-500/10 text-amber-500"
                          }`}>
                            Current Status: {asset.status}
                          </span>
                        </div>

                        {/* Side-by-Side Visual Review */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Reference Section */}
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase font-mono text-slate-400">
                              Reference JPG (With original borders)
                            </span>
                            <div className="relative aspect-square border border-[#1f2833]/60 bg-black rounded-xl overflow-hidden flex items-center justify-center p-4">
                              <img
                                src={asset.sourceJpg}
                                alt="Reference JPG Source"
                                className="max-h-[85%] max-w-[85%] object-contain"
                              />
                              <div className="absolute top-2 left-2 bg-black/80 text-[8px] font-mono text-slate-400 px-1.5 py-0.5 rounded">
                                Source: {asset.sourceJpg}
                              </div>
                            </div>
                          </div>

                          {/* Transparent Section */}
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase font-mono text-slate-400">
                              Transparent RGBA PNG (Background testing)
                            </span>
                            <div 
                              className="relative aspect-square border border-[#1f2833]/60 rounded-xl overflow-hidden flex items-center justify-center p-4 transition-colors"
                              style={{
                                backgroundColor: 
                                  reviewBackground === "dark" ? "#0b0c10" : 
                                  reviewBackground === "white" ? "#ffffff" : 
                                  reviewBackground === "cyan" ? "#00ffcc" : 
                                  reviewBackground === "orange" ? "#ff6600" : "transparent"
                              }}
                            >
                              {/* If backdrop is chosen, overlay background behind asset */}
                              {reviewBackground === "deck" && (
                                <img
                                  src={PHYSICAL_ASSETS_MAP.WD_ORB_ORBITAL_RELAY_deck}
                                  alt="Orbital Relay Plate"
                                  className="absolute inset-0 w-full h-full object-cover opacity-65"
                                />
                              )}
                              
                              <img
                                src={asset.path}
                                alt="Transparent derivative"
                                className="max-h-[85%] max-w-[85%] object-contain relative z-10"
                              />
                              <div className="absolute top-2 left-2 bg-black/80 text-[8px] font-mono text-slate-400 px-1.5 py-0.5 rounded">
                                Production: {asset.path}
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Background Test Controller */}
                        <div className="bg-[#0b0c10] p-4 rounded-lg flex flex-col sm:flex-row gap-4 justify-between items-center border border-[#1f2833]/30">
                          <span className="text-[10px] uppercase font-mono text-slate-400">
                            Change background overlay under production PNG:
                          </span>
                          <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                            <button
                              onClick={() => setReviewBackground("dark")}
                              className={`px-2.5 py-1.5 rounded border transition-colors cursor-pointer ${reviewBackground === "dark" ? "border-[#00ffcc] bg-[#00ffcc]/10 text-[#00ffcc]" : "border-slate-800 hover:border-slate-700 text-slate-400"}`}
                            >
                              Obsidian Void
                            </button>
                            <button
                              onClick={() => setReviewBackground("white")}
                              className={`px-2.5 py-1.5 rounded border transition-colors cursor-pointer ${reviewBackground === "white" ? "border-slate-200 bg-white/10 text-white" : "border-slate-800 hover:border-slate-700 text-slate-400"}`}
                            >
                              White Background
                            </button>
                            <button
                              onClick={() => setReviewBackground("cyan")}
                              className={`px-2.5 py-1.5 rounded border transition-colors cursor-pointer ${reviewBackground === "cyan" ? "border-[#00ffcc] bg-[#00ffcc]/10 text-[#00ffcc]" : "border-slate-800 hover:border-slate-700 text-slate-400"}`}
                            >
                              Cyan Background
                            </button>
                            <button
                              onClick={() => setReviewBackground("orange")}
                              className={`px-2.5 py-1.5 rounded border transition-colors cursor-pointer ${reviewBackground === "orange" ? "border-[#ff6600] bg-[#ff6600]/10 text-[#ff6600]" : "border-slate-800 hover:border-slate-700 text-slate-400"}`}
                            >
                              Orange Background
                            </button>
                            <button
                              onClick={() => setReviewBackground("deck")}
                              className={`px-2.5 py-1.5 rounded border transition-colors cursor-pointer ${reviewBackground === "deck" ? "border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059]" : "border-slate-800 hover:border-slate-700 text-slate-400"}`}
                            >
                              Orbital Relay Backdrop
                            </button>
                          </div>
                        </div>

                        {/* Defect Compliance Checks */}
                        <div className="flex flex-col gap-3 text-left">
                          <span className="text-[10px] uppercase font-mono text-slate-400 font-bold tracking-wide">
                            Verification & Alpha defect analysis
                          </span>
                          <p className="text-[11px] text-slate-400 -mt-2">
                            Flag any observed issues. Flagging any defect prevents approved status until resolved.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-[11px] bg-[#0b0c10]/40 p-4 rounded-xl border border-[#1f2833]/30">
                            {[
                              { key: "whiteMatteHalo", label: "White matte halos" },
                              { key: "blackMatteHalo", label: "Black matte halos" },
                              { key: "missingEdgePixels", label: "Missing edge pixels" },
                              { key: "damagedTransparency", label: "Damaged transparency" },
                              { key: "rectangularRemnants", label: "Rectangular background remnants" },
                              { key: "unwantedFringing", label: "Unwanted color fringing" },
                              { key: "incorrectBlend", label: "Incorrect blend behavior" }
                            ].map((defect) => (
                              <label
                                key={defect.key}
                                className="flex items-center gap-2.5 hover:bg-slate-900/40 p-1.5 rounded transition-all cursor-pointer select-none"
                              >
                                <input
                                  type="checkbox"
                                  checked={defectChecks[defect.key as keyof typeof defectChecks]}
                                  onChange={(e) => setDefectChecks(prev => ({ ...prev, [defect.key]: e.target.checked }))}
                                  className="rounded accent-[#ff6600]"
                                />
                                <span className={defectChecks[defect.key as keyof typeof defectChecks] ? "text-[#ff0055] font-semibold" : "text-slate-400"}>
                                  {defect.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Specs Table */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono bg-[#0b0c10] p-4 rounded-lg border border-[#1f2833]/20">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] text-slate-500 uppercase">Dimensions</span>
                            <span className="text-white font-bold">{asset.dimensions}</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] text-slate-500 uppercase">File Format</span>
                            <span className="text-white font-bold">{asset.fileType}</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] text-slate-500 uppercase">Alpha Status</span>
                            <span className="text-[#00ffcc] font-bold truncate">{asset.alphaStatus}</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] text-slate-500 uppercase">Edge Quality Result</span>
                            <span className="text-[#00ffcc] font-bold truncate">{asset.edgeQuality}</span>
                          </div>
                        </div>

                        {/* Notes and Decision Controls */}
                        <div className="flex flex-col gap-4 border-t border-[#1f2833]/30 pt-4 text-left">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase font-mono text-slate-400">Reviewer note field</label>
                            <textarea
                              value={reviewNote}
                              onChange={(e) => setReviewNote(e.target.value)}
                              placeholder="Describe edge quality, transition blends, or document defect details... Note is required for rejected, needs-review updates, or defects."
                              rows={3}
                              className="w-full bg-[#0b0c10] border border-[#1f2833]/60 rounded-lg p-3 text-xs text-white outline-none focus:border-[#ff6600] font-mono resize-none"
                            />
                          </div>

                          {validationNoteWarning && (
                            <div className="bg-[#ff0055]/10 text-[#ff0055] border border-[#ff0055]/30 p-3 rounded-lg text-xs font-mono flex items-center gap-2">
                              <AlertOctagon className="w-4 h-4 shrink-0" />
                              <span>{validationNoteWarning}</span>
                            </div>
                          )}

                          {/* Controls Row */}
                          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                            
                            {/* Decision Selectors */}
                            <div className="flex items-center gap-1 bg-[#141923] border border-[#1f2833]/40 p-1 rounded-lg">
                              <button
                                onClick={() => setReviewDecision("approved")}
                                className={`px-4 py-2 rounded font-mono text-xs font-semibold cursor-pointer transition-all ${
                                  reviewDecision === "approved"
                                    ? "bg-[#00ffcc] text-black"
                                    : "text-slate-400 hover:text-white"
                                }`}
                              >
                                Approved
                              </button>
                              <button
                                onClick={() => setReviewDecision("needs-review")}
                                className={`px-4 py-2 rounded font-mono text-xs font-semibold cursor-pointer transition-all ${
                                  reviewDecision === "needs-review"
                                    ? "bg-amber-500 text-black"
                                    : "text-slate-400 hover:text-white"
                                }`}
                              >
                                Needs-Review
                              </button>
                              <button
                                onClick={() => setReviewDecision("rejected")}
                                className={`px-4 py-2 rounded font-mono text-xs font-semibold cursor-pointer transition-all ${
                                  reviewDecision === "rejected"
                                    ? "bg-[#ff0055] text-white"
                                    : "text-slate-400 hover:text-white"
                                }`}
                              >
                                Rejected
                              </button>
                            </div>

                            {/* Save Action */}
                            <button
                              onClick={handleSaveDecision}
                              className="bg-[#ff6600] text-black font-mono font-bold py-2 px-6 rounded-lg hover:bg-[#e65c00] transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Save Quality Decision
                            </button>

                          </div>

                          {publishedSuccess && (
                            <div className="bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30 p-3 rounded-lg text-xs font-mono flex items-center gap-2.5 animate-bounce">
                              <Check className="w-4 h-4 shrink-0" />
                              Quality decision written to manifests and CHANGELOG.md successfully!
                            </div>
                          )}

                        </div>

                      </div>
                    );
                  })()}
                </div>

              </div>
            )}

            {/* ======================================================= */}
            {/* SUB-TAB 2: ASTRA CONTACT SHEET                         */}
            {/* ======================================================= */}
            {auditSubTab === "astra-contact" && (
              <div className="flex flex-col gap-6">
                
                {/* Astra Sheet Info */}
                <div className="border border-[#1f2833]/40 bg-[#0d121c]/60 rounded-xl p-6 flex flex-col gap-4 text-left font-sans">
                  <div className="flex justify-between items-center border-b border-[#1f2833]/30 pb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[#00ffcc]" />
                      <h3 className="text-md font-semibold text-white tracking-tight">
                        Astra A-17 Visual Continuity Contact Sheet
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">100% Normalized Scale</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed -mt-2">
                    Verify head shape symmetry, optical stripe, chest proportions, graphite arm/leg joints, ceramic plates alignment, silhouette continuity, and neon cyan light distribution. <strong>Astra poses must not be approved as a set if one pose visibly changes the model.</strong>
                  </p>

                  {/* Side by side poses */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {[
                      { id: "CH_AG_ASTRA_A17_boot", pose: "boot", name: "Dormant (Boot)" },
                      { id: "CH_AG_ASTRA_A17_idle", pose: "idle", name: "Floating (Idle)" },
                      { id: "CH_AG_ASTRA_A17_scan", pose: "scan", name: "Scanning Sweep" },
                      { id: "CH_AG_ASTRA_A17_react", pose: "react", name: "Emergency Recoil" },
                      { id: "CH_AG_ASTRA_A17_shutdown", pose: "shutdown", name: "Deallocated (Shutdown)" }
                    ].map((item) => (
                      <div key={item.id} className="bg-[#0b0c10] border border-[#1f2833]/30 rounded-xl p-3 flex flex-col gap-3 text-center group hover:border-[#00ffcc]/40 transition-all">
                        <div className="aspect-square bg-slate-900/60 rounded-lg flex items-center justify-center p-2 relative overflow-hidden">
                          <img
                            src={PHYSICAL_ASSETS_MAP[item.id as keyof typeof PHYSICAL_ASSETS_MAP] || PHYSICAL_ASSETS_MAP.CH_AG_ASTRA_A17_idle}
                            alt={item.name}
                            className="max-h-[85%] max-w-[85%] object-contain"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-mono font-bold text-white">{item.pose.toUpperCase()}</span>
                          <span className="text-[10px] text-slate-500 font-mono truncate">{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Astra Continuity Verification Form */}
                  <div className="mt-4 border-t border-[#1f2833]/30 pt-6 text-left">
                    <span className="text-xs font-mono font-bold uppercase text-[#ff6600] block mb-3">
                      Astra Model Integrity Verification Parameters
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-[#0b0c10]/40 p-5 rounded-xl border border-[#1f2833]/30 font-mono text-[11px]">
                      {[
                        { key: "headShape", label: "Verify identical head shape" },
                        { key: "opticalStripe", label: "Verify identical horizontal optical stripe" },
                        { key: "torsoProportions", label: "Verify core chest & torso proportions" },
                        { key: "ceramicPlates", label: "Verify layout of ceramic plates" },
                        { key: "graphiteJoints", label: "Verify dark graphite joint sockets" },
                        { key: "limbPlacement", label: "Verify correct limbs placement & thickness" },
                        { key: "silhouette", label: "Verify identical silhouette boundaries" },
                        { key: "materialDistribution", label: "Verify material distribution symmetry" },
                        { key: "cyanIntensity", label: "Verify uniform cyan light glow intensity" }
                      ].map((chk) => (
                        <label key={chk.key} className="flex items-center gap-2.5 p-1 rounded hover:bg-slate-900/40 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={astraContinuityChecks[chk.key as keyof typeof astraContinuityChecks]}
                            onChange={(e) => setAstraContinuityChecks(prev => ({ ...prev, [chk.key]: e.target.checked }))}
                            className="rounded accent-[#ff6600]"
                          />
                          <span className={astraContinuityChecks[chk.key as keyof typeof astraContinuityChecks] ? "text-[#00ffcc]" : "text-slate-400"}>
                            {chk.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ======================================================= */}
            {/* SUB-TAB 3: EFFECTS COMPOSITING REVIEW                  */}
            {/* ======================================================= */}
            {auditSubTab === "effects-compositing" && (
              <div className="flex flex-col gap-6 text-left">
                
                {/* Intro Card */}
                <div className="border border-[#1f2833]/40 bg-[#0d121c]/60 rounded-xl p-6 flex flex-col gap-3">
                  <h3 className="text-md font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#00ffcc]" />
                    Effects & Props Composite Overlay Verification
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Verify that overlays render cleanly on top of backgrounds with 0 black/white solid border rectangles, correct glow effects, correct layer ordering, and useful representation at mobile safe boundaries.
                  </p>
                </div>

                {/* Previews Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Governance Seal */}
                  <div className="border border-[#1f2833]/40 bg-[#0d121c]/40 p-4 rounded-xl flex flex-col gap-4">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      EF_GOVERNANCE_SEAL_ORANGE over Relay Station
                    </span>
                    
                    <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden flex items-center justify-center border border-[#1f2833]/60">
                      {/* Orbital relay deck background */}
                      <img
                        src={PHYSICAL_ASSETS_MAP.WD_ORB_ORBITAL_RELAY_deck}
                        alt="Deck"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                      {/* Effect overlay */}
                      <img
                        src={PHYSICAL_ASSETS_MAP.EF_GOVERNANCE_SEAL_ORANGE}
                        alt="Governance Seal"
                        className="max-h-[60%] max-w-[80%] object-contain relative z-10"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 text-[8px] font-mono text-[#ff6600] px-1.5 py-0.5 rounded">
                        Composite Screen mode
                      </div>
                    </div>
                  </div>

                  {/* Signal Emergency */}
                  <div className="border border-[#1f2833]/40 bg-[#0d121c]/40 p-4 rounded-xl flex flex-col gap-4">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      EF_SIGNAL_EMERGENCY_CYAN over Relay Station
                    </span>
                    
                    <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden flex items-center justify-center border border-[#1f2833]/60">
                      {/* Orbital relay deck background */}
                      <img
                        src={PHYSICAL_ASSETS_MAP.WD_ORB_ORBITAL_RELAY_deck}
                        alt="Deck"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                      {/* Effect overlay */}
                      <img
                        src={PHYSICAL_ASSETS_MAP.EF_SIGNAL_EMERGENCY_CYAN}
                        alt="Emergency Signal"
                        className="max-h-[60%] max-w-[80%] object-contain relative z-10"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 text-[8px] font-mono text-[#00ffcc] px-1.5 py-0.5 rounded">
                        Composite Additive mode
                      </div>
                    </div>
                  </div>

                  {/* Relay Core */}
                  <div className="border border-[#1f2833]/40 bg-[#0d121c]/40 p-4 rounded-xl flex flex-col gap-4">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                      PR_RELAY_CORE over Relay Station
                    </span>
                    
                    <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden flex items-center justify-center border border-[#1f2833]/60">
                      {/* Orbital relay deck background */}
                      <img
                        src={PHYSICAL_ASSETS_MAP.WD_ORB_ORBITAL_RELAY_deck}
                        alt="Deck"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                      {/* Prop overlay */}
                      <img
                        src={PHYSICAL_ASSETS_MAP.PR_RELAY_CORE}
                        alt="Relay Core"
                        className="max-h-[60%] max-w-[80%] object-contain relative z-10"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 text-[8px] font-mono text-[#c5a059] px-1.5 py-0.5 rounded">
                        Composite Alpha Normal
                      </div>
                    </div>
                  </div>

                </div>

                {/* Effect Compositing Compliance check */}
                <div className="border border-[#1f2833]/40 bg-[#0d121c]/60 rounded-xl p-5 mt-4">
                  <span className="text-xs font-mono font-bold uppercase text-[#00ffcc] block mb-3">
                    Effects Verification checklist parameters
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0b0c10]/40 p-5 rounded-lg border border-[#1f2833]/20 font-mono text-[11px]">
                    {[
                      { key: "noBlackRect", label: "Verify NO black solid rectangles" },
                      { key: "noWhiteRect", label: "Verify NO white solid rectangles" },
                      { key: "noMatteHalo", label: "Verify NO matte halo artifacts" },
                      { key: "readableScale", label: "Verify readable scale on mobile" },
                      { key: "correctColor", label: "Verify mathematically correct color" },
                      { key: "correctGlow", label: "Verify correct glowing intensity" },
                      { key: "correctLayerOrder", label: "Verify correct z-index ordering" },
                      { key: "mobileAppearance", label: "Verify useful appearance at 340px" }
                    ].map((chk) => (
                      <label key={chk.key} className="flex items-center gap-2 px-1 py-1 hover:bg-slate-900/40 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={effectCompositingChecks[chk.key as keyof typeof effectCompositingChecks]}
                          onChange={(e) => setEffectCompositingChecks(prev => ({ ...prev, [chk.key]: e.target.checked }))}
                          className="rounded accent-[#ff6600]"
                        />
                        <span className={effectCompositingChecks[chk.key as keyof typeof effectCompositingChecks] ? "text-[#00ffcc]" : "text-slate-400"}>
                          {chk.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ======================================================= */}
            {/* SUB-TAB 4: DECISION LEDGER & HISTORIES                 */}
            {/* ======================================================= */}
            {auditSubTab === "decision-ledger" && (
              <div className="flex flex-col gap-6">
                
                {/* Changelog display card */}
                <div className="border border-[#1f2833]/40 bg-[#0d121c]/60 rounded-xl p-6 flex flex-col gap-4 text-left font-mono">
                  <h3 className="text-md font-semibold text-white flex items-center gap-2 border-b border-[#1f2833]/30 pb-3">
                    <FileCode className="w-4 h-4 text-[#00ffcc]" />
                    Changelog Live Stream (PROJECTCHANGELOG.md)
                  </h3>
                  
                  <pre className="bg-[#0b0c10] border border-[#1f2833]/30 p-4 rounded-lg text-slate-300 text-xs overflow-x-auto max-h-60 leading-relaxed font-mono select-all text-left">
                    {changelogText || "# Changelog\n\nNo manual human entries registered yet."}
                  </pre>
                </div>

                {/* Missing & Planned Assets Widget */}
                <div className="border border-[#1f2833]/50 bg-[#0d121c]/60 rounded-xl p-6 flex flex-col gap-4 text-left font-mono">
                  <h3 className="text-xs font-semibold text-white uppercase border-b border-[#1f2833]/30 pb-2 tracking-wider">
                    Missing & Incomplete Assets Report
                  </h3>
                  
                  <div className="flex flex-col gap-2.5 text-[11px] text-slate-400">
                    <span className="text-slate-500">Planned elements scheduled for future compile:</span>
                    
                    <div className="bg-[#ff0055]/5 border border-[#ff0055]/30 p-2.5 rounded flex items-center justify-between text-slate-300">
                      <span>IC_SYS_WARN.png</span>
                      <span className="text-[#ff0055] font-bold">Planned (No File)</span>
                    </div>

                    <div className="bg-[#ff0055]/5 border border-[#ff0055]/30 p-2.5 rounded flex items-center justify-between text-slate-300">
                      <span>EF_SCAN_LINE.png</span>
                      <span className="text-[#ff0055] font-bold">Planned (No File)</span>
                    </div>

                    <div className="bg-amber-500/5 border border-amber-500/30 p-2.5 rounded flex items-center justify-between text-slate-300">
                      <span>PR_DECRYPT_KEY.png</span>
                      <span className="text-amber-500 font-bold">Planned (No File)</span>
                    </div>

                    <div className="bg-amber-500/5 border border-amber-500/30 p-2.5 rounded flex items-center justify-between text-slate-300">
                      <span>WD_SIM_02_transit-wide.png</span>
                      <span className="text-amber-500 font-bold">Planned (No File)</span>
                    </div>
                  </div>
                </div>

                {/* Ledger card */}
                <div className="border border-[#1f2833]/40 bg-[#0d121c]/60 rounded-xl p-6 flex flex-col gap-4 text-left">
                  <div className="flex justify-between items-center border-b border-[#1f2833]/30 pb-3">
                    <h3 className="text-md font-semibold text-white">
                      Chronological Decision Ledger History
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      Stored: {reviewsHistory.length} review versions
                    </span>
                  </div>

                  {reviewsHistory.length > 0 ? (
                    <div className="overflow-x-auto font-mono">
                      <table className="w-full text-left font-mono text-[10px] text-slate-300">
                        <thead>
                          <tr className="border-b border-[#1f2833]/40 text-slate-400 text-[9px] uppercase">
                            <th className="py-2 px-3">Timestamp</th>
                            <th className="py-2 px-3">Asset ID</th>
                            <th className="py-2 px-3">Decision</th>
                            <th className="py-2 px-3">Review Note</th>
                            <th className="py-2 px-3">Bg Used</th>
                            <th className="py-2 px-3">Version</th>
                            <th className="py-2 px-3">Defects</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900">
                          {reviewsHistory.map((log, idx) => (
                            <tr key={idx} className="hover:bg-slate-900/30">
                              <td className="py-2 px-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                              <td className="py-2 px-3 text-white font-bold">{log.assetId}</td>
                              <td className="py-2 px-3">
                                <span className={`px-2 py-0.5 rounded font-bold text-[8px] uppercase ${
                                  log.decision === "approved" ? "bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30" : log.decision === "rejected" ? "bg-[#ff0055]/10 text-[#ff0055] border border-[#ff0055]/30" : "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                                }`}>
                                  {log.decision}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-slate-400 max-w-[200px] truncate" title={log.note}>{log.note || "-"}</td>
                              <td className="py-2 px-3 text-slate-500">{log.backgroundUsed}</td>
                              <td className="py-2 px-3 font-semibold">{log.reviewVersion}</td>
                              <td className="py-2 px-3 text-[#ff0055] max-w-[150px] truncate" title={log.defectsFlagged.join(", ")}>
                                {log.defectsFlagged.join(", ") || "none"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs font-mono text-slate-500 text-center py-6">
                      No decisions registered in the active session. Use the Asset-by-Asset Review tab to verify and save decisions.
                    </p>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

        {/* ======================================= */}
        {/* TAB 1: PROJECT STATE                    */}
        {/* ======================================= */}
        {tab === "state" && (
          <div className="flex flex-col gap-8 animate-fadeIn text-left">
            
            {/* Phase Hero Header */}
            <div className="border border-[#1f2833]/50 bg-[#141923]/60 rounded-xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-xs text-[#00ffcc] font-mono">
                  <span>CANONICAL PIPELINE STATUS REGISTER</span>
                  <span>·</span>
                  <span>v1.1.0</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
                  {phase4Unlocked ? "Current Phase: Phase 4 Storyboarding" : "Current Phase: Human Asset Review"}
                </h1>
                <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                  {phase4Unlocked 
                    ? "Human reviewer has verified all Episode 001 core visual overlays and synchronized audio stems. Phase 4 Storyboarding and Animatic orchestration is now unlocked."
                    : "Phase 3 asset validation pass complete. Standard manifests have been locked under needs-review lifecycle states. Phase 4 is locked until all core required Episode 001 assets are approved."}
                </p>
              </div>
              
              <div className={`border px-4 py-3 rounded-lg flex flex-col items-start gap-1 font-mono ${
                phase4Unlocked ? "border-[#00ffcc]/40 bg-[#00ffcc]/5" : "border-[#ff0055]/30 bg-[#ff0055]/5"
              }`}>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Phase 4 Access Status</span>
                <span className={`text-sm font-semibold flex items-center gap-1.5 ${phase4Unlocked ? "text-[#00ffcc]" : "text-[#ff0055]"}`}>
                  {phase4Unlocked ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00ffcc]" />
                      UNLOCKED
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#ff0055]" />
                      LOCKED
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Metrics Dashboard Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="border border-[#1f2833]/40 bg-[#0d121c] p-6 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono tracking-wider uppercase">Active Pipeline Status</span>
                  <Activity className="w-4 h-4 text-[#ff6600]" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  AUDITING
                </div>
                <div className="text-xs text-amber-500 font-mono">
                  Needs-review states enforced
                </div>
              </div>

              <div className="border border-[#1f2833]/40 bg-[#0d121c] p-6 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono tracking-wider uppercase">Registered Warehouse Assets</span>
                  <Database className="w-4 h-4 text-[#c5a059]" />
                </div>
                <div className="text-3xl font-bold text-white font-mono tabular-nums">
                  20
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  20 needs-review / 0 approved
                </div>
              </div>

              <div className="border border-[#1f2833]/40 bg-[#0d121c] p-6 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono tracking-wider uppercase">Pipeline Safe Tempo</span>
                  <Music className="w-4 h-4 text-[#00ffcc]" />
                </div>
                <div className="text-3xl font-bold text-white font-mono tabular-nums">
                  128 <span className="text-sm font-sans font-normal text-slate-400">BPM</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Synced cuts at 0.234s grid divisions
                </div>
              </div>

              <div className="border border-[#1f2833]/40 bg-[#0d121c] p-6 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono tracking-wider uppercase">Verification Pass Rate</span>
                  <Shield className="w-4 h-4 text-[#00ffcc]" />
                </div>
                <div className="text-3xl font-bold text-white font-mono flex items-baseline gap-1.5">
                  100%
                </div>
                <div className="text-xs text-[#00ffcc] font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00ffcc]" />
                  Schema integrity locked
                </div>
              </div>

            </div>

            {/* Episode 001 Verification Gate & Lock Status */}
            <div className="border border-[#1f2833]/40 bg-[#0d121c]/40 rounded-xl p-6 flex flex-col gap-5 text-left">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#1f2833]/30 pb-3 gap-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#00ffcc] font-mono uppercase tracking-wider">Gate Control: Human Verifications Check</span>
                  <h3 className="text-md font-bold text-white tracking-tight font-sans">Episode 001 Production Verification Gate</h3>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Required: 9 assets | Status: <span className="text-amber-500 font-bold">{getEpisode001Blockers().length} blocker(s) remaining</span>
                </div>
              </div>

              {/* List of gate assets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: "CH_AG_ASTRA_A17_boot", name: "Astra (BOOT Pose)" },
                  { id: "CH_AG_ASTRA_A17_idle", name: "Astra (IDLE Pose)" },
                  { id: "CH_AG_ASTRA_A17_scan", name: "Astra (SCAN Pose)" },
                  { id: "CH_AG_ASTRA_A17_react", name: "Astra (REACT Pose)" },
                  { id: "CH_AG_ASTRA_A17_shutdown", name: "Astra (SHUTDOWN Pose)" },
                  { id: "PR_RELAY_CORE", name: "Relay Core Receiver" },
                  { id: "EF_SIGNAL_EMERGENCY_CYAN", name: "Emergency Cyan Core Signal" },
                  { id: "EF_GOVERNANCE_SEAL_ORANGE", name: "Governance Restriction Seal" },
                  { id: "WD_ORB_ORBITAL_RELAY_deck", name: "Orbital Relay Deck Plate" }
                ].map(item => {
                  let assetStatus = "needs-review";
                  if (item.id === "WD_ORB_ORBITAL_RELAY_deck") {
                    const relayDeck = assetsState.worlds.find((w: any) => w.id === "WD_ORB_ORBITAL_RELAY")?.backgrounds?.find((b: any) => b.bgId === "deck");
                    assetStatus = relayDeck ? relayDeck.status : "missing";
                  } else {
                    const correctedList = getCorrectedAssetsList();
                    const found = correctedList.find(x => x.id === item.id);
                    assetStatus = found ? found.status : "missing";
                  }

                  return (
                    <div key={item.id} className="bg-[#0b0c10] border border-[#1f2833]/30 p-3 rounded-lg flex items-center justify-between text-xs font-mono">
                      <div className="flex flex-col gap-0.5 truncate mr-2">
                        <span className="text-white font-bold truncate">{item.name}</span>
                        <span className="text-[10px] text-slate-500 truncate">{item.id}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold shrink-0 ${
                        assetStatus === "approved" 
                          ? "bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30" 
                          : assetStatus === "rejected" 
                          ? "bg-[#ff0055]/10 text-[#ff0055] border border-[#ff0055]/30" 
                          : "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                      }`}>
                        {assetStatus}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Unlock Gate Actions */}
              <div className="border-t border-[#1f2833]/20 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col text-xs max-w-xl">
                  <span className="text-white font-semibold flex items-center gap-1 font-sans">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    Strict Locking Protocol Invariant:
                  </span>
                  <p className="text-slate-400 mt-1 font-sans leading-relaxed">
                    Phase 4 access is locked on the file system until every core Episode 001 asset is manually reviewed and approved by a human inspector. Nexus and Vortex are excluded from blockers unless they are explicitly in the episode script timeline.
                  </p>
                </div>
                
                {phase4Unlocked ? (
                  <div className="bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30 p-3 rounded-lg text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00ffcc]" />
                    Phase 4 Storyboarding has been unlocked!
                  </div>
                ) : (
                  <button
                    onClick={handleUnlockPhase4}
                    disabled={getEpisode001Blockers().length > 0}
                    className={`px-5 py-3 rounded-lg font-mono font-bold text-xs uppercase flex items-center gap-2 cursor-pointer transition-all ${
                      getEpisode001Blockers().length === 0
                        ? "bg-[#00ffcc] text-black hover:bg-[#00e6b8] shadow-[0_2px_8px_rgba(0,255,204,0.3)]"
                        : "bg-slate-800 text-slate-500 border border-slate-700 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <Lock className="w-4 h-4" />
                    Unlock Phase 4 storyboarding
                  </button>
                )}
              </div>
            </div>

            {/* Pipeline Stage Tracker & Roadmap */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left Column: Phases list */}
              <div className="lg:col-span-2 border border-[#1f2833]/40 bg-[#0d121c]/60 rounded-xl p-6 flex flex-col gap-6">
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  Animation Production Phased Roadmap
                </h3>
                
                <div className="flex flex-col gap-4">
                  
                  {/* Phase 0 */}
                  <div className="flex items-start gap-4 border-l-2 border-[#00ffcc] pl-4 py-1">
                    <div className="p-1 rounded bg-[#00ffcc]/10 text-[#00ffcc] shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">01. Phase 0: Project Foundation</span>
                        <span className="text-[10px] font-mono text-[#00ffcc] tracking-wider uppercase">Completed</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Establish naming rules, schemas, directories, and standard tracking registers. Built validation protocols to catch structural inconsistencies immediately.
                      </p>
                    </div>
                  </div>

                  {/* Phase 1 */}
                  <div className="flex items-start gap-4 border-l-2 border-[#00ffcc] pl-4 py-1">
                    <div className="p-1 rounded bg-[#00ffcc]/10 text-[#00ffcc] shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">02. Phase 1: Production Bible</span>
                        <span className="text-[10px] font-mono text-[#00ffcc] tracking-wider uppercase">Completed</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Formal character bio expansion, technical cinematic panning metrics, design prompts formulas, and audio stem parameters formulation.
                      </p>
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="flex items-start gap-4 border-l-2 border-[#00ffcc] pl-4 py-1">
                    <div className="p-1 rounded bg-[#00ffcc]/10 text-[#00ffcc] shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">03. Phase 2: Asset Briefing Complete</span>
                        <span className="text-[10px] font-mono text-[#00ffcc] tracking-wider uppercase">Completed</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Write detailed Imagen blueprints for characters, backgrounds, props and effects. Define stem structures. Correct non-conforming IDs. Use live JSON imports.
                      </p>
                    </div>
                  </div>

                  {/* Phase 3 */}
                  <div className="flex items-start gap-4 border-l-2 border-amber-500/50 pl-4 py-1">
                    <div className="p-1 rounded bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#ff6600]">04. Phase 3: Asset Audit Complete</span>
                        <span className="text-[10px] font-mono text-amber-500 tracking-wider uppercase font-semibold">Under Audit</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Media files physically generated. Comprehensive alpha transparency checking and acoustic synchronicity verification. Reset statuses to needs-review.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Key Production Rules */}
              <div className="border border-[#1f2833]/40 bg-[#0d121c]/60 rounded-xl p-6 flex flex-col gap-5 text-left">
                <h3 className="text-md font-semibold text-white">
                  Pipeline Execution Rules
                </h3>
                
                <ul className="flex flex-col gap-3 text-xs leading-relaxed text-slate-400">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600] mt-1.5 shrink-0"></span>
                    <span><strong>Imported Is Not Approved</strong>: All compiled assets undergo manual checklist verification before being granted approved status.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600] mt-1.5 shrink-0"></span>
                    <span><strong>Alpha Transparency Integrity</strong>: Ensure true transparent alpha is preserved in PNG renders to prevent black boxes during stacking.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600] mt-1.5 shrink-0"></span>
                    <span><strong>Acoustic Rhythm Alignment</strong>: Every music layer locks to 128 BPM grid exactly to support rhythmic transitions and edit splits.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        )}

        {/* ======================================= */}
        {/* TAB 2: PRODUCTION BIBLES                */}
        {/* ======================================= */}
        {tab === "bible" && (
          <div className="flex-1 flex flex-col md:flex-row gap-8 items-stretch min-h-[500px] animate-fadeIn text-left">
            
            {/* Sidebar list */}
            <div className="w-full md:w-64 flex flex-col gap-2 shrink-0 border-r border-[#1f2833]/30 pr-6">
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase pl-2 mb-2">Bible Modules</span>
              
              <button
                onClick={() => setSelectedBible("series")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-colors text-left ${
                  selectedBible === "series"
                    ? "bg-[#141923] text-[#00ffcc]"
                    : "text-slate-400 hover:text-white hover:bg-[#0d121c]"
                }`}
              >
                <span>Series Bible</span>
                <BookOpen className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setSelectedBible("visual")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-colors text-left ${
                  selectedBible === "visual"
                    ? "bg-[#141923] text-[#00ffcc]"
                    : "text-slate-400 hover:text-white hover:bg-[#0d121c]"
                }`}
              >
                <span>Visual Bible</span>
                <Maximize2 className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setSelectedBible("audio")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-colors text-left ${
                  selectedBible === "audio"
                    ? "bg-[#141923] text-[#00ffcc]"
                    : "text-slate-400 hover:text-white hover:bg-[#0d121c]"
                }`}
              >
                <span>Audio Bible</span>
                <Music className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setSelectedBible("character")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-colors text-left ${
                  selectedBible === "character"
                    ? "bg-[#141923] text-[#00ffcc]"
                    : "text-slate-400 hover:text-white hover:bg-[#0d121c]"
                }`}
              >
                <span>Character Bible</span>
                <HelpCircle className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setSelectedBible("world")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-colors text-left ${
                  selectedBible === "world"
                    ? "bg-[#141923] text-[#00ffcc]"
                    : "text-slate-400 hover:text-white hover:bg-[#0d121c]"
                }`}
              >
                <span>World Bible</span>
                <Compass className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setSelectedBible("conventions")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-colors text-left ${
                  selectedBible === "conventions"
                    ? "bg-[#141923] text-[#00ffcc]"
                    : "text-slate-400 hover:text-white hover:bg-[#0d121c]"
                }`}
              >
                <span>Naming Protocol</span>
                <FileCode className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>

            {/* Document display */}
            <div className="flex-1 border border-[#1f2833]/40 bg-[#0d121c]/40 rounded-xl p-8 overflow-auto flex flex-col gap-6">
              
              {/* Doc Header */}
              <div className="flex items-center justify-between border-b border-[#1f2833]/30 pb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#00ffcc] font-mono uppercase tracking-widest">
                    {BIBLES_DATA[selectedBible].category}
                  </span>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {BIBLES_DATA[selectedBible].title}
                  </h2>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Locked · {BIBLES_DATA[selectedBible].updated}
                </div>
              </div>

              {/* Doc Body */}
              <div className="prose prose-invert prose-slate prose-sm max-w-none text-slate-300 space-y-4">
                {BIBLES_DATA[selectedBible].markdown.split('\n\n').map((para, i) => {
                  if (para.trim().startsWith('###')) {
                    return <h3 key={i} className="text-md font-semibold text-[#c5a059] mt-6 mb-2 tracking-tight">{para.replace('###', '').trim()}</h3>;
                  }
                  if (para.trim().startsWith('- ')) {
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1 text-xs">
                        {para.split('\n').map((li, j) => (
                          <li key={j}>{li.replace('- ', '').replace(/\*\*/g, '').trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.trim().startsWith('---')) {
                    return <hr key={i} className="border-[#1f2833]/40 my-6" />;
                  }
                  return <p key={i} className="text-xs leading-relaxed font-sans">{para.trim()}</p>;
                })}
              </div>

            </div>

          </div>
        )}

        {/* ======================================= */}
        {/* TAB 3: ASSET WAREHOUSE                  */}
        {/* ======================================= */}
        {tab === "warehouse" && (
          <div className="flex-1 flex flex-col gap-6 animate-fadeIn text-left">
            
            {/* Upper Category Selector Tabs & Filter row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1f2833]/30 pb-4">
              
              {/* Categories */}
              <div className="flex items-center gap-1 bg-[#141923]/60 border border-[#1f2833]/30 p-1 rounded-lg">
                <button
                  onClick={() => { setWarehouseCategory("characters"); setSelectedAssetDetail(null); }}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                    warehouseCategory === "characters" ? "bg-[#0b0c10] text-[#00ffcc]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Characters
                </button>
                <button
                  onClick={() => { setWarehouseCategory("worlds"); setSelectedAssetDetail(null); }}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                    warehouseCategory === "worlds" ? "bg-[#0b0c10] text-[#00ffcc]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Worlds
                </button>
                <button
                  onClick={() => { setWarehouseCategory("props"); setSelectedAssetDetail(null); }}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                    warehouseCategory === "props" ? "bg-[#0b0c10] text-[#00ffcc]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Props & Overlays
                </button>
                <button
                  onClick={() => { setWarehouseCategory("animation"); setSelectedAssetDetail(null); }}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                    warehouseCategory === "animation" ? "bg-[#0b0c10] text-[#00ffcc]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Animations
                </button>
                <button
                  onClick={() => { setWarehouseCategory("audio"); setSelectedAssetDetail(null); }}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                    warehouseCategory === "audio" ? "bg-[#0b0c10] text-[#00ffcc]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Sound & Music
                </button>
                <button
                  onClick={() => { setWarehouseCategory("templates"); setSelectedAssetDetail(null); }}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                    warehouseCategory === "templates" ? "bg-[#0b0c10] text-[#00ffcc]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Templates
                </button>
              </div>

              {/* Status Filters (Segmented control button layout - compliant with Zero Pill design) */}
              <div className="flex items-center gap-1 bg-[#141923]/40 border border-[#1f2833]/20 p-1 rounded-md text-xs">
                <span className="text-[10px] uppercase font-mono px-2 text-slate-500">Filter Status:</span>
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-2 py-1 rounded text-[11px] transition-colors ${
                    statusFilter === "all" ? "bg-[#ff6600]/10 text-[#ff6600]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter("needs-review")}
                  className={`px-2 py-1 rounded text-[11px] transition-colors ${
                    statusFilter === "needs-review" ? "bg-[#ff6600]/10 text-[#ff6600]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Needs-Review
                </button>
                <button
                  onClick={() => setStatusFilter("planned")}
                  className={`px-2 py-1 rounded text-[11px] transition-colors ${
                    statusFilter === "planned" ? "bg-[#ff6600]/10 text-[#ff6600]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Planned
                </button>
              </div>

            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Assets list (2 cols) */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Dynamic Category render */}
                {warehouseCategory === "characters" && (
                  INITIAL_ASSET_MANIFEST.characters
                    .filter(c => statusFilter === "all" || c.status === statusFilter)
                    .map(char => (
                      <div
                        key={char.id}
                        onClick={() => setSelectedAssetDetail(char)}
                        className={`border p-5 rounded-xl cursor-pointer transition-all flex flex-col gap-3 text-left ${
                          selectedAssetDetail?.id === char.id
                            ? "border-[#ff6600] bg-[#141923]/40"
                            : "border-[#1f2833]/40 bg-[#0d121c]/40 hover:border-[#1f2833]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold text-[#00ffcc]">
                            {char.id}
                          </span>
                          <span className="text-[10px] font-mono uppercase font-semibold text-amber-500">
                            {char.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white tracking-tight">{char.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{char.description}</p>
                        <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-[#1f2833]/30 truncate">
                          Poses: {char.poses.map((p: any) => p.poseId).join(", ")}
                        </div>
                      </div>
                    ))
                )}

                {warehouseCategory === "worlds" && (
                  INITIAL_ASSET_MANIFEST.worlds
                    .filter(w => statusFilter === "all" || w.status === statusFilter)
                    .map(world => (
                      <div
                        key={world.id}
                        onClick={() => setSelectedAssetDetail(world)}
                        className={`border p-5 rounded-xl cursor-pointer transition-all flex flex-col gap-3 text-left ${
                          selectedAssetDetail?.id === world.id
                            ? "border-[#ff6600] bg-[#141923]/40"
                            : "border-[#1f2833]/40 bg-[#0d121c]/40 hover:border-[#1f2833]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold text-[#00ffcc]">
                            {world.id}
                          </span>
                          <span className="text-[10px] font-mono uppercase font-semibold text-amber-500">
                            {world.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white tracking-tight">{world.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{world.description}</p>
                        <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-[#1f2833]/30 truncate">
                          Layers: {world.backgrounds.map((b: any) => b.bgId).join(", ")}
                        </div>
                      </div>
                    ))
                )}

                {warehouseCategory === "props" && (
                  [...INITIAL_ASSET_MANIFEST.props, ...INITIAL_ASSET_MANIFEST.icons, ...INITIAL_ASSET_MANIFEST.effects]
                    .filter(p => statusFilter === "all" || p.status === statusFilter)
                    .map(prop => (
                      <div
                        key={prop.id}
                        onClick={() => setSelectedAssetDetail(prop)}
                        className={`border p-5 rounded-xl cursor-pointer transition-all flex flex-col gap-3 text-left ${
                          selectedAssetDetail?.id === prop.id
                            ? "border-[#ff6600] bg-[#141923]/40"
                            : "border-[#1f2833]/40 bg-[#0d121c]/40 hover:border-[#1f2833]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold text-[#00ffcc]">
                            {prop.id}
                          </span>
                          <span className="text-[10px] font-mono uppercase font-semibold text-amber-500">
                            {prop.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white tracking-tight">{prop.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{prop.description}</p>
                        <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-[#1f2833]/30 truncate">
                          {prop.path}
                        </div>
                      </div>
                    ))
                )}

                {warehouseCategory === "animation" && (
                  [...INITIAL_ANIMATION_MANIFEST.cameraMoves, ...INITIAL_ANIMATION_MANIFEST.animationCycles]
                    .filter(a => statusFilter === "all" || a.status === statusFilter)
                    .map(anim => (
                      <div
                        key={anim.id}
                        onClick={() => setSelectedAssetDetail(anim)}
                        className={`border p-5 rounded-xl cursor-pointer transition-all flex flex-col gap-3 text-left ${
                          selectedAssetDetail?.id === anim.id
                            ? "border-[#ff6600] bg-[#141923]/40"
                            : "border-[#1f2833]/40 bg-[#0d121c]/40 hover:border-[#1f2833]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold text-[#00ffcc]">
                            {anim.id}
                          </span>
                          <span className="text-[10px] font-mono uppercase font-semibold text-amber-500">
                            {anim.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white tracking-tight">{anim.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{anim.description}</p>
                        <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-[#1f2833]/30 truncate">
                          Config keys: {Object.keys(anim.config).join(", ")}
                        </div>
                      </div>
                    ))
                )}

                {warehouseCategory === "audio" && (
                  [...INITIAL_AUDIO_MANIFEST.music, ...INITIAL_AUDIO_MANIFEST.voiceover, ...INITIAL_AUDIO_MANIFEST.soundEffects, ...INITIAL_AUDIO_MANIFEST.ambience]
                    .filter(au => statusFilter === "all" || au.status === statusFilter)
                    .map((audio: any) => (
                      <div
                        key={audio.id}
                        onClick={() => setSelectedAssetDetail(audio)}
                        className={`border p-5 rounded-xl cursor-pointer transition-all flex flex-col gap-3 text-left ${
                          selectedAssetDetail?.id === audio.id
                            ? "border-[#ff6600] bg-[#141923]/40"
                            : "border-[#1f2833]/40 bg-[#0d121c]/40 hover:border-[#1f2833]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold text-[#00ffcc]">
                            {audio.id}
                          </span>
                          <span className="text-[10px] font-mono uppercase font-semibold text-amber-500">
                            {audio.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white tracking-tight">
                          {audio.name || (audio.text ? `VO: ${audio.id}` : audio.id)}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {audio.description || audio.text || "Voice narration component."}
                        </p>
                        <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-[#1f2833]/30 truncate">
                          {audio.path || audio.stems?.[0]?.path}
                        </div>
                      </div>
                    ))
                )}

                {warehouseCategory === "templates" && (
                  INITIAL_TEMPLATE_MANIFEST.templates
                    .filter(t => statusFilter === "all" || t.status === statusFilter)
                    .map(temp => (
                      <div
                        key={temp.id}
                        onClick={() => setSelectedAssetDetail(temp)}
                        className={`border p-5 rounded-xl cursor-pointer transition-all flex flex-col gap-3 text-left ${
                          selectedAssetDetail?.id === temp.id
                            ? "border-[#ff6600] bg-[#141923]/40"
                            : "border-[#1f2833]/40 bg-[#0d121c]/40 hover:border-[#1f2833]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold text-[#00ffcc]">
                            {temp.id}
                          </span>
                          <span className={`text-[10px] font-mono uppercase font-semibold ${
                            temp.status === "approved" ? "text-[#00ffcc]" : "text-slate-500"
                          }`}>
                            {temp.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white tracking-tight">{temp.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{temp.description}</p>
                        <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-[#1f2833]/30 truncate">
                          Layout: {temp.layout.aspectRatio} · {temp.layout.elements.length} components
                        </div>
                      </div>
                    ))
                )}

              </div>

              {/* Asset Detail Drawer/Panel (1 col) */}
              <div className="border border-[#1f2833]/50 bg-[#0d121c]/60 rounded-xl p-6 flex flex-col gap-5 text-left sticky top-8 min-h-[300px]">
                {selectedAssetDetail ? (
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-[#1f2833]/30 pb-3">
                      <span className="text-[10px] text-[#00ffcc] font-mono font-bold tracking-wider uppercase">
                        Asset Inspector
                      </span>
                      <span className="text-xs font-mono text-[#ff6600]">
                        needs-review
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-mono text-slate-400">Stable Identifier</span>
                      <span className="text-sm font-semibold font-mono text-white tracking-wider">
                        {selectedAssetDetail.id}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-mono text-slate-400">Formal Name</span>
                      <span className="text-sm font-semibold text-[#c5a059]">
                        {selectedAssetDetail.name || "Default Registered Asset"}
                      </span>
                    </div>

                    {selectedAssetDetail.description && (
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-mono text-slate-400">Description</span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {selectedAssetDetail.description}
                        </p>
                      </div>
                    )}

                    {selectedAssetDetail.visualBrief && (
                      <div className="flex flex-col gap-1 border-t border-[#1f2833]/30 pt-3">
                        <span className="text-[11px] font-mono text-slate-400">Gemini Prompt Brief</span>
                        <div className="bg-[#0b0c10] border border-[#1f2833]/40 p-3 rounded text-xs text-slate-300 font-mono leading-relaxed select-all">
                          {selectedAssetDetail.visualBrief}
                        </div>
                      </div>
                    )}

                    {selectedAssetDetail.poses && (
                      <div className="flex flex-col gap-2 border-t border-[#1f2833]/30 pt-3">
                        <span className="text-[11px] font-mono text-slate-400 font-bold">Poses Alpha-Correction Specs</span>
                        <div className="flex flex-col gap-3 bg-[#0b0c10] p-3 rounded border border-[#1f2833]/30 max-h-72 overflow-y-auto">
                          {selectedAssetDetail.poses.map((pose: any) => (
                            <div key={pose.poseId} className="flex flex-col gap-1 border-b border-slate-900 pb-2.5 last:border-0 last:pb-0 text-left text-[10px] font-mono">
                              <div className="flex justify-between items-center border-b border-slate-900/60 pb-1">
                                <span className="text-white font-bold uppercase text-[11px]">{pose.poseId}</span>
                                <span className="text-amber-500 font-semibold">{pose.status}</span>
                              </div>
                              <div className="grid grid-cols-1 gap-0.5 text-slate-400">
                                <div><span className="text-[#00ffcc]">Path:</span> <span className="text-slate-200 select-all">{pose.path}</span></div>
                                {pose.sourceJpg && (
                                  <>
                                    <div><span className="text-[#c5a059]">Source JPG:</span> <span className="text-slate-300">{pose.sourceJpg}</span></div>
                                    <div><span className="text-[#c5a059]">Derivative File:</span> <span className="text-slate-300">{pose.derivativeFile}</span></div>
                                    <div><span className="text-[#c5a059]">Format:</span> <span className="text-slate-300">{pose.format}</span></div>
                                    <div><span className="text-[#c5a059]">Dimensions:</span> <span className="text-slate-300">{pose.dimensions}</span></div>
                                    <div><span className="text-[#00ffcc]">Alpha Channel:</span> <span className="text-slate-300">{pose.alphaChannelVerification}</span></div>
                                    <div><span className="text-[#00ffcc]">Edge Quality:</span> <span className="text-[#00ffcc]">{pose.edgeQuality}</span></div>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* For standalone props and effects with alpha-correction fields */}
                    {selectedAssetDetail.sourceJpg && !selectedAssetDetail.poses && (
                      <div className="flex flex-col gap-2 border-t border-[#1f2833]/30 pt-3 text-[10px] font-mono text-left">
                        <span className="text-[11px] text-slate-400 font-bold">Alpha-Correction Spec Card</span>
                        <div className="bg-[#0b0c10] border border-[#1f2833]/30 p-3 rounded flex flex-col gap-1.5 text-slate-300 leading-normal">
                          <div><span className="text-[#00ffcc]">Production Path:</span> <span className="text-slate-100 select-all block mt-0.5 truncate">{selectedAssetDetail.path}</span></div>
                          <div><span className="text-[#c5a059]">Source JPG Ref:</span> <span className="text-slate-100 block mt-0.5 truncate">{selectedAssetDetail.sourceJpg}</span></div>
                          <div><span className="text-[#c5a059]">Derivative PNG:</span> <span className="text-slate-100 block mt-0.5 truncate">{selectedAssetDetail.derivativeFile}</span></div>
                          <div className="grid grid-cols-2 gap-2 mt-1 border-t border-slate-900 pt-1.5">
                            <div><span className="text-[#c5a059] block text-[9px] uppercase">Format</span><span className="text-slate-200">{selectedAssetDetail.format}</span></div>
                            <div><span className="text-[#c5a059] block text-[9px] uppercase">Dimensions</span><span className="text-slate-200">{selectedAssetDetail.dimensions}</span></div>
                          </div>
                          <div className="mt-1 border-t border-slate-900 pt-1.5">
                            <span className="text-[#00ffcc] block text-[9px] uppercase">Alpha Channel Verification</span>
                            <span className="text-slate-200">{selectedAssetDetail.alphaChannelVerification}</span>
                          </div>
                          <div className="mt-1 border-t border-slate-900 pt-1.5">
                            <span className="text-[#00ffcc] block text-[9px] uppercase">Edge Quality Result</span>
                            <span className="text-[#00ffcc] font-semibold">{selectedAssetDetail.edgeQuality}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedAssetDetail.config && (
                      <div className="flex flex-col gap-2 border-t border-[#1f2833]/30 pt-3">
                        <span className="text-[11px] font-mono text-slate-400">Mathematical Keyframes</span>
                        <pre className="bg-[#0b0c10] p-3 rounded text-[10px] font-mono text-slate-300 overflow-x-auto border border-[#1f2833]/30">
                          {JSON.stringify(selectedAssetDetail.config, null, 2)}
                        </pre>
                      </div>
                    )}

                    {selectedAssetDetail.stems && (
                      <div className="flex flex-col gap-2 border-t border-[#1f2833]/30 pt-3">
                        <span className="text-[11px] font-mono text-slate-400">Audio Stem Nodes</span>
                        <div className="flex flex-col gap-1">
                          {selectedAssetDetail.stems.map((stem: any) => (
                            <div key={stem.stemId} className="flex flex-col bg-[#0b0c10] p-2 rounded text-[10px] font-mono border border-slate-900 text-left">
                              <span className="text-white font-bold">{stem.stemId}</span>
                              <span className="text-slate-500 truncate">{stem.path}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                    <Database className="w-8 h-8 text-slate-600 mb-2" />
                    <span className="text-xs text-slate-400">
                      Select any asset from the warehouse lists to inspect its prompt blueprints and coordinates.
                    </span>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ======================================= */}
        {/* TAB 4: PIPELINE VALIDATOR               */}
        {/* ======================================= */}
        {tab === "validator" && (
          <div className="flex flex-col gap-8 animate-fadeIn text-left">
            
            {/* Split Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Validation Status & Reports (2 cols) */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* Result Hero */}
                <div className="border border-[#1f2833]/40 bg-[#0d121c]/60 rounded-xl p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[#1f2833]/30 pb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#00ffcc]" />
                      <h3 className="text-md font-semibold text-white">Live Pipeline Audit Report</h3>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Run: 2026-09-24</span>
                  </div>

                  {validationReport ? (
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-3">
                        {validationReport.success ? (
                          <div className="w-3 h-3 rounded-full bg-[#00ffcc] shadow-[0_0_8px_rgba(0,255,204,0.6)]"></div>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-[#ff0055]"></div>
                        )}
                        <span className="text-sm font-mono font-semibold text-white uppercase tracking-wide">
                          {validationReport.success ? "Pipeline Passed Schema Audit" : "Pipeline Failed Audit"}
                        </span>
                      </div>

                      {/* Warnings and Errors tables */}
                      <div className="flex flex-col gap-4 font-mono text-xs">
                        
                        {/* Errors */}
                        {validationReport.errors.length > 0 && (
                          <div className="flex flex-col gap-2">
                            <span className="text-[11px] text-[#ff0055] font-bold">Errors Detected:</span>
                            <div className="bg-[#ff0055]/5 border border-[#ff0055]/30 p-4 rounded-lg flex flex-col gap-2">
                              {validationReport.errors.map((err, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                                  <AlertTriangle className="w-3.5 h-3.5 text-[#ff0055] mt-0.5 shrink-0" />
                                  <span>{err}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Warnings */}
                        {validationReport.warnings.length > 0 && (
                          <div className="flex flex-col gap-2">
                            <span className="text-[11px] text-amber-500 font-bold">Convention Warnings (Informational):</span>
                            <div className="bg-amber-500/5 border border-amber-500/30 p-4 rounded-lg flex flex-col gap-2">
                              {validationReport.warnings.map((warn, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                                  <span>{warn}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {validationReport.errors.length === 0 && (
                          <div className="bg-[#00ffcc]/5 border border-[#00ffcc]/20 p-4 rounded-lg flex items-center gap-2.5 text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#00ffcc] shrink-0" />
                            <span>Zero critical validation errors detected. All schemas conforming to Manifest standard v1.1.0 with needs-review lifecycle states.</span>
                          </div>
                        )}

                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 py-8 text-center">
                      Run studio audit to compile dynamic manifest sanity checks.
                    </div>
                  )}
                </div>

                {/* File Tree Visualizer */}
                <div className="border border-[#1f2833]/40 bg-[#0d121c]/40 rounded-xl p-6 flex flex-col gap-4">
                  <h3 className="text-md font-semibold text-white flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-[#00ffcc]" />
                    Asset Warehouse File Tree
                  </h3>
                  
                  <div className="bg-[#0b0c10] border border-[#1f2833]/30 p-5 rounded-lg font-mono text-[11px] leading-relaxed max-h-80 overflow-y-auto">
                    <div className="text-[#00ffcc] mb-2 font-bold select-none">/agenticum-production/</div>
                    
                    <div className="flex flex-col gap-1.5 pl-4">
                      {FOLDER_TREE.map((node, index) => (
                        <div key={index} className="flex flex-col gap-1 text-left">
                          <span className="text-slate-200 select-none">├── 📁 {node.name}/</span>
                          
                          <div className="flex flex-col gap-1 pl-6 border-l border-[#1f2833]/30 ml-2">
                            {node.children.map((child: any, childIdx) => {
                              if (typeof child === "object") {
                                return (
                                  <div key={childIdx} className="flex flex-col gap-1">
                                    <span className="text-slate-400 select-none">├── 📁 {child.name}/</span>
                                    <div className="flex flex-col gap-1 pl-6 border-l border-[#1f2833]/30 ml-2">
                                      {child.children.map((sub: any, subIdx: number) => {
                                        if (typeof sub === "object") {
                                          return (
                                            <div key={subIdx} className="flex flex-col gap-1">
                                              <span className="text-slate-400 select-none">├── 📁 {sub.name}/</span>
                                              <div className="flex flex-col gap-1 pl-6 border-l border-[#1f2833]/30 ml-2">
                                                {sub.children.map((subsub: string, subsubIdx: number) => (
                                                  <span key={subsubIdx} className="text-slate-500">├── 📄 {subsub}</span>
                                                ))}
                                              </div>
                                            </div>
                                          );
                                        }
                                        return <span key={subIdx} className="text-slate-500">├── 📄 {sub}</span>;
                                      })}
                                    </div>
                                  </div>
                                );
                              }
                              return (
                                <span key={childIdx} className="text-slate-500">├── 📄 {child}</span>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Right panel: Schema documentation */}
              <div className="border border-[#1f2833]/40 bg-[#0d121c]/60 rounded-xl p-6 flex flex-col gap-5 text-left">
                <h3 className="text-md font-semibold text-white">Validation Rules</h3>
                
                <div className="flex flex-col gap-4 text-xs leading-relaxed text-slate-400">
                  <div className="flex flex-col gap-1.5 border-b border-[#1f2833]/30 pb-3">
                    <span className="text-white font-mono font-bold text-[11px]">Character ID Rule</span>
                    <span>Regex: <code className="text-[#00ffcc] font-mono bg-[#0b0c10] px-1 py-0.5 rounded">^CH_[A-Z0-9_]+$</code></span>
                    <span>Ensures character identifiers are completely capital snake-case strings prefix-bound.</span>
                  </div>

                  <div className="flex flex-col gap-1.5 border-b border-[#1f2833]/30 pb-3">
                    <span className="text-white font-mono font-bold text-[11px]">World ID Rule</span>
                    <span>Regex: <code className="text-[#00ffcc] font-mono bg-[#0b0c10] px-1 py-0.5 rounded">^WD_[A-Z0-9_]+$</code></span>
                    <span>Ensures world grids match coordinates prefix structures perfectly.</span>
                  </div>

                  <div className="flex flex-col gap-1.5 border-b border-[#1f2833]/30 pb-3">
                    <span className="text-white font-mono font-bold text-[11px]">Integrity Rule</span>
                    <span>All referenced visual assets inside active Episode JSON scripts must point to registered, existing manifest blocks.</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-white font-mono font-bold text-[11px]">Pose Matching Rule</span>
                    <span>All asset files are inspected to ensure visual files end strictly with the defined <code className="text-[#c5a059] font-mono">&lt;ID&gt;_&lt;poseId&gt;.png</code> pattern.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#1f2833]/40 py-6 text-center text-xs text-slate-500 font-mono shrink-0 select-none bg-[#0b0c10]">
        Agenticum Production Center · Phase 3 Audit & Review Suite · Built with Taste
      </footer>

    </div>
  );
}
