import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { GiftBagModel } from './GiftBagModel';

interface HeroBagSceneProps {
  isMobile?: boolean;
}

export const HeroBagScene: React.FC<HeroBagSceneProps> = ({ isMobile = false }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [0, 0.08, isMobile ? 5.0 : 4.6],
          fov: 40,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop="always"
        style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
      >
        <ambientLight intensity={1.25} color="#FAFAF8" />
        <directionalLight position={[4, 6, 5]} intensity={1.55} color="#FFEBB0" />
        <directionalLight position={[-4, 3, -2]} intensity={0.8} color="#BCD3D8" />
        <pointLight position={[0, 2, 4]} intensity={0.55} color="#FFFFFF" />

        <Suspense fallback={null}>
          <GiftBagModel scaleModifier={1.25} idleMotion fitTarget={2.15} />
        </Suspense>
      </Canvas>
    </div>
  );
};
