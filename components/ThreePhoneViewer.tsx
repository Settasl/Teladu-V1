import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { COLORWAYS, ColorwayOption } from '../assets';
import { RotateCw, Eye, Sparkles, Layers, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';
import { drawRoundRectPath } from '../services/canvasUtils';

interface ThreePhoneViewerProps {
  initialColor?: string;
  allowExplodedView?: boolean;
  className?: string;
  autoRotateSpeed?: number;
  interactive?: boolean;
}

export const ThreePhoneViewer: React.FC<ThreePhoneViewerProps> = ({
  initialColor = 'natural-titanium',
  allowExplodedView = true,
  className = '',
  autoRotateSpeed = 0.8,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  const [activeColor, setActiveColor] = useState<ColorwayOption>(
    COLORWAYS.find((c) => c.id === initialColor) || COLORWAYS[0]
  );
  const [isExploded, setIsExploded] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [screenMode, setScreenMode] = useState<'os' | 'vision' | 'minimal'>('os');
  const [isDragging, setIsDragging] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Synchronize dynamic state to refs for animation loop
  const isExplodedRef = useRef(isExploded);
  isExplodedRef.current = isExploded;

  const isAutoRotatingRef = useRef(isAutoRotating);
  isAutoRotatingRef.current = isAutoRotating;

  const autoRotateSpeedRef = useRef(autoRotateSpeed);
  autoRotateSpeedRef.current = autoRotateSpeed;

  const isDraggingRef = useRef(isDragging);
  isDraggingRef.current = isDragging;

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const phoneGroupRef = useRef<THREE.Group | null>(null);
  const layersRef = useRef<{
    frontGlass?: THREE.Mesh;
    screen?: THREE.Mesh;
    logicBoard?: THREE.Mesh;
    frame?: THREE.Mesh;
    cameraBump?: THREE.Group;
    backGlass?: THREE.Mesh;
  }>({});

  const screenTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const previousPointerPosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.15, y: -0.45 });

  // Generate procedural canvas texture for phone display
  const createScreenCanvas = useCallback((mode: 'os' | 'vision' | 'minimal') => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // Background base
    ctx.fillStyle = '#05070c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (mode === 'os') {
      // Radiant abstract spatial wallpaper
      const gradient = ctx.createRadialGradient(512, 800, 50, 512, 800, 900);
      gradient.addColorStop(0, '#0284c7');
      gradient.addColorStop(0.35, '#0ea5e9');
      gradient.addColorStop(0.65, '#0369a1');
      gradient.addColorStop(1, '#05070c');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glowing liquid curves
      ctx.beginPath();
      ctx.arc(320, 1300, 450, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.fill();

      // Status Bar
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('9:41', 80, 110);

      // Status icons representation
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      drawRoundRectPath(ctx, 880, 85, 60, 30, 8);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillRect(886, 91, 38, 18);

      // Big Lockscreen Clock
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = '700 210px "Syne", sans-serif';
      ctx.fillText('09:41', 512, 540);

      ctx.font = '500 44px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText('Monday, September 28 · Teladu OS 3.0', 512, 620);

      // Spatial Floating Widget Card
      ctx.beginPath();
      drawRoundRectPath(ctx, 100, 720, 824, 260, 48);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('TELADU NEURAL ENGINE ACTIVE', 150, 790);

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 48px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Spatial Vision Grounding', 150, 860);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '400 34px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('60 TOPS NPU · Sub-12ms Latency', 150, 920);

      // Bottom Dock icons
      const dockY = 1780;
      for (let idx = 0; idx < 4; idx++) {
        const x = 180 + idx * 180;
        ctx.beginPath();
        drawRoundRectPath(ctx, x - 55, dockY - 55, 110, 110, 30);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Home Bar Indicator
      ctx.beginPath();
      drawRoundRectPath(ctx, 362, 1980, 300, 10, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    } else if (mode === 'vision') {
      // Camera Viewfinder HUD
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.lineWidth = 4;

      const cx = 512, cy = 950, sz = 160;
      ctx.strokeRect(cx - sz / 2, cy - sz / 2, sz, sz);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 36px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('RAW 200MP · 10x PERISCOPE', 80, 140);
      ctx.textAlign = 'right';
      ctx.fillText('ISO 100 · f/1.4 · 1/8000s', 944, 140);

      ctx.textAlign = 'center';
      ctx.font = '500 32px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText('OPTICAL PRISM STABILIZATION ENGAGED', 512, 1680);

      ctx.beginPath();
      ctx.arc(512, 1840, 70, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(512, 1840, 56, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = '300 240px "Syne", sans-serif';
      ctx.fillText('09:41', 512, 850);

      ctx.font = '500 38px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Teladu ePhone Pro · Aerospace Titanium', 512, 950);

      ctx.beginPath();
      drawRoundRectPath(ctx, 362, 1980, 300, 10, 5);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
    }

    return canvas;
  }, []);

  // Update screen texture when mode changes
  useEffect(() => {
    if (!screenTextureRef.current) return;
    const canvas = createScreenCanvas(screenMode);
    screenTextureRef.current.image = canvas;
    screenTextureRef.current.needsUpdate = true;
  }, [screenMode, createScreenCanvas]);

  // Update material colors when activeColor changes
  useEffect(() => {
    if (!layersRef.current.frame || !layersRef.current.backGlass) return;

    const frameMat = layersRef.current.frame.material as THREE.MeshStandardMaterial;
    const backMat = layersRef.current.backGlass.material as THREE.MeshPhysicalMaterial;

    frameMat.color.setHex(activeColor.threeColor);
    frameMat.roughness = activeColor.roughness;
    frameMat.metalness = activeColor.metalness;

    backMat.color.setHex(activeColor.threeColor);
    backMat.roughness = activeColor.roughness + 0.05;
    backMat.metalness = Math.max(0.2, activeColor.metalness - 0.2);

    if (layersRef.current.cameraBump) {
      layersRef.current.cameraBump.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === 'bumpPlate') {
          (child.material as THREE.MeshStandardMaterial).color.setHex(activeColor.threeColor);
        }
      });
    }
  }, [activeColor]);

  // Main Three.js Scene Setup (Runs ONCE on mount)
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 550;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 3. Renderer with safe creation
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (err) {
      console.warn('WebGL initialization failed:', err);
      setWebglSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    // Append canvas to mount container
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    // 4. Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 1.4);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.2);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    scene.add(ambientLight);

    // 5. Build Procedural Teladu ePhone 3D Model
    const phoneGroup = new THREE.Group();
    phoneGroupRef.current = phoneGroup;
    scene.add(phoneGroup);

    const phoneWidth = 2.4;
    const phoneHeight = 4.8;
    const phoneThickness = 0.22;
    const cornerRadius = 0.35;

    const createRoundedRectShape = (w: number, h: number, r: number) => {
      const shape = new THREE.Shape();
      const hw = w / 2;
      const hh = h / 2;
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

    const mainShape = createRoundedRectShape(phoneWidth, phoneHeight, cornerRadius);
    const extrudeSettings = {
      depth: phoneThickness,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    // A. Titanium Mid-Frame
    const frameGeometry = new THREE.ExtrudeGeometry(mainShape, extrudeSettings);
    frameGeometry.center();
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: activeColor.threeColor,
      roughness: activeColor.roughness,
      metalness: activeColor.metalness,
      envMapIntensity: 1.5,
    });
    const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    phoneGroup.add(frameMesh);
    layersRef.current.frame = frameMesh;

    // B. Screen
    const screenWidth = phoneWidth - 0.08;
    const screenHeight = phoneHeight - 0.08;
    const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight);

    const screenCanvas = createScreenCanvas('os');
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTextureRef.current = screenTexture;

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
      transparent: false,
    });
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = phoneThickness / 2 + 0.06;
    phoneGroup.add(screenMesh);
    layersRef.current.screen = screenMesh;

    // C. Front Glass
    const frontGlassShape = createRoundedRectShape(phoneWidth - 0.02, phoneHeight - 0.02, cornerRadius - 0.02);
    const frontGlassGeo = new THREE.ShapeGeometry(frontGlassShape);
    const frontGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      opacity: 1,
      transparent: true,
      roughness: 0.02,
      ior: 1.52,
      reflectivity: 0.8,
    });
    const frontGlassMesh = new THREE.Mesh(frontGlassGeo, frontGlassMat);
    frontGlassMesh.position.z = phoneThickness / 2 + 0.065;
    phoneGroup.add(frontGlassMesh);
    layersRef.current.frontGlass = frontGlassMesh;

    // D. Logic Board (Exploded View)
    const boardShape = createRoundedRectShape(phoneWidth - 0.2, phoneHeight - 0.2, cornerRadius - 0.08);
    const boardGeo = new THREE.ExtrudeGeometry(boardShape, { depth: 0.04, bevelEnabled: false });
    boardGeo.center();
    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.6,
      metalness: 0.8,
    });
    const logicBoardMesh = new THREE.Mesh(boardGeo, boardMat);
    logicBoardMesh.position.z = 0;
    logicBoardMesh.visible = false;
    phoneGroup.add(logicBoardMesh);
    layersRef.current.logicBoard = logicBoardMesh;

    // E. Back Plate
    const backGlassShape = createRoundedRectShape(phoneWidth - 0.02, phoneHeight - 0.02, cornerRadius - 0.02);
    const backGlassGeo = new THREE.ShapeGeometry(backGlassShape);
    const backGlassMat = new THREE.MeshPhysicalMaterial({
      color: activeColor.threeColor,
      roughness: activeColor.roughness + 0.05,
      metalness: Math.max(0.2, activeColor.metalness - 0.2),
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
    });
    const backGlassMesh = new THREE.Mesh(backGlassGeo, backGlassMat);
    backGlassMesh.position.z = -(phoneThickness / 2 + 0.055);
    backGlassMesh.rotation.y = Math.PI;
    phoneGroup.add(backGlassMesh);
    layersRef.current.backGlass = backGlassMesh;

    // F. Triple Camera Bump
    const cameraGroup = new THREE.Group();
    const bumpShape = createRoundedRectShape(0.95, 1.05, 0.22);
    const bumpGeo = new THREE.ExtrudeGeometry(bumpShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelSize: 0.02,
      bevelThickness: 0.02,
      bevelSegments: 4,
    });
    bumpGeo.center();
    const bumpMat = new THREE.MeshStandardMaterial({
      color: activeColor.threeColor,
      roughness: 0.2,
      metalness: 0.9,
    });
    const bumpMesh = new THREE.Mesh(bumpGeo, bumpMat);
    bumpMesh.name = 'bumpPlate';
    cameraGroup.add(bumpMesh);

    const lensPositions = [
      { x: -0.22, y: 0.24 },
      { x: -0.22, y: -0.24 },
      { x: 0.24, y: 0 },
    ];

    lensPositions.forEach((pos, idx) => {
      const bezelGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 32);
      bezelGeo.rotateX(Math.PI / 2);
      const bezelMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.95,
        roughness: 0.2,
      });
      const bezel = new THREE.Mesh(bezelGeo, bezelMat);
      bezel.position.set(pos.x, pos.y, 0.05);
      cameraGroup.add(bezel);

      const lensGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.062, 32);
      lensGeo.rotateX(Math.PI / 2);
      const lensMat = new THREE.MeshPhysicalMaterial({
        color: idx === 0 ? 0x0284c7 : 0x0f172a,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.8,
        reflectivity: 0.9,
      });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.position.set(pos.x, pos.y, 0.055);
      cameraGroup.add(lens);
    });

    const flashGeo = new THREE.CircleGeometry(0.06, 16);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const flash = new THREE.Mesh(flashGeo, flashMat);
    flash.position.set(0.24, 0.32, 0.045);
    cameraGroup.add(flash);

    cameraGroup.position.set(-0.55, 1.6, -(phoneThickness / 2 + 0.08));
    cameraGroup.rotation.y = Math.PI;
    phoneGroup.add(cameraGroup);
    layersRef.current.cameraBump = cameraGroup;

    phoneGroup.rotation.x = targetRotation.current.x;
    phoneGroup.rotation.y = targetRotation.current.y;

    // 6. Animation Loop (uses refs to access current state without rebuilding scene)
    let lastTime = performance.now();

    const animate = (time: number) => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (phoneGroupRef.current) {
        if (isAutoRotatingRef.current && !isDraggingRef.current) {
          targetRotation.current.y += autoRotateSpeedRef.current * delta * 0.5;
        }

        phoneGroupRef.current.rotation.x += (targetRotation.current.x - phoneGroupRef.current.rotation.x) * 0.08;
        phoneGroupRef.current.rotation.y += (targetRotation.current.y - phoneGroupRef.current.rotation.y) * 0.08;

        const exploded = isExplodedRef.current;
        const targetZFrontGlass = exploded ? 1.6 : phoneThickness / 2 + 0.065;
        const targetZScreen = exploded ? 0.9 : phoneThickness / 2 + 0.06;
        const targetZBoard = exploded ? 0.2 : 0;
        const targetZBump = exploded ? -(phoneThickness / 2 + 1.2) : -(phoneThickness / 2 + 0.08);
        const targetZBackGlass = exploded ? -(phoneThickness / 2 + 1.6) : -(phoneThickness / 2 + 0.055);

        if (layersRef.current.frontGlass) {
          layersRef.current.frontGlass.position.z += (targetZFrontGlass - layersRef.current.frontGlass.position.z) * 0.1;
        }
        if (layersRef.current.screen) {
          layersRef.current.screen.position.z += (targetZScreen - layersRef.current.screen.position.z) * 0.1;
        }
        if (layersRef.current.logicBoard) {
          layersRef.current.logicBoard.visible = exploded;
          layersRef.current.logicBoard.position.z += (targetZBoard - layersRef.current.logicBoard.position.z) * 0.1;
        }
        if (layersRef.current.cameraBump) {
          layersRef.current.cameraBump.position.z += (targetZBump - layersRef.current.cameraBump.position.z) * 0.1;
        }
        if (layersRef.current.backGlass) {
          layersRef.current.backGlass.position.z += (targetZBackGlass - layersRef.current.backGlass.position.z) * 0.1;
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    // 7. Resize Handler
    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. Safe Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      frameGeometry.dispose();
      screenGeometry.dispose();
      frontGlassGeo.dispose();
      boardGeo.dispose();
      backGlassGeo.dispose();
      bumpGeo.dispose();
    };
  }, []); // Only runs once on mount

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    setIsAutoRotating(false);
    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !interactive) return;

    const deltaX = e.clientX - previousPointerPosition.current.x;
    const deltaY = e.clientY - previousPointerPosition.current.y;

    targetRotation.current.y += deltaX * 0.008;
    targetRotation.current.x += deltaY * 0.008;
    targetRotation.current.x = Math.max(-0.8, Math.min(0.8, targetRotation.current.x));

    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const setPresetAngle = (view: 'front' | 'back' | 'angle') => {
    setIsAutoRotating(false);
    if (view === 'front') {
      targetRotation.current = { x: 0, y: 0 };
    } else if (view === 'back') {
      targetRotation.current = { x: 0, y: Math.PI };
    } else {
      targetRotation.current = { x: 0.2, y: -0.6 };
    }
  };

  if (!webglSupported) {
    return (
      <div className={`relative flex flex-col items-center justify-center p-8 bg-slate-900/80 border border-white/10 rounded-3xl ${className}`}>
        <img
          src="/src/assets/images/ephone_hero_showcase_1790631119532.jpg"
          alt="Teladu ePhone showcase"
          className="w-full max-w-md object-contain rounded-2xl shadow-xl"
          referrerPolicy="no-referrer"
        />
        <div className="mt-4 text-xs font-mono text-cyan-400">Teladu ePhone Pro · Studio Preview</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[540px] md:h-[620px] select-none rounded-3xl overflow-hidden bg-gradient-to-b from-[#090e17]/80 to-[#04060a] border border-white/5 shadow-2xl ${className}`}
    >
      {/* 3D Mount Container with Pointer handlers */}
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
        <div className="bg-slate-950/70 backdrop-blur-md border border-white/10 rounded-xl p-1 flex items-center gap-1 shadow-lg">
          <button
            onClick={() => setPresetAngle('front')}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Front
          </button>
          <button
            onClick={() => setPresetAngle('back')}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Cameras
          </button>
          <button
            onClick={() => setPresetAngle('angle')}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            Isometric
          </button>
        </div>

        {allowExplodedView && (
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border backdrop-blur-md transition-all whitespace-nowrap ${
              isExploded
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'bg-slate-950/70 text-slate-300 border-white/10 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isExploded ? 'Collapse Architecture' : 'Exploded 3D View'}</span>
          </button>
        )}

        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          title={isAutoRotating ? 'Pause Rotation' : 'Auto Rotate'}
          className={`p-1.5 rounded-xl border backdrop-blur-md transition-all ${
            isAutoRotating
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              : 'bg-slate-950/70 text-slate-400 border-white/10 hover:text-white'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </button>
      </div>

      {/* Exploded Labels Callout */}
      {isExploded && (
        <div className="absolute top-16 right-4 z-20 hidden md:flex flex-col gap-1.5 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-cyan-500/20 text-xs">
          <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">Internal Subsystems</div>
          <div className="text-slate-200">01. Sapphire Shield Glass</div>
          <div className="text-slate-300">02. 120Hz ProMotion OLED</div>
          <div className="text-slate-300">03. Teladu N1 Neural Engine</div>
          <div className="text-slate-300">04. Aerospace Grade 5 Titanium</div>
          <div className="text-slate-300">05. 200MP Triple Periscope Array</div>
          <div className="text-slate-400">06. MagFlow Induction Backing</div>
        </div>
      )}

      {/* Bottom Bar: Finish & Screen Mode Switcher */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/80 backdrop-blur-md p-2.5 sm:px-4 rounded-2xl border border-white/10">
        {/* Color Swatches */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Finish:</span>
          <div className="flex items-center gap-2">
            {COLORWAYS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveColor(c)}
                title={c.name}
                className={`relative w-6 h-6 rounded-full transition-transform ${
                  activeColor.id === c.id ? 'scale-125 ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950' : 'hover:scale-110 opacity-80'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          <span className="text-xs text-slate-200 font-medium hidden lg:inline">{activeColor.name}</span>
        </div>

        {/* Screen Mode */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setScreenMode('os')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              screenMode === 'os' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Spatial OS
          </button>
          <button
            onClick={() => setScreenMode('vision')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              screenMode === 'vision' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            200MP HUD
          </button>
          <button
            onClick={() => setScreenMode('minimal')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              screenMode === 'minimal' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Minimal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreePhoneViewer;
