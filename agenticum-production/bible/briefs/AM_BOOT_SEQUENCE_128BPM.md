# Asset Brief: AM_EP001_128BPM_CMINOR ("BOOT SEQUENCE Music Track")

This document outlines the acoustic architecture, stem layouts, rhythmic timing grids, and dynamic ducking criteria for the master backing instrumental score of Episode 001.

---

## 1. Track Overview & Technical Parameters

*   **Asset ID**: `AM_EP001_128BPM_CMINOR`
*   **Asset Type**: Multi-Stem Backing Instrumental Track
*   **Version**: `1.0.0`
*   **Target Status (Initial)**: `briefed`
*   **Tempo (BPM)**: Exactly `128.0 BPM` ($468.75\text{ms}$ per quarter beat).
*   **Tonal Key**: Dominant **C minor** (invokes high synthetic gravity and cosmic scale).
*   **Duration**: Exactly `90.0 seconds` ($2700\text{ frames}$ at 30fps).
*   **Acoustic Target Standards**: 
    *   $-14\text{ LUFS}$ integrated master loudness.
    *   True peak ceiling at $-1.0\text{ dBTP}$.

---

## 2. Multi-Stem Layout & Dynamic Balance

To facilitate high-end mixing and dynamic voiceover clarity, the backing track is divided into four separate, high-purity stems. To ensure compatibility with low-end mobile speakers (YouTube Shorts platform), all bass layers are high-passed at $30\text{ Hz}$ to avoid muddying:

### 1. STEM_MUSIC_DRUMS (`AM_EP001_128_BPM_Cm_drums.wav`)
*   **Description**: The industrial mechanical heartbeat.
*   **Elements**: Tight, punchy synthetic kick on beats 1 and 3; heavy, clean surgical steel-rim snare on beats 2 and 4. Faint 16th-note closed hi-hat lines introduce speed.
*   **Low-End Treatment**: High-passed at $45\text{ Hz}$. Kick fundamental frequency centered at $55\text{ Hz}$.

### 2. STEM_MUSIC_BASS (`AM_EP001_128_BPM_Cm_bass.wav`)
*   **Description**: Rhythmic driving pulse.
*   **Elements**: A driving, rolling 16th-note sawtooth synth-bass line humming on the key of C minor. High harmonic presence to preserve readability on mobile speakers.
*   **Low-End Treatment**: Strictly high-passed at $30\text{ Hz}$. Low-shelf attenuation of $-3\text{ dB}$ at $80\text{ Hz}$ to make room for the kick.

### 3. STEM_MUSIC_LEADS (`AM_EP001_128_BPM_Cm_leads.wav`)
*   **Description**: Deep atmospheric space pad and melodic aura.
*   **Elements**: Soaring square-wave lead synthesizers, modulated with a slow LFO filter sweep and heavy delay/reverb (ping-pong delay, $1/8\text{-note}$ duration).
*   **Treatment**: Notch filter applied at $1\text{ kHz}$ to $2.5\text{ kHz}$ (retaining a clean acoustic "dialogue basket" for the voiceovers).

---

## 3. Dynamic Voiceover Ducking & Mix Integration

To maintain impeccable narrative clarity (gripping dialogue delivery), the player or timeline compiler must enforce strict automated dynamic ducking:

*   **Dialogue Priority Level**: STEM_VOICEOVER is the supreme acoustic layer, targeted at $-18\text{ LUFS}$ integrated.
*   **Ducking Amplitude**: Whenever a voiceover audio node triggers, the master music tracks (`STEM_MUSIC_DRUMS`, `STEM_MUSIC_BASS`, and `STEM_MUSIC_LEADS`) must attenuate by **$-6\text{ dB}$** instantly.
*   **Ducking Envelope**:
    *   **Attack**: Instant (0ms, synchronous with voiceover start).
    *   **Release**: Smooth linear ramp over exactly **$250\text{ms}$** (quarter-beat length) back to nominal volume ($100\%$) once the voiceover node finishes execution.
*   **Seamless Loop Target**: The final frame's music volumes and waveforms must match the initial frame perfectly, allowing infinite loop playback on mobile devices.
