import { useRef, useMemo, useState, useEffect, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const NodeNetwork = memo(function NodeNetwork() {
  const count = 16;
  const radius = 2;

  const [positions, lineIndices] = useMemo(() => {
    const tempPositions = new Float32Array(count * 3);
    const indices: number[] = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      tempPositions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      tempPositions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      tempPositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = tempPositions[i * 3] - tempPositions[j * 3];
        const dy = tempPositions[i * 3 + 1] - tempPositions[j * 3 + 1];
        const dz = tempPositions[i * 3 + 2] - tempPositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.2) {
          indices.push(i, j);
        }
      }
    }

    return [tempPositions, new Uint16Array(indices)];
  }, [count, radius]);

  return (
    <group>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="index" args={[lineIndices, 1]} />
        </bufferGeometry>
        <lineBasicMaterial color="#06b6d4" opacity={0.15} transparent={true} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#3b82f6" size={0.08} sizeAttenuation={true} transparent={true} opacity={0.5} />
      </points>
    </group>
  );
});

export default function TechCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] sm:min-h-[450px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        frameloop="demand"
      >
        <NodeNetwork />
      </Canvas>
    </div>
  );
}
