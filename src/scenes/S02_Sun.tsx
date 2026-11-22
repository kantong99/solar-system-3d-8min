import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { T, fadeIn } from '../components/ui';
import { Scene3D } from '../components/Scene3D';
import { Body, Sun } from '../components/Space';
import { Bubble, Kicker } from '../components/Overlay';

// 0:35–1:20 — Skala Matahari dibanding Bumi (Bumi sebagai titik kecil).
export const S02_Sun: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Scene3D position={[0, 0, 14]}>
        <Sun radius={3} position={[3, 0, 0]} />
        <Body position={[7.4, 0, 0]} radius={0.05} color="#38BDF8" />
      </Scene3D>
      <Kicker opacity={fadeIn(f, 0)}>Scale</Kicker>
      <T x={120} y={220} w={800} size={104} weight={800} opacity={fadeIn(f, 12)}>
        1.3 million Earths fit inside the Sun
      </T>
      <T x={120} y={560} w={800} size={40} weight={600} color={C.muted} opacity={fadeIn(f, 90)}>
        Diameter: 1,391,000 km, about 109 Earths side by side.
      </T>
      <Bubble x={120} y={720} text="That tiny blue dot? That is us." opacity={fadeIn(f, 200)} />
    </AbsoluteFill>
  );
};
