import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/** Amplitude of the idle float, in world units — kept in sync with useFrame below. */
const FLOAT_AMPLITUDE = 0.06;
/** Peak of the breathing scale wobble. */
const BREATH_PEAK = 1.015;

interface GiftBagModelProps {
  src?: string;
  scaleModifier?: number;
  idleMotion?: boolean;
  revealRotation?: number;
  /**
   * Diameter of the circle the bag must stay inside, in world units.
   *
   * Sphere fit uses the bounding-box diagonal so the silhouette can never poke
   * out of a circular mask as it rotates. Front fit uses the facing width/height
   * so a row of bags share the same on-screen presence.
   */
  fitDiameter?: number;
  fitMode?: 'sphere' | 'front';
  /** Extra yaw applied around the centred model, in radians. */
  yaw?: number;
}

export const GiftBagModel: React.FC<GiftBagModelProps> = ({
  src = '/models/tote-bag.glb',
  scaleModifier = 1,
  idleMotion = true,
  revealRotation = 0,
  fitDiameter = 2.5,
  fitMode = 'sphere',
  yaw = Math.PI,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(src);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!idleMotion) return;

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
  }, [idleMotion]);

  const { clonedScene, autoScale } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const mat = child.material as THREE.MeshStandardMaterial;
          if (mat.isMeshStandardMaterial) {
            if (mat.map) {
              mat.map.colorSpace = THREE.SRGBColorSpace;
              mat.map.needsUpdate = true;
            }
            if (idleMotion) {
              mat.roughness = 0.55;
              mat.metalness = 0.08;
            } else {
              mat.metalness = 0;
              mat.roughness = Math.max(mat.roughness ?? 0.8, 0.72);
            }
          }
        }
      }
    });

    clone.rotation.y = yaw;
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    clone.position.sub(center);

    const motionPad = idleMotion ? FLOAT_AMPLITUDE : 0;
    const breathPad = idleMotion ? BREATH_PEAK : 1;
    const budget = Math.max(0, fitDiameter / 2 - motionPad) / breathPad;

    const boundRadius =
      fitMode === 'front'
        ? Math.max(size.x, size.y) / 2
        : size.length() / 2;
    const normalizedScale = boundRadius > 0 ? budget / boundRadius : 1;

    return { clonedScene: clone, autoScale: normalizedScale };
  }, [scene, fitDiameter, fitMode, idleMotion, yaw]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const baseScale = autoScale * scaleModifier;

    if (!idleMotion) {
      groupRef.current.scale.setScalar(baseScale);
      groupRef.current.position.y = 0;
      groupRef.current.rotation.set(0, 0, 0);
      return;
    }

    const t = state.clock.getElapsedTime();
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    const targetRotX = my * 0.4;
    const targetRotY = mx * 0.8 + revealRotation;
    const targetRotZ = mx * -0.15;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 4);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 4);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 4);

    groupRef.current.position.y = Math.sin(t * 1.2) * FLOAT_AMPLITUDE;

    const breathingScale = baseScale * (1 + Math.sin(t * 2) * (BREATH_PEAK - 1));
    groupRef.current.scale.setScalar(breathingScale);
  });

  return (
    <group ref={groupRef} scale={autoScale * scaleModifier}>
      <primitive object={clonedScene} />
    </group>
  );
};

useGLTF.preload('/models/tote-bag.glb');
useGLTF.preload('/models/white-bag.glb');
useGLTF.preload('/models/pink-bag.glb');
