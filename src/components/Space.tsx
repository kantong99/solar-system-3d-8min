import '@react-three/fiber';
import React, { useMemo } from 'react';
import { DoubleSide } from 'three';

// Angka pseudo-acak deterministik agar setiap render identik.
const rnd = (i: number, k: number): number => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const Stars: React.FC<{ count?: number }> = ({ count = 900 }) => {
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (rnd(i, 1) - 0.5) * 140;
      a[i * 3 + 1] = (rnd(i, 2) - 0.5) * 90;
      a[i * 3 + 2] = (rnd(i, 3) - 0.5) * 140 - 30;
    }
    return a;
  }, [count]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#cbd5e1" size={0.14} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
};

export const Sun: React.FC<{ radius: number; position?: [number, number, number] }> = ({ radius, position = [0, 0, 0] }) => (
  <mesh position={position}>
    <sphereGeometry args={[radius, 48, 48]} />
    <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1.8} />
  </mesh>
);

export const Body: React.FC<{ position: [number, number, number]; radius: number; color: string }> = ({ position, radius, color }) => (
  <mesh position={position}>
    <sphereGeometry args={[radius, 32, 32]} />
    <meshStandardMaterial color={color} roughness={0.85} />
  </mesh>
);

// Posisi di orbit lingkaran pada bidang x-z.
export const onOrbit = (r: number, angle: number): [number, number, number] => [
  Math.cos(angle) * r,
  0,
  Math.sin(angle) * r,
];

export const Orbit: React.FC<{ r: number }> = ({ r }) => (
  <mesh rotation={[Math.PI / 2, 0, 0]}>
    <ringGeometry args={[r - 0.02, r + 0.02, 180]} />
    <meshBasicMaterial color="#475569" side={DoubleSide} transparent opacity={0.8} />
  </mesh>
);
