import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Jimp } from 'jimp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE = path.join(__dirname, '..');
const APP_ROOT = path.join(BASE, '..');

const srcImages = {
  astra_idle: 'src/assets/images/astra_idle_1790283400786.jpg',
  astra_boot: 'src/assets/images/astra_boot_1790283410617.jpg',
  astra_scan: 'src/assets/images/astra_scan_1790283419803.jpg',
  astra_react: 'src/assets/images/astra_react_1790283431396.jpg',
  astra_shutdown: 'src/assets/images/astra_shutdown_1790283440789.jpg',
  relay_core_prop: 'src/assets/images/relay_core_prop_1790283465868.jpg',
  governance_seal_orange: 'src/assets/images/governance_seal_orange_1790283475518.jpg',
  emergency_signal_cyan: 'src/assets/images/emergency_signal_cyan_1790283485961.jpg'
};

const tasks = [
  {
    src: srcImages.astra_boot,
    dest: 'assets/characters/transparent/CH_AG_ASTRA_A17_boot.png',
    id: 'CH_AG_ASTRA_A17_boot',
    bgType: 'white'
  },
  {
    src: srcImages.astra_idle,
    dest: 'assets/characters/transparent/CH_AG_ASTRA_A17_idle.png',
    id: 'CH_AG_ASTRA_A17_idle',
    bgType: 'white'
  },
  {
    src: srcImages.astra_scan,
    dest: 'assets/characters/transparent/CH_AG_ASTRA_A17_scan.png',
    id: 'CH_AG_ASTRA_A17_scan',
    bgType: 'white'
  },
  {
    src: srcImages.astra_react,
    dest: 'assets/characters/transparent/CH_AG_ASTRA_A17_react.png',
    id: 'CH_AG_ASTRA_A17_react',
    bgType: 'white'
  },
  {
    src: srcImages.astra_shutdown,
    dest: 'assets/characters/transparent/CH_AG_ASTRA_A17_shutdown.png',
    id: 'CH_AG_ASTRA_A17_shutdown',
    bgType: 'white'
  },
  {
    src: srcImages.relay_core_prop,
    dest: 'assets/characters/transparent/CH_AG_NEXUS_idle.png',
    id: 'CH_AG_NEXUS_idle',
    bgType: 'auto'
  },
  {
    src: srcImages.governance_seal_orange,
    dest: 'assets/characters/transparent/CH_AG_NEXUS_warning.png',
    id: 'CH_AG_NEXUS_warning',
    bgType: 'auto'
  },
  {
    src: srcImages.emergency_signal_cyan,
    dest: 'assets/characters/transparent/CH_AG_VORTEX_idle.png',
    id: 'CH_AG_VORTEX_idle',
    bgType: 'auto'
  },
  {
    src: srcImages.relay_core_prop,
    dest: 'assets/props/transparent/PR_RELAY_CORE.png',
    id: 'PR_RELAY_CORE',
    bgType: 'auto'
  },
  {
    src: srcImages.governance_seal_orange,
    dest: 'assets/effects/transparent/EF_GOVERNANCE_SEAL_ORANGE.png',
    id: 'EF_GOVERNANCE_SEAL_ORANGE',
    bgType: 'auto'
  },
  {
    src: srcImages.emergency_signal_cyan,
    dest: 'assets/effects/transparent/EF_SIGNAL_EMERGENCY_CYAN.png',
    id: 'EF_SIGNAL_EMERGENCY_CYAN',
    bgType: 'auto'
  }
];

// Helper to get pixel components from a Jimp 1.x buffer
function getPixel(data, x, y, width) {
  const idx = (y * width + x) * 4;
  return {
    r: data[idx],
    g: data[idx + 1],
    b: data[idx + 2],
    a: data[idx + 3]
  };
}

// Normalized Euclidean color distance in RGB space
function colorDist(r1, g1, b1, r2, g2, b2) {
  const rDiff = r1 - r2;
  const gDiff = g1 - g2;
  const bDiff = b1 - b2;
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff) / 441.67;
}

async function runCorrection() {
  console.log('--- STARTING ALPHA CHANNEL CORRECTION PASS ---');
  
  for (const t of tasks) {
    const srcPath = path.join(APP_ROOT, t.src);
    const destPath = path.join(BASE, t.dest);

    if (!fs.existsSync(srcPath)) {
      console.warn(`Source file not found: ${srcPath}`);
      continue;
    }

    console.log(`\nAnalyzing asset ${t.id} from ${t.src}...`);
    const img = await Jimp.read(srcPath);
    const width = img.bitmap.width;
    const height = img.bitmap.height;
    const data = img.bitmap.data;

    // Sample corners
    const corners = [
      getPixel(data, 0, 0, width),
      getPixel(data, width - 1, 0, width),
      getPixel(data, 0, height - 1, width),
      getPixel(data, width - 1, height - 1, width)
    ];

    let avgR = 0, avgG = 0, avgB = 0;
    for (const c of corners) {
      avgR += c.r;
      avgG += c.g;
      avgB += c.b;
    }
    avgR /= 4;
    avgG /= 4;
    avgB /= 4;

    let bgR = 255;
    let bgG = 255;
    let bgB = 255;
    let isWhiteBg = true;

    if (t.bgType === 'white') {
      isWhiteBg = true;
      bgR = 255; bgG = 255; bgB = 255;
    } else if (t.bgType === 'black') {
      isWhiteBg = false;
      bgR = 0; bgG = 0; bgB = 0;
    } else {
      // Auto detect based on corner luminosity
      const luma = 0.299 * avgR + 0.587 * avgG + 0.114 * avgB;
      if (luma > 128) {
        isWhiteBg = true;
        bgR = 255; bgG = 255; bgB = 255;
      } else {
        isWhiteBg = false;
        bgR = 0; bgG = 0; bgB = 0;
      }
    }

    console.log(`Detected background: ${isWhiteBg ? 'WHITE' : 'BLACK'} (${Math.round(bgR)}, ${Math.round(bgG)}, ${Math.round(bgB)})`);

    // Queue-based flood fill to mark connected background
    const isBackground = new Uint8Array(width * height);
    const queue = [];

    const checkAndSeed = (x, y) => {
      const idx = y * width + x;
      if (isBackground[idx]) return;
      const p = getPixel(data, x, y, width);
      const dist = colorDist(p.r, p.g, p.b, bgR, bgG, bgB);
      if (dist < 0.22) { // Seed threshold
        isBackground[idx] = 1;
        queue.push({ x, y });
      }
    };

    // Seed borders
    for (let x = 0; x < width; x++) {
      checkAndSeed(x, 0);
      checkAndSeed(x, height - 1);
    }
    for (let y = 1; y < height - 1; y++) {
      checkAndSeed(0, y);
      checkAndSeed(width - 1, y);
    }

    let qHead = 0;
    while (qHead < queue.length) {
      const { x, y } = queue[qHead++];
      const neighbors = [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 }
      ];

      for (const n of neighbors) {
        if (n.x >= 0 && n.x < width && n.y >= 0 && n.y < height) {
          const nIdx = n.y * width + n.x;
          if (!isBackground[nIdx]) {
            const p = getPixel(data, n.x, n.y, width);
            const dist = colorDist(p.r, p.g, p.b, bgR, bgG, bgB);
            if (dist < 0.22) { // Fill similarity threshold
              isBackground[nIdx] = 1;
              queue.push(n);
            }
          }
        }
      }
    }

    // Process pixels: apply alpha and un-multiply edges to remove halos
    let transparentCount = 0;
    let antiAliasedCount = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const dataIdx = idx * 4;
        const r = data[dataIdx];
        const g = data[dataIdx + 1];
        const b = data[dataIdx + 2];

        const dist = colorDist(r, g, b, bgR, bgG, bgB);

        if (isBackground[idx]) {
          if (dist < 0.10) {
            // Completely transparent background
            data[dataIdx + 3] = 0;
            transparentCount++;
          } else {
            // Smooth linear gradient for anti-aliased edge
            const alphaNorm = (dist - 0.10) / (0.22 - 0.10);
            const alpha = Math.max(0, Math.min(255, Math.round(alphaNorm * 255)));
            data[dataIdx + 3] = alpha;
            antiAliasedCount++;

            // Un-multiply to remove bleed matte halos (color reconstruction)
            if (alpha > 30) {
              const aFactor = alpha / 255;
              const corrR = Math.max(0, Math.min(255, Math.round((r - (1 - aFactor) * bgR) / aFactor)));
              const corrG = Math.max(0, Math.min(255, Math.round((g - (1 - aFactor) * bgG) / aFactor)));
              const corrB = Math.max(0, Math.min(255, Math.round((b - (1 - aFactor) * bgB) / aFactor)));
              data[dataIdx] = corrR;
              data[dataIdx + 1] = corrG;
              data[dataIdx + 2] = corrB;
            } else {
              data[dataIdx + 3] = 0;
            }
          }
        } else {
          // Inside character/prop is 100% opaque
          data[dataIdx + 3] = 255;
        }
      }
    }

    // Ensure output folder exists
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await img.write(destPath);
    console.log(`Success! Corrected alpha: ${width}x${height}. Made ${transparentCount} pixels transparent, anti-aliased ${antiAliasedCount} edge pixels.`);
  }

  console.log('\n--- ALPHA CORRECTION PASS COMPLETE ---');
}

runCorrection().catch(err => {
  console.error('Error during alpha correction:', err);
  process.exit(1);
});
