import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { T, ease, fadeIn } from '../components/ui';
import { Scene3D } from '../components/Scene3D';
import { Body, onOrbit } from '../components/Space';
import { Bubble, Kicker, Meter } from '../components/Overlay';

// 1:20–2:10 — Bulan: jarak dan perjalanan sepeda 20 km/jam.
export const S03_Moon: React.FC = () => {
  const f = useCurrentFrame();
  const moonPos = onOrbit(30, -0.6 + f * 0.006);
  return (
    <AbsoluteFill>
      <Scene3D position={[0, 6, 46]}>
        <Body position={[0, 0, 0]} radius={1} color="#38BDF8" />
        <Body position={moonPos} radius={0.27} color="#CBD5E1" />
      </Scene3D>
      <Kicker opacity={fadeIn(f, 0)}>The Moon</Kicker>
      <T x={120} y={190} w={900} size={130} weight={800} opacity={fadeIn(f, 12)}>
        384,400 km
      </T>
      <T x={120} y={380} w={900} size={42} weight={600} color={C.muted} opacity={fadeIn(f, 60)}>
        Bicycle at 20 km/h: about 2 years, 2 months. Nonstop.
      </T>
      <Meter
        x={120}
        y={560}
        w={820}
        label="Bicycle trip (illustrative)"
        value="2 years, 2 months"
        frac={ease(f, 0, 1, 90, 240)}
      />
      <Bubble x={120} y={740} text="Snacks: not included." opacity={fadeIn(f, 260)} />
    </AbsoluteFill>
  );
};
