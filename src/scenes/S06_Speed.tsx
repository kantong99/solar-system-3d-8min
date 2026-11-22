import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { T, ease, fadeIn } from '../components/ui';
import { Scene3D } from '../components/Scene3D';
import { Body, Orbit, Sun, onOrbit } from '../components/Space';
import { Bubble, Kicker } from '../components/Overlay';

// 3:50–4:40 — Bumi bergerak mengelilingi Matahari sekitar 107.000 km/jam.
export const S06_Speed: React.FC = () => {
  const f = useCurrentFrame();
  const kmh = Math.round(ease(f, 0, 107000, 30, 150));
  return (
    <AbsoluteFill>
      <Scene3D position={[0, 13, 15]}>
        <Sun radius={1.2} />
        <Orbit r={8} />
        <Body position={onOrbit(8, f * 0.02)} radius={0.3} color="#38BDF8" />
      </Scene3D>
      <Kicker opacity={fadeIn(f, 0)}>Orbit speed</Kicker>
      <T x={120} y={190} w={1000} size={130} weight={800} color={C.cyan} opacity={fadeIn(f, 12)}>
        {`${kmh.toLocaleString('en-US')} km/h`}
      </T>
      <T x={120} y={380} w={900} size={42} weight={600} color={C.muted} opacity={fadeIn(f, 60)}>
        Earth around the Sun, right now.
      </T>
      <T x={120} y={460} w={900} size={38} weight={600} color={C.ink} opacity={fadeIn(f, 120)}>
        Faster than a bullet. You did not buy a ticket.
      </T>
      <Bubble x={120} y={700} text="Your bicycle: zero progress." opacity={fadeIn(f, 240)} />
    </AbsoluteFill>
  );
};
