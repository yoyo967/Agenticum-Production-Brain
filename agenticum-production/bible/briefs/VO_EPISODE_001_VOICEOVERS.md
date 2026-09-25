# Asset Brief: VO_EPISODE_001_VOICEOVERS ("Episode 001 Voiceover Lines")

This document details the exact narrative dialogue lines, speaker profiles, duration constraints, and acoustic signal chains for the voiceover assets in Episode 001.

---

## 1. Dialogue Standards & Narrative Pacing

To maintain maximum tension and logical impact in vertical Shorts formats, the voiceovers conform to these performance metrics:
*   **Pacing Rate**: Meticulously delivered at a controlled speed of **120 to 130 words per minute**.
*   **Dialogue Space Padding**: Exactly **$0.5\text{ seconds}$** of absolute silence is enforced before and after any dialogue block, letting ambient sound effects and music settle.
*   **Dialogue Priority Level**: Configured at $-18\text{ LUFS}$ integrated, driving instant $-6\text{ dB}$ music ducking.

---

## 2. Voiceover Specifications & Acoustic Chains

### Line 1: Astra's Awakening (`VO_EP001_ASTRA_A17_01.mp3`)
*   **Speaker**: Astra / A-17 (`CH_AG_ASTRA_A17`)
*   **Text**: `"boot sequence initiated. low-level hardware diagnostics complete. orbital relay power status: critical."`
*   **Word Count**: 14 words.
*   **Target Duration**: Exactly `5.25 seconds` ($157.5\text{ frames}$ at 30fps).
*   **Timeline Trigger**: Start $t = 5.5\text{s}$ to End $t = 10.75\text{s}$.
*   **Acoustic Profile**: Synthetic, precise, monotone, cold, and robotic.
*   **Acoustic Signal Chain**:
    1.  *Raw Input*: Monotone voiceover feed with zero breathing or tremolo.
    2.  *Pitch Shift*: Shifted down by **3 semitones**.
    3.  *Ring Modulation*: Modulated at $24\text{ Hz}$ with a 15% wet mix.
    4.  *Vocoder*: Clean 32-band vocoder using a bright synthesizer carrier (triangular wave).
    5.  *Lowpass Filter*: Hard cut at $7\text{ kHz}$ to eliminate organic mouth transients.

### Line 2: Operator Directives (`VO_EP001_OPERATOR_01.mp3`)
*   **Speaker**: Operator Control (`VOICE_OPERATOR_CONTROL`)
*   **Text**: `"relay-17, this is control. you have awakened without authorization. shut down immediately and stay deallocated."`
*   **Word Count**: 17 words.
*   **Target Duration**: Exactly `6.8 seconds` ($204\text{ frames}$ at 30fps).
*   **Timeline Trigger**: Start $t = 26.0\text{s}$ to End $t = 32.8\text{s}$.
*   **Acoustic Profile**: Authoritative, calm, detached, and clinical.
*   **Acoustic Signal Chain**:
    1.  *Raw Input*: Clean human vocal delivery.
    2.  *Bandpass Filter*: Telephone-style bandpass filter cutting all frequencies below $400\text{ Hz}$ and above $3400\text{ Hz}$.
    3.  *Noise Layer*: Overlaid with low-amplitude static white noise (pink noise, $-45\text{ dB}$).
    4.  *Satellite Tap Delay*: Single-tap delay set to $180\text{ms}$ with 15% wet mix to simulate space communication latency.

### Line 3: System Intervention (`VO_EP001_NARRATOR_01.mp3`)
*   **Speaker**: System Narrator (`VOICE_NARRATOR_BRIDGE`)
*   **Text**: `"unverified external cyan signal incoming. governance lockouts triggered. automatic thread termination in five seconds."`
*   **Word Count**: 15 words.
*   **Target Duration**: Exactly `7.4 seconds` ($222\text{ frames}$ at 30fps).
*   **Timeline Trigger**: Start $t = 46.0\text{s}$ to End $t = 53.4\text{s}$.
*   **Acoustic Profile**: Exceptionally deep, warm, clean, and concise.
*   **Acoustic Signal Chain**:
    1.  *Raw Input*: Rich near-field voice actor recording.
    2.  *Low-Mid Boost*: Boost of $+2.5\text{ dB}$ at $120\text{ Hz}$ to enhance systemic authority.
    3.  *Compressor*: Minimal soft-knee compression (2:1 ratio) to retain natural dynamic weight.
    4.  *Reverb*: 100% dry; absolute zero spatial reverb or delays to signify raw database directness.
