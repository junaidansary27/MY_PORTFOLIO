import { useRef, useMemo, useState, useEffect, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const NodeNetwork = memo(function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 28;
  const radius = 2.2;

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
        if (dist < 1.9) {
          indices.push(i, j);
        }
      }
    }

    return [tempPositions, new Uint16Array(indices)];
  }, [count, radius]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="index" args={[lineIndices, 1]} />
        </bufferGeometry>
        <lineBasicMaterial color="#06b6d4" opacity={0.18} transparent={true} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#3b82f6" size={0.1} sizeAttenuation={true} transparent={true} opacity={0.65} />
      </points>

      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[2.4, 2.42, 48]} />
        <meshBasicMaterial color="#10b981" opacity={0.1} transparent={true} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
});

export default function TechCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] sm:min-h-[450px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        frameloop={inViewport ? 'always' : 'never'}
      >
        <NodeNetwork />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={inViewport}
          dampingFactor={0.05}
          rotateSpeed={0.6}
          eventSource={containerRef.current}
        />
      </Canvas>
    </div>
  );
}