import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls, Float } from '@react-three/drei';
import { BagModel } from './BagModel';

interface SceneProps {
  scrollProgress: number;
  printProgress: number;
}

export const Scene: React.FC<SceneProps> = ({ scrollProgress, printProgress }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{
          position: [0, 0.4, isMobile ? 6.5 : 5.2],
          fov: isMobile ? 50 : 45,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Soft Studio Lighting Rig matching brand brief */}
        <ambientLight intensity={0.8} color="#FAFAF8" />
        
        {/* Key Studio Spotlight - Warm Gold Accent */}
        <spotLight
          position={[5, 8, 5]}
          angle={0.4}
          penumbra={0.8}
          intensity={1.8}
          color="#FFEBB0"
          castShadow
          shadow-bias={-0.0001}
        />

        {/* Fill Light - Cool Wave Blue */}
        <directionalLight
          position={[-6, 4, -2]}
          intensity={0.9}
          color="#3FA796"
        />

        {/* Rim Light - Navy Authority */}
        <directionalLight
          position={[0, -4, -6]}
          intensity={0.6}
          color="#6FA23A"
        />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
            <BagModel
              scrollProgress={scrollProgress}
              printProgress={printProgress}
            />
          </Float>

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -2.0, 0]}
            opacity={0.55}
            scale={7}
            blur={2.5}
            far={4}
            color="#0F2242"
          />
        </Suspense>

        {/* Interactive Mouse Orbit (Disabled scroll zoom to avoid fighting page scroll) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
