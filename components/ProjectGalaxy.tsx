"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Code2,
  MessageSquare,
  Workflow,
  Sparkles,
  Database,
  Brain,
  ShieldCheck,
  ArrowUpRight,
  X,
  Menu,
  Zap,
  Volume2,
  VolumeX,
  ChevronLeft,
  Building2,
  Wallet,
  Smartphone,
  Calendar,
  Activity,
  FileUser,
  Check,
} from "lucide-react";
import Link from "next/link";

// ─── Data Types ──────────────────────────────────────────────────────────────

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  impact: string;
  technology: string[];
  color: string;
  glow: string;
  accent: string;
  icon: React.ComponentType<any>;
  visualTheme: string;
  // Canvas positioning
  orbitRadiusX: number;
  orbitRadiusY: number;
  speed: number;
  size: number;
  angleOffset: number;
}

// ─── Project Dataset ─────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: "buildaart",
    name: "BUILDAART",
    category: "Real Estate & Construction Platform",
    description:
      "A modern digital ecosystem and architectural lead-generation platform built for a premier construction agency. Features interactive models and contact automation.",
    features: [
      "Modern responsive website",
      "Project showcase system",
      "Inquiry management",
      "Contact automation",
      "SEO optimization",
      "Lead capture forms",
    ],
    impact: "Improved online presence and customer engagement.",
    technology: ["Next.js", "Flask", "PostgreSQL", "Supabase"],
    color: "#00f2fe",
    glow: "rgba(0,242,254,0.22)",
    accent: "from-cyan-400 to-teal-500",
    icon: Building2,
    visualTheme: "Architectural holograms, blueprints, building projections",
    orbitRadiusX: 230,
    orbitRadiusY: 160,
    speed: 0.0016,
    size: 20,
    angleOffset: 0,
  },
  {
    id: "kst-hst",
    name: "KST HST FINANCE",
    category: "Cooperative Finance System",
    description:
      "A secure, complete digital banking and cooperative ledger system designed to automate loan tracking, member savings workflows, and auditing trails.",
    features: [
      "Member account management",
      "Loan tracking system",
      "Savings management",
      "Transaction ledger feed",
      "Manager approval workflow",
      "Clerk dashboard",
      "Automated reports & audit trail",
    ],
    impact: "Reduced manual paperwork and streamlined financial operations.",
    technology: ["Flask", "PostgreSQL", "Supabase", "Tailwind CSS"],
    color: "#e1b12c",
    glow: "rgba(225,177,44,0.22)",
    accent: "from-yellow-400 to-amber-500",
    icon: Wallet,
    visualTheme: "Digital banking charts, secure transactions, telemetry metrics",
    orbitRadiusX: 300,
    orbitRadiusY: 200,
    speed: 0.0012,
    size: 19,
    angleOffset: 1.0,
  },
  {
    id: "themobiq",
    name: "THEMOBIQ",
    category: "Device ReCommerce Platform",
    description:
      "A smart re-commerce marketplace for instant valuation, condition assessment, and second-hand electronics exchange, inspired by Cashify.",
    features: [
      "Device valuation engine",
      "Buy and sell workflows",
      "Device condition assessment",
      "User dashboards",
      "Order management",
      "Inventory tracking",
    ],
    impact: "Simplifies second-hand electronics trading.",
    technology: ["Next.js", "FastAPI", "PostgreSQL"],
    color: "#4cd137",
    glow: "rgba(76,209,55,0.22)",
    accent: "from-emerald-400 to-green-500",
    icon: Smartphone,
    visualTheme: "Floating futuristic smartphones, marketplace energy nodes",
    orbitRadiusX: 370,
    orbitRadiusY: 240,
    speed: 0.0009,
    size: 18,
    angleOffset: 2.1,
  },
  {
    id: "yukti-fest",
    name: "YUKTI FEST PLATFORM",
    category: "Event Management Platform",
    description:
      "Official grand-scale college festival orchestration platform integrating real-time candidate registrations, schedules, and online payment gateways.",
    features: [
      "Event registration",
      "Online payment gateway (PayU)",
      "Ticket management",
      "Participant dashboard",
      "Event scheduling system",
      "Real-time registration feed",
      "Admin panel",
    ],
    impact: "Streamlined event participation and reduced manual coordination.",
    technology: ["Tailwind CSS", "PayU", "PostgreSQL", "Flask"],
    color: "#e84118",
    glow: "rgba(232,65,24,0.24)",
    accent: "from-rose-500 to-red-600",
    icon: Calendar,
    visualTheme: "Celebration particles, digital VIP ticket passes, schedule timeline",
    orbitRadiusX: 440,
    orbitRadiusY: 280,
    speed: 0.0007,
    size: 21,
    angleOffset: 3.2,
  },
  {
    id: "sanjeevani-ai",
    name: "SANJEEVANI AI",
    category: "AI Healthcare Platform",
    description:
      "Advanced clinical helper utilizing AI diagnostic prediction, medical knowledge bases, and RAG-driven symptom evaluation.",
    features: [
      "Health chatbot and symptom analysis",
      "Disease prediction engine",
      "RAG-based medical knowledge base",
      "Personalized health suggestions",
      "Intelligent recommendations",
    ],
    impact: "Improves accessibility to healthcare guidance.",
    technology: ["Python", "Flask", "XGBoost", "LLMs", "RAG", "Supabase"],
    color: "#9c27b0",
    glow: "rgba(156,39,176,0.22)",
    accent: "from-purple-400 to-fuchsia-600",
    icon: Activity,
    visualTheme: "DNA double helix, neural AI health graphs, biological data streams",
    orbitRadiusX: 510,
    orbitRadiusY: 320,
    speed: 0.0005,
    size: 22,
    angleOffset: 4.3,
  },
  {
    id: "resume-screen",
    name: "RESUME SCREEN",
    category: "AI Recruitment Platform",
    description:
      "Intelligent talent intelligence and applicant tracking system designed to parse resumes, map matching indexes, and rank applicants in real-time.",
    features: [
      "Resume parsing",
      "Skill extraction network",
      "Candidate scoring & ranking",
      "ATS compatibility analysis",
      "Job matching metrics",
      "Analytics dashboard",
    ],
    impact: "Accelerates hiring and improves candidate evaluation.",
    technology: ["FastAPI", "PostgreSQL", "LLMs", "NLP"],
    color: "#00a8ff",
    glow: "rgba(0,168,255,0.22)",
    accent: "from-blue-400 to-indigo-600",
    icon: FileUser,
    visualTheme: "Flowing resume elements, ATS matching meters, talent node graphs",
    orbitRadiusX: 580,
    orbitRadiusY: 360,
    speed: 0.0004,
    size: 20,
    angleOffset: 5.4,
  },
];

// Helper functions for Canvas math
const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

// Interface for Canvas elements
interface CanvasStar {
  x: number;
  y: number;
  radius: number;
  twinkleSpeed: number;
  baseAlpha: number;
  color: string;
}

interface CanvasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function ProjectGalaxy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hudLogs, setHudLogs] = useState<string[]>([
    "SYS_INIT: COGNITIVE SYSTEM GALAXY STARTED",
    "GALAXY: CONNECTED TO CODEMATES ECOSYSTEM CORE",
    "TELEMETRY: ALL SIX PLANETARY NODES DOCKED AND ACTIVE",
  ]);

  // Audio Telemetry States
  const [audioEnabled, setAudioEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscsRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; filter: BiquadFilterNode; gainNode: GainNode } | null>(null);

  // Canvas dynamics
  const mousePos = useRef({ x: 0, y: 0, nx: 0, ny: 0 });
  const camera = useRef({ x: 0, y: 0, scale: 0.85, targetX: 0, targetY: 0, targetScale: 0.85 });
  const tickRef = useRef(0);
  const starsRef = useRef<CanvasStar[]>([]);
  const burstsRef = useRef<CanvasParticle[]>([]);
  const lastHoveredRef = useRef<string | null>(null);

  // Standard Dimension tracker
  const [dims, setDims] = useState({ w: 1000, h: 700 });

  // Add system telemetry to logs
  const logSystem = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString();
    setHudLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 5)]);
  }, []);

  // ─── Web Audio API Synthesis ─────────────────────────────────────────────

  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      logSystem("AUDIO: WEBAUDIO CONTEXT CONSTRUCTED SUCCESSFULLY");
    } catch (e) {
      console.error("Web Audio API not supported", e);
    }
  };

  const startAmbience = () => {
    if (!audioCtxRef.current) return;
    if (ambientOscsRef.current) return;

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Deep sci-fi ambient space hum using two detuned low sine waves
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(55.2, ctx.currentTime); // detuned low buzz

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(80, ctx.currentTime);
    filter.Q.setValueAtTime(4, ctx.currentTime);

    // Filter LFO modulation to create breathing space cabin hum
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // very slow sweep
    lfoGain.gain.setValueAtTime(15, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    // Volumes
    gainNode.gain.setValueAtTime(0.0, ctx.currentTime); // fade in
    gainNode.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 3.0); // max gentle volume

    // Route
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();

    ambientOscsRef.current = { osc1, osc2, filter, gainNode };
    logSystem("AUDIO: AMBIENT DEEP SPACE HUM DOCKED (PROGRAMMATIC SYNTH)");
  };

  const stopAmbience = () => {
    if (!ambientOscsRef.current) return;
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    
    const { osc1, osc2, gainNode } = ambientOscsRef.current;
    gainNode.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.5);
    setTimeout(() => {
      try {
        osc1.stop();
        osc2.stop();
      } catch (e) {}
      ambientOscsRef.current = null;
    }, 600);
    logSystem("AUDIO: DEEP SPACE HUM OFF");
  };

  const playHoverSound = () => {
    if (!audioEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Sleek telemetry tick sound
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.12);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(700, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.12);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  };

  const playClickSound = () => {
    if (!audioEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // Harmonic chime chord trigger
    const notes = [329.63, 392.0, 523.25, 659.25]; // E4, G4, C5, E5 (C major chord cascade)
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const delay = idx * 0.05;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      
      gainNode.gain.setValueAtTime(0.0, ctx.currentTime + delay);
      gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + delay + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.6);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.6);
    });
  };

  const playBackSound = () => {
    if (!audioEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // Sleek descending frequency swoosh
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.4);

    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.4);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  };

  const handleAudioToggle = () => {
    initAudio();
    if (!audioEnabled) {
      setAudioEnabled(true);
      setTimeout(() => startAmbience(), 50);
    } else {
      setAudioEnabled(false);
      stopAmbience();
    }
  };

  useEffect(() => {
    if (!audioEnabled) return;

    const handleInteraction = () => {
      initAudio();
      startAmbience();
      // Remove listeners once active
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("scroll", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      
      // Clean up ambient audio on unmount
      if (ambientOscsRef.current) {
        try {
          ambientOscsRef.current.osc1.stop();
          ambientOscsRef.current.osc2.stop();
        } catch (e) {}
        ambientOscsRef.current = null;
      }
    };
  }, [audioEnabled]);

  // ─── Setup dimensions and stars ──────────────────────────────────────────

  const measure = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    
    // Scale canvas buffer for high-DPI (Retina) sharp rendering
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale
      ctx.scale(dpr, dpr); // map buffer to CSS pixels automatically
    }
    
    setDims({ w, h });

    // Generate futuristic star field if not built yet
    if (!starsRef.current.length) {
      starsRef.current = Array.from({ length: 180 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: 0.35 + Math.random() * 1.3,
        twinkleSpeed: 0.005 + Math.random() * 0.015,
        baseAlpha: 0.15 + Math.random() * 0.6,
        color: Math.random() > 0.85 ? "#a78bfa" : (Math.random() > 0.7 ? "#00f2fe" : "#ffffff"),
      }));
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // ─── Handle Planet Selection/Navigation ──────────────────────────────────

  const selectProject = (id: string | null) => {
    if (id === selectedId) return;

    if (id) {
      setSelectedId(id);
      playClickSound();
      const proj = PROJECTS.find((p) => p.id === id);
      if (proj) {
        logSystem(`ZOOM: INCOMING ON ${proj.name} [STABLE CONNECT]`);
        
        // Calculate camera targets to center the clicked planet
        const canvas = canvasRef.current;
        if (canvas) {
          const w = canvas.width;
          const h = canvas.height;
          // Get target coords at selected position
          const angle = tickRef.current * proj.speed + proj.angleOffset;
          const px = Math.cos(angle) * proj.orbitRadiusX;
          const py = Math.sin(angle) * proj.orbitRadiusY;

          // Camera target offsets in coordinates (inverse shift)
          camera.current.targetX = -px * 2.2;
          camera.current.targetY = -py * 2.2;
          camera.current.targetScale = 2.2; // deep zoom
        }
      }
    } else {
      setSelectedId(null);
      playBackSound();
      logSystem("ZOOM: EXPANDING VIEWPORT TO GALAXY MAP OVERVIEW");
      camera.current.targetX = 0;
      camera.current.targetY = 0;
      camera.current.targetScale = 0.85; // zoom out to global overview
    }
  };

  // ─── Render Canvas Engine Loop ───────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      tickRef.current++;
      const tick = tickRef.current;
      const w = dims.w;
      const h = dims.h;
      const c = camera.current;

      // 1. Smoothly interpolate camera translation & zoom scaling (Lerping)
      c.scale = lerp(c.scale, c.targetScale, 0.05);
      c.x = lerp(c.x, c.targetX, 0.05);
      c.y = lerp(c.y, c.targetY, 0.05);

      // Camera drift from mouse coordinate (parallax effect)
      const mouseDriftX = (mousePos.current.nx - 0.5) * -35;
      const mouseDriftY = (mousePos.current.ny - 0.5) * -22;
      const finalCamX = c.x + mouseDriftX;
      const finalCamY = c.y + mouseDriftY;

      // Clear canvas with space fade
      ctx.fillStyle = "#03040c";
      ctx.fillRect(0, 0, w, h);

      // Render cosmic background radial gradient (nebula cores)
      const centerX = w * 0.5;
      const centerY = h * 0.5;
      
      const neb1 = ctx.createRadialGradient(centerX + finalCamX * 0.3, centerY + finalCamY * 0.3, 0, centerX + finalCamX * 0.3, centerY + finalCamY * 0.3, w * 0.6);
      neb1.addColorStop(0, "rgba(3,8,28,0.7)");
      neb1.addColorStop(0.5, "rgba(5,6,18,0.5)");
      neb1.addColorStop(1, "#010206");
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, w, h);

      // Nebula light spots
      const nebulas = [
        { x: 0.25, y: 0.3, r: w * 0.3, col: "rgba(0,242,254,0.035)" },
        { x: 0.7, y: 0.6, r: w * 0.32, col: "rgba(156,39,176,0.025)" },
        { x: 0.5, y: 0.5, r: w * 0.28, col: "rgba(41,121,255,0.03)" },
      ];
      for (const neb of nebulas) {
        const nx = neb.x * w + finalCamX * 0.45;
        const ny = neb.y * h + finalCamY * 0.45;
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, neb.r);
        g.addColorStop(0, neb.col);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(nx, ny, neb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw faint cyber hex-grid overlay
      const hexSize = 40 * c.scale;
      const hexW = hexSize * 2;
      const hexH = Math.sqrt(3) * hexSize;
      ctx.strokeStyle = "rgba(0,242,254,0.02)";
      ctx.lineWidth = 0.6;
      const cols = Math.ceil(w / hexW) + 2;
      const rows = Math.ceil(h / hexH) + 2;
      ctx.save();
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const cx = col * hexW * 0.75 + (finalCamX * 0.2) % hexW;
          const cy = row * hexH + (col % 2 === 0 ? 0 : hexH / 2) + (finalCamY * 0.2) % hexH;
          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const angle = (Math.PI / 3) * s - Math.PI / 6;
            const px = cx + hexSize * Math.cos(angle);
            const py = cy + hexSize * Math.sin(angle);
            s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();

      // Render stars with twinkles
      for (const s of starsRef.current) {
        const sx = s.x + finalCamX * 0.25;
        const sy = s.y + finalCamY * 0.25;
        // wrap coordinates if out of bounds due to camera movement
        let wrappedX = ((sx % w) + w) % w;
        let wrappedY = ((sy % h) + h) % h;

        const twinkle = s.baseAlpha + Math.sin(tick * s.twinkleSpeed) * 0.25;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1.0, twinkle));
        ctx.beginPath();
        ctx.arc(wrappedX, wrappedY, s.radius * (selectedId ? 0.8 : 1.0), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // CAMERA MATRIX CONTEXT SHIFT (Ecosystem centered)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(c.scale, c.scale);
      ctx.translate(finalCamX, finalCamY);

      // RENDER CELESTIAL ELEMENTS (Local coordinate coordinates)

      // 1. Draw core concentric orbit paths
      PROJECTS.forEach((proj) => {
        const isFocused = selectedId === proj.id;
        ctx.beginPath();
        ctx.ellipse(0, 0, proj.orbitRadiusX, proj.orbitRadiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isFocused 
          ? `${proj.color}1e` 
          : (selectedId ? "rgba(0, 242, 254, 0.015)" : "rgba(6, 182, 212, 0.04)");
        ctx.lineWidth = isFocused ? 1.5 : 0.8;
        if (!isFocused && selectedId) ctx.setLineDash([2, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 2. Center "CODEMATES ECOSYSTEM" core
      const coreX = 0;
      const coreY = 0;
      const coreHov = hoveredId === "core";
      const coreSel = selectedId !== null;

      // Fades slightly when focusing on a specific project
      const coreOpacity = coreSel ? 0.35 : 1.0;
      ctx.globalAlpha = coreOpacity;

      // Core glow outer aura
      const coreAura = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, 80);
      coreAura.addColorStop(0, "rgba(6,182,212,0.18)");
      coreAura.addColorStop(0.5, "rgba(6,182,212,0.06)");
      coreAura.addColorStop(1, "rgba(6,182,212,0)");
      ctx.fillStyle = coreAura;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Core spinning rings (Counter rotating)
      ctx.save();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.35)";
      ctx.lineWidth = 1.2;
      ctx.rotate(tick * 0.004);
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      // Tick markings on outer ring
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.moveTo(33, 0);
        ctx.lineTo(39, 0);
      }
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = "rgba(167, 139, 250, 0.3)";
      ctx.lineWidth = 0.8;
      ctx.rotate(-tick * 0.007);
      ctx.beginPath();
      ctx.ellipse(0, 0, 48, 48, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      // Dashed outer ring
      ctx.setLineDash([4, 12]);
      ctx.arc(0, 0, 56, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Glowing central sun sphere
      const sunGrd = ctx.createRadialGradient(-3, -3, 0, 0, 0, 24);
      sunGrd.addColorStop(0, "#ffffff");
      sunGrd.addColorStop(0.3, "rgba(6, 182, 212, 0.95)");
      sunGrd.addColorStop(1, "rgba(3, 10, 40, 0.95)");
      ctx.fillStyle = sunGrd;
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.shadowColor = "#00f2fe";
      ctx.shadowBlur = coreHov ? 32 : 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Core Text Label
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = "800 8.5px Geist,system-ui,sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("CODEMATES", 0, -3);
      ctx.font = "700 6.5px Geist-Mono,system-ui,monospace";
      ctx.fillStyle = "#00f2fe";
      ctx.fillText("ECOSYSTEM", 0, 6);

      ctx.globalAlpha = 1.0;

      // 3. Render connection lines & Active flowing pulses
      PROJECTS.forEach((proj) => {
        const angle = tick * proj.speed + proj.angleOffset;
        const px = Math.cos(angle) * proj.orbitRadiusX;
        const py = Math.sin(angle) * proj.orbitRadiusY;

        const isHovered = hoveredId === proj.id;
        const isSelected = selectedId === proj.id;
        const isDimmed = selectedId !== null && !isSelected;

        if (isDimmed) return; // do not render disconnected lines when focused

        // Draw structural laser connecting line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(px, py);
        ctx.strokeStyle = isSelected 
          ? `${proj.color}45` 
          : (isHovered ? `${proj.color}2b` : "rgba(6, 182, 212, 0.05)");
        ctx.lineWidth = isSelected ? 1.8 : (isHovered ? 1.2 : 0.8);
        ctx.stroke();

        // Data packet flow along connections
        const pulseCount = isHovered ? 3 : 1;
        const pulseSpeed = isHovered ? 0.015 : 0.006;
        for (let i = 0; i < pulseCount; i++) {
          const progress = ((tick * pulseSpeed + (i / pulseCount)) % 1);
          const pulseX = px * progress;
          const pulseY = py * progress;

          ctx.beginPath();
          ctx.arc(pulseX, pulseY, isHovered ? 2.5 : 1.5, 0, Math.PI * 2);
          ctx.fillStyle = proj.color;
          ctx.shadowColor = proj.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 4. Render Particle Bursts
      burstsRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        const alpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      // filter out dead particles
      burstsRef.current = burstsRef.current.filter((p) => p.life > 0);
      ctx.globalAlpha = 1.0;

      // 5. Render Planet Nodes
      PROJECTS.forEach((proj) => {
        const isSelected = selectedId === proj.id;
        const isHovered = hoveredId === proj.id;
        const isDimmed = selectedId !== null && !isSelected;

        if (isDimmed) return; // Hide non-selected nodes in zoom mode

        // Position coordinates
        const angle = tick * proj.speed + proj.angleOffset;
        const px = Math.cos(angle) * proj.orbitRadiusX;
        const py = Math.sin(angle) * proj.orbitRadiusY;

        const sizeScale = isHovered ? 1.22 : 1.0;
        const radius = proj.size * sizeScale * (isSelected ? 1.4 : 1.0);

        // Planet outer glowing halo
        const haloGrd = ctx.createRadialGradient(px, py, 0, px, py, radius * 2.5);
        haloGrd.addColorStop(0, `${proj.color}${isHovered ? "2f" : "15"}`);
        haloGrd.addColorStop(0.5, `${proj.color}07`);
        haloGrd.addColorStop(1, "transparent");
        ctx.fillStyle = haloGrd;
        ctx.beginPath();
        ctx.arc(px, py, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Orbital telemetry ring around planet
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(tick * (isHovered ? 0.024 : 0.01) + proj.angleOffset);
        ctx.beginPath();
        ctx.ellipse(0, 0, radius + 11, 4, Math.PI / 6, 0, Math.PI * 2);
        ctx.strokeStyle = `${proj.color}${isHovered ? "65" : "28"}`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();

        // Drawn sphere gradients (shadowed from core sun)
        const planetGrd = ctx.createRadialGradient(
          px - radius * 0.28,
          py - radius * 0.28,
          0,
          px,
          py,
          radius
        );
        planetGrd.addColorStop(0, `${proj.color}${isHovered ? "7f" : "4a"}`);
        planetGrd.addColorStop(1, "#040510f0");
        ctx.fillStyle = planetGrd;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();

        // Internal cyber-grid clipping effect
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.clip();
        
        ctx.strokeStyle = `${proj.color}35`;
        ctx.lineWidth = 0.6;
        const gridLines = 8;
        for (let i = -gridLines; i <= gridLines; i++) {
          const lPos = i * (radius / 4);
          ctx.beginPath();
          ctx.moveTo(px + lPos, py - radius);
          ctx.lineTo(px + lPos, py + radius);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(px - radius, py + lPos);
          ctx.lineTo(px + radius, py + lPos);
          ctx.stroke();
        }
        ctx.restore();

        // Sleek outer border outline
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered ? proj.color : `${proj.color}90`;
        ctx.lineWidth = isHovered ? 2.2 : 1.0;
        ctx.shadowColor = proj.color;
        ctx.shadowBlur = isHovered ? 25 : 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Dynamic planet text HUD labels (Only in full map view)
        if (!selectedId) {
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          
          // Identifier tag e.g. [NODE_01]
          ctx.font = "700 9.5px Geist-Mono,system-ui,monospace";
          ctx.fillStyle = isHovered ? proj.color : "rgba(255,255,255,0.45)";
          ctx.fillText(`[NODE_${(PROJECTS.indexOf(proj) + 1).toString().padStart(2, "0")}]`, px, py + radius + 10);

          // Name label - big, clear, extrabold and sharp
          ctx.font = "800 15px Geist,system-ui,sans-serif";
          ctx.fillStyle = isHovered ? "#ffffff" : "rgba(255,255,255,0.85)";
          ctx.fillText(proj.name, px, py + radius + 22);

          // Category tag - highly readable
          ctx.font = "700 10.5px Geist,system-ui,sans-serif";
          ctx.fillStyle = isHovered ? proj.color : "rgba(255,255,255,0.52)";
          ctx.fillText(proj.category.toUpperCase(), px, py + radius + 40);
        }
      });

      ctx.restore(); // Restore camera matrix transformation

      // 6. Draw interactive HUD telemetry crosshair at mouse position
      if (!selectedId && hoveredId && hoveredId !== "core") {
        const proj = PROJECTS.find((p) => p.id === hoveredId);
        if (proj) {
          ctx.save();
          ctx.strokeStyle = "rgba(0, 242, 254, 0.2)";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          // horizontal hair
          ctx.moveTo(mousePos.current.x - 30, mousePos.current.y);
          ctx.lineTo(mousePos.current.x + 30, mousePos.current.y);
          // vertical hair
          ctx.moveTo(mousePos.current.x, mousePos.current.y - 30);
          ctx.lineTo(mousePos.current.x, mousePos.current.y + 30);
          ctx.stroke();
          
          // Outer circle
          ctx.beginPath();
          ctx.arc(mousePos.current.x, mousePos.current.y, 14, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [selectedId, hoveredId, dims]);

  // ─── Canvas Interaction hit tests ────────────────────────────────────────

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    mousePos.current.x = cx;
    mousePos.current.y = cy;
    mousePos.current.nx = cx / canvas.clientWidth;
    mousePos.current.ny = cy / canvas.clientHeight;

    if (selectedId) return; // Disable hover hit tests when zoomed

    // Compute coordinate points in core-shifted scaled camera space (CSS pixels)
    const centerX = canvas.clientWidth * 0.5;
    const centerY = canvas.clientHeight * 0.5;
    const c = camera.current;
    
    // Reverse translate camera drift
    const mouseDriftX = (mousePos.current.nx - 0.5) * -35;
    const mouseDriftY = (mousePos.current.ny - 0.5) * -22;
    const finalCamX = c.x + mouseDriftX;
    const finalCamY = c.y + mouseDriftY;

    // Shift coordinates back to core grid coords
    const shiftedX = (cx - centerX) / c.scale - finalCamX;
    const shiftedY = (cy - centerY) / c.scale - finalCamY;

    // 1. Core check
    if (Math.hypot(shiftedX, shiftedY) < 32) {
      if (hoveredId !== "core") {
        setHoveredId("core");
        playHoverSound();
      }
      return;
    }

    // 2. Planet nodes check
    let hit: string | null = null;
    PROJECTS.forEach((proj) => {
      const angle = tickRef.current * proj.speed + proj.angleOffset;
      const px = Math.cos(angle) * proj.orbitRadiusX;
      const py = Math.sin(angle) * proj.orbitRadiusY;

      if (Math.hypot(shiftedX - px, shiftedY - py) < proj.size + 14) {
        hit = proj.id;
      }
    });

    if (hit !== hoveredId) {
      setHoveredId(hit);
      if (hit) {
        playHoverSound();
        const pr = PROJECTS.find((p) => p.id === hit);
        if (pr) {
          logSystem(`HOVER: TELEMETRY LOCKED ON [NODE_${pr.name}]`);
          
          // Fire Star burst particle ring around hovered planet
          const angle = tickRef.current * pr.speed + pr.angleOffset;
          const px = Math.cos(angle) * pr.orbitRadiusX;
          const py = Math.sin(angle) * pr.orbitRadiusY;
          
          for (let i = 0; i < 15; i++) {
            const angleVal = (Math.PI * 2 / 15) * i + Math.random() * 0.2;
            const velocity = 0.8 + Math.random() * 1.5;
            burstsRef.current.push({
              x: px,
              y: py,
              vx: Math.cos(angleVal) * velocity,
              vy: Math.sin(angleVal) * velocity,
              radius: 0.5 + Math.random() * 1.2,
              life: 35 + Math.floor(Math.random() * 20),
              maxLife: 55,
              color: pr.color,
            });
          }
        }
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const handleCanvasClick = () => {
    if (selectedId) return; // Details panel takes clicks when zoomed
    if (hoveredId && hoveredId !== "core") {
      selectProject(hoveredId);
    }
  };

  // ─── Selected Project object ─────────────────────────────────────────────

  const selectedProject = PROJECTS.find((p) => p.id === selectedId) || null;

  return (
    <div
      ref={containerRef}
      className="w-full h-screen relative bg-[#03040c] select-none overflow-hidden font-sans text-white flex items-center justify-center"
    >
      {/* ── CINEMATIC CANVAS VIEWPORT ─────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full cursor-crosshair z-0"
      />

      {/* Ambient gradient top/bottom cuts */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#03040c] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#03040c] to-transparent pointer-events-none z-10" />

      {/* ── FUTURISTIC HUD OVERLAY (Only visible when not zoomed in) ─────────── */}
      <AnimatePresence>
        {!selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none z-20"
          >
            {/* ── NAVBAR ───────────────────────────────────────────────────────────── */}
            <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#03040c]/40 pointer-events-auto">
              <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-wide flex items-center gap-2 group">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-cyan-400 transition duration-300">
                    Codemates
                  </span>
                  <span className="text-cyan-400 tracking-tight font-extrabold group-hover:text-white transition duration-300">
                    India
                  </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                  <Link href="/" className="hover:text-white transition duration-200">
                    Home
                  </Link>
                  <Link href="/services" className="hover:text-white transition duration-200">
                    Services
                  </Link>
                  <Link href="/projects" className="text-white border-b border-cyan-400 pb-1">
                    Projects
                  </Link>
                  <Link href="/about" className="hover:text-white transition duration-200">
                    About
                  </Link>
                  <Link href="/careers" className="hover:text-white transition duration-200">
                    Careers
                  </Link>
                  <Link href="/estimate" className="hover:text-white transition duration-200">
                    Estimate
                  </Link>
                  <Link href="/contact" className="hover:text-white transition duration-200">
                    Contact
                  </Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                  {/* Audio Switcher */}
                  <button
                    onClick={handleAudioToggle}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                      audioEnabled
                        ? "bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {audioEnabled ? (
                      <>
                        <Volume2 size={11} className="animate-pulse" /> SYSTEM HUM DOCKED
                      </>
                    ) : (
                      <>
                        <VolumeX size={11} /> SYSTEM AUDIO MUTED
                      </>
                    )}
                  </button>

                  <Link href="/estimate" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                    Book Call
                  </Link>
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden text-gray-400 hover:text-white transition cursor-pointer p-1"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Mobile Menu Overlay */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden border-b border-white/5 bg-[#03040c]/95 backdrop-blur-2xl overflow-hidden"
                  >
                    <div className="flex flex-col gap-4.5 px-6 py-6 text-sm font-semibold tracking-wide">
                      <Link
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-300 hover:text-white transition"
                      >
                        Home
                      </Link>
                      <Link
                        href="/services"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-300 hover:text-white transition"
                      >
                        Services
                      </Link>
                      <Link
                        href="/projects"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white transition"
                      >
                        Projects
                      </Link>
                      <Link
                        href="/about"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-300 hover:text-white transition"
                      >
                        About
                      </Link>
                      <Link
                        href="/careers"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-300 hover:text-white transition"
                      >
                        Careers
                      </Link>
                      <Link
                        href="/estimate"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-300 hover:text-white transition"
                      >
                        Estimate
                      </Link>
                      <Link
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-300 hover:text-white transition"
                      >
                        Contact
                      </Link>

                      <div className="flex flex-col gap-3 pt-2">
                        <button
                          onClick={() => {
                            handleAudioToggle();
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-[10px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                            audioEnabled
                              ? "bg-cyan-500/10 border-cyan-400 text-cyan-300"
                              : "bg-white/5 border-white/10 text-gray-400"
                          }`}
                        >
                          {audioEnabled ? (
                            <>
                              <Volume2 size={12} className="animate-pulse" /> SYSTEM HUM ACTIVE
                            </>
                          ) : (
                            <>
                              <VolumeX size={12} /> SYSTEM AUDIO MUTED
                            </>
                          )}
                        </button>

                        <Link
                          href="/estimate"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-center py-3.5 rounded-xl transition shadow-[0_0_15px_rgba(6,182,212,0.25)] block text-xs"
                        >
                          Book Call
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>

            {/* Bottom HUD Analytics Bar */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              {/* Telemetry scrolling logs */}
              <div className="hidden md:flex flex-col gap-1 bg-[#040510d0] border border-cyan-500/10 p-3 rounded-xl max-w-xs backdrop-blur-md">
                <span className="text-[7.5px] font-bold text-cyan-400 uppercase tracking-widest border-b border-cyan-500/10 pb-1 mb-1">
                  SYS TELEMETRY FEEDS
                </span>
                <div className="flex flex-col gap-0.5 max-h-[70px] overflow-hidden">
                  {hudLogs.map((log, idx) => (
                    <span
                      key={idx}
                      className="text-[7.5px] font-medium text-gray-400 font-mono tracking-wide truncate"
                    >
                      {log}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Interaction Legend */}
              <div className="flex flex-col gap-1 items-end ml-auto">
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                  SECTOR CONTROLLER
                </span>
                <div className="flex items-center gap-4 text-[9px] font-semibold text-gray-400 font-mono bg-[#040510d0] border border-white/5 px-4 py-2.5 rounded-full backdrop-blur-md">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    HOVER NODE TO UNLOCK STARBURSTS
                  </span>
                  <span className="text-white/15">|</span>
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Zap size={10} className="text-cyan-400" />
                    CLICK TO ENGAGE DOCKING SCAN
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DETAILS PANEL OVERLAY (Zoomed state dashboard) ──────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="absolute inset-0 z-30 flex items-center justify-between p-8 md:p-12 lg:p-16 pointer-events-none">
            
            {/* 1. LEFT SIDE: Elegant Glassmorphic Project Info Card */}
            <motion.div
              initial={{ x: -150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -150, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 23 }}
              className="w-full max-w-[390px] h-5/6 rounded-[28px] border overflow-hidden flex flex-col pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative"
              style={{
                background: "rgba(3, 4, 12, 0.88)",
                borderColor: `${selectedProject.color}35`,
                boxShadow: `0 0 50px ${selectedProject.glow}, inset 0 0 24px rgba(255,255,255,0.01)`,
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
              }}
            >
              {/* Premium Gradient Top-Line Accent */}
              <div className={`h-[3px] w-full bg-gradient-to-r ${selectedProject.accent}`} />

              {/* Scrollable details view */}
              <div className="p-6 md:p-7 flex-1 overflow-y-auto flex flex-col gap-6 custom-scrollbar">
                
                {/* Back button */}
                <button
                  onClick={() => selectProject(null)}
                  className="flex items-center gap-1.5 self-start text-xs font-bold text-gray-400 hover:text-white transition duration-200 border border-white/5 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full"
                >
                  <ChevronLeft size={13} /> ESCAPE Z-AXIS
                </button>

                {/* Header title */}
                <div className="flex flex-col gap-1 mt-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full"
                      style={{
                        background: `${selectedProject.color}15`,
                        border: `1px solid ${selectedProject.color}35`,
                        color: selectedProject.color,
                      }}
                    >
                      {selectedProject.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-white mt-1">
                    {selectedProject.name}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-[11.5px] leading-relaxed font-normal">
                  {selectedProject.description}
                </p>

                {/* Features List */}
                <div className="flex flex-col gap-2.5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    SYSTEM FEATURES
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProject.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-gray-300 leading-snug">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: `${selectedProject.color}15`, color: selectedProject.color }}
                        >
                          <Check size={9} strokeWidth={3} />
                        </div>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Impact Card */}
                <div
                  className="p-4 rounded-2xl border"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    borderColor: "rgba(255, 255, 255, 0.04)",
                  }}
                >
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ENTERPRISE IMPACT SCORE
                  </span>
                  <p className="text-white text-[11.5px] font-bold leading-normal">
                    {selectedProject.impact}
                  </p>
                </div>

                {/* Technology stack cards */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    CORE TECHNOLOGY
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technology.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-bold px-2.5 py-1 rounded-full border bg-white/5 hover:bg-white/10 transition-all duration-200"
                        style={{
                          borderColor: "rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.85)",
                        }}
                        onMouseEnter={playHoverSound}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky Core telemetry details at card bottom */}
              <div className="p-4 bg-black/40 border-t border-white/5 text-[9px] font-mono tracking-wide text-gray-400 flex justify-between items-center px-6">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: selectedProject.color }} />
                  NODE DOCKED
                </span>
                <span className="text-gray-500 uppercase">SYS SEC // 0x48A{PROJECTS.indexOf(selectedProject)}</span>
              </div>
            </motion.div>

            {/* 2. RIGHT SIDE: Floating Interactive 3D Mockup Screens (Screenshots) */}
            <motion.div
              initial={{ x: 150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 150, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 23, delay: 0.08 }}
              className="hidden lg:flex flex-1 max-w-[520px] h-5/6 items-center justify-center pointer-events-auto"
            >
              <FloatingHolographicDashboard proj={selectedProject} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Floating 3D Holographic Dashboard Mockup ──────────────────────────────

function FloatingHolographicDashboard({ proj }: { proj: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 3D Mouse Tilt Tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    const px = (e.clientX - cx) / (r.width / 2);
    const py = (e.clientY - cy) / (r.height / 2);

    // Apply tilt angles
    setTilt({
      x: -py * 16, // tilt vertical
      y: px * 20,  // tilt horizontal
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-[460px] h-[380px] transition-transform duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* 3D Holographic Outer Frame */}
      <div
        className="w-full h-full rounded-[24px] border overflow-hidden p-5 flex flex-col gap-4 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative"
        style={{
          background: "rgba(5, 7, 24, 0.8)",
          borderColor: `${proj.color}45`,
          boxShadow: `0 0 45px ${proj.glow}, inset 0 0 30px ${proj.color}08`,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Sleek Mockup Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: proj.color }}
            />
            <span className="text-[10px] font-bold font-mono tracking-wider uppercase text-white">
              {proj.name}_VAL_CONSOLE.sh
            </span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Mockup Dynamic Content depending on project category */}
        <div className="flex-1 flex flex-col justify-between">
          {proj.id === "buildaart" && <BuildaartMockup color={proj.color} />}
          {proj.id === "kst-hst" && <KstHstMockup color={proj.color} />}
          {proj.id === "themobiq" && <ThemobiqMockup color={proj.color} />}
          {proj.id === "yukti-fest" && <YuktiFestMockup color={proj.color} />}
          {proj.id === "sanjeevani-ai" && <SanjeevaniAiMockup color={proj.color} />}
          {proj.id === "resume-screen" && <ResumeScreenMockup color={proj.color} />}
        </div>

        {/* Dynamic Mockup Footer telemetry */}
        <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[7.5px] font-mono text-gray-500">
          <span>COGNITIVE PLATFORM SEC: SECURE</span>
          <span style={{ color: proj.color }} className="animate-pulse">
            TRANSMISSION ACTIVE 100%
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Mockup Components for Individual Planets ─────────────────────────────

// 1. BUILDAART MOCKUP
function BuildaartMockup({ color }: { color: string }) {
  return (
    <div className="flex-1 flex flex-col gap-3 justify-center">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 border border-white/5 rounded-lg p-2.5 bg-white/5 flex flex-col gap-1.5">
          <span className="text-[8px] font-bold text-gray-400 uppercase">ARCHITECTURAL DESIGN MATRIX</span>
          <div className="h-20 border border-dashed rounded flex items-center justify-center relative overflow-hidden" style={{ borderColor: `${color}35` }}>
            {/* Floating wireframe building lines */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="w-8 h-12 border-t-2 border-x-2 border-cyan-400/50 flex flex-col gap-1 pt-1 px-1">
              <div className="h-1 bg-cyan-400/20" />
              <div className="h-1 bg-cyan-400/20" />
              <div className="h-1 bg-cyan-400/20" />
            </div>
            <div className="w-12 h-8 border-t-2 border-x-2 border-cyan-400/40 ml-2" />
          </div>
        </div>
        <div className="border border-white/5 rounded-lg p-2.5 bg-white/5 flex flex-col justify-between">
          <span className="text-[8px] font-bold text-gray-400 uppercase">LEAD TARGETS</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-extrabold" style={{ color }}>420</span>
            <span className="text-[6.5px] font-bold text-emerald-400 uppercase">+15.4% MONTHLY</span>
          </div>
        </div>
      </div>
      <div className="border border-white/5 rounded-lg p-2.5 bg-white/5 flex items-center justify-between text-[8px] font-mono text-gray-300">
        <span>Inquiry Routing Status: DOCKED</span>
        <span className="px-2 py-0.5 rounded text-[7px]" style={{ background: `${color}15`, color }}>SUPABASE ONLINE</span>
      </div>
    </div>
  );
}

// 2. KST HST FINANCE MOCKUP
function KstHstMockup({ color }: { color: string }) {
  return (
    <div className="flex-1 flex flex-col gap-3 justify-center">
      <div className="grid grid-cols-2 gap-2">
        <div className="border border-white/5 rounded-lg p-2.5 bg-white/5 flex flex-col gap-2">
          <span className="text-[8px] font-bold text-gray-400 uppercase">MEMBERSHIP GROWTH</span>
          <div className="flex items-end gap-1.5 h-12 pt-4">
            <div className="w-2.5 h-4 bg-white/10 rounded-sm" />
            <div className="w-2.5 h-6 bg-white/10 rounded-sm" />
            <div className="w-2.5 h-8 bg-white/10 rounded-sm" />
            <div className="w-2.5 h-12 rounded-sm" style={{ background: color }} />
          </div>
          <span className="text-[10px] font-extrabold">2.4K MEMBERS</span>
        </div>
        <div className="border border-white/5 rounded-lg p-2.5 bg-white/5 flex flex-col justify-between">
          <span className="text-[8px] font-bold text-gray-400 uppercase">AUDITING LEDGER</span>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[7px] font-mono text-gray-400">
              <span>TX_043</span>
              <span className="text-emerald-400">APPROVED</span>
            </div>
            <div className="flex justify-between text-[7px] font-mono text-gray-400">
              <span>TX_044</span>
              <span className="text-emerald-400">APPROVED</span>
            </div>
            <div className="flex justify-between text-[7px] font-mono text-gray-400">
              <span>TX_045</span>
              <span className="text-amber-400">PENDING</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-white/5 rounded-lg p-2.5 bg-white/5 flex items-center justify-between text-[8px] font-mono text-gray-300">
        <span>LEDGER VAULT STATUS: SECURED</span>
        <span className="px-2 py-0.5 rounded text-[7px]" style={{ background: `${color}15`, color }}>SHA-256</span>
      </div>
    </div>
  );
}

// 3. THEMOBIQ MOCKUP
function ThemobiqMockup({ color }: { color: string }) {
  return (
    <div className="flex-1 flex flex-col gap-3 justify-center">
      <div className="grid grid-cols-3 gap-2">
        <div className="border border-white/5 rounded-lg p-2.5 bg-white/5 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Wireframe phone */}
          <div className="w-7 h-14 border border-dashed rounded-md flex flex-col justify-between items-center p-0.5" style={{ borderColor: `${color}45` }}>
            <div className="w-2.5 h-0.8 bg-white/20 rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full border border-dotted" style={{ borderColor: color }} />
          </div>
          <span className="text-[7px] font-mono mt-1 text-gray-400">VAL_DEVICE</span>
        </div>
        <div className="col-span-2 border border-white/5 rounded-lg p-2.5 bg-white/5 flex flex-col justify-between">
          <span className="text-[8px] font-bold text-gray-400 uppercase">VALUATION ALGORITHM</span>
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex justify-between text-[7.5px]">
              <span className="text-gray-400">COSMETIC GRADE:</span>
              <span className="font-bold" style={{ color }}>GRADE A+</span>
            </div>
            <div className="flex justify-between text-[7.5px]">
              <span className="text-gray-400">BATTERY CAP:</span>
              <span className="font-bold text-emerald-400">92%</span>
            </div>
            <div className="flex justify-between text-[7.5px]">
              <span className="text-gray-400">ESTIMATED PAYOUT:</span>
              <span className="font-extrabold text-white">$430.00</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-white/5 rounded-lg p-2.5 bg-white/5 flex items-center justify-between text-[8px] font-mono text-gray-300">
        <span>Device Inventory Level: STABLE</span>
        <span className="px-2 py-0.5 rounded text-[7px]" style={{ background: `${color}15`, color }}>FASTAPI CORE</span>
      </div>
    </div>
  );
}

// 4. YUKTI FEST MOCKUP
function YuktiFestMockup({ color }: { color: string }) {
  return (
    <div className="flex-1 flex flex-col gap-3 justify-center">
      <div className="border border-white/5 rounded-lg p-3 bg-white/5 flex flex-col gap-2.5 relative overflow-hidden">
        {/* Glow Ticket Accent */}
        <div className="absolute right-0 top-0 w-24 h-24 bg-rose-500/10 blur-xl rounded-full" />
        
        <div className="flex justify-between items-start border-b border-white/10 pb-2">
          <div className="flex flex-col">
            <span className="text-[7px] font-bold text-rose-400 font-mono">OFFICIAL PASS</span>
            <span className="text-[12px] font-black tracking-tight text-white">YUKTI COGNITIVE 2K26</span>
          </div>
          <span className="text-[8px] font-mono border border-rose-500/30 px-1.5 py-0.5 rounded" style={{ color }}>VIP SEAT</span>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-0.5">
            <span className="text-[7px] text-gray-400 font-mono">REG_ID: #YK_9831A</span>
            <span className="text-[10px] font-extrabold text-white">GATEWAY STATUS: OK</span>
          </div>
          {/* Mock Barcode */}
          <div className="flex gap-0.5 h-6">
            <div className="w-0.5 bg-white" />
            <div className="w-1.5 bg-white/80" />
            <div className="w-0.5 bg-white/30" />
            <div className="w-1 bg-white" />
            <div className="w-0.5 bg-white/20" />
            <div className="w-1.5 bg-white/90" />
          </div>
        </div>
      </div>
      <div className="border border-white/5 rounded-lg p-2 bg-white/5 flex items-center justify-between text-[8px] font-mono text-gray-300">
        <span>Payment Pipeline: PAYU LOCKED</span>
        <span className="text-emerald-400">99.9% VALID</span>
      </div>
    </div>
  );
}

// 5. SANJEEVANI AI MOCKUP
function SanjeevaniAiMockup({ color }: { color: string }) {
  return (
    <div className="flex-1 flex flex-col gap-3 justify-center">
      <div className="grid grid-cols-3 gap-2">
        <div className="border border-white/5 rounded-lg p-2 bg-white/5 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Animated DNA Cross */}
          <div className="w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center animate-spin duration-[15s]" style={{ borderColor: color }}>
            <Activity size={14} style={{ color }} />
          </div>
          <span className="text-[7px] font-mono mt-1.5 text-gray-400 uppercase">SCAN ACTIVE</span>
        </div>
        <div className="col-span-2 border border-white/5 rounded-lg p-2.5 bg-white/5 flex flex-col justify-between">
          <span className="text-[8px] font-bold text-gray-400 uppercase">AI DIAGNOSTIC DIALS</span>
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex justify-between text-[7px] font-mono">
              <span>Symptom Index:</span>
              <span className="text-purple-400 font-bold">ANALYZED</span>
            </div>
            <div className="flex justify-between text-[7px] font-mono">
              <span>RAG Knowledge Nodes:</span>
              <span className="text-emerald-400 font-bold">98% MATCH</span>
            </div>
            <div className="flex justify-between text-[7px] font-mono">
              <span>Disease Vector:</span>
              <span className="text-white font-bold">XGBOOST CLF</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-white/5 rounded-lg p-2 bg-white/5 flex items-center justify-between text-[8px] font-mono text-gray-300">
        <span>Personalized Suggestions: STREAMING</span>
        <span className="px-2 py-0.5 rounded text-[7px]" style={{ background: `${color}15`, color }}>LLM RAG CORE</span>
      </div>
    </div>
  );
}

// 6. RESUME SCREEN MOCKUP
function ResumeScreenMockup({ color }: { color: string }) {
  return (
    <div className="flex-1 flex flex-col gap-3 justify-center">
      <div className="grid grid-cols-2 gap-2">
        <div className="border border-white/5 rounded-lg p-2.5 bg-white/5 flex flex-col justify-between">
          <span className="text-[8px] font-bold text-gray-400 uppercase">ATS INDEX SCORE</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-9 h-9 rounded-full border-2 border-dashed flex items-center justify-center text-[10px] font-extrabold" style={{ borderColor: color, color }}>
              94%
            </div>
            <div className="flex flex-col">
              <span className="text-[7.5px] font-bold text-white">CANDIDATE_03</span>
              <span className="text-[6px] text-gray-400 font-mono">RANK: 1st</span>
            </div>
          </div>
        </div>
        <div className="border border-white/5 rounded-lg p-2.5 bg-white/5 flex flex-col gap-1.5 justify-center">
          <span className="text-[8px] font-bold text-gray-400 uppercase">SKILLS EXTRACTED</span>
          <div className="flex flex-wrap gap-1">
            <span className="text-[6.5px] px-1 py-0.5 rounded bg-white/5 font-mono">Python</span>
            <span className="text-[6.5px] px-1 py-0.5 rounded bg-white/5 font-mono">NLP</span>
            <span className="text-[6.5px] px-1 py-0.5 rounded bg-white/5 font-mono">FastAPI</span>
            <span className="text-[6.5px] px-1 py-0.5 rounded bg-white/5 font-mono">Transformers</span>
          </div>
        </div>
      </div>
      <div className="border border-white/5 rounded-lg p-2 bg-white/5 flex items-center justify-between text-[8px] font-mono text-gray-300">
        <span>NLP Resume Parser Pipeline: ACTIVE</span>
        <span className="text-emerald-400">ATS OPTIMIZED</span>
      </div>
    </div>
  );
}
