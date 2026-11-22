import React from 'react';
import { Composition } from 'remotion';
import { SolarSystem } from './SolarSystem';
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from './theme';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="SolarSystem"
    component={SolarSystem}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
