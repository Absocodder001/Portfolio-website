import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Layers, Box, Disc, Dna } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function CyberCanvas() {
  const mountRef = useRef(null);
  const [wireframe, setWireframe] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const [activePalette, setActivePalette] = useState('cyan'); // 'cyan', 'purple', 'matrix'
  const [activeGeometry, setActiveGeometry] = useState('icosahedron'); // 'icosahedron', 'torusKnot', 'octahedron', 'dodecahedron'

  const sceneState = useRef({
    scene: null,
    core: null,
    innerRing: null,
    outerRing: null,
    particles: null,
    floatingCubes: [],
    materialCore: null,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    rotVelX: 0,
    rotVelY: 0,
    shockwave: 0,
  });

  const palettes = {
    cyan: {
      primary: 0x00f0ff,
      secondary: 0x3b82f6,
      accent: 0xa855f7,
      name: 'Cyber Cyan'
    },
    purple: {
      primary: 0xc084fc,
      secondary: 0xa855f7,
      accent: 0xec4899,
      name: 'Neon Violet'
    },
    matrix: {
      primary: 0x10b981,
      secondary: 0x059669,
      accent: 0x34d399,
      name: 'Emerald Matrix'
    }
  };

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneState.current.scene = scene;
    scene.fog = new THREE.FogExp2(0x04060c, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;
    camera.position.y = 0.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    const palette = palettes[activePalette];

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pLight1 = new THREE.PointLight(palette.primary, 80, 20);
    pLight1.position.set(4, 4, 4);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight(palette.accent, 60, 20);
    pLight2.position.set(-4, -3, -2);
    scene.add(pLight2);

    // 3. Central Morphable Mesh
    let coreGeo;
    switch (activeGeometry) {
      case 'torusKnot':
        coreGeo = new THREE.TorusKnotGeometry(1.0, 0.35, 128, 32);
        break;
      case 'octahedron':
        coreGeo = new THREE.OctahedronGeometry(1.6, 2);
        break;
      case 'dodecahedron':
        coreGeo = new THREE.DodecahedronGeometry(1.5, 1);
        break;
      case 'icosahedron':
      default:
        coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
        break;
    }

    const coreMat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      wireframe: wireframe,
      emissive: palette.primary,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);
    sceneState.current.core = coreMesh;
    sceneState.current.materialCore = coreMat;

    // Inner Glowing Core Sphere
    const innerGeo = new THREE.SphereGeometry(0.85, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: palette.accent,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreMesh.add(innerMesh);

    // 4. Nested Gyro Rings (Torus)
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: palette.primary,
      emissive: palette.primary,
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);
    sceneState.current.innerRing = ring1;

    const ring2Geo = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: palette.accent,
      emissive: palette.accent,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);
    sceneState.current.outerRing = ring2;

    // 5. Data Particles Stream
    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const px = (Math.random() - 0.5) * 16;
      const py = (Math.random() - 0.5) * 16;
      const pz = (Math.random() - 0.5) * 12;
      particlePositions[i] = px;
      particlePositions[i + 1] = py;
      particlePositions[i + 2] = pz;
      originalPositions[i] = px;
      originalPositions[i + 1] = py;
      originalPositions[i + 2] = pz;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: palette.primary,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    sceneState.current.particles = particleSystem;

    // 6. Floating Cyber Cubes
    const floatingCubes = [];
    const cubeGeo = new THREE.BoxGeometry(0.28, 0.28, 0.28);
    for (let i = 0; i < 8; i++) {
      const cubeMat = new THREE.MeshStandardMaterial({
        color: palette.secondary,
        wireframe: true,
        emissive: palette.primary,
        emissiveIntensity: 0.35,
      });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 3.6 + (Math.random() * 0.8 - 0.4);
      cube.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2.5,
        Math.sin(angle) * radius
      );
      cube.userData = {
        speed: 0.008 + Math.random() * 0.01,
        angle: angle,
        radius: radius,
        rotSpeedX: Math.random() * 0.03,
        rotSpeedY: Math.random() * 0.03,
      };
      scene.add(cube);
      floatingCubes.push(cube);
    }
    sceneState.current.floatingCubes = floatingCubes;

    // 7. Interactive Mouse Drag & Click Handling
    const handleMouseDown = (e) => {
      sceneState.current.isDragging = true;
      sceneState.current.prevMouseX = e.clientX;
      sceneState.current.prevMouseY = e.clientY;
      cyberAudio.playPulse();
    };

    const handleMouseMove = (e) => {
      if (sceneState.current.isDragging && coreMesh) {
        const deltaX = e.clientX - sceneState.current.prevMouseX;
        const deltaY = e.clientY - sceneState.current.prevMouseY;

        sceneState.current.rotVelY = deltaX * 0.008;
        sceneState.current.rotVelX = deltaY * 0.008;

        coreMesh.rotation.y += sceneState.current.rotVelY;
        coreMesh.rotation.x += sceneState.current.rotVelX;

        sceneState.current.prevMouseX = e.clientX;
        sceneState.current.prevMouseY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      sceneState.current.isDragging = false;
    };

    const handleClick = () => {
      // Trigger shockwave burst
      sceneState.current.shockwave = 1.0;
      cyberAudio.playChime(640);
    };

    currentMount.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    currentMount.addEventListener('click', handleClick);

    // 8. Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationId;
    const startTime = performance.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Damped rotation inertia
      if (!sceneState.current.isDragging) {
        sceneState.current.rotVelX *= 0.95;
        sceneState.current.rotVelY *= 0.95;
        if (coreMesh) {
          coreMesh.rotation.x += sceneState.current.rotVelX;
          coreMesh.rotation.y += sceneState.current.rotVelY;
        }
      }

      // Idle Rotation
      if (isRotating && coreMesh && !sceneState.current.isDragging) {
        coreMesh.rotation.y += 0.006;
        coreMesh.rotation.x += 0.003;

        if (ring1) {
          ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.6) * 0.25;
          ring1.rotation.y += 0.008;
        }

        if (ring2) {
          ring2.rotation.x += -0.007;
          ring2.rotation.y = Math.PI / 4 + Math.cos(elapsedTime * 0.5) * 0.25;
        }

        // Floating cubes orbit
        floatingCubes.forEach((cube) => {
          cube.userData.angle += cube.userData.speed;
          cube.position.x = Math.cos(cube.userData.angle) * cube.userData.radius;
          cube.position.z = Math.sin(cube.userData.angle) * cube.userData.radius;
          cube.position.y += Math.sin(elapsedTime * 2 + cube.userData.angle) * 0.005;
          cube.rotation.x += cube.userData.rotSpeedX;
          cube.rotation.y += cube.userData.rotSpeedY;
        });
      }

      // Shockwave particle physics
      if (sceneState.current.shockwave > 0) {
        sceneState.current.shockwave -= 0.03;
        const positions = particleGeo.attributes.position.array;
        const factor = Math.sin(sceneState.current.shockwave * Math.PI) * 0.8;

        for (let i = 0; i < particleCount * 3; i += 3) {
          positions[i] = originalPositions[i] * (1 + factor);
          positions[i + 1] = originalPositions[i + 1] * (1 + factor);
          positions[i + 2] = originalPositions[i + 2] * (1 + factor);
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      if (particleSystem) {
        particleSystem.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      currentMount.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      currentMount.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      cubeGeo.dispose();
    };
  }, [wireframe, isRotating, activePalette, activeGeometry]);

  const cyclePalette = () => {
    cyberAudio.playWarp();
    const keys = Object.keys(palettes);
    const nextIdx = (keys.indexOf(activePalette) + 1) % keys.length;
    setActivePalette(keys[nextIdx]);
  };

  const cycleGeometry = () => {
    cyberAudio.playWarp();
    const geos = ['icosahedron', 'torusKnot', 'octahedron', 'dodecahedron'];
    const nextIdx = (geos.indexOf(activeGeometry) + 1) % geos.length;
    setActiveGeometry(geos[nextIdx]);
  };

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[620px] flex items-center justify-center select-none">
      {/* 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full"
        title="Click & Drag to freely rotate 3D Core • Click to dispatch shockwave"
      />

      {/* Cyber HUD Interactive Controls Overlay */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 flex flex-wrap items-center justify-center sm:justify-end gap-2 z-20 pointer-events-auto">
        
        {/* Geometry Switcher */}
        <button
          onClick={cycleGeometry}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono uppercase bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all backdrop-blur-md shadow-lg"
          title="Morph Core Geometry"
        >
          <Dna className="w-3.5 h-3.5 text-cyan-400" />
          <span>Morph: {activeGeometry}</span>
        </button>

        {/* Wireframe Toggle */}
        <button
          onClick={() => {
            cyberAudio.playChime(700);
            setWireframe(!wireframe);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono uppercase bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all backdrop-blur-md shadow-lg"
          title="Toggle Wireframe Shader"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>{wireframe ? 'Mesh: Wire' : 'Mesh: Solid'}</span>
        </button>

        {/* Spin Toggle */}
        <button
          onClick={() => {
            cyberAudio.playChime(600);
            setIsRotating(!isRotating);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono uppercase border backdrop-blur-md transition-all shadow-lg ${
            isRotating
              ? 'bg-slate-900/90 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20'
              : 'bg-amber-950/90 border-amber-500/40 text-amber-300'
          }`}
          title="Toggle Rotation Engine"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{isRotating ? 'Spin: On' : 'Spin: Off'}</span>
        </button>

        {/* Color Palette Toggle */}
        <button
          onClick={cyclePalette}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono uppercase bg-slate-900/90 border border-purple-500/40 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all backdrop-blur-md shadow-lg"
          title="Switch Cyber Aura Color"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>{palettes[activePalette].name}</span>
        </button>
      </div>

      {/* Cyber HUD Diagnostics overlay */}
      <div className="absolute top-4 left-4 font-mono text-[11px] text-cyan-500/80 tracking-widest pointer-events-none flex flex-col gap-0.5">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          SYS.RENDER // WEBGL_THREE.JS
        </span>
        <span className="text-slate-400">VERTICES: DYNAMIC | PARTICLES: 800</span>
        <span className="text-cyan-400 text-[10px]">CLICK & DRAG TO ROTATE CORE 360°</span>
      </div>

      <div className="absolute top-4 right-4 font-mono text-[11px] text-purple-400/80 tracking-widest pointer-events-none hidden sm:block">
        [CLICK CANVAS FOR ENERGY BURST]
      </div>
    </div>
  );
}
