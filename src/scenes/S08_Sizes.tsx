import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { T, fadeIn } from '../components/ui';
import { Scene3D } from '../components/Scene3D';
import { Body } from '../components/Space';
import { Bubble, Kicker } from '../components/Overlay';
import { PLANETS, toScaleRadius } from '../data/solar';

// 5:30–6:25 — Ukuran planet sesuai skala relatif. Jupiter = 2.0 unit.
const X_POS = [-11, -9.2, -7.4, -5.6, -1.5, 4.0, 8.2, 10.6];

export const S08_Sizes: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Scene3D position={[0, 0, 20]}>
        {PLANETS.map((p, i) => (
          <Body key={p.name} position={[X_POS[i], 0, 0]} radius={toScaleRadius(p.d)} color={p.color} />
        ))}
      </Scene3D>
      <Kicker opacity={fadeIn(f, 0)}>Sizes · to scale</Kicker>
      <T x={120} y={150} w={1600} size={84} weight={800} opacity={fadeIn(f, 12)}>
        Jupiter is about 11× Earth&apos;s width
      </T>
      <T x={120} y={820} w={1200} size={40} weight={600} color={C.muted} opacity={fadeIn(f, 90)}>
        Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.
      </T>
      <Bubble x={1200} y={150} text="Earth: the solid middle child." opacity={fadeIn(f, 200)} />
    </AbsoluteFill>
  );
};
