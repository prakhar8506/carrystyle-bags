import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { GiftBagModel } from './GiftBagModel';
import { STILL_COPY } from '../../lib/content/stillCopy';
import { categoryCarousel } from '../../lib/categoryCarousel';

const SLIDES = STILL_COPY.bagTypes.map((bag, i) => ({
  id: bag.id,
  src: bag.modelSrc,
  yaw: i === 0 ? Math.PI : 0,
  poseY: i === 0 ? 0.28 : 0.4,
}));

const Slide: React.FC<{ index: number; src: string; yaw: number; poseY: number }> = ({
  index,
  src,
  yaw,
  poseY,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const slide = categoryCarousel.slides[index];
    if (!groupRef.current || !slide) return;
    groupRef.current.position.x = slide.x;
    groupRef.current.visible = slide.o > 0.02;
  });

  return (
    <group ref={groupRef} rotation={[0.04, poseY, 0]}>
      <Suspense fallback={null}>
        <GiftBagModel src={src} idleMotion={false} fitDiameter={2.55} fitMode="front" yaw={yaw} />
      </Suspense>
    </group>
  );
};

export const StillBagScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCanvasVisible, setIsCanvasVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsCanvasVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '200px' },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.35,
        }}
        frameloop={isCanvasVisible ? 'always' : 'never'}
        style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.06, 5.15]} fov={36} />
        <ambientLight intensity={1.35} color="#FFFFFF" />
        <directionalLight position={[4, 7, 6]} intensity={1.2} color="#FFF6E8" />
        <directionalLight position={[-5, 3, 3]} intensity={0.85} color="#F2F5F8" />
        <pointLight position={[0, 1.6, 4]} intensity={0.55} color="#FFFFFF" />

        {SLIDES.map((slide, i) => (
          <Slide key={slide.id} index={i} src={slide.src} yaw={slide.yaw} poseY={slide.poseY} />
        ))}
      </Canvas>
    </div>
  );
};
