import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { T, fadeIn } from '../components/ui';
import { Scene3D } from '../components/Scene3D';
import { Body, Orbit, Sun, onOrbit } from '../components/Space';
import { Bubble, Kicker } from '../components/Overlay';
import { PLANETS, orbitR, stylizedRadius } from '../data/solar';

// 3:00–3:50 — Tata surya dari atas. Jarak diregangkan, angka asli di teks.
export const S05_Orbits: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Scene3D position={[0, 60, 0.01]}>
        <Sun radius={1.2} />
        {PLANETS.map((p, i) => {
          const r = orbitR(p.au);
          return (
            <React.Fragment key={p.name}>
              <Orbit r={r} />
              <Body
                position={onOrbit(r, i * 0.9 + f * (0.012 / Math.sqrt(p.au)))}
                radius={stylizedRadius(p.d)}
                color={p.color}
              />
            </React.Fragment>
          );
        })}
      </Scene3D>
      <Kicker opacity={fadeIn(f, 0)}>Planets</Kicker>
      <T x={120} y={130} w={1500} size={64} weight={800} opacity={fadeIn(f, 12)}>
        Stretched distances. Real numbers.
      </T>
      <T x={120} y={225} w={1500} size={36} weight={600} color={C.muted} opacity={fadeIn(f, 50)}>
        Neptune sits about 30 astronomical units from the Sun.
      </T>
      <Bubble x={1280} y={880} text="This is the neighborhood." opacity={fadeIn(f, 240)} />
    </AbsoluteFill>
  );
};
