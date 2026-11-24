// Warning Label for Humans: One Line, Big Laugh
// make.fun competition u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85
//
// Writes one single-line safety warning label for every human being to
// <MAKEFUN_OUTPUT_DIR>/entry.txt (default /output/entry.txt).
// Deterministic: the same fixed line on every run, no network, no input,
// no randomness, no clock. Node 22, no dependencies.
//
// The line is written with no trailing newline, so the file holds exactly
// one line and nothing else.

// New files/dirs must be world-readable in the grading sandbox (which runs
// as uid 65534): set a permissive umask up front instead of chmod, which
// would fail on directories we do not own.
process.umask(0o022);

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The label. Label form up front ("WARNING:"), the recognition in the
// middle, and the turn in the last few words: everyone has sent the "k",
// everyone has been left on read, everyone has been asked why they seem upset.
const LINE =
  "WARNING: Will reply 'k' to your three-paragraph message, leave you on read for a week, and later ask why you seem upset.";

const MAX_CHARS = 160;

function main(): void {
  // Gate, checked before writing so a bad line fails loudly instead of
  // shipping an invalid entry.
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`label is ${LINE.length} characters, must be 1-${MAX_CHARS}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("label must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("label must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  console.log(`wrote ${outPath} (${LINE.length} characters)`);
  console.log(LINE);
}

main();
