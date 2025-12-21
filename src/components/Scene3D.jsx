import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Scene3D() {
  const meshRef = useRef();

  // Subtle animation for the ground
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group>
      {/* Ground Plane with grass-like texture - muted colors */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100, 100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={20}
          roughness={0.9}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#5a7c60"
          metalness={0.2}
        />
      </mesh>

      {/* Add some rolling hills using displaced geometry - softer greens */}
      <mesh position={[0, -0.5, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 50, 50, 50]} />
        <meshStandardMaterial
          color="#6b8e6f"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Background hills - more muted */}
      <mesh position={[0, -1, -30]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 30, 30, 30]} />
        <meshStandardMaterial
          color="#7a9d7e"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Fog for depth - softer sky color */}
      <fog attach="fog" args={['#b8d4e8', 10, 50]} />
    </group>
  );
}

export default Scene3D;