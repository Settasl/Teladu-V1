import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Volume2, VolumeX } from 'lucide-react';
import { triggerHaptic } from '../services/soundService';
import { safeRoundRect } from '../services/canvasUtils';

interface DancingNeonRobotProps {
  className?: string;
}

export const DancingNeonRobot: React.FC<DancingNeonRobotProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [danceMove, setDanceMove] = useState<'groove' | 'spin' | 'shuffle' | 'bounce'>('groove');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<any>(null);

  const danceMoveRef = useRef(danceMove);
  danceMoveRef.current = danceMove;

  // Synthesized Cyber-Funk Beat using Web Audio API (iOS-safe)
  const toggleBeat = () => {
    triggerHaptic(20);
    if (isPlayingMusic) {
      if (musicIntervalRef.current) clearInterval(musicIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.suspend().catch(() => {});
      setIsPlayingMusic(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        audioContextRef.current.resume().catch(() => {});

        const ctx = audioContextRef.current;
        let step = 0;
        const bassNotes = [110, 110, 130.81, 146.83, 110, 164.81, 146.83, 123.47];

        musicIntervalRef.current = setInterval(() => {
          if (!ctx || ctx.state === 'suspended') return;
          const now = ctx.currentTime;

          // Kick Drum
          if (step % 2 === 0) {
            const kickOsc = ctx.createOscillator();
            const kickGain = ctx.createGain();
            kickOsc.frequency.setValueAtTime(140, now);
            kickOsc.frequency.exponentialRampToValueAtTime(35, now + 0.08);
            kickGain.gain.setValueAtTime(0.25, now);
            kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
            kickOsc.connect(kickGain);
            kickGain.connect(ctx.destination);
            kickOsc.start(now);
            kickOsc.stop(now + 0.1);
          }

          // Hi-Hat
          const hihatBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.03), ctx.sampleRate);
          const data = hihatBuffer.getChannelData(0);
          for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
          const hihatSource = ctx.createBufferSource();
          hihatSource.buffer = hihatBuffer;
          const hihatGain = ctx.createGain();
          hihatGain.gain.setValueAtTime(0.05, now);
          hihatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
          hihatSource.connect(hihatGain);
          hihatGain.connect(ctx.destination);
          hihatSource.start(now);

          // Synth Bass Line
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bassOsc.type = 'sawtooth';
          bassOsc.frequency.setValueAtTime(bassNotes[step % bassNotes.length], now);
          bassGain.gain.setValueAtTime(0.06, now);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          bassOsc.connect(bassGain);
          bassGain.connect(ctx.destination);
          bassOsc.start(now);
          bassOsc.stop(now + 0.16);

          step = (step + 1) % 8;
        }, 160);

        setIsPlayingMusic(true);
      } catch (e) {
        console.warn('Audio beat error:', e);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (musicIntervalRef.current) clearInterval(musicIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close().catch(() => {});
    };
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 360;
    const height = mount.clientHeight || 560;

    const scene = new THREE.Scene();
    // Adjusted camera and perspective for taller, more sophisticated robot
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 6.8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    // Cap pixelRatio at 1.5 to prevent memory crash on iOS Safari & iPhone
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(4, 8, 5);
    scene.add(keyLight);

    const blueNeonLight = new THREE.PointLight(0x0047ff, 6.5, 14);
    blueNeonLight.position.set(-3.5, 3.5, 3);
    scene.add(blueNeonLight);

    const cyanNeonLight = new THREE.PointLight(0x00f0ff, 5.5, 14);
    cyanNeonLight.position.set(3.5, 2.5, 3);
    scene.add(cyanNeonLight);

    const backRimLight = new THREE.DirectionalLight(0x0047ff, 4.0);
    backRimLight.position.set(0, 5, -4);
    scene.add(backRimLight);

    const ambientLight = new THREE.AmbientLight(0x080e1e, 1.8);
    scene.add(ambientLight);

    // Master Robot Root Group
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    // Authentic Teladu Brand Materials
    const polishedWhiteArmor = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      metalness: 0.25,
      roughness: 0.12,
      clearcoat: 0.8,
    });
    const teladuBlueMetal = new THREE.MeshStandardMaterial({
      color: 0x0038ff,
      metalness: 0.85,
      roughness: 0.18,
    });
    const darkObsidianChassis = new THREE.MeshStandardMaterial({
      color: 0x070b14,
      metalness: 0.92,
      roughness: 0.18,
    });
    const neonCyanEmissive = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });
    const neonBlueEmissive = new THREE.MeshStandardMaterial({
      color: 0x0047ff,
      emissive: 0x0047ff,
      emissiveIntensity: 4.0,
      roughness: 0.1,
    });

    // Create Canvas Texture for Official Teladu Brand Emblem on the Robot Chest
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 512;
    logoCanvas.height = 512;
    const lCtx = logoCanvas.getContext('2d');

    if (lCtx) {
      lCtx.fillStyle = '#0038ff';
      lCtx.beginPath();
      safeRoundRect(lCtx, 40, 40, 432, 432, 110);
      lCtx.fill();

      lCtx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      lCtx.beginPath();
      lCtx.ellipse(180, 140, 120, 60, -Math.PI / 4, 0, Math.PI * 2);
      lCtx.fill();

      lCtx.fillStyle = '#ffffff';
      lCtx.beginPath();
      lCtx.arc(256, 300, 100, 0, Math.PI * 2);
      lCtx.fill();

      safeRoundRect(lCtx, 170, 130, 36, 120, 18);
      safeRoundRect(lCtx, 220, 105, 36, 150, 18);
      safeRoundRect(lCtx, 270, 120, 36, 135, 18);
      safeRoundRect(lCtx, 320, 155, 34, 100, 17);
      safeRoundRect(lCtx, 125, 225, 45, 45, 20);
      lCtx.fill();

      lCtx.beginPath();
      lCtx.arc(256, 305, 35, 0.2 * Math.PI, 0.8 * Math.PI, false);
      lCtx.lineWidth = 14;
      lCtx.strokeStyle = '#0038ff';
      lCtx.lineCap = 'round';
      lCtx.stroke();

      lCtx.beginPath();
      lCtx.arc(360, 135, 25, -0.4 * Math.PI, 0.1 * Math.PI);
      lCtx.lineWidth = 14;
      lCtx.strokeStyle = '#ffffff';
      lCtx.lineCap = 'round';
      lCtx.stroke();
      lCtx.beginPath();
      lCtx.arc(375, 120, 42, -0.4 * Math.PI, 0.1 * Math.PI);
      lCtx.stroke();
    }

    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    const chestLogoMat = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true });

    // Load official vector brand logo from favicon.svg for ultimate crispness
    try {
      new THREE.TextureLoader().load('/favicon.svg', (loadedTex) => {
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        chestLogoMat.map = loadedTex;
        chestLogoMat.needsUpdate = true;
      });
    } catch {}

    // 1. Torso Assembly (Taller, aerodynamic chest)
    const torsoGroup = new THREE.Group();
    robotRoot.add(torsoGroup);

    const chestGeo = new THREE.CylinderGeometry(0.44, 0.36, 1.05, 32);
    const chestMesh = new THREE.Mesh(chestGeo, polishedWhiteArmor);
    torsoGroup.add(chestMesh);

    // Blue armor side plates
    [-0.4, 0.4].forEach((x) => {
      const plateGeo = new THREE.BoxGeometry(0.12, 0.82, 0.4);
      const plateMesh = new THREE.Mesh(plateGeo, teladuBlueMetal);
      plateMesh.position.set(x, 0, 0.05);
      torsoGroup.add(plateMesh);
    });

    // Official Teladu Brand Logo Emblem on Chest Center
    const logoPlateGeo = new THREE.PlaneGeometry(0.38, 0.38);
    const logoPlate = new THREE.Mesh(logoPlateGeo, chestLogoMat);
    logoPlate.position.set(0, 0.12, 0.448);
    torsoGroup.add(logoPlate);

    const coreRingGeo = new THREE.TorusGeometry(0.25, 0.018, 16, 36);
    const coreRing = new THREE.Mesh(coreRingGeo, neonCyanEmissive);
    coreRing.position.set(0, 0.12, 0.442);
    torsoGroup.add(coreRing);

    // 2. Sophisticated Head & Animated Visor
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.82, 0);
    torsoGroup.add(headGroup);

    const neckGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.16, 20);
    const neck = new THREE.Mesh(neckGeo, darkObsidianChassis);
    neck.position.y = -0.15;
    headGroup.add(neck);

    const helmetGeo = new THREE.SphereGeometry(0.38, 32, 32);
    const helmet = new THREE.Mesh(helmetGeo, polishedWhiteArmor);
    headGroup.add(helmet);

    const crestGeo = new THREE.BoxGeometry(0.12, 0.1, 0.55);
    const crest = new THREE.Mesh(crestGeo, teladuBlueMetal);
    crest.position.set(0, 0.36, -0.05);
    headGroup.add(crest);

    const visorGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.18, 32, 1, false, 0, Math.PI);
    visorGeo.rotateY(Math.PI / 2);
    const visor = new THREE.Mesh(visorGeo, neonCyanEmissive);
    visor.position.set(0, 0.04, 0.1);
    headGroup.add(visor);

    [-0.38, 0.38].forEach((x) => {
      const earBaseGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 20);
      earBaseGeo.rotateZ(Math.PI / 2);
      const earBase = new THREE.Mesh(earBaseGeo, teladuBlueMetal);
      earBase.position.set(x, 0.04, 0);
      headGroup.add(earBase);

      const antPinGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.28, 12);
      const antPin = new THREE.Mesh(antPinGeo, polishedWhiteArmor);
      antPin.position.set(x * 1.1, 0.22, 0);
      antPin.rotation.z = -Math.sign(x) * 0.25;
      headGroup.add(antPin);

      const antLightGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const antLight = new THREE.Mesh(antLightGeo, neonBlueEmissive);
      antLight.position.set(x * 1.18, 0.36, 0);
      headGroup.add(antLight);
    });

    // 3. Right Arm: Sophisticated articulated arm holding 3D Glassy Teladu V1 Phone
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.55, 0.3, 0);
    torsoGroup.add(rightArmGroup);

    const shoulderGeo = new THREE.SphereGeometry(0.15, 20, 20);
    const shoulder = new THREE.Mesh(shoulderGeo, teladuBlueMetal);
    rightArmGroup.add(shoulder);

    // Shoulder Brand Logo Badge
    const shoulderBadgeGeo = new THREE.PlaneGeometry(0.14, 0.14);
    const rightShoulderBadge = new THREE.Mesh(shoulderBadgeGeo, chestLogoMat);
    rightShoulderBadge.position.set(0.12, 0.04, 0);
    rightShoulderBadge.rotation.y = Math.PI / 2;
    rightArmGroup.add(rightShoulderBadge);

    const bicepGeo = new THREE.CylinderGeometry(0.085, 0.08, 0.42, 18);
    bicepGeo.translate(0, -0.21, 0);
    const rightBicep = new THREE.Mesh(bicepGeo, polishedWhiteArmor);
    rightArmGroup.add(rightBicep);

    const rightForearmGroup = new THREE.Group();
    rightForearmGroup.position.set(0, -0.42, 0);
    rightArmGroup.add(rightForearmGroup);

    const forearmGeo = new THREE.CylinderGeometry(0.08, 0.075, 0.38, 18);
    forearmGeo.translate(0, -0.19, 0);
    const rightForearm = new THREE.Mesh(forearmGeo, darkObsidianChassis);
    rightForearmGroup.add(rightForearm);

    const wristRingGeo = new THREE.TorusGeometry(0.09, 0.015, 12, 24);
    wristRingGeo.rotateX(Math.PI / 2);
    const wristRing = new THREE.Mesh(wristRingGeo, neonCyanEmissive);
    wristRing.position.set(0, -0.36, 0);
    rightForearmGroup.add(wristRing);

    const handPalmGeo = new THREE.BoxGeometry(0.1, 0.1, 0.08);
    const handPalm = new THREE.Mesh(handPalmGeo, polishedWhiteArmor);
    handPalm.position.set(0, -0.44, 0);
    rightForearmGroup.add(handPalm);

    // 3D GLASSY TELADU V1 EPHONE HELD BY ROBOT
    const phoneHolderGroup = new THREE.Group();
    phoneHolderGroup.position.set(0.12, -0.42, 0.16);
    phoneHolderGroup.rotation.set(-0.25, 0.35, 0.15);

    const pGlassGeo = new THREE.BoxGeometry(0.36, 0.72, 0.035);
    const pGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      roughness: 0.04,
      ior: 1.52,
      thickness: 0.6,
      reflectivity: 0.95,
    });
    const pGlass = new THREE.Mesh(pGlassGeo, pGlassMat);
    phoneHolderGroup.add(pGlass);

    const pRimGeo = new THREE.BoxGeometry(0.365, 0.725, 0.015);
    const pRimMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.1 });
    const pRim = new THREE.Mesh(pRimGeo, pRimMat);
    phoneHolderGroup.add(pRim);

    const pScreenGeo = new THREE.PlaneGeometry(0.33, 0.68);
    const pScreenMat = new THREE.MeshBasicMaterial({ color: 0x0047ff });
    const pScreen = new THREE.Mesh(pScreenGeo, pScreenMat);
    pScreen.position.z = 0.019;
    phoneHolderGroup.add(pScreen);

    const pButtonGeo = new THREE.BoxGeometry(0.015, 0.12, 0.02);
    const pButton = new THREE.Mesh(pButtonGeo, neonCyanEmissive);
    pButton.position.set(0.185, 0.08, 0);
    phoneHolderGroup.add(pButton);

    // Brand logo on the back of the 3D phone
    const pLogoGeo = new THREE.PlaneGeometry(0.16, 0.16);
    const pLogo = new THREE.Mesh(pLogoGeo, chestLogoMat);
    pLogo.position.z = -0.019;
    pLogo.rotation.y = Math.PI;
    phoneHolderGroup.add(pLogo);

    rightForearmGroup.add(phoneHolderGroup);

    // 4. Left Arm (Dynamic Dancing Grooving Arm)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.55, 0.3, 0);
    torsoGroup.add(leftArmGroup);

    const leftShoulder = new THREE.Mesh(shoulderGeo, teladuBlueMetal);
    leftArmGroup.add(leftShoulder);

    // Left Shoulder Brand Logo Badge
    const leftShoulderBadge = new THREE.Mesh(shoulderBadgeGeo, chestLogoMat);
    leftShoulderBadge.position.set(-0.12, 0.04, 0);
    leftShoulderBadge.rotation.y = -Math.PI / 2;
    leftArmGroup.add(leftShoulderBadge);

    const leftBicep = new THREE.Mesh(bicepGeo, polishedWhiteArmor);
    leftArmGroup.add(leftBicep);

    const leftForearmGroup = new THREE.Group();
    leftForearmGroup.position.set(0, -0.42, 0);
    leftArmGroup.add(leftForearmGroup);

    const leftForearm = new THREE.Mesh(forearmGeo, darkObsidianChassis);
    leftForearmGroup.add(leftForearm);

    const leftWristRing = new THREE.Mesh(wristRingGeo, neonCyanEmissive);
    leftWristRing.position.set(0, -0.36, 0);
    leftForearmGroup.add(leftWristRing);

    const leftHandPalm = new THREE.Mesh(handPalmGeo, polishedWhiteArmor);
    leftHandPalm.position.set(0, -0.44, 0);
    leftForearmGroup.add(leftHandPalm);

    // 5. TALLER Articulated Robotic Legs & Hydraulic Cybernetic Boots
    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.24, -0.48, 0);
    robotRoot.add(leftLegGroup);

    // Longer Thigh (Increased Height)
    const thighGeo = new THREE.CylinderGeometry(0.095, 0.085, 0.68, 18);
    thighGeo.translate(0, -0.34, 0);
    const leftThigh = new THREE.Mesh(thighGeo, teladuBlueMetal);
    leftLegGroup.add(leftThigh);

    const leftShinGroup = new THREE.Group();
    leftShinGroup.position.set(0, -0.68, 0);
    leftLegGroup.add(leftShinGroup);

    // Longer Shin (Increased Height)
    const shinGeo = new THREE.CylinderGeometry(0.085, 0.08, 0.68, 18);
    shinGeo.translate(0, -0.34, 0);
    const leftShin = new THREE.Mesh(shinGeo, polishedWhiteArmor);
    leftShinGroup.add(leftShin);

    const bootGeo = new THREE.BoxGeometry(0.18, 0.1, 0.34);
    const leftBoot = new THREE.Mesh(bootGeo, darkObsidianChassis);
    leftBoot.position.set(0, -0.72, 0.08);
    leftShinGroup.add(leftBoot);

    const bootSoleGeo = new THREE.BoxGeometry(0.19, 0.02, 0.35);
    const leftSole = new THREE.Mesh(bootSoleGeo, neonBlueEmissive);
    leftSole.position.set(0, -0.77, 0.08);
    leftShinGroup.add(leftSole);

    // Right Leg
    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.24, -0.48, 0);
    robotRoot.add(rightLegGroup);

    const rightThigh = new THREE.Mesh(thighGeo, teladuBlueMetal);
    rightLegGroup.add(rightThigh);

    const rightShinGroup = new THREE.Group();
    rightShinGroup.position.set(0, -0.68, 0);
    rightLegGroup.add(rightShinGroup);

    const rightShin = new THREE.Mesh(shinGeo, polishedWhiteArmor);
    rightShinGroup.add(rightShin);

    const rightBoot = new THREE.Mesh(bootGeo, darkObsidianChassis);
    rightBoot.position.set(0, -0.72, 0.08);
    rightShinGroup.add(rightBoot);

    const rightSole = new THREE.Mesh(bootSoleGeo, neonBlueEmissive);
    rightSole.position.set(0, -0.77, 0.08);
    rightShinGroup.add(rightSole);

    // 6. Glowing Floor Halo Disc (Frameless, floats directly in page space)
    const haloRingGeo = new THREE.RingGeometry(1.5, 1.58, 64);
    haloRingGeo.rotateX(-Math.PI / 2);
    const haloRingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
    const haloRing = new THREE.Mesh(haloRingGeo, haloRingMat);
    haloRing.position.y = -1.98;
    scene.add(haloRing);

    const innerDiscGeo = new THREE.CircleGeometry(1.48, 48);
    innerDiscGeo.rotateX(-Math.PI / 2);
    const innerDiscMat = new THREE.MeshBasicMaterial({ color: 0x0038ff, transparent: true, opacity: 0.15 });
    const innerDisc = new THREE.Mesh(innerDiscGeo, innerDiscMat);
    innerDisc.position.y = -1.985;
    scene.add(innerDisc);

    // Sophisticated Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime() * 4.6;
      const move = danceMoveRef.current;

      const bounce = Math.abs(Math.sin(t)) * 0.12;
      torsoGroup.position.y = bounce;

      visor.scale.x = 1.0 + Math.sin(t * 2) * 0.03;
      headGroup.rotation.y = Math.sin(t * 0.5) * 0.3;
      headGroup.rotation.z = Math.cos(t) * 0.1;

      if (move === 'groove') {
        robotRoot.rotation.y = Math.sin(t * 0.35) * 0.5;
        rightArmGroup.rotation.x = -0.7 + Math.sin(t) * 0.35;
        rightArmGroup.rotation.z = 0.45 + Math.cos(t) * 0.2;
        rightForearmGroup.rotation.x = -0.75 + Math.sin(t) * 0.25;

        leftArmGroup.rotation.x = 0.3 + Math.cos(t) * 0.6;
        leftArmGroup.rotation.z = -0.6 - Math.sin(t) * 0.3;
        leftForearmGroup.rotation.x = -0.65 + Math.cos(t) * 0.4;

        leftLegGroup.rotation.x = Math.sin(t) * 0.22;
        rightLegGroup.rotation.x = -Math.sin(t) * 0.22;
      } else if (move === 'spin') {
        robotRoot.rotation.y += 0.045;
        rightArmGroup.rotation.x = -1.1;
        rightArmGroup.rotation.z = 0.5 + Math.sin(t * 2) * 0.2;
        leftArmGroup.rotation.x = -1.1;
        leftArmGroup.rotation.z = -0.5 - Math.sin(t * 2) * 0.2;
        leftLegGroup.rotation.x = Math.sin(t * 1.5) * 0.28;
        rightLegGroup.rotation.x = -Math.sin(t * 1.5) * 0.28;
      } else if (move === 'shuffle') {
        robotRoot.rotation.y = Math.sin(t * 0.75) * 0.35;
        torsoGroup.rotation.z = Math.sin(t) * 0.15;
        rightArmGroup.rotation.z = 0.75 + Math.cos(t) * 0.35;
        leftArmGroup.rotation.z = -0.75 - Math.cos(t) * 0.35;
        leftLegGroup.position.x = -0.24 + Math.sin(t) * 0.12;
        rightLegGroup.position.x = 0.24 - Math.sin(t) * 0.12;
      } else {
        robotRoot.rotation.y = Math.cos(t * 0.3) * 0.45;
        rightArmGroup.rotation.x = -1.0 + Math.abs(Math.sin(t * 2)) * 0.55;
        leftArmGroup.rotation.x = -1.0 + Math.abs(Math.cos(t * 2)) * 0.55;
        leftLegGroup.rotation.x = Math.sin(t * 2) * 0.3;
        rightLegGroup.rotation.x = -Math.sin(t * 2) * 0.3;
      }

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
      chestGeo.dispose();
      helmetGeo.dispose();
      pGlassGeo.dispose();
      pRimGeo.dispose();
      pScreenGeo.dispose();
    };
  }, []);

  return (
    // FRAMELESS: No outer box, no card background, floats directly in page space
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* 3D WebGL Canvas directly on the page with increased height and touch-action pan-y */}
      <div
        ref={mountRef}
        className="w-full h-[460px] xs:h-[520px] sm:h-[680px] md:h-[750px] cursor-grab active:cursor-grabbing relative z-10 touch-pan-y"
      />

      {/* Floating Spatial Controls (Clear Glassy, Smaller) */}
      <div className="z-20 mt-[-28px] flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(0,71,255,0.35)]">
        {(['groove', 'spin', 'shuffle', 'bounce'] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              triggerHaptic(15);
              setDanceMove(m);
            }}
            className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold capitalize transition-all cursor-pointer ${
              danceMove === m
                ? 'bg-white/20 text-cyan-200 border border-cyan-400/60 shadow-[0_0_12px_rgba(0,180,255,0.4)]'
                : 'text-slate-400 hover:text-white bg-transparent border border-transparent'
            }`}
          >
            {m}
          </button>
        ))}

        <span className="w-px h-3 bg-white/20" />

        <button
          onClick={toggleBeat}
          className={`px-3 py-1 rounded-full border transition-all flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold cursor-pointer ${
            isPlayingMusic
              ? 'bg-white/20 text-cyan-200 border-cyan-400/60 shadow-[0_0_12px_#0047ff]'
              : 'bg-transparent text-slate-300 border-white/15 hover:text-white'
          }`}
        >
          {isPlayingMusic ? <Volume2 className="w-3 h-3 text-cyan-300 animate-bounce" /> : <VolumeX className="w-3 h-3" />}
          <span>{isPlayingMusic ? 'Beat ON' : 'Audio'}</span>
        </button>
      </div>

      <p className="mt-2 text-[10px] sm:text-[11px] font-mono text-cyan-300/80 text-center">
        Teladu 3D Spatial Mascot · Holding Teladu V1 Cloud ePhone
      </p>
    </div>
  );
};

export default DancingNeonRobot;
