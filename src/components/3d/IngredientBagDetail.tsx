import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { StillBagModel } from './StillBagModel';

interface IngredientBagDetailProps {
  activeIngredientId: string;
}

export const IngredientBagDetail: React.FC<IngredientBagDetailProps> = ({ activeIngredientId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const getVariant = (): 'clear' | 'dawn' | 'dusk' => {
    if (activeIngredientId === 'canvas') return 'dawn';
    if (activeIngredientId === 'embroidery') return 'dusk';
    return 'clear';
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: '80px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0.1, 4.5], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          frameloop={isVisible ? 'always' : 'never'}
        >
          <ambientLight intensity={1.2} color="#FAFAF8" />
          <pointLight position={[3, 4, 3]} intensity={2.0} color="#BCD3D8" />
          <pointLight position={[-3, -2, -3]} intensity={0.8} color="#6FA23A" />

          <Suspense fallback={null}>
            <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.4}>
              <StillBagModel variantId={getVariant()} scaleModifier={1.05} />
            </Float>
          </Suspense>

          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
        </Canvas>
      )}
    </div>
  );
};
