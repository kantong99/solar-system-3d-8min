import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FONT } from '../font';
import subtitles from '../subtitles.json';

interface Cue {
  scene: string;
  start: number;
  end: number;
  lines: string[];
}

const CUES = subtitles as Cue[];

// Caption custom: satu cue aktif per waktu, maksimal 2 baris, 42 karakter per baris.
export const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const cue = CUES.find((c) => f >= c.start && f < c.end);
  if (!cue) return null;

  // Durasi fade menyesuaikan panjang cue agar titik input selalu naik terus.
  const len = cue.end - cue.start;
  const fade = Math.min(6, Math.floor(len / 3));
  const opacity =
    fade >= 1
      ? interpolate(f, [cue.start, cue.start + fade, cue.end - fade, cue.end], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1;

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 56, display: 'flex', justifyContent: 'center', opacity }}>
      <div
        style={{
          background: 'rgba(7,11,22,0.82)',
          padding: '14px 28px',
          borderRadius: 12,
          fontFamily: FONT,
          fontSize: 38,
          fontWeight: 600,
          color: '#F8FAFC',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        {cue.lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
};
