import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { GiftBagModel } from './GiftBagModel';

interface HeroBagSceneProps {
  isMobile?: boolean;
}

/**
 * Camera is parked far enough that the bag's rotation-safe bounding sphere
 * sits well inside the frustum. The square canvas is then sized larger than
 * the bag on screen, so mouse-tilt never hits a hard edge — the only clip
 * that remains is the circular lens mask, when there is one.
 *
 * PerspectiveCamera is mounted inside the scene (not only passed as a Canvas
 * prop) because R3F's camera prop is initial-only and was leaving the bag
 * framed by the default z=5 camera, which filled the square buffer and
 * clipped every edge.
 */
export const HERO_BAG_FOV = 40;
export const HERO_BAG_CAM_Z = 6.6;
export const HERO_BAG_FIT = 2.55;

export const HeroBagScene: React.FC<HeroBagSceneProps> = ({ isMobile = false }) => {
  const camZ = isMobile ? 7.0 : HERO_BAG_CAM_Z;
  const fit = isMobile ? 2.65 : HERO_BAG_FIT;

  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop="always"
        style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, -0.08, camZ]} fov={HERO_BAG_FOV} />
        <ambientLight intensity={1.25} color="#FAFAF8" />
        <directionalLight position={[4, 6, 5]} intensity={1.55} color="#FFEBB0" />
        <directionalLight position={[-4, 3, -2]} intensity={0.8} color="#BCD3D8" />
        <pointLight position={[0, 2, 4]} intensity={0.55} color="#FFFFFF" />

        <Suspense fallback={null}>
          <GiftBagModel idleMotion fitDiameter={fit} />
        </Suspense>
      </Canvas>
    </div>
  );
};
