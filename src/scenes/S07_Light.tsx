import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { T, ease, fadeIn } from '../components/ui';
import { Scene3D } from '../components/Scene3D';
import { Body, Orbit, Sun, onOrbit } from '../components/Space';
import { Bubble, Kicker, Meter } from '../components/Overlay';
import { PLANETS, orbitR, stylizedRadius } from '../data/solar';

// 4:40–5:30 — Waktu tempuh cahaya dari Matahari. Bar membandingkan dengan Neptunus (250 menit).
const find = (name: string) => PLANETS.find((p) => p.name === name)!;

export const S07_Light: React.FC = () => {
  const f = useCurrentFrame();
  const shown = [find('Earth'), find('Jupiter'), find('Neptune')];
  return (
    <AbsoluteFill>
      <Scene3D position={[0, 70, 0.01]}>
        <Sun radius={1.2} />
        {shown.map((p, i) => (
          <React.Fragment key={p.name}>
            <Orbit r={orbitR(p.au)} />
            <Body
              position={onOrbit(orbitR(p.au), i * 1.3 + 0.4)}
              radius={stylizedRadius(p.d)}
              color={p.color}
            />
          </React.Fragment>
        ))}
      </Scene3D>
      <Kicker opacity={fadeIn(f, 0)}>Light travel time</Kicker>
      <T x={120} y={150} w={700} size={60} weight={800} opacity={fadeIn(f, 12)}>
        Sunlight takes time.
      </T>
      <Meter x={120} y={300} w={520} label="Sun → Earth" value="8 min 20 s" frac={ease(f, 0, 8.3 / 250, 60, 180)} />
      <Meter x={120} y={440} w={520} label="Sun → Jupiter" value="43 min" frac={ease(f, 0, 43 / 250, 90, 210)} color="#FCD34D" />
      <Meter x={120} y={580} w={520} label="Sun → Neptune" value="4 h 10 min" frac={ease(f, 0, 1, 120, 240)} color="#60A5FA" />
      <Bubble x={120} y={760} text="Slow Wi-Fi? Light is slower than you think." opacity={fadeIn(f, 280)} />
    </AbsoluteFill>
  );
};
