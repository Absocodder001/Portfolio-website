import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Laptop, Maximize2, Minimize2, Terminal, FileText, Play, Pause, RotateCcw } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function LaptopWorkstation() {
  const mountRef = useRef(null);

  // States
  const [isLidOpen, setIsLidOpen] = useState(true);
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [activeApp, setActiveApp] = useState('terminal');
  const [isAutoRotate, setIsAutoRotate] = useState(false);

  // Real-time typed content
  const [terminalHistory, setTerminalHistory] = useState([
    'ABHIJEET_OS v2.6 (Darwin arm64)',
    'Workstation online. Ready for input.',
    'Type commands: "help", "whoami", "skills", "projects", "open ironcore"',
    'or click [NOTEPAD] to write custom notes directly on this 3D screen.',
    ''
  ]);
  const [currentLine, setCurrentLine] = useState('');
  const [notesContent, setNotesContent] = useState([
    '// INTERACTIVE WORKSTATION NOTEPAD',
    '// Type on your keyboard to write code or notes directly on this 3D screen:',
    '',
    'const engineer = {',
    '  name: "Abhijeet Yadav",',
    '  role: "Frontend Architect",',
    '  college: "Sister Nivedita University, Kolkata",',
    '  degree: "B.Tech Computer Science & Engineering",',
    '  skills: ["React", "Next.js", "TypeScript", "Three.js"],',
    '  status: "Ready for Contracts & Internships"',
    '};'
  ]);

  // Scene references
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    laptopGroup: null,
    hingePivot: null,
    screenMesh: null,
    screenTexture: null,
    screenCanvas: null,
    screenCtx: null,
    keysRowGroup: null,
    spotLight: null,

    // Clamshell Physics
    // 0 = completely flat/closed, -1.88 = 108 deg open
    OPEN_ANGLE: -Math.PI * 0.60, // -108 degrees
    CLOSED_ANGLE: 0.0,
    currentLidAngle: -Math.PI * 0.60,
    targetLidAngle: -Math.PI * 0.60,
    isAnimatingLid: false,

    // Desk View Target
    isTypingMode: false,
    defaultCamPos: new THREE.Vector3(0, 1.4, 3.8),
    defaultTarget: new THREE.Vector3(0, 0.2, 0),
    typingCamPos: new THREE.Vector3(0, 0.9, 1.8),
    typingTarget: new THREE.Vector3(0, 0.55, -0.7),

    blinkTick: 0,
  });

  // Terminal Directive Executor
  const executeTerminalCommand = (rawCmd) => {
    const cmd = rawCmd.trim();
    const lower = cmd.toLowerCase();
    let response = [];

    if (!cmd) {
      setTerminalHistory((prev) => [...prev, `guest@abhijeet-mac:~$ `, '']);
      return;
    }

    if (lower === 'clear') {
      setTerminalHistory([]);
      return;
    }

    if (lower === 'help') {
      response = [
        'Available Directives:',
        '  whoami          - Display candidate identity & focus',
        '  skills          - View technical stack matrix',
        '  projects        - List production deployments',
        '  open ironcore   - Launch Ironcore Fitness in browser',
        '  open studypilot - Launch StudyPilot AI in browser',
        '  open skillora   - Launch Skillora Marketplace',
        '  notes           - Switch to text editor notepad mode',
        '  close           - Close laptop clamshell lid',
        '  clear           - Clear console buffer',
        '  date            - Print current system timestamp'
      ];
    } else if (lower === 'whoami') {
      response = [
        'NAME: Abhijeet Yadav',
        'TITLE: Frontend Web Developer | Web Designer',
        'DEGREE: B.Tech Computer Science & Engineering (2024-Present)',
        'COLLEGE: Sister Nivedita University, Kolkata',
        'LOCATION: Howrah, West Bengal, India'
      ];
    } else if (lower === 'skills') {
      response = [
        'FRONTEND: React 19, Next.js (App Router), TypeScript, Tailwind CSS, HTML5/CSS3',
        '3D GRAPHICS: Three.js, WebGL Shaders, Canvas API',
        'AI / APIS: Google Gemini API, Prompt Architecture, REST Endpoints',
        'PROGRAMMING: Java (Multi-Threading & OOP), C, C++, SQL'
      ];
    } else if (lower === 'projects') {
      response = [
        '1. Ironcore Fitness  -> Modern Gym Platform (Next.js, Tailwind, Vercel)',
        '2. StudyPilot AI     -> Adaptive AI Study Timetable (Gemini LLM API)',
        '3. Skillora          -> Freelancer Marketplace UI Concept'
      ];
    } else if (lower === 'open ironcore') {
      setActiveApp('ironcore');
      response = ['[LAUNCHING]: Ironcore Fitness preview on laptop screen...'];
    } else if (lower === 'open studypilot') {
      setActiveApp('studypilot');
      response = ['[LAUNCHING]: StudyPilot AI preview on laptop screen...'];
    } else if (lower === 'open skillora') {
      setActiveApp('skillora');
      response = ['[LAUNCHING]: Skillora Marketplace preview on laptop screen...'];
    } else if (lower === 'notes') {
      setActiveApp('notes');
      response = ['[SWITCHING]: Text Editor mode activated.'];
    } else if (lower === 'close') {
      toggleLid();
      response = ['[POWER]: Closing laptop lid...'];
    } else if (lower === 'date') {
      response = [new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) + ' IST'];
    } else {
      response = [`zsh: command not found: "${cmd}". Type "help" for a list of valid commands.`];
    }

    setTerminalHistory((prev) => [
      ...prev,
      `guest@abhijeet-mac:~$ ${cmd}`,
      ...response,
      ''
    ]);
  };

  // Keyboard Event Listener
  const handleKeyDown = useCallback(
    (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // The workstation accepts keys only when the visitor explicitly enters typing mode.
      if (!isLidOpen || !isTypingMode) return;
      // Never steal typing from forms, the separate CLI, buttons, or editable elements.
      const target = e.target;
      if (target instanceof Element && target.closest('input, textarea, select, button, a, [contenteditable="true"], [role="textbox"], [role="dialog"]')) return;

      cyberAudio.playKeyClick();

      // Subtle mechanical key depression in 3D
      if (stateRef.current.keysRowGroup) {
        stateRef.current.keysRowGroup.position.y = -0.003;
        setTimeout(() => {
          if (stateRef.current.keysRowGroup) {
            stateRef.current.keysRowGroup.position.y = 0;
          }
        }, 50);
      }

      if (activeApp === 'terminal') {
        if (e.key === 'Enter') {
          e.preventDefault();
          executeTerminalCommand(currentLine);
          setCurrentLine('');
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          setCurrentLine((prev) => prev.slice(0, -1));
        } else if (e.key.length === 1) {
          e.preventDefault();
          setCurrentLine((prev) => prev + e.key);
        }
      } else if (activeApp === 'notes') {
        if (e.key === 'Enter') {
          e.preventDefault();
          setNotesContent((prev) => [...prev, '']);
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          setNotesContent((prev) => {
            if (prev.length === 0) return [''];
            const lastIdx = prev.length - 1;
            if (prev[lastIdx].length > 0) {
              const updated = [...prev];
              updated[lastIdx] = updated[lastIdx].slice(0, -1);
              return updated;
            } else if (prev.length > 1) {
              return prev.slice(0, -1);
            }
            return prev;
          });
        } else if (e.key.length === 1) {
          e.preventDefault();
          setNotesContent((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            updated[lastIdx] = (updated[lastIdx] || '') + e.key;
            return updated;
          });
        }
      }
    },
    [isLidOpen, isTypingMode, activeApp, currentLine]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Redraw Laptop Screen Canvas
  const redrawScreen = useCallback(() => {
    const canvas = stateRef.current.screenCanvas;
    const ctx = stateRef.current.screenCtx;
    if (!canvas || !ctx) return;

    // Clear Screen
    ctx.fillStyle = '#08080c';
    ctx.fillRect(0, 0, 1024, 640);

    // Browser Chrome Header
    ctx.fillStyle = '#111116';
    ctx.fillRect(0, 0, 1024, 44);

    // Window Dots
    ctx.fillStyle = '#ff5f56';
    ctx.beginPath();
    ctx.arc(28, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffbd2e';
    ctx.beginPath();
    ctx.arc(46, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#27c93f';
    ctx.beginPath();
    ctx.arc(64, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    // App Navigation Tabs
    const tabs = [
      { id: 'terminal', label: 'Terminal (Interactive)', icon: '>_' },
      { id: 'notes', label: 'Notepad (Type Here)', icon: '📝' },
      { id: 'ironcore', label: 'Ironcore Fitness', icon: '⚡' },
      { id: 'studypilot', label: 'StudyPilot AI', icon: '🤖' },
      { id: 'skillora', label: 'Skillora', icon: '💼' }
    ];

    let tabX = 100;
    tabs.forEach((tab) => {
      const isSelected = activeApp === tab.id;
      ctx.fillStyle = isSelected ? '#1c1c24' : '#14141a';
      ctx.roundRect(tabX, 8, 160, 28, 4);
      ctx.fill();

      ctx.fillStyle = isSelected ? '#ffffff' : '#71717a';
      ctx.font = '11px "Space Grotesk", sans-serif';
      ctx.fillText(`${tab.icon} ${tab.label}`, tabX + 10, 26);
      tabX += 170;
    });

    // Render active application
    if (activeApp === 'terminal') {
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 44, 1024, 596);

      const visibleLines = terminalHistory.slice(-17);
      visibleLines.forEach((line, idx) => {
        const y = 75 + idx * 26;
        if (line.startsWith('guest@abhijeet-mac:~$')) {
          ctx.fillStyle = '#34d399';
          ctx.font = 'bold 13px "JetBrains Mono", monospace';
          ctx.fillText(line, 24, y);
        } else if (line.startsWith('zsh:')) {
          ctx.fillStyle = '#f87171';
          ctx.font = '13px "JetBrains Mono", monospace';
          ctx.fillText(line, 24, y);
        } else if (line.startsWith('Available Directives:')) {
          ctx.fillStyle = '#60a5fa';
          ctx.font = 'bold 13px "JetBrains Mono", monospace';
          ctx.fillText(line, 24, y);
        } else {
          ctx.fillStyle = '#d4d4d8';
          ctx.font = '13px "JetBrains Mono", monospace';
          ctx.fillText(line, 24, y);
        }
      });

      // Prompt & typed text
      const promptY = 75 + visibleLines.length * 26;
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.fillText('guest@abhijeet-mac:~$ ', 24, promptY);

      const promptWidth = ctx.measureText('guest@abhijeet-mac:~$ ').width;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(currentLine, 24 + promptWidth, promptY);

      // Blinking Cursor
      stateRef.current.blinkTick++;
      if (Math.floor(stateRef.current.blinkTick / 25) % 2 === 0) {
        const textWidth = ctx.measureText(currentLine).width;
        ctx.fillStyle = '#34d399';
        ctx.fillRect(24 + promptWidth + textWidth + 2, promptY - 12, 8, 15);
      }

    } else if (activeApp === 'notes') {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 44, 1024, 596);

      notesContent.slice(-21).forEach((line, idx) => {
        const y = 80 + idx * 24;
        ctx.fillStyle = '#3f3f46';
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillText(String(idx + 1).padStart(2, '0'), 20, y);

        if (line.startsWith('//')) {
          ctx.fillStyle = '#71717a';
        } else if (line.includes('const') || line.includes('function') || line.includes('return')) {
          ctx.fillStyle = '#a78bfa';
        } else if (line.includes('"')) {
          ctx.fillStyle = '#34d399';
        } else {
          ctx.fillStyle = '#f4f4f5';
        }
        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.fillText(line, 60, y);

        if (idx === notesContent.slice(-21).length - 1) {
          stateRef.current.blinkTick++;
          if (Math.floor(stateRef.current.blinkTick / 25) % 2 === 0) {
            const lineWidth = ctx.measureText(line).width;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(60 + lineWidth + 2, y - 11, 2, 14);
          }
        }
      });

    } else if (activeApp === 'ironcore') {
      ctx.fillStyle = '#0f1016';
      ctx.fillRect(0, 44, 1024, 596);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.fillText('IRONCORE FITNESS', 60, 115);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '16px "Inter", sans-serif';
      ctx.fillText('MODERN GYM & ATHLETIC PERFORMANCE PLATFORM', 60, 145);

      ctx.fillStyle = '#ffffff';
      ctx.roundRect(60, 175, 180, 40, 6);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 13px "Space Grotesk", sans-serif';
      ctx.fillText('JOIN NOW — $49/MO', 85, 200);

      const features = [
        { title: 'ELITE TRAINING', sub: 'Certified master trainers & custom regimes' },
        { title: 'LIVE SCHEDULES', sub: 'Interactive booking for 40+ weekly classes' },
        { title: 'EDGE PERFORMANCE', sub: 'Next.js App Router deployed with Vercel' }
      ];

      features.forEach((feat, i) => {
        const x = 60 + i * 305;
        ctx.fillStyle = '#171821';
        ctx.strokeStyle = '#272733';
        ctx.roundRect(x, 250, 285, 170, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px "Space Grotesk", sans-serif';
        ctx.fillText(feat.title, x + 20, 295);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '13px "Inter", sans-serif';
        ctx.fillText(feat.sub, x + 20, 325);

        ctx.fillStyle = '#22c55e';
        ctx.fillText('● SYSTEM VERIFIED', x + 20, 385);
      });

    } else if (activeApp === 'studypilot') {
      ctx.fillStyle = '#090a10';
      ctx.fillRect(0, 44, 1024, 596);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.fillText('STUDYPILOT AI // COPILOT', 60, 115);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '16px "Inter", sans-serif';
      ctx.fillText('GEMINI-POWERED ADAPTIVE STUDY PLANNER', 60, 145);

      ctx.fillStyle = '#13141f';
      ctx.strokeStyle = '#2c2d3d';
      ctx.roundRect(60, 175, 904, 65, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#e4e4e7';
      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillText('🤖 AI: 14-day B.Tech CSE revision timetable generated from syllabus.', 85, 205);
      ctx.fillStyle = '#a855f7';
      ctx.fillText('STATUS: GEMINI API STREAMING ACTIVE', 85, 225);

      const tasks = [
        { time: '09:00 - 11:00', title: 'Data Structures & Pointer Logic in C++', status: 'COMPLETED' },
        { time: '11:30 - 13:00', title: 'Java Multi-Threading & Concurrency Locks', status: 'IN PROGRESS' },
        { time: '15:00 - 17:00', title: 'React 19 Server Components Architecture', status: 'SCHEDULED' }
      ];

      tasks.forEach((task, idx) => {
        const y = 265 + idx * 70;
        ctx.fillStyle = '#13141f';
        ctx.roundRect(60, y, 904, 56, 6);
        ctx.fill();

        ctx.fillStyle = '#a1a1aa';
        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.fillText(task.time, 85, y + 33);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px "Space Grotesk", sans-serif';
        ctx.fillText(task.title, 240, y + 33);

        ctx.fillStyle = idx === 0 ? '#22c55e' : idx === 1 ? '#eab308' : '#71717a';
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        ctx.fillText(`[${task.status}]`, 820, y + 33);
      });

    } else {
      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 44, 1024, 596);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.fillText('SKILLORA MARKETPLACE', 60, 115);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '16px "Inter", sans-serif';
      ctx.fillText('DISCOVER VERIFIED FREELANCE TALENT & CLIENT PROJECTS', 60, 145);

      const freelancers = [
        { name: 'Abhijeet Yadav', role: 'Frontend Engineer', rate: '$45/hr', skills: 'React • Next.js • Three.js' },
        { name: 'Sarah Jenkins', role: 'UI/UX Designer', rate: '$50/hr', skills: 'Figma • Design Systems' },
        { name: 'Devon Vance', role: 'Full-Stack Developer', rate: '$55/hr', skills: 'Node.js • TypeScript' }
      ];

      freelancers.forEach((f, i) => {
        const x = 60 + i * 305;
        ctx.fillStyle = '#12131b';
        ctx.strokeStyle = '#22232f';
        ctx.roundRect(x, 185, 285, 230, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 17px "Space Grotesk", sans-serif';
        ctx.fillText(f.name, x + 20, 225);

        ctx.fillStyle = '#a1a1aa';
        ctx.font = '13px "Inter", sans-serif';
        ctx.fillText(f.role, x + 20, 250);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px "Space Grotesk", sans-serif';
        ctx.fillText(f.rate, x + 20, 300);

        ctx.fillStyle = '#71717a';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillText(f.skills, x + 20, 335);

        ctx.fillStyle = '#ffffff';
        ctx.roundRect(x + 20, 365, 245, 34, 4);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px "Space Grotesk", sans-serif';
        ctx.fillText('VIEW PROPOSAL', x + 85, 387);
      });
    }

    if (stateRef.current.screenTexture) {
      stateRef.current.screenTexture.needsUpdate = true;
    }
  }, [activeApp, terminalHistory, currentLine, notesContent]);

  // Main Three.js Scene Setup with OrbitControls & Correct Clamshell Physics
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    stateRef.current.scene = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.copy(stateRef.current.defaultCamPos);
    camera.lookAt(stateRef.current.defaultTarget);
    stateRef.current.camera = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // 4. OrbitControls for true 360-degree rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 0.8;
    controls.minDistance = 1.4;
    controls.maxDistance = 7.0;
    controls.target.copy(stateRef.current.defaultTarget);
    stateRef.current.controls = controls;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(4, 6, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight2.position.set(-4, -2, -4);
    scene.add(dirLight2);

    const spotLight = new THREE.SpotLight(0xffffff, 3.5, 15, Math.PI * 0.3, 0.5);
    spotLight.position.set(0, 4, 3);
    scene.add(spotLight);
    stateRef.current.spotLight = spotLight;

    // 6. Laptop Hierarchy
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);
    stateRef.current.laptopGroup = laptopGroup;

    // Titanium Materials
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181d,
      metalness: 0.85,
      roughness: 0.22,
    });

    const darkTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      metalness: 0.5,
      roughness: 0.5,
    });

    const keyMaterial = new THREE.MeshStandardMaterial({
      color: 0x121216,
      metalness: 0.2,
      roughness: 0.65,
    });

    // Dimensions:
    // Width = 2.6, Length = 1.8.
    // Base lies from Z = -0.9 (back/hinge) to Z = +0.9 (front/trackpad)
    const baseWidth = 2.6;
    const baseLength = 1.8;
    const baseThickness = 0.07;

    // A. Base Chassis (Center at Z=0, Y=-0.035)
    const baseGeo = new THREE.BoxGeometry(baseWidth, baseThickness, baseLength);
    const baseMesh = new THREE.Mesh(baseGeo, aluminumMaterial);
    baseMesh.position.set(0, -baseThickness / 2, 0);
    laptopGroup.add(baseMesh);

    // Keyboard well indentation
    const keyboardDeckGeo = new THREE.BoxGeometry(2.1, 0.008, 0.82);
    const keyboardDeck = new THREE.Mesh(keyboardDeckGeo, darkTrimMaterial);
    keyboardDeck.position.set(0, 0.001, -0.25);
    laptopGroup.add(keyboardDeck);

    // Chiclet Keys grid
    const keysRowGroup = new THREE.Group();
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 13; col++) {
        const keyGeo = new THREE.BoxGeometry(0.13, 0.015, 0.12);
        const keyMesh = new THREE.Mesh(keyGeo, keyMaterial);
        keyMesh.position.set(
          -0.92 + col * 0.153,
          0.008,
          -0.52 + row * 0.14
        );
        keysRowGroup.add(keyMesh);
      }
    }
    laptopGroup.add(keysRowGroup);
    stateRef.current.keysRowGroup = keysRowGroup;

    // Glass Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.75, 0.004, 0.5);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x24242a,
      metalness: 0.5,
      roughness: 0.25,
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, 0.002, 0.45);
    laptopGroup.add(trackpad);

    // B. Clamshell Display Lid (CORRECT PIVOT AT BACK HINGE Z = -0.9)
    // Hinge pivot sits at (0, 0, -baseLength / 2) = (0, 0, -0.9)
    const hingePivot = new THREE.Group();
    hingePivot.position.set(0, 0, -baseLength / 2);
    laptopGroup.add(hingePivot);
    stateRef.current.hingePivot = hingePivot;

    const lidHeight = baseLength; // 1.8
    const lidThickness = 0.05;

    // Lid geometry is constructed so that at rotation.x = 0 (CLOSED):
    // It extends from hinge (Z=0 in pivot local space) FORWARD along +Z by 1.8!
    // Center is at (0, lidThickness / 2, lidHeight / 2) = (0, 0.025, 0.9)
    const lidBackGeo = new THREE.BoxGeometry(baseWidth, lidThickness, lidHeight);
    const lidBackMesh = new THREE.Mesh(lidBackGeo, aluminumMaterial);
    lidBackMesh.position.set(0, lidThickness / 2, lidHeight / 2);
    hingePivot.add(lidBackMesh);

    // Emblem on top/outer surface of lid (facing up +Y when closed, facing back -Z when open)
    const emblemGeo = new THREE.BoxGeometry(0.24, 0.004, 0.24);
    const emblemMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.7,
      metalness: 0.9,
      roughness: 0.1,
    });
    const emblem = new THREE.Mesh(emblemGeo, emblemMat);
    emblem.position.set(0, lidThickness + 0.001, lidHeight / 2);
    hingePivot.add(emblem);

    // Screen Display Surface (facing DOWN -Y onto keyboard when closed, facing USER +Z when open)
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    stateRef.current.screenCanvas = canvas;
    stateRef.current.screenCtx = ctx;

    const screenTexture = new THREE.CanvasTexture(canvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    stateRef.current.screenTexture = screenTexture;

    const screenWidth = baseWidth - 0.16;
    const screenHeight = lidHeight - 0.16;
    const screenGeo = new THREE.PlaneGeometry(screenWidth, screenHeight);
    // Rotate screen plane so it lies on the inner surface of the lid (facing -Y in local space)
    screenGeo.rotateX(Math.PI / 2); // Rotates normal from +Z to -Y!

    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      side: THREE.FrontSide,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, -0.001, lidHeight / 2);
    hingePivot.add(screenMesh);
    stateRef.current.screenMesh = screenMesh;

    // Hinge Cylinder Pin
    const hingeCylinderGeo = new THREE.CylinderGeometry(0.035, 0.035, baseWidth - 0.4, 16);
    hingeCylinderGeo.rotateZ(Math.PI / 2);
    const hingeCylinder = new THREE.Mesh(hingeCylinderGeo, darkTrimMaterial);
    hingeCylinder.position.set(0, 0, 0);
    hingePivot.add(hingeCylinder);

    // Set initial lid angle
    hingePivot.rotation.x = stateRef.current.currentLidAngle;

    // Resize
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Smooth Hinge Physics
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth Clamshell Lid Hinge Animation (Euler lerp)
      const angleDiff = stateRef.current.targetLidAngle - stateRef.current.currentLidAngle;
      if (Math.abs(angleDiff) > 0.001) {
        stateRef.current.currentLidAngle += angleDiff * 0.08; // Smooth 60fps spring
        if (hingePivot) {
          hingePivot.rotation.x = stateRef.current.currentLidAngle;
        }
      }

      // Smooth Camera & Target Lerp for "Typing Mode"
      if (stateRef.current.isTypingMode) {
        camera.position.lerp(stateRef.current.typingCamPos, 0.06);
        controls.target.lerp(stateRef.current.typingTarget, 0.06);
      } else {
        if (isAutoRotate) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.5;
        } else {
          controls.autoRotate = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      baseGeo.dispose();
      aluminumMaterial.dispose();
      darkTrimMaterial.dispose();
      keyMaterial.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      screenTexture.dispose();
    };
  }, [isAutoRotate]);

  // Keep screen rendering active
  useEffect(() => {
    redrawScreen();
    const interval = setInterval(redrawScreen, 60);
    return () => clearInterval(interval);
  }, [redrawScreen]);

  // Toggle Lid Open/Close with tactile audio
  const toggleLid = () => {
    cyberAudio.playLidSnap();
    setIsLidOpen((prev) => {
      const next = !prev;
      if (next) {
        // Open to 108 degrees
        stateRef.current.targetLidAngle = stateRef.current.OPEN_ANGLE;
      } else {
        // Close flat on base (0 degrees)
        stateRef.current.targetLidAngle = stateRef.current.CLOSED_ANGLE;
        setIsTypingMode(false);
        stateRef.current.isTypingMode = false;
      }
      return next;
    });
  };

  // Toggle Typing / First-person desk zoom mode
  const toggleTypingMode = () => {
    if (!isLidOpen) {
      toggleLid();
    }
    cyberAudio.playWarp();
    setIsTypingMode((prev) => {
      const next = !prev;
      stateRef.current.isTypingMode = next;
      if (!next && stateRef.current.controls) {
        // Smoothly return to overview position
        stateRef.current.camera.position.copy(stateRef.current.defaultCamPos);
        stateRef.current.controls.target.copy(stateRef.current.defaultTarget);
      }
      return next;
    });
  };

  // Reset 3D Orbit View
  const resetCamera = () => {
    cyberAudio.playChime(600);
    if (stateRef.current.controls && stateRef.current.camera) {
      stateRef.current.isTypingMode = false;
      setIsTypingMode(false);
      stateRef.current.camera.position.copy(stateRef.current.defaultCamPos);
      stateRef.current.controls.target.copy(stateRef.current.defaultTarget);
      stateRef.current.controls.update();
    }
  };

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] flex items-center justify-center select-none overflow-hidden">
      
      {/* 3D Viewport Mount */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        title="Click & Drag to freely orbit 360° • Scroll to zoom"
      />

      {/* Screen Mode & Active App Chips (Top Bar) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-20">
        
        {/* App Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#0e0e12]/95 border border-neutral-800 backdrop-blur-md shadow-xl text-[11px] font-mono">
          <button
            onClick={() => {
              cyberAudio.playChime(600);
              setActiveApp('terminal');
              if (!isLidOpen) toggleLid();
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all ${
              activeApp === 'terminal'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>TERMINAL</span>
          </button>

          <button
            onClick={() => {
              cyberAudio.playChime(650);
              setActiveApp('notes');
              if (!isLidOpen) toggleLid();
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all ${
              activeApp === 'notes'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>NOTEPAD</span>
          </button>

          <button
            onClick={() => {
              cyberAudio.playChime(700);
              setActiveApp('ironcore');
              if (!isLidOpen) toggleLid();
            }}
            className={`px-2.5 py-1 rounded transition-all hidden sm:inline ${
              activeApp === 'ironcore'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            IRONCORE
          </button>

          <button
            onClick={() => {
              cyberAudio.playChime(750);
              setActiveApp('studypilot');
              if (!isLidOpen) toggleLid();
            }}
            className={`px-2.5 py-1 rounded transition-all hidden md:inline ${
              activeApp === 'studypilot'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            STUDYPILOT
          </button>
        </div>

        {/* Orbit / 360 Indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetCamera}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0e0e12]/90 border border-neutral-800 text-[11px] font-mono text-neutral-400 hover:text-white backdrop-blur-md"
            title="Reset 3D camera to default front view"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET 3D</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0e0e12]/90 border border-neutral-800 text-[11px] font-mono text-neutral-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>360° ORBIT ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Physical Controls (Bottom Bar) */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto z-20">
        
        {/* Left: Open/Close & Type buttons */}
        <div className="flex items-center gap-2.5">
          {/* Animated Open / Close Clamshell Toggle */}
          <button
            onClick={toggleLid}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase border backdrop-blur-md transition-all shadow-xl cursor-pointer ${
              isLidOpen
                ? 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:text-white hover:border-neutral-500'
                : 'bg-white text-black border-white font-bold shadow-lg shadow-white/20'
            }`}
            title={isLidOpen ? 'Animate laptop lid shut flat' : 'Animate laptop lid open to 108°'}
          >
            <Laptop className="w-4 h-4" />
            <span>{isLidOpen ? 'CLOSE LAPTOP' : 'OPEN LAPTOP'}</span>
          </button>

          {/* Type / Sit at desk focus */}
          <button
            onClick={toggleTypingMode}
            disabled={!isLidOpen}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase border backdrop-blur-md transition-all shadow-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isTypingMode
                ? 'bg-white text-black border-white font-bold shadow-lg shadow-white/10'
                : 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:text-white hover:border-neutral-500'
            }`}
            title="Zoom camera directly to screen & keyboard to type"
          >
            {isTypingMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isTypingMode ? 'EXIT ZOOM' : 'SIT AT DESK & TYPE'}</span>
          </button>
        </div>

        {/* Right: Auto-rotate & instructions */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-neutral-400 hidden md:inline">
            {isLidOpen
              ? 'Type on physical keyboard • Drag to rotate 360°'
              : 'Laptop closed • Click [OPEN LAPTOP] to power on'}
          </span>

          <button
            onClick={() => {
              cyberAudio.playPulse();
              setIsAutoRotate(!isAutoRotate);
            }}
            className={`p-2 rounded-lg border text-xs transition-all ${
              isAutoRotate
                ? 'bg-white text-black border-white'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
            title="Toggle automatic 360° rotating turntable"
          >
            {isAutoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

    </div>
  );
}
