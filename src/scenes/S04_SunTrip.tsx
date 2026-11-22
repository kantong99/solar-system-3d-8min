import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { T, fadeIn } from '../components/ui';
import { Scene3D } from '../components/Scene3D';
import { Body, Sun, onOrbit } from '../components/Space';
import { Bubble, Kicker } from '../components/Overlay';

// 2:10–3:00 — Matahari: 1 AU, sepeda, pesawat, dan cahaya.
// Kamera diarahkan ke x = -4 agar Matahari bergeser ke kanan, teks di kiri tetap bersih.
export const S04_SunTrip: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Scene3D position={[0, 6, 34]} target={[-4, 0, 0]}>
        <Sun radius={1.6} />
        <Body position={onOrbit(12, 0.5 + f * 0.004)} radius={0.45} color="#38BDF8" />
      </Scene3D>
      <Kicker opacity={fadeIn(f, 0)}>The Sun</Kicker>
      <T x={120} y={190} w={800} size={110} weight={800} opacity={fadeIn(f, 12)}>
        149.6 million km
      </T>
      <T x={120} y={400} w={760} size={38} weight={600} color={C.ink} opacity={fadeIn(f, 60)}>
        Bicycle at 20 km/h: about 853 years
      </T>
      <T x={120} y={460} w={760} size={38} weight={600} color={C.ink} opacity={fadeIn(f, 120)}>
        Jet at 900 km/h: about 19 years
      </T>
      <T x={120} y={520} w={760} size={38} weight={600} color={C.cyan} opacity={fadeIn(f, 180)}>
        Light: 8 minutes 20 seconds
      </T>
      <Bubble x={120} y={700} text="Pack a lunch for 30 generations." opacity={fadeIn(f, 260)} />
    </AbsoluteFill>
  );
};
