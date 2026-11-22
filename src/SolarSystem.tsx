import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { C, SOURCE_LINE } from './theme';
import { SCENES } from './timeline';
import { Captions } from './components/Captions';
import { S01_Intro } from './scenes/S01_Intro';
import { S02_Sun } from './scenes/S02_Sun';
import { S03_Moon } from './scenes/S03_Moon';
import { S04_SunTrip } from './scenes/S04_SunTrip';
import { S05_Orbits } from './scenes/S05_Orbits';
import { S06_Speed } from './scenes/S06_Speed';
import { S07_Light } from './scenes/S07_Light';
import { S08_Sizes } from './scenes/S08_Sizes';
import { S09_Voyager } from './scenes/S09_Voyager';
import { S10_Outro } from './scenes/S10_Outro';

const COMPONENTS: Record<string, React.FC> = {
  S01: S01_Intro,
  S02: S02_Sun,
  S03: S03_Moon,
  S04: S04_SunTrip,
  S05: S05_Orbits,
  S06: S06_Speed,
  S07: S07_Light,
  S08: S08_Sizes,
  S09: S09_Voyager,
  S10: S10_Outro,
};

// Fade masuk dan keluar tiap scene agar transisi halus.
const SceneFade: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const SolarSystem: React.FC = () => (
  <AbsoluteFill style={{ background: C.navy }}>
    {SCENES.map((s) => {
      const Scene = COMPONENTS[s.id];
      return (
        <Sequence key={s.id} from={s.from} durationInFrames={s.dur} name={s.label}>
          <SceneFade dur={s.dur}>
            <Scene />
          </SceneFade>
        </Sequence>
      );
    })}

    <Audio src={staticFile('voiceover.mp3')} />
    <Audio src={staticFile('music.mp3')} volume={0.16} loop />

    <Captions />

    <div style={{ position: 'absolute', left: 48, bottom: 14, fontFamily: 'sans-serif', fontSize: 18, color: C.muted }}>
      {SOURCE_LINE}
    </div>
  </AbsoluteFill>
);
