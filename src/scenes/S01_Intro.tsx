import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { T, fadeIn } from '../components/ui';
import { Scene3D } from '../components/Scene3D';
import { Sun } from '../components/Space';
import { Bubble, Kicker } from '../components/Overlay';

// 0:00–0:35 — Pembuka: Matahari berputar pelan di kanan, judul di kiri.
export const S01_Intro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Scene3D position={[0, 0, 9]}>
        <Sun radius={1.4} position={[3.2, 0, 0]} />
      </Scene3D>
      <Kicker opacity={fadeIn(f, 0)}>Solar system · 8 minutes</Kicker>
      <T x={120} y={300} w={1000} size={150} weight={800} opacity={fadeIn(f, 12)}>
        How Far Is Far?
      </T>
      <T x={120} y={480} w={900} size={48} weight={600} color={C.muted} opacity={fadeIn(f, 40)}>
        Our solar system, measured for real.
      </T>
      <Bubble x={120} y={620} text="Warning: your bicycle is not ready." opacity={fadeIn(f, 120)} />
    </AbsoluteFill>
  );
};
