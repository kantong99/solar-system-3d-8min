import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../theme';
import { T, ease, fadeIn } from '../components/ui';
import { Scene3D } from '../components/Scene3D';
import { Body, Sun } from '../components/Space';
import { Bubble, Kicker, Meter } from '../components/Overlay';

// 6:25–7:20 — Voyager 1 (17 km/s) menuju Matahari: sekitar 102 hari. Posisi tidak sesuai skala.
const SUN_X = -6;
const EARTH_X = 5;

export const S09_Voyager: React.FC = () => {
  const f = useCurrentFrame();
  const p = Math.min(1, Math.max(0, (f - 60) / 900));
  const probeX = EARTH_X + (SUN_X + 1.6 - EARTH_X) * p;
  return (
    <AbsoluteFill>
      <Scene3D position={[0, 0, 16]}>
        <Sun radius={1.2} position={[SUN_X, 0, 0]} />
        <Body position={[EARTH_X, 0, 0]} radius={0.25} color="#38BDF8" />
        <mesh position={[probeX, 0.6, 0]}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={2} />
        </mesh>
      </Scene3D>
      <Kicker opacity={fadeIn(f, 0)}>Voyager 1</Kicker>
      <T x={120} y={170} w={1000} size={76} weight={800} opacity={fadeIn(f, 12)}>
        About 102 days to the Sun
      </T>
      <T x={120} y={300} w={900} size={40} weight={600} color={C.muted} opacity={fadeIn(f, 60)}>
        Flying straight at it, at about 17 km/s.
      </T>
      <Meter
        x={120}
        y={440}
        w={700}
        label="Voyager 1 speed"
        value="17 km/s"
        frac={ease(f, 0, 0.4, 30, 150)}
        color="#22D3EE"
      />
      <Bubble x={120} y={700} text="It does not stop for snacks either." opacity={fadeIn(f, 240)} />
    </AbsoluteFill>
  );
};
