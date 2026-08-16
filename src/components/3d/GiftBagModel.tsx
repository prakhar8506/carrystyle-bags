import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface GiftBagModelProps {
  scaleModifier?: number;
  idleMotion?: boolean;
  revealRotation?: number;
  /** Target max dimension in world units — lower = smaller bag in frame */
  fitTarget?: number;
}

export const GiftBagModel: React.FC<GiftBagModelProps> = ({
  scaleModifier = 1,
  idleMotion = true,
  revealRotation = 0,
  fitTarget = 2.5,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/gift-bag.glb');
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (clientX: number, clientY: number) => {
      mouseRef.current.x = (clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const { clonedScene, autoScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const mat = child.material as THREE.MeshStandardMaterial;
          if (mat.isMeshStandardMaterial) {
            mat.roughness = 0.55;
            mat.metalness = 0.08;
          }
        }
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizedScale = maxDim > 0 ? fitTarget / maxDim : 1;

    // Re-center model at origin so it sits in the middle of the sphere
    clone.position.sub(center);

    return { clonedScene: clone, autoScale: normalizedScale };
  }, [scene, fitTarget]);

  useFrame((state, delta) => {
    if (!groupRef.current || !idleMotion) return;
    const t = state.clock.getElapsedTime();
    
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    const targetRotX = my * 0.4;
    const targetRotY = mx * 0.8 + revealRotation;
    const targetRotZ = mx * -0.15;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 4);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 4);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 4);
    
    // Floating position
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
    
    // Breathing scale
    const baseScale = autoScale * scaleModifier;
    const breathingScale = baseScale * (1 + Math.sin(t * 2) * 0.015);
    groupRef.current.scale.setScalar(breathingScale);
  });

  return (
    <group ref={groupRef} scale={autoScale * scaleModifier}>
      <primitive object={clonedScene} />
    </group>
  );
};

useGLTF.preload('/models/gift-bag.glb');
