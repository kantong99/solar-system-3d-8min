import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { T, fadeIn } from '../components/ui';
import { Scene3D } from '../components/Scene3D';
import { Body } from '../components/Space';
import { Kicker } from '../components/Overlay';

// 7:20–8:08 — Penutup: kamera mundur perlahan, Bumi berputar.
export const S10_Outro: React.FC = () => {
  const f = useCurrentFrame();
  const z = 6 + (f / 1440) * 18;
  return (
    <AbsoluteFill>
      <Scene3D position={[0, 1.2, z]}>
        <group rotation={[0, f * 0.01, 0]}>
          <Body position={[0, 0, 0]} radius={1} color="#38BDF8" />
        </group>
      </Scene3D>
      <Kicker opacity={fadeIn(f, 0)}>The takeaway</Kicker>
      <T x={120} y={160} w={1680} size={96} weight={800} opacity={fadeIn(f, 12)}>
        Big Sun. Tiny planets. Long bike ride.
      </T>
      <T x={120} y={300} w={1000} size={40} weight={600} color={C.muted} opacity={fadeIn(f, 90)}>
        Earth is the only planet we know of with life. Keep looking up.
      </T>
    </AbsoluteFill>
  );
};
