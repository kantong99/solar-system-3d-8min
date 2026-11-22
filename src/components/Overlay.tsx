import React from 'react';
import { C } from '../theme';
import { FONT } from '../font';
import { T } from './ui';

// Label kecil di atas judul, huruf kapital berjarak lebar.
export const Kicker: React.FC<{ children: React.ReactNode; opacity?: number }> = ({ children, opacity = 1 }) => (
  <T x={120} y={80} size={26} weight={800} color={C.cyan} opacity={opacity}>
    <span style={{ letterSpacing: 6, textTransform: 'uppercase' }}>{children}</span>
  </T>
);

// Bubble komedi berwarna amber.
export const Bubble: React.FC<{ x: number; y: number; text: string; opacity?: number }> = ({ x, y, text, opacity = 1 }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      opacity,
      background: C.amber,
      color: C.navy,
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 30,
      padding: '14px 26px',
      borderRadius: 999,
    }}
  >
    {text}
  </div>
);

// Bar perbandingan dengan nilai teks di kanan.
export const Meter: React.FC<{ x: number; y: number; w: number; label: string; value: string; frac: number; color?: string }> = ({
  x,
  y,
  w,
  label,
  value,
  frac,
  color = C.cyan,
}) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, fontFamily: FONT, color: C.ink }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 34, fontWeight: 600, marginBottom: 10 }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div style={{ height: 26, background: C.line, borderRadius: 13, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${Math.max(0, Math.min(1, frac)) * 100}%`, background: color, borderRadius: 13 }} />
    </div>
  </div>
);
