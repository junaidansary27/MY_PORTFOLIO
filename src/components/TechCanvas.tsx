import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 45;
  const radius = 2.4;

  const [positions, lineIndices] = useMemo(() => {
    const tempPositions = new Float32Array(count * 3);
    const indices: number[] = [];

    // Distribute points evenly on a sphere using Fibonacci lattice
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      tempPositions[i * 3] = x;
      tempPositions[i * 3 + 1] = y;
      tempPositions[i * 3 + 2] = z;
    }

    // Connect points that are close to each other to form network lines
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = tempPositions[i * 3] - tempPositions[j * 3];
        const dy = tempPositions[i * 3 + 1] - tempPositions[j * 3 + 1];
        const dz = tempPositions[i * 3 + 2] - tempPositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Connect if distance is within threshold
        if (dist < 1.8) {
          indices.push(i, j);
        }
      }
    }

    return [tempPositions, new Uint16Array(indices)];
  }, [count, radius]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Slow background rotation, responsive to mouse
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glow lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[lineIndices, 1]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#06b6d4" opacity={0.25} transparent={true} />
      </lineSegments>

      {/* Nodes (Points) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#3b82f6"
          size={0.12}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
        />
      </points>

      {/* Outer subtle halo ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[2.5, 2.52, 64]} />
        <meshBasicMaterial color="#10b981" opacity={0.15} transparent={true} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function TechCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inViewport, setInViewport] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] sm:min-h-[450px] cursor-grab active:cursor-grabbing">
      <Canvas 
        camera={{ position: [0, 0, 5.5], fov: 55 }} 
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        frameloop={inViewport ? "always" : "never"}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <NodeNetwork />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
