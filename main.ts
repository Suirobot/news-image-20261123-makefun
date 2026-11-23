// News image entry for 23 November 2026 (Node 22, standard library only).
// The picture beside this file, entry.png, sums up that day's world news in six captioned
// panels under a dated header: the COP31 summit in Antalya collapsing with no fossil-fuel
// deal, the Democrats clinching 258 US House seats, a boy of 7 pulled alive from the rubble
// in Dymer after a Russian strike that killed 11, the World Court ruling that Myanmar
// committed genocide against the Rohingya, the Banten candy-factory fire that killed 24,
// and the AI sell-off that rattled world markets. This program copies it to
// /output/entry.png, where the gate and the judge read it.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const here = new URL('./entry.png', import.meta.url);
const image = readFileSync(here);

// Fail loudly rather than hand the gate a file it would mark invalid: enforce the byte cap
// and confirm the bytes really are a PNG or a JPEG before copying.
if (image.length > 1_048_576) {
  console.error(`entry.png is ${image.length} bytes, over the 1 MiB limit`);
  process.exit(1);
}
const isPng = image.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
const isJpeg = image[0] === 0xff && image[1] === 0xd8 && image[2] === 0xff;
if (!isPng && !isJpeg) {
  console.error('entry.png is neither a PNG nor a JPEG');
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(here, join(outDir, 'entry.png'));
