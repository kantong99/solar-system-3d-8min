import '@react-three/fiber';
import React from 'react';
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import { HEIGHT, WIDTH } from '../theme';
import { Stars } from './Space';

// Mengarahkan kamera ke target. Dipanggil saat render agar selalu sinkron dengan frame.
const LookAt: React.FC<{ target: [number, number, number] }> = ({ target }) => {
  const camera = useThree((s) => s.camera);
  camera.lookAt(target[0], target[1], target[2]);
  return null;
};

export const Scene3D: React.FC<{
  position: [number, number, number];
  target?: [number, number, number];
  fov?: number;
  children?: React.ReactNode;
}> = ({ position, target = [0, 0, 0], fov = 45, children }) => (
  <ThreeCanvas width={WIDTH} height={HEIGHT} camera={{ fov, position }}>
    <LookAt target={target} />
    <ambientLight intensity={0.4} />
    <pointLight position={[0, 0, 0]} intensity={1.6} decay={0} color="#fff4e0" />
    <Stars />
    {children}
  </ThreeCanvas>
);
