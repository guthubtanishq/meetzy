import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const IdentityRevealParticles = ({ active = false }) => {
  const points = useRef();
  const count = 3000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Start scattered
        pos[i * 3] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pos = points.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      if (active) {
        // Pull inward toward a central sphere
        const angle = i * 0.1;
        const radius = 2 + Math.sin(time + i * 0.5) * 0.2;
        const tx = Math.cos(angle) * radius;
        const ty = Math.sin(angle) * radius;
        const tz = Math.sin(time * 2 + i) * 0.5;
        
        pos[i3] += (tx - pos[i3]) * 0.05;
        pos[i3 + 1] += (ty - pos[i3 + 1]) * 0.05;
        pos[i3 + 2] += (tz - pos[i3 + 2]) * 0.05;
      } else {
        // Drift outwards
        pos[i3] += Math.sin(time + i) * 0.01;
        pos[i3 + 1] += Math.cos(time + i) * 0.01;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y += 0.002;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7eb8a4"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default IdentityRevealParticles;
