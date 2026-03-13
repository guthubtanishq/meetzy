import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MeshBackground = () => {
  const mesh = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.z = time * 0.05;
    const positions = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      positions[i + 2] = Math.sin(x + time) * 0.2 + Math.cos(y + time) * 0.2;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
      <planeGeometry args={[20, 20, 40, 40]} />
      <meshStandardMaterial
        color="#13161e"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
};

export default MeshBackground;
