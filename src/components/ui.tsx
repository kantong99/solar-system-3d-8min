import React from 'react';
import { Easing, interpolate } from 'remotion';
import { C } from '../theme';
import { FONT } from '../font';

// Interpolasi halus (ease-out) antara dua nilai dalam rentang frame [a, b].
export const ease = (frame: number, from: number, to: number, a: number, b: number): number =>
  interpolate(frame, [a, b], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

export const fadeIn = (frame: number, at: number, dur = 18): number =>
  ease(frame, 0, 1, at, at + dur);

interface TProps {
  x?: number;
  y?: number;
  w?: number;
  size?: number;
  weight?: number;
  color?: string;
  opacity?: number;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

export const T: React.FC<TProps> = ({
  x = 0,
  y = 0,
  w = 1920,
  size = 72,
  weight = 800,
  color = C.ink,
  opacity = 1,
  align = 'left',
  children,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      fontFamily: FONT,
      fontSize: size,
      fontWeight: weight,
      color,
      opacity,
      textAlign: align,
      lineHeight: 1.15,
      letterSpacing: -0.5,
    }}
  >
    {children}
  </div>
);
