import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StillBagModelProps {
  variantId: 'clear' | 'dawn' | 'dusk';
  rotationOffset?: number;
  scaleModifier?: number;
}

export const StillBagModel: React.FC<StillBagModelProps> = ({
  variantId,
  rotationOffset = 0,
  scaleModifier = 1,
}) => {
  const bagGroupRef = useRef<THREE.Group>(null);

  // Generate smooth procedural fabric textures & gold foil damask crest
  const textures = useMemo(() => {
    // 1. Clear - Organic Beige Cotton Canvas + 24k Gold Foil Stamp
    const clearCanvas = document.createElement('canvas');
    clearCanvas.width = 1024;
    clearCanvas.height = 1024;
    const cCtx = clearCanvas.getContext('2d')!;

    // Warm organic canvas background
    cCtx.fillStyle = '#F4F2EB';
    cCtx.fillRect(0, 0, 1024, 1024);

    // Fine organic fabric weave texture
    cCtx.strokeStyle = 'rgba(15, 34, 66, 0.06)';
    cCtx.lineWidth = 2;
    for (let i = 0; i < 1024; i += 12) {
      cCtx.beginPath(); cCtx.moveTo(i, 0); cCtx.lineTo(i, 1024); cCtx.stroke();
      cCtx.beginPath(); cCtx.moveTo(0, i); cCtx.lineTo(1024, i); cCtx.stroke();
    }

    // Elegant Gold Foil Damask Frame
    cCtx.strokeStyle = '#B8944F';
    cCtx.lineWidth = 8;
    cCtx.strokeRect(200, 260, 624, 500);

    cCtx.strokeStyle = '#D4AF37';
    cCtx.lineWidth = 3;
    cCtx.strokeRect(216, 276, 592, 468);

    // Brand Typography
    cCtx.font = '900 110px "Outfit", sans-serif';
    cCtx.fillStyle = '#0F2242';
    cCtx.textAlign = 'center';
    cCtx.fillText('CARRYSTYLE.', 512, 480);

    cCtx.font = '700 28px "Space Grotesk", sans-serif';
    cCtx.fillStyle = '#B8944F';
    cCtx.letterSpacing = '6px';
    cCtx.fillText('01 • ORGANIC CANVAS', 512, 550);

    const clearTex = new THREE.CanvasTexture(clearCanvas);

    // 2. Dawn - Laminated Golden Jute
    const dawnCanvas = document.createElement('canvas');
    dawnCanvas.width = 1024;
    dawnCanvas.height = 1024;
    const dCtx = dawnCanvas.getContext('2d')!;
    dCtx.fillStyle = '#D3BE9B';
    dCtx.fillRect(0, 0, 1024, 1024);

    dCtx.strokeStyle = 'rgba(75, 55, 25, 0.15)';
    dCtx.lineWidth = 4;
    for (let i = 0; i < 1024; i += 10) {
      dCtx.beginPath(); dCtx.moveTo(i, 0); dCtx.lineTo(i, 1024); dCtx.stroke();
      dCtx.beginPath(); dCtx.moveTo(0, i); dCtx.lineTo(1024, i); dCtx.stroke();
    }

    dCtx.font = '900 100px "Outfit", sans-serif';
    dCtx.fillStyle = '#0F2242';
    dCtx.textAlign = 'center';
    dCtx.fillText('CARRYSTYLE.', 512, 480);

    dCtx.font = '700 28px "Space Grotesk", sans-serif';
    dCtx.fillStyle = '#6FA23A';
    dCtx.fillText('02 • ECO JUTE', 512, 550);

    const dawnTex = new THREE.CanvasTexture(dawnCanvas);

    // 3. Dusk - Executive Ballistic Nylon
    const duskCanvas = document.createElement('canvas');
    duskCanvas.width = 1024;
    duskCanvas.height = 1024;
    const duCtx = duskCanvas.getContext('2d')!;
    duCtx.fillStyle = '#0F2242';
    duCtx.fillRect(0, 0, 1024, 1024);

    duCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    duCtx.lineWidth = 2;
    for (let i = 0; i < 1024; i += 8) {
      duCtx.beginPath(); duCtx.moveTo(i, 0); duCtx.lineTo(i, 1024); duCtx.stroke();
      duCtx.beginPath(); duCtx.moveTo(0, i); duCtx.lineTo(1024, i); duCtx.stroke();
    }

    duCtx.font = '900 100px "Outfit", sans-serif';
    duCtx.fillStyle = '#FAFAF8';
    duCtx.textAlign = 'center';
    duCtx.fillText('CARRYSTYLE.', 512, 480);

    duCtx.font = '700 28px "Space Grotesk", sans-serif';
    duCtx.fillStyle = '#C9B5C8';
    duCtx.fillText('03 • EXECUTIVE NYLON', 512, 550);

    const duskTex = new THREE.CanvasTexture(duskCanvas);

    return { clearTex, dawnTex, duskTex };
  }, []);

  // Create smooth curved Tote Bag body shape using 3D ExtrudeGeometry
  const bagGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Rounded Tote Bag Silhouette: wider at top, soft curved bottom
    const w = 1.3;
    const h = 1.6;
    const r = 0.25; // Corner radius

    shape.moveTo(-w + r, -h);
    shape.lineTo(w - r, -h);
    shape.quadraticCurveTo(w, -h, w, -h + r);
    shape.lineTo(w + 0.15, h - r); // Subtle top flare
    shape.quadraticCurveTo(w + 0.15, h, w - r, h);
    shape.lineTo(-w + r, h);
    shape.quadraticCurveTo(-w - 0.15, h, -w - 0.15, h - r);
    shape.lineTo(-w, -h + r);
    shape.quadraticCurveTo(-w, -h, -w + r, -h);

    const extrudeSettings = {
      steps: 2,
      depth: 0.75,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.12,
      bevelSegments: 8,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // Create curved 3D Shoulder Straps
  const strapCurveLeft = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.65, 1.4, 0.25),
      new THREE.Vector3(-0.65, 2.4, 0.1),
      new THREE.Vector3(-0.65, 2.4, -0.1),
      new THREE.Vector3(-0.65, 1.4, -0.25),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.045, 12, false);
  }, []);

  const strapCurveRight = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.65, 1.4, 0.25),
      new THREE.Vector3(0.65, 2.4, 0.1),
      new THREE.Vector3(0.65, 2.4, -0.1),
      new THREE.Vector3(0.65, 1.4, -0.25),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.045, 12, false);
  }, []);

  const activeTexture = variantId === 'dawn' ? textures.dawnTex : variantId === 'dusk' ? textures.duskTex : textures.clearTex;
  const activeColor = variantId === 'dawn' ? '#E4D5B7' : variantId === 'dusk' ? '#0A1424' : '#F7F5EE';
  const leatherColor = variantId === 'dawn' ? '#4A3519' : variantId === 'dusk' ? '#6FA23A' : '#0F2242';

  useFrame((state) => {
    if (!bagGroupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth slow rotation & floating animation
    bagGroupRef.current.rotation.y = time * 0.35 + rotationOffset;
    bagGroupRef.current.rotation.x = Math.sin(time * 0.8) * 0.04;
    bagGroupRef.current.position.y = Math.sin(time * 1.4) * 0.08;
  });

  return (
    <group ref={bagGroupRef} scale={scaleModifier}>
      
      {/* Curved Soft Tote Bag Body */}
      <mesh geometry={bagGeometry} castShadow receiveShadow position={[0, 0, 0]}>
        <meshStandardMaterial
          map={activeTexture}
          color={activeColor}
          roughness={variantId === 'dusk' ? 0.25 : 0.55}
          metalness={variantId === 'clear' ? 0.15 : 0.05}
        />
      </mesh>

      {/* Top Hem Border Trim */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <boxGeometry args={[2.7, 0.1, 0.85]} />
        <meshStandardMaterial color={leatherColor} roughness={0.4} />
      </mesh>

      {/* Curved 3D Leather Shoulder Straps */}
      <mesh geometry={strapCurveLeft} castShadow>
        <meshStandardMaterial color={leatherColor} roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh geometry={strapCurveRight} castShadow>
        <meshStandardMaterial color={leatherColor} roughness={0.35} metalness={0.1} />
      </mesh>

      {/* Brass Metal Buckle Rivets (Strap Attachments) */}
      {[-0.65, 0.65].map((x, i) => (
        <group key={i}>
          {/* Front Studs */}
          <mesh position={[x, 1.45, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
            <meshStandardMaterial color="#B8944F" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Back Studs */}
          <mesh position={[x, 1.45, -0.42]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
            <meshStandardMaterial color="#B8944F" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Side Seam Reinforcement Piping */}
      <mesh position={[-1.32, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 3.2, 16]} />
        <meshStandardMaterial color="#6FA23A" roughness={0.4} />
      </mesh>
      <mesh position={[1.32, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 3.2, 16]} />
        <meshStandardMaterial color="#6FA23A" roughness={0.4} />
      </mesh>

    </group>
  );
};
