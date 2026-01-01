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
      {/* Ground Plane with navy blue texture */}
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
          roughness={0.8}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#1F3A5F"
          metalness={0.3}
        />
      </mesh>

      {/* Add some rolling hills using displaced geometry - soft teal */}
      <mesh position={[0, -0.5, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 50, 50, 50]} />
        <meshStandardMaterial
          color="#4FA3A5"
          roughness={0.75}
          metalness={0.2}
        />
      </mesh>

      {/* Background hills - warm peach */}
      <mesh position={[0, -1, -30]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 30, 30, 30]} />
        <meshStandardMaterial
          color="#F4A261"
          roughness={0.8}
          metalness={0.15}
        />
      </mesh>

      {/* Fog for depth - navy blue */}
      <fog attach="fog" args={['#1F3A5F', 10, 50]} />
    </group>
  );
}

export default Scene3D;