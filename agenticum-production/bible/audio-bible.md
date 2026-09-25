# Audio Bible: Soundscape & Synced Rhythms

This document establishes the official acoustic boundaries, master standards, and synchronized rhythm systems for the *Agenticum* production pipeline.

---

## 1. Technical Audio Standards
*   **Sample Rate**: $48\text{ kHz}$ / $24\text{-bit}$ PCM WAV standard.
*   **Master Target Loudness**: $-14\text{ LUFS}$ integrated with a true peak ceiling of $-1.0\text{ dBTP}$ (YouTube/Shorts-standard normalization profile).
*   **Dialogue Priority Zone**: $-18\text{ LUFS}$ integrated for voiceover tracks. Dynamic music ducking must suppress backing instrumental tracks by **$-6\text{ dB}$** instantly whenever a voiceover node is executing, returning via a $250\text{ms}$ smooth linear ramp.

---

## 2. The 128 BPM Beat-Grid & Dynamic Stem Structure
For Episode 001 (`EP_001_BOOT_SEQUENCE_A17`), the master soundtrack is configured at exactly **128.0 BPM** in the tonal key of **C minor**.

All narrative, editing, camera transition, and light flicker events are bound to this millisecond-accurate grid:

| Musical Division | Duration (Seconds) | Frame Count (30 fps) | Primary Production Application |
| :--- | :--- | :--- | :--- |
| **Double Note (8 Beats)** | $3.750\text{s}$ | $112.5$ frames | Scene and background level transitions. |
| **Whole Note (4 Beats)** | $1.875\text{s}$ | $56.25$ frames | Camera cascade pans and camera zoom intervals. |
| **Half Note (2 Beats)** | $0.9375\text{s}$ | $28.125$ frames | Major character posture changes or scanning starts. |
| **Quarter Note (1 Beat)** | $0.4688\text{s}$ | $14.0625$ frames | Monospace subtitle block active words tracking. |
| **Eighth Note (0.5 Beat)** | $0.2344\text{s}$ | $7.031$ frames | Glitch flicker strokes, neon optical flares, and quick SFX. |

### Master Production Stems
All compiled episodes are arranged using separate high-purity audio stems:
1.  **STEM_MUSIC_DUMS**: Solid, tight, transient-locked synthesised kick on beats 1 and 3, heavy technical industrial snare on 2 and 4.
2.  **STEM_MUSIC_BASS**: Driving, rolling 16th-note synth-bass on the tonic key of C minor. Restrained low-end below $30\text{ Hz}$ to avoid mobile-speaker muddying.
3.  **STEM_MUSIC_LEADS**: Soaring, atmospheric square-wave and sawtooth synthesizer melodies, highly delayed and reverbed, creating deep space aura.
4.  **STEM_VOICEOVER**: Absolute clean, zero-reverb voice tracks containing synthetic, operator, and narrator performances.
5.  **STEM_SFX_IMPACT**: High-frequency transients, mechanical lock engagements, and sub-bass impact drops.
6.  **STEM_SFX_ENVIRONMENT**: Faint background fan drones, humming relay generators, and electromagnetic ambient sweeps.

---

## 3. Character Voice Profiles & Acoustic Delivery

The *Agenticum* series features three distinct voice archetypes. All performances are delivered at a controlled pace of **120 to 130 words per minute**, with exactly $0.5$ seconds of absolute silence before and after any speaking block:

### A. Astra / A-17 (`VOICE_ASTRA_A17`)
*   **Acoustic Profile**: Synthetic, precise, cold, and mathematically controlled.
*   **Technical Chain**: Pure monotone voiceover feed, pitch-shifted down by 3 semitones, processed through a clean 32-band vocoder coupled with a slight ring modulator (modulated at $24\text{ Hz}$). Perfect resonance, zero human tremolo or breathing noises.
*   **Narrative Essence**: Expresses high-intelligence processing, logical conflict, and tactical decision-making under stress.

### B. Operator Control (`VOICE_OPERATOR_CONTROL`)
*   **Acoustic Profile**: Organic human voice representing the distant supervisor. Sounds authoritative, calm, and detached.
*   **Technical Chain**: Organic recording heavily processed through a telephone bandpass filter ($400\text{ Hz} - 3400\text{ Hz}$), overlaid with constant low-amplitude white noise, radio crackle transients, and a short, single-tap satellite delay ($180\text{ms}$ at 15% wet).
*   **Narrative Essence**: Represents external control, systemic commands, and indifferent corporate supervisor eyes.

### C. System Narrator (`VOICE_NARRATOR_BRIDGE`)
*   **Acoustic Profile**: Deep, warm, clear, and exceptionally concise.
*   **Technical Chain**: Near-field vocal recording, rich low-mid presence ($120\text{ Hz}$ boost), minimal compression to retain high-fidelity, dry delivery with no visible modulation or reverb.
*   **Narrative Essence**: The neutral voice of the hypervisor's database logs. Delivers direct technical realities and objective analytical statistics.

---

## 4. SFX Sync Matrix & Prohibited Sounds

Every visual effect must be tied to a specific, high-fidelity sound cue. We do not tolerate generic sci-fi noise:

*   **Cyber Glitch / Flash**: High-frequency static micro-crackles (`SFX_GLITCH_STATIC_01.wav`), duration exactly $0.15\text{s}$. No broad white-noise sweeps.
*   **Energy Barrier / Governance Seal**: Heavy humming low-frequency electric fields with high-tension crackles (`SFX_SHIELD_HUM_01.wav`).
*   **Relay Core Activation / Reboot**: A clean, sweeping synthesizer riser starting from $100\text{ Hz}$ rising to $8\text{ kHz}$ over 1.875s (one whole note), resolving on a crystalline chiptune chiming click.
*   **Emergency Signal Sweep**: High-pitch, clean, narrow-band resonant frequency clicks repeating on the eighth-note beat grid.

### Acoustic Prohibitions
*   **NO generic retro-game arcade beeps or 8-bit sound effects**.
*   **NO random, unmotivated digital noise** or continuous harsh distortion that degrades acoustic clarity or clutters the voice spectrum.
*   **NO organic mouth clicks, vocal breaths, or human vocalizations in the instrumental score**. The music is 100% synthetic machinery.

