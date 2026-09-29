import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { RotateCw, Maximize2, Sparkles, Layers } from 'lucide-react';
import { safeRoundRect } from '../services/canvasUtils';

interface ThreeGlassyPhoneProps {
  className?: string;
  autoRotate?: boolean;
  onSelectInteractive?: () => void;
}

export const ThreeGlassyPhone: React.FC<ThreeGlassyPhoneProps> = ({
  className = '',
  autoRotate = true,
  onSelectInteractive,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [viewAngle, setViewAngle] = useState<'angle' | 'front' | 'back' | 'side'>('angle');
  const [isDragging, setIsDragging] = useState(false);

  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  const isDraggingRef = useRef(isDragging);
  isDraggingRef.current = isDragging;

  const targetRotation = useRef({ x: 0.12, y: -0.48 });
  const prevPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 500;
    const height = mount.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
    } catch (e) {
      console.warn('WebGL init error:', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const blueRimLight = new THREE.DirectionalLight(0x0047ff, 4.5);
    blueRimLight.position.set(-6, 2, -4);
    scene.add(blueRimLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 3.5);
    cyanRimLight.position.set(6, -3, -4);
    scene.add(cyanRimLight);

    const ambientLight = new THREE.AmbientLight(0x0a101f, 1.8);
    scene.add(ambientLight);

    // Main Phone Group
    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);

    const phoneW = 2.4;
    const phoneH = 4.9;
    const phoneD = 0.22;
    const cornerR = 0.38;

    const createRoundedShape = (w: number, h: number, r: number) => {
      const shape = new THREE.Shape();
      const hw = w / 2, hh = h / 2;
      shape.moveTo(-hw + r, -hh);
      shape.lineTo(hw - r, -hh);
      shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
      shape.lineTo(hw, hh - r);
      shape.quadraticCurveTo(hw, hh, hw - r, hh);
      shape.lineTo(-hw + r, hh);
      shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
      shape.lineTo(-hw, -hh + r);
      shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
      return shape;
    };

    const mainShape = createRoundedShape(phoneW, phoneH, cornerR);
    const extrudeSettings = {
      depth: phoneD,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    // 1. Crystal Clear Glass Body Frame (Transparent Glass finish from T-V1.png)
    const glassGeo = new THREE.ExtrudeGeometry(mainShape, extrudeSettings);
    glassGeo.center();
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 1,
      transparent: true,
      roughness: 0.03,
      ior: 1.52,
      thickness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    phoneGroup.add(glassMesh);

    // 2. Polished Chrome Inner Rim
    const rimGeo = new THREE.ExtrudeGeometry(mainShape, {
      depth: phoneD * 0.4,
      bevelEnabled: false,
    });
    rimGeo.center();
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.98,
      roughness: 0.1,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    phoneGroup.add(rimMesh);

    // 3. Screen Face with Teladu Mountain Sunset Wallpaper & Live HUD
    const screenGeo = new THREE.PlaneGeometry(phoneW - 0.08, phoneH - 0.08);
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1024;
    screenCanvas.height = 2048;
    const ctx = screenCanvas.getContext('2d');
    if (ctx) {
      // Mountain Sunset Wallpaper matching T-V1.png
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 1600);
      skyGrad.addColorStop(0, '#0c1a30');
      skyGrad.addColorStop(0.3, '#1e3a6a');
      skyGrad.addColorStop(0.65, '#ea580c');
      skyGrad.addColorStop(0.85, '#facc15');
      skyGrad.addColorStop(1, '#090d16');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, 1024, 2048);
    }
    ctx.fillRect(0, 0, 1024, 2048);

    // Mountain silhouettes
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(0, 1500);
    ctx.lineTo(250, 1150);
    ctx.lineTo(450, 1320);
    ctx.lineTo(700, 1050);
    ctx.lineTo(1024, 1420);
    ctx.lineTo(1024, 2048);
    ctx.lineTo(0, 2048);
    ctx.closePath();
    ctx.fill();

    // Floating sunset clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.beginPath();
    ctx.arc(350, 1380, 240, 0, Math.PI * 2);
    ctx.arc(650, 1340, 300, 0, Math.PI * 2);
    ctx.fill();

    // Top Punch Hole Camera
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(512, 110, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(0, 71, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(512, 110, 8, 0, Math.PI * 2);
    ctx.fill();

    // Time & Date exactly matching T-V1.png
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = '700 170px "Syne", sans-serif';
    ctx.fillText('9:41', 512, 420);

    ctx.font = '500 46px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Mon, Sep 22', 512, 510);

    // Teladu Waving Hand Watermark Logo on screen
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.font = '700 44px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('teladu', 512, 780);

    // Bottom Branding: "V1 - Cloud ePhone"
    ctx.font = '600 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('V1 - Cloud ePhone', 512, 1940);

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = phoneD / 2 + 0.045;
    phoneGroup.add(screenMesh);

    // 4. Transparent Back Plate with Glowing Teladu Emblem (from T-V1.png)
    const backGeo = new THREE.PlaneGeometry(phoneW - 0.08, phoneH - 0.08);
    const backCanvas = document.createElement('canvas');
    backCanvas.width = 1024;
    backCanvas.height = 2048;
    const bCtx = backCanvas.getContext('2d');

    if (bCtx) {
      // Transparent frosted glass base
      bCtx.fillStyle = 'rgba(10, 16, 28, 0.65)';
      bCtx.fillRect(0, 0, 1024, 2048);

      // Center Glowing Blue Teladu Emblem
      bCtx.fillStyle = '#0047ff';
      bCtx.beginPath();
      safeRoundRect(bCtx, 412, 920, 200, 200, 50);
      bCtx.fill();

      // White smiling waving hand outline inside emblem
      bCtx.fillStyle = '#ffffff';
      bCtx.beginPath();
      bCtx.arc(512, 1010, 48, 0, Math.PI * 2);
      bCtx.fill();

      // Bottom "V1 Cloud ePhone"
      bCtx.textAlign = 'center';
      bCtx.font = '700 44px "Plus Jakarta Sans", sans-serif';
      bCtx.fillStyle = '#38bdf8';
      bCtx.fillText('V1', 512, 1820);
      bCtx.font = '500 34px "Plus Jakarta Sans", sans-serif';
      bCtx.fillStyle = '#ffffff';
      bCtx.fillText('Cloud ePhone', 512, 1870);
    }

    const backTexture = new THREE.CanvasTexture(backCanvas);
    const backMat = new THREE.MeshPhysicalMaterial({
      map: backTexture,
      transparent: true,
      transmission: 0.88,
      roughness: 0.04,
      ior: 1.5,
    });
    const backMesh = new THREE.Mesh(backGeo, backMat);
    backMesh.position.z = -(phoneD / 2 + 0.045);
    backMesh.rotation.y = Math.PI;
    phoneGroup.add(backMesh);

    // 5. Circular Dual-Lens Camera Pod on Back (from T-V1.png)
    const cameraPod = new THREE.Group();
    const podPlateGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 36);
    podPlateGeo.rotateX(Math.PI / 2);
    const podPlateMat = new THREE.MeshPhysicalMaterial({
      color: 0x050811,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 0.8,
    });
    const podPlate = new THREE.Mesh(podPlateGeo, podPlateMat);
    cameraPod.add(podPlate);

    const podRingGeo = new THREE.TorusGeometry(0.55, 0.02, 16, 48);
    const podRingMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.1 });
    const podRing = new THREE.Mesh(podRingGeo, podRingMat);
    cameraPod.add(podRing);

    [-0.22, 0.22].forEach((offsetY) => {
      const lensBezelGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 32);
      lensBezelGeo.rotateX(Math.PI / 2);
      const lensBezelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
      const bezel = new THREE.Mesh(lensBezelGeo, lensBezelMat);
      bezel.position.set(0, offsetY, 0.04);
      cameraPod.add(bezel);

      const opticalGlassGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.065, 32);
      opticalGlassGeo.rotateX(Math.PI / 2);
      const opticalGlassMat = new THREE.MeshPhysicalMaterial({
        color: 0x0038ff,
        transmission: 0.8,
        roughness: 0.02,
        reflectivity: 0.9,
      });
      const optical = new THREE.Mesh(opticalGlassGeo, opticalGlassMat);
      optical.position.set(0, offsetY, 0.045);
      cameraPod.add(optical);
    });

    const flashGeo = new THREE.CircleGeometry(0.04, 16);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const flash = new THREE.Mesh(flashGeo, flashMat);
    flash.position.set(0.32, 0, 0.045);
    cameraPod.add(flash);

    cameraPod.position.set(-0.55, 1.55, -(phoneD / 2 + 0.07));
    cameraPod.rotation.y = Math.PI;
    phoneGroup.add(cameraPod);

    // 6. Glowing Neon Teladu Blue Side Buttons (from T-V1.png)
    const neonBlueMat = new THREE.MeshStandardMaterial({
      color: 0x0047ff,
      emissive: 0x0047ff,
      emissiveIntensity: 3.8,
      roughness: 0.1,
    });

    const powerButtonGeo = new THREE.BoxGeometry(0.04, 0.45, 0.08);
    const powerButton = new THREE.Mesh(powerButtonGeo, neonBlueMat);
    powerButton.position.set(phoneW / 2 + 0.04, 0.5, 0);
    phoneGroup.add(powerButton);

    const volUpGeo = new THREE.BoxGeometry(0.04, 0.35, 0.08);
    const volUp = new THREE.Mesh(volUpGeo, neonBlueMat);
    volUp.position.set(-(phoneW / 2 + 0.04), 0.8, 0);
    phoneGroup.add(volUp);

    const volDownGeo = new THREE.BoxGeometry(0.04, 0.35, 0.08);
    const volDown = new THREE.Mesh(volDownGeo, neonBlueMat);
    volDown.position.set(-(phoneW / 2 + 0.04), 0.35, 0);
    phoneGroup.add(volDown);

    phoneGroup.rotation.x = targetRotation.current.x;
    phoneGroup.rotation.y = targetRotation.current.y;

    let lastTime = performance.now();
    let animId: number;

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (isRotatingRef.current && !isDraggingRef.current) {
        targetRotation.current.y += delta * 0.45;
      }

      phoneGroup.rotation.x += (targetRotation.current.x - phoneGroup.rotation.x) * 0.08;
      phoneGroup.rotation.y += (targetRotation.current.y - phoneGroup.rotation.y) * 0.08;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      renderer.forceContextLoss();
      glassGeo.dispose();
      rimGeo.dispose();
      screenGeo.dispose();
      backGeo.dispose();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsRotating(false);
    prevPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - prevPointer.current.x;
    const dy = e.clientY - prevPointer.current.y;

    targetRotation.current.y += dx * 0.008;
    targetRotation.current.x += dy * 0.008;
    targetRotation.current.x = Math.max(-0.7, Math.min(0.7, targetRotation.current.x));

    prevPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const setAngle = (angle: 'angle' | 'front' | 'back' | 'side') => {
    setViewAngle(angle);
    setIsRotating(false);
    if (angle === 'front') targetRotation.current = { x: 0, y: 0 };
    else if (angle === 'back') targetRotation.current = { x: 0, y: Math.PI };
    else if (angle === 'side') targetRotation.current = { x: 0, y: -Math.PI / 2 };
    else targetRotation.current = { x: 0.12, y: -0.48 };
  };

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className={`relative w-full h-[540px] md:h-[640px] rounded-3xl overflow-hidden bg-gradient-to-b from-blue-950/20 via-[#070b14]/80 to-[#04060d] border border-blue-500/25 shadow-2xl ${className}`}
    >
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`w-full h-full cursor-grab active:cursor-grabbing ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      />

      {/* Floating HUD Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl p-1 flex items-center gap-1 shadow-lg">
          <button
            onClick={() => setAngle('angle')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              viewAngle === 'angle' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Isometric
          </button>
          <button
            onClick={() => setAngle('front')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              viewAngle === 'front' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setAngle('back')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              viewAngle === 'back' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Glass Back
          </button>
          <button
            onClick={() => setAngle('side')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              viewAngle === 'side' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Profile
          </button>
        </div>

        <button
          onClick={() => setIsRotating(!isRotating)}
          title={isRotating ? 'Pause Rotation' : 'Auto Rotate'}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
            isRotating
              ? 'bg-blue-600/30 text-blue-300 border-blue-500/40'
              : 'bg-slate-950/80 text-slate-400 border-white/10 hover:text-white'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </button>
      </div>

      {/* Switch to Interactive Virtual Phone Banner */}
      {onSelectInteractive && (
        <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-blue-500/30">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span className="text-xs font-medium text-white">Experience as a Live Virtual Phone</span>
          </div>
          <button
            onClick={onSelectInteractive}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/30 flex items-center gap-1.5"
          >
            <span>Launch Virtual OS</span>
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ThreeGlassyPhone;
