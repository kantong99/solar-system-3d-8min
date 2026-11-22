// Membuat src/subtitles.json dan subtitles.srt dari src/data/voiceover.json.
// Aturan: maksimal 42 karakter per baris, 2 baris per cue, waktu dibagi proporsional per karakter.
import fs from 'node:fs';

const FPS = 30;
const MAX = 42;
const vo = JSON.parse(fs.readFileSync('src/data/voiceover.json', 'utf8'));

const wrap = (text) => {
  const lines = [];
  let cur = '';
  for (const w of text.split(/\s+/)) {
    const t = cur ? `${cur} ${w}` : w;
    if (t.length <= MAX) cur = t;
    else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
};

const cues = [];
for (const sc of vo.scenes) {
  const lines = wrap(sc.text);
  const groups = [];
  for (let i = 0; i < lines.length; i += 2) groups.push(lines.slice(i, i + 2));
  const weights = groups.map((g) => g.join(' ').length);
  const total = weights.reduce((a, b) => a + b, 0);
  let cursor = sc.from;
  groups.forEach((g, i) => {
    const len =
      i === groups.length - 1 ? sc.from + sc.dur - cursor : Math.round((sc.dur * weights[i]) / total);
    cues.push({ scene: sc.id, start: cursor, end: cursor + len, lines: g });
    cursor += len;
  });
  const words = sc.text.split(/\s+/).length;
  const wpm = Math.round((words / (sc.dur / FPS)) * 60);
  console.log(`${sc.id}: ${words} kata, ~${wpm} wpm, ${groups.length} cue`);
}

const bad = cues.flatMap((c) => c.lines.filter((l) => l.length > MAX));
if (bad.length) {
  console.error('Baris melebihi 42 karakter:', bad);
  process.exit(1);
}

fs.writeFileSync('src/subtitles.json', JSON.stringify(cues, null, 2) + '\n');

const pad = (n, k = 2) => String(n).padStart(k, '0');
const ts = (frame) => {
  const ms = Math.round((frame / FPS) * 1000);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms % 1000, 3)}`;
};
const srt = cues
  .map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${c.lines.join('\n')}\n`)
  .join('\n');
fs.writeFileSync('subtitles.srt', srt);

console.log(`Tulis ${cues.length} cue ke src/subtitles.json dan subtitles.srt`);
