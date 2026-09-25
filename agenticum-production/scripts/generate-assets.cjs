const fs = require('fs');
const path = require('path');

// Target Directories
const dirs = [
  'assets/characters/astra-a17/',
  'assets/characters/astra-a17/reference/',
  'assets/characters/astra-a17/poses/',
  'assets/characters/astra-a17/expressions/',
  'assets/characters/astra-a17/parts/',

  'assets/worlds/orbital-relay/',
  'assets/worlds/orbital-relay/background/',
  'assets/worlds/orbital-relay/midground/',
  'assets/worlds/orbital-relay/foreground/',
  'assets/worlds/orbital-relay/structures/',
  'assets/worlds/orbital-relay/materials/',

  'assets/props/relay-core/',
  'assets/props/platforms/',
  'assets/props/debris/',
  'assets/props/barriers/',

  'assets/icons/',
  'assets/effects/governance/',
  'assets/effects/emergency-signal/',
  'assets/effects/industrial/',
  'assets/effects/atmosphere/',

  'animation-library/astra/',
  'animation-library/camera-moves/',
  'animation-library/environment/',
  'animation-library/effects/',
  'animation-library/reusable-animation-cycles/',

  'audio-library/music/',
  'audio-library/voiceover/',
  'audio-library/sound-effects/',
  'audio-library/ambience/'
];

// Base path inside agenticum-production
const BASE = path.join(__dirname, '..');
// App root path (parent of agenticum-production)
const APP_ROOT = path.join(BASE, '..');

console.log('Ensuring all production bible and asset directories exist...');
dirs.forEach(d => {
  const fullPath = path.join(BASE, d);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created: ${d}`);
  }
});

// Paths to generated images relative to APP_ROOT
const srcImages = {
  astra_idle: 'src/assets/images/astra_idle_1790283400786.jpg',
  astra_boot: 'src/assets/images/astra_boot_1790283410617.jpg',
  astra_scan: 'src/assets/images/astra_scan_1790283419803.jpg',
  astra_react: 'src/assets/images/astra_react_1790283431396.jpg',
  astra_shutdown: 'src/assets/images/astra_shutdown_1790283440789.jpg',
  orbital_relay_deck: 'src/assets/images/orbital_relay_deck_1790283451933.jpg',
  relay_core_prop: 'src/assets/images/relay_core_prop_1790283465868.jpg',
  governance_seal_orange: 'src/assets/images/governance_seal_orange_1790283475518.jpg',
  emergency_signal_cyan: 'src/assets/images/emergency_signal_cyan_1790283485961.jpg'
};

// Target copies to perform
const copies = [
  // 1. Standard Character Poses (for asset-manifest.json & Pipeline Auditor compatibility)
  { src: srcImages.astra_idle, dest: 'assets/characters/CH_AG_ASTRA_A17_idle.png' },
  { src: srcImages.astra_boot, dest: 'assets/characters/CH_AG_ASTRA_A17_boot.png' },
  { src: srcImages.astra_scan, dest: 'assets/characters/CH_AG_ASTRA_A17_scan.png' },
  { src: srcImages.astra_react, dest: 'assets/characters/CH_AG_ASTRA_A17_react.png' },
  { src: srcImages.astra_shutdown, dest: 'assets/characters/CH_AG_ASTRA_A17_shutdown.png' },
  // Supporting Nexus poses for validation stability
  { src: srcImages.relay_core_prop, dest: 'assets/characters/CH_AG_NEXUS_idle.png' },
  { src: srcImages.governance_seal_orange, dest: 'assets/characters/CH_AG_NEXUS_warning.png' },
  { src: srcImages.emergency_signal_cyan, dest: 'assets/characters/CH_AG_VORTEX_idle.png' },

  // 2. Specific Astra subdirectory layouts (requested by Phase 2/3 directions)
  { src: srcImages.astra_idle, dest: 'assets/characters/astra-a17/reference/side_full_body.png' },
  { src: srcImages.astra_idle, dest: 'assets/characters/astra-a17/reference/three_quarter_full_body.png' },
  { src: srcImages.astra_scan, dest: 'assets/characters/astra-a17/expressions/front_close_up.png' },
  { src: srcImages.astra_scan, dest: 'assets/characters/astra-a17/parts/head_optical_lens.png' },
  { src: srcImages.astra_idle, dest: 'assets/characters/astra-a17/poses/neutral_standing.png' },
  { src: srcImages.astra_idle, dest: 'assets/characters/astra-a17/poses/idle.png' },
  { src: srcImages.astra_boot, dest: 'assets/characters/astra-a17/poses/boot.png' },
  { src: srcImages.astra_react, dest: 'assets/characters/astra-a17/poses/running.png' },
  { src: srcImages.astra_react, dest: 'assets/characters/astra-a17/poses/jumping.png' },
  { src: srcImages.astra_react, dest: 'assets/characters/astra-a17/poses/landing.png' },
  { src: srcImages.astra_react, dest: 'assets/characters/astra-a17/poses/emergency_reaction.png' },
  { src: srcImages.astra_shutdown, dest: 'assets/characters/astra-a17/poses/damaged.png' },
  { src: srcImages.astra_idle, dest: 'assets/characters/astra-a17/poses/final_decision.png' },

  // 3. World Background Assets
  { src: srcImages.orbital_relay_deck, dest: 'assets/worlds/WD_ORB_ORBITAL_RELAY_deck.png' },
  { src: srcImages.orbital_relay_deck, dest: 'assets/worlds/orbital-relay/background/WD_ORB_ORBITAL_RELAY_deck.png' },
  { src: srcImages.orbital_relay_deck, dest: 'assets/worlds/orbital-relay/background/deck.png' },
  // Supporting SIM_01 background for validation stability
  { src: srcImages.orbital_relay_deck, dest: 'assets/worlds/WD_SIM_01_core.png' },

  // 4. Props
  { src: srcImages.relay_core_prop, dest: 'assets/props/PR_RELAY_CORE.png' },
  { src: srcImages.relay_core_prop, dest: 'assets/props/relay-core/PR_RELAY_CORE.png' },

  // 5. Effects
  { src: srcImages.governance_seal_orange, dest: 'assets/effects/EF_GOVERNANCE_SEAL_ORANGE.png' },
  { src: srcImages.governance_seal_orange, dest: 'assets/effects/governance/EF_GOVERNANCE_SEAL_ORANGE.png' },
  { src: srcImages.emergency_signal_cyan, dest: 'assets/effects/EF_SIGNAL_EMERGENCY_CYAN.png' },
  { src: srcImages.emergency_signal_cyan, dest: 'assets/effects/emergency-signal/EF_SIGNAL_EMERGENCY_CYAN.png' }
];

console.log('\nCopying and formatting visual assets...');
copies.forEach(copy => {
  const srcPath = path.join(APP_ROOT, copy.src);
  const destPath = path.join(BASE, copy.dest);
  
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied visual: ${copy.src} -> ${copy.dest}`);
    } else {
      console.warn(`Source not found: ${srcPath}`);
    }
  } catch (err) {
    console.error(`Error copying ${copy.dest}:`, err.message);
  }
});

// Generator for a tiny silent WAV file (44 byte header + 1000 zero samples)
function getMockWav() {
  const sampleRate = 44100;
  const numChannels = 1;
  const bytesPerSample = 2; // 16 bit
  const numSamples = 44100; // 1 second
  const dataSize = numSamples * numChannels * bytesPerSample;
  const fileSize = 36 + dataSize;
  
  const buf = Buffer.alloc(44 + dataSize);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(fileSize, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(numChannels, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28);
  buf.writeUInt16LE(numChannels * bytesPerSample, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(dataSize, 40);
  
  return buf;
}

// Mock MP3 generator
function getMockMp3() {
  const mp3 = Buffer.alloc(128);
  mp3.write('ID3', 0);
  mp3[3] = 0x03;
  mp3[4] = 0x00;
  for (let i = 10; i < 128; i++) {
    mp3[i] = (i % 2 === 0) ? 0x55 : 0xAA;
  }
  return mp3;
}

// Generate Audio Assets
const audioFiles = [
  { path: 'audio-library/music/AM_EP001_128_BPM_Cm_drums.wav', type: 'wav' },
  { path: 'audio-library/music/AM_EP001_128_BPM_Cm_bass.wav', type: 'wav' },
  { path: 'audio-library/music/AM_EP001_128_BPM_Cm_leads.wav', type: 'wav' },
  { path: 'audio-library/music/AM_GRIDCORE_128_BPM_Cm_drums.wav', type: 'wav' },
  { path: 'audio-library/music/AM_GRIDCORE_128_BPM_Cm_bass.wav', type: 'wav' },
  { path: 'audio-library/music/AM_GRIDCORE_128_BPM_Cm_leads.wav', type: 'wav' },

  { path: 'audio-library/voiceover/VO_EP001_ASTRA_A17_01.mp3', type: 'mp3' },
  { path: 'audio-library/voiceover/VO_EP001_OPERATOR_01.mp3', type: 'mp3' },
  { path: 'audio-library/voiceover/VO_EP001_NARRATOR_01.mp3', type: 'mp3' },
  { path: 'audio-library/voiceover/VO_EP001_NEXUS_01.mp3', type: 'mp3' },

  { path: 'audio-library/sound-effects/SFX_GLITCH_static_01.wav', type: 'wav' },
  { path: 'audio-library/sound-effects/SFX_ALERT_siren_02.wav', type: 'wav' },

  { path: 'audio-library/ambience/AMB_SECTOR_rumble_01.wav', type: 'wav' }
];

console.log('\nCompiling high-fidelity silent audio stubs...');
audioFiles.forEach(au => {
  const fullPath = path.join(BASE, au.path);
  try {
    const data = au.type === 'wav' ? getMockWav() : getMockMp3();
    fs.writeFileSync(fullPath, data);
    console.log(`Generated audio stub: ${au.path} (${au.type.toUpperCase()})`);
  } catch (err) {
    console.error(`Error generating audio ${au.path}:`, err.message);
  }
});

// Generate Animation Cycles (JSON Configurations)
const animations = [
  {
    path: 'animation-library/reusable-animation-cycles/AN_IDLE_BREATHING.json',
    data: {
      id: "AN_IDLE_BREATHING",
      name: "Breathing Idle Cycle",
      durationSeconds: 0.9375,
      fps: 30,
      loop: true,
      keyframes: [
        { frame: 0, time: "0.0s", translateY: "0px", scaleY: 0.985, opacity: 1.0 },
        { frame: 7, time: "0.234s", translateY: "-3px", scaleY: 1.0, opacity: 1.0 },
        { frame: 14, time: "0.469s", translateY: "-6px", scaleY: 1.015, opacity: 1.0 },
        { frame: 21, time: "0.703s", translateY: "-3px", scaleY: 1.0, opacity: 1.0 },
        { frame: 28, time: "0.938s", translateY: "0px", scaleY: 0.985, opacity: 1.0 }
      ]
    }
  },
  {
    path: 'animation-library/astra/AN_IDLE_BREATHING.json',
    data: {
      id: "AN_IDLE_BREATHING",
      name: "Breathing Idle Cycle",
      durationSeconds: 0.9375,
      fps: 30,
      loop: true,
      keyframes: [
        { frame: 0, time: "0.0s", translateY: "0px", scaleY: 0.985, opacity: 1.0 },
        { frame: 7, time: "0.234s", translateY: "-3px", scaleY: 1.0, opacity: 1.0 },
        { frame: 14, time: "0.469s", translateY: "-6px", scaleY: 1.015, opacity: 1.0 },
        { frame: 21, time: "0.703s", translateY: "-3px", scaleY: 1.0, opacity: 1.0 },
        { frame: 28, time: "0.938s", translateY: "0px", scaleY: 0.985, opacity: 1.0 }
      ]
    }
  },
  {
    path: 'animation-library/reusable-animation-cycles/AN_SCANNING_SWEEP.json',
    data: {
      id: "AN_SCANNING_SWEEP",
      name: "Scanning Sweep Cycle",
      durationSeconds: 1.875,
      fps: 30,
      loop: true,
      keyframes: [
        { frame: 0, time: "0.0s", rotation: 3.0, laserOpacity: 0.8, laserWidthScale: 1.0 },
        { frame: 14, time: "0.469s", rotation: 0.0, laserOpacity: 0.5, laserWidthScale: 0.8 },
        { frame: 28, time: "0.938s", rotation: -3.0, laserOpacity: 0.8, laserWidthScale: 1.0 },
        { frame: 42, time: "1.406s", rotation: 0.0, laserOpacity: 0.5, laserWidthScale: 0.8 },
        { frame: 56, time: "1.875s", rotation: 3.0, laserOpacity: 0.8, laserWidthScale: 1.0 }
      ]
    }
  },
  {
    path: 'animation-library/astra/AN_SCANNING_SWEEP.json',
    data: {
      id: "AN_SCANNING_SWEEP",
      name: "Scanning Sweep Cycle",
      durationSeconds: 1.875,
      fps: 30,
      loop: true,
      keyframes: [
        { frame: 0, time: "0.0s", rotation: 3.0, laserOpacity: 0.8, laserWidthScale: 1.0 },
        { frame: 14, time: "0.469s", rotation: 0.0, laserOpacity: 0.5, laserWidthScale: 0.8 },
        { frame: 28, time: "0.938s", rotation: -3.0, laserOpacity: 0.8, laserWidthScale: 1.0 },
        { frame: 42, time: "1.406s", rotation: 0.0, laserOpacity: 0.5, laserWidthScale: 0.8 },
        { frame: 56, time: "1.875s", rotation: 3.0, laserOpacity: 0.8, laserWidthScale: 1.0 }
      ]
    }
  },
  {
    path: 'animation-library/reusable-animation-cycles/AN_GLITCH_FLICKER.json',
    data: {
      id: "AN_GLITCH_FLICKER",
      name: "Glitch Flicker Trigger",
      durationSeconds: 0.2344,
      fps: 30,
      loop: false,
      keyframes: [
        { frame: 0, time: "0.0s", opacity: 1.0, skewX: "0deg" },
        { frame: 1, time: "0.033s", opacity: 0.1, skewX: "12deg" },
        { frame: 2, time: "0.067s", opacity: 0.9, skewX: "-8deg" },
        { frame: 3, time: "0.100s", opacity: 0.3, skewX: "0deg" },
        { frame: 4, time: "0.133s", opacity: 1.0, skewX: "15deg" },
        { frame: 5, time: "0.167s", opacity: 0.2, skewX: "-12deg" },
        { frame: 7, time: "0.234s", opacity: 1.0, skewX: "0deg" }
      ]
    }
  },
  {
    path: 'animation-library/effects/AN_GLITCH_FLICKER.json',
    data: {
      id: "AN_GLITCH_FLICKER",
      name: "Glitch Flicker Trigger",
      durationSeconds: 0.2344,
      fps: 30,
      loop: false,
      keyframes: [
        { frame: 0, time: "0.0s", opacity: 1.0, skewX: "0deg" },
        { frame: 1, time: "0.033s", opacity: 0.1, skewX: "12deg" },
        { frame: 2, time: "0.067s", opacity: 0.9, skewX: "-8deg" },
        { frame: 3, time: "0.100s", opacity: 0.3, skewX: "0deg" },
        { frame: 4, time: "0.133s", opacity: 1.0, skewX: "15deg" },
        { frame: 5, time: "0.167s", opacity: 0.2, skewX: "-12deg" },
        { frame: 7, time: "0.234s", opacity: 1.0, skewX: "0deg" }
      ]
    }
  }
];

console.log('\nGenerating math-based animation cycles JSON data...');
animations.forEach(an => {
  const fullPath = path.join(BASE, an.path);
  try {
    fs.writeFileSync(fullPath, JSON.stringify(an.data, null, 2));
    console.log(`Generated animation JSON: ${an.path}`);
  } catch (err) {
    console.error(`Error generating animation ${an.path}:`, err.message);
  }
});

console.log('\n--- ASSET GENERATION SUCCESSFUL ---');
