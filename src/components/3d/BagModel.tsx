import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BagModelProps {
  scrollProgress: number; // 0 to 1
  printProgress: number;  // 0 (plain canvas) to 1 (full gold foil damask)
  isHovered?: boolean;
}

export const BagModel: React.FC<BagModelProps> = ({ scrollProgress, printProgress }) => {
  const bagGroupRef = useRef<THREE.Group>(null);
  const goldMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Generate procedural canvas fabric texture + gold foil damask map using HTML5 Canvas
  const { fabricTexture, goldDamaskTexture } = useMemo(() => {
    // 1. Fabric Texture
    const fabricCanvas = document.createElement('canvas');
    fabricCanvas.width = 512;
    fabricCanvas.height = 512;
    const ctx = fabricCanvas.getContext('2d')!;
    
    // Warm off-white canvas base
    ctx.fillStyle = '#F5F5ED';
    ctx.fillRect(0, 0, 512, 512);

    // Subtle weave pattern
    ctx.strokeStyle = 'rgba(215, 210, 195, 0.4)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 512; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }

    const fabTex = new THREE.CanvasTexture(fabricCanvas);
    fabTex.wrapS = THREE.RepeatWrapping;
    fabTex.wrapT = THREE.RepeatWrapping;

    // 2. Gold Damask Print Texture
    const damaskCanvas = document.createElement('canvas');
    damaskCanvas.width = 512;
    damaskCanvas.height = 512;
    const dCtx = damaskCanvas.getContext('2d')!;

    // Transparent background
    dCtx.clearRect(0, 0, 512, 512);

    // Draw ornate Gold Foil Damask Cartouche & Logo
    // Outer Cartouche Frame
    dCtx.strokeStyle = '#B8944F';
    dCtx.lineWidth = 6;
    dCtx.strokeRect(96, 120, 320, 272);

    dCtx.strokeStyle = '#D4AF37';
    dCtx.lineWidth = 2;
    dCtx.strokeRect(104, 128, 304, 256);

    // Corner Ornaments
    const drawCorner = (x: number, y: number) => {
      dCtx.fillStyle = '#B8944F';
      dCtx.beginPath();
      dCtx.arc(x, y, 12, 0, Math.PI * 2);
      dCtx.fill();
    };
    drawCorner(96, 120);
    drawCorner(416, 120);
    drawCorner(96, 392);
    drawCorner(416, 392);

    // Central Brand Emblem: Carrystyle CS
    dCtx.font = '900 64px "Outfit", sans-serif';
    dCtx.fillStyle = '#0F2242';
    dCtx.textAlign = 'center';
    dCtx.fillText('CS', 236, 230);

    dCtx.font = '900 64px "Outfit", sans-serif';
    dCtx.fillStyle = '#6FA23A';
    dCtx.fillText('CS', 276, 230);

    dCtx.font = '700 24px "Space Grotesk", sans-serif';
    dCtx.fillStyle = '#0F2242';
    dCtx.letterSpacing = '4px';
    dCtx.fillText('CARRYSTYLE', 256, 280);

    dCtx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    dCtx.fillStyle = '#B8944F';
    dCtx.fillText('INDIA • EST 2008', 256, 310);

    // Wave Underline in Gold/Teal
    dCtx.strokeStyle = '#3FA796';
    dCtx.lineWidth = 4;
    dCtx.beginPath();
    dCtx.moveTo(140, 335);
    dCtx.bezierCurveTo(180, 320, 330, 350, 372, 335);
    dCtx.stroke();

    const goldTex = new THREE.CanvasTexture(damaskCanvas);

    return { fabricTexture: fabTex, goldDamaskTexture: goldTex };
  }, []);

  // Animate 3D bag based on scroll progress and idle float
  useFrame((state) => {
    if (!bagGroupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Idle float and gentle tilt
    const idleY = Math.sin(time * 1.5) * 0.08;
    const idleRotY = Math.sin(time * 0.8) * 0.05;

    // Scroll-driven transformations:
    // Scroll 0 -> 0.3: Hero center view, rotating 360 deg
    // Scroll 0.3 -> 0.6: Drift to right for Customization section, scale up
    // Scroll 0.6 -> 1.0: Shift position for Products section
    const targetRotY = scrollProgress * Math.PI * 2.5 + idleRotY;
    const targetRotX = Math.sin(scrollProgress * Math.PI) * 0.2;
    const targetRotZ = Math.cos(scrollProgress * Math.PI) * 0.05;

    const targetPosX = scrollProgress < 0.2 ? 0 : Math.sin(scrollProgress * Math.PI * 2) * 1.2;
    const targetPosY = idleY + (scrollProgress > 0.3 ? -0.2 : 0);
    const targetScale = 1.1 + Math.sin(scrollProgress * Math.PI) * 0.25;

    // Smooth lerp interpolation
    bagGroupRef.current.rotation.y = THREE.MathUtils.lerp(bagGroupRef.current.rotation.y, targetRotY, 0.08);
    bagGroupRef.current.rotation.x = THREE.MathUtils.lerp(bagGroupRef.current.rotation.x, targetRotX, 0.08);
    bagGroupRef.current.rotation.z = THREE.MathUtils.lerp(bagGroupRef.current.rotation.z, targetRotZ, 0.08);
    
    bagGroupRef.current.position.x = THREE.MathUtils.lerp(bagGroupRef.current.position.x, targetPosX, 0.06);
    bagGroupRef.current.position.y = THREE.MathUtils.lerp(bagGroupRef.current.position.y, targetPosY, 0.06);
    
    bagGroupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(bagGroupRef.current.scale.x, targetScale, 0.08)
    );

    // Update gold material opacity / metalness for print transition
    if (goldMaterialRef.current) {
      goldMaterialRef.current.opacity = THREE.MathUtils.lerp(goldMaterialRef.current.opacity, printProgress, 0.1);
      goldMaterialRef.current.metalness = THREE.MathUtils.lerp(0.3, 0.85, printProgress);
    }
  });

  return (
    <group ref={bagGroupRef} position={[0, 0, 0]}>
      {/* Main Bag Body Geometry - Smooth rounded box */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 2.8, 0.9, 16, 16, 16]} />
        <meshStandardMaterial
          map={fabricTexture}
          roughness={0.7}
          metalness={0.05}
          color="#F7F7F2"
        />
      </mesh>

      {/* Front Panel Print Overlay Mesh (Gold Damask Foil) */}
      <mesh position={[0, 0, 0.455]}>
        <planeGeometry args={[2.36, 2.76]} />
        <meshStandardMaterial
          ref={goldMaterialRef}
          map={goldDamaskTexture}
          transparent={true}
          opacity={printProgress}
          roughness={0.25}
          metalness={0.8}
          color="#FFDF7B"
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Reinforced Top Border Stitching Line */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <boxGeometry args={[2.44, 0.1, 0.94]} />
        <meshStandardMaterial color="#0F2242" roughness={0.6} />
      </mesh>

      {/* Bag Handle Left - Curved Torus Segment */}
      <group position={[-0.6, 1.4, 0]}>
        <mesh castShadow position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 1.1, 16]} />
          <meshStandardMaterial color="#0F2242" roughness={0.5} />
        </mesh>
        {/* Leather patch attachment */}
        <mesh position={[0, 0, 0.46]} castShadow>
          <boxGeometry args={[0.18, 0.22, 0.04]} />
          <meshStandardMaterial color="#6FA23A" roughness={0.4} />
        </mesh>
      </group>

      {/* Bag Handle Right */}
      <group position={[0.6, 1.4, 0]}>
        <mesh castShadow position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 1.1, 16]} />
          <meshStandardMaterial color="#0F2242" roughness={0.5} />
        </mesh>
        {/* Leather patch attachment */}
        <mesh position={[0, 0, 0.46]} castShadow>
          <boxGeometry args={[0.18, 0.22, 0.04]} />
          <meshStandardMaterial color="#6FA23A" roughness={0.4} />
        </mesh>
      </group>

      {/* Side Gussets Seam Accents */}
      <mesh position={[-1.205, 0, 0]}>
        <boxGeometry args={[0.02, 2.75, 0.88]} />
        <meshStandardMaterial color="#6FA23A" roughness={0.5} />
      </mesh>
      <mesh position={[1.205, 0, 0]}>
        <boxGeometry args={[0.02, 2.75, 0.88]} />
        <meshStandardMaterial color="#6FA23A" roughness={0.5} />
      </mesh>

      {/* Bottom Padded Base */}
      <mesh position={[0, -1.41, 0]} receiveShadow>
        <boxGeometry args={[2.42, 0.04, 0.92]} />
        <meshStandardMaterial color="#0F2242" roughness={0.7} />
      </mesh>
    </group>
  );
};
