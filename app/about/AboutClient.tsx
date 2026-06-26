"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Globe,
  Code2,
  Cpu,
  Database,
  Layers,
  Monitor,
  Menu,
  X,
  Mail,
  Zap,
  Activity,
  ArrowUpRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";

// ─── Data Configurations ──────────────────────────────────────────────────────

interface Milestone {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  year: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    title: "The Idea",
    year: "Phase 01",
    subtitle: "Beyond the Web",
    description: "A group of passionate developers came together wanting to build intelligent digital systems that solve real-world complexities rather than just traditional websites.",
  },
  {
    id: 2,
    title: "First Client",
    year: "Phase 02",
    subtitle: "Core Systems",
    description: "Successfully engineered and shipped secure cooperative ledgers and high-performance custom lead portals, proving our engineering standards in actual markets.",
  },
  {
    id: 3,
    title: "Scale & Growth",
    year: "Phase 03",
    subtitle: "AI & Automations",
    description: "Expanded our operations into multi-agent AI orchestrations, advanced n8n automation pipelines, robust CRM structures, and enterprise cloud migrations.",
  },
  {
    id: 4,
    title: "Today & Beyond",
    year: "Phase 04",
    subtitle: "Enterprise R&D",
    description: "Serving as trusted digital partners for high-growth brands and enterprise agencies, building next-generation digital products that scale seamlessly.",
  },
];

interface EcosystemNode {
  id: string;
  name: string;
  desc: string;
  tech: string;
  icon: React.ComponentType<any>;
  color: string;
  glow: string;
}

const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: "web",
    name: "Web Development",
    desc: "Cinematic, high-velocity Next.js setups optimized for perfect SEO metrics and fast load speeds.",
    tech: "Next.js • Tailwind CSS • Vercel",
    icon: Globe,
    color: "#00f2fe",
    glow: "rgba(0, 242, 254, 0.25)",
  },
  {
    id: "ai",
    name: "AI Automation",
    desc: "Intelligent autonomous pipelines utilizing n8n, custom LLM agents, and semantic search.",
    tech: "n8n • OpenAI • Python • VectorDB",
    icon: Cpu,
    color: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.25)",
  },
  {
    id: "crm",
    name: "CRM Systems",
    desc: "Bespoke internal dashboards built with strict auditing ledgers to track and automate workflows.",
    tech: "PostgreSQL • Supabase • Flask",
    icon: Database,
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.25)",
  },
  {
    id: "cloud",
    name: "Cloud Infrastructure",
    desc: "Robust, self-healing AWS and Docker container architectures designed to support million-scale traffic.",
    tech: "AWS • Docker • CI/CD Pipelines",
    icon: Layers,
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.25)",
  },
  {
    id: "mobile",
    name: "Mobile Applications",
    desc: "Native-grade cross-platform React Native systems providing sleek touch flows and push notifications.",
    tech: "React Native • Expo • REST APIs",
    icon: Monitor,
    color: "#fb7185",
    glow: "rgba(251, 113, 133, 0.25)",
  },
  {
    id: "custom",
    name: "Custom Software",
    desc: "Tailored multi-tenant SaaS structures and custom database layers crafted for unique agency goals.",
    tech: "FastAPI • Go • Redis • Docker",
    icon: Code2,
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.25)",
  },
];

interface TeamMember {
  id: number;
  name: string;
  position: string;
  tagline: string;
  skills: string[];
  linkedin: string;
  email: string;
  status: "ONLINE" | "IN MEETING" | "CODING";
  statusColor: string;
  avatarSeed: string; // for UI placeholders
  imageUrl?: string; // photo path
  badgeId: string;
}

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Shrinivas Nadager",
    position: "Founder & CEO",
    tagline: "Driving enterprise-grade digital strategy and leading global software innovation.",
    skills: ["Software Architecture", "Product Strategy", "AI Expert"],
    linkedin: "www.linkedin.com/in/shrinivas-nadager",
    email: "shrinivasnadager03@gmail.com",
    status: "ONLINE",
    statusColor: "bg-emerald-400",
    avatarSeed: "shrinivas",
    imageUrl: "/picsgn.png",
    badgeId: "CM-CEO-001",
  },
  {
    id: 2,
    name: "Syed Danish",

    position: "CTO",
    tagline: "Directing next-generation technology vision, engineering standards, and robust system architecture.",


    skills: ["Next.js", "FastAPI", "PostgreSQL", "Flask", "AWS"],
    linkedin: "https://www.linkedin.com/in/syed-danish-354259251",
    email: "syeddanish1092@gmail.com",
    status: "CODING",
    statusColor: "bg-cyan-400",
    avatarSeed: "danish",

    imageUrl: "/danish.jpeg",
    badgeId: "CM-DEV-042",
  },
  {
    id: 3,
    name: "Narasareddy",
    position: "COO",
    tagline: "Orchestrating operations, workflow automation, and scaling delivery processes.",
    skills: ["Python", "Machine Learning", "React", "Tailwind CSS"],
    linkedin: "https://linkedin.com",
    email: "narasareddy8296@gmail.com",
    status: "ONLINE",
    statusColor: "bg-emerald-400",
    avatarSeed: "narasareddy",
    imageUrl: "/nara.png",
    badgeId: "CM-COO-018",
  },
  {
    id: 4,
    name: "Ramchandra",
    position: "CFO",
    tagline: "Directing strategic financial growth, budget allocation, and corporate investments.",
    skills: ["Figma", "Design Systems", "Interactive Design", "Java", "SpringBoot"],
    linkedin: "https://www.linkedin.com/in/ramchandra-18-/",
    email: "rajalasangi@gmail.com",
    status: "IN MEETING",
    statusColor: "bg-purple-400",
    avatarSeed: "ramchandra",
    imageUrl: "/ram.jpg",
    badgeId: "CM-CFO-009",
  },
  {
    id: 5,
    name: "Basawaraja Gurikar",
    position: "CIO",
    tagline: "Securing IT infrastructure, cloud information systems, and data compliance pipelines.",
    skills: ["Docker & Kubernetes", "AWS Cloud", "Redis Caching", "OWASP 10", "BrupSuite"],
    linkedin: "https://www.linkedin.com/in/basavaraj-h-gurikar-95b739284/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BKlR8OkpcSU%2BMlxrHwwasLQ%3D%3D",
    email: "basavarajagurikar2004@gmail.com",
    status: "CODING",
    statusColor: "bg-cyan-400",
    avatarSeed: "basawaraja",
    imageUrl: "/basawa.jpg",
    badgeId: "CM-CIO-031",
  },
  {
    id: 6,
    name: "Nagashree Muruda",
    position: "CMO",
    tagline: "Leading global marketing strategies, brand communication, and client acquisitions.",
    skills: ["Marketing Strategy", "Brand Positioning", "Growth Marketing", "Campaign Analytics"],
    linkedin: "https://www.linkedin.com/in/nagashree-muruda",
    email: "murudanagashree@gmail.com",
    status: "ONLINE",
    statusColor: "bg-emerald-400",
    avatarSeed: "nagashree",
    imageUrl: "/nagashree.png",
    badgeId: "CM-CMO-005",
  },
];

// Helper interface for Canvas star connections
interface CanvasNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeEcosystem, setActiveEcosystem] = useState<string>("web");
  const [timelineProgress, setTimelineProgress] = useState(0); // for milestone scroll
  const [stats, setStats] = useState({ projects: 0, satisfaction: 0, tech: 0 });
  const [mounted, setMounted] = useState(false);

  // Canvas context reference
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synth audio reference
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize systems hum sound on hover clicks
  const playChime = (freq: number, type: "tick" | "chord" = "tick") => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      if (type === "tick") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else {
        // Chord cascade
        [freq, freq * 1.25, freq * 1.5, freq * 2].forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const delay = idx * 0.05;
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, ctx.currentTime + delay);
          gain.gain.setValueAtTime(0.0, ctx.currentTime + delay);
          gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + delay + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 0.4);
        });
      }
    } catch (e) { }
  };

  useEffect(() => {
    // ─── Canvas Particle Flow ─────────────────────────────────────────────────
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: CanvasNode[] = [];
    const nodeCount = 55;

    const initCanvas = () => {
      setIsMobile(window.innerWidth < 768);
      const parent = containerRef.current || window;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      nodes = [];
      const colors = ["#00f2fe", "#3b82f6", "#a78bfa"];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initCanvas();
    window.addEventListener("resize", initCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw neural connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Wrap around limits
        if (n1.x < 0) n1.x = w;
        if (n1.x > w) n1.x = 0;
        if (n1.y < 0) n1.y = h;
        if (n1.y > h) n1.y = 0;

        ctx.fillStyle = n1.color;
        ctx.globalAlpha = 0.22;
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw connecting nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 110) {
            ctx.strokeStyle = n1.color;
            ctx.globalAlpha = (1 - dist / 110) * 0.08;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    // ─── Set Page Metadata ───────────────────────────────────────────────────
    document.title = "Futuristic Headquarters | Explore About Codemates India";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Enter the digital headquarters of Codemates India. Explore our horizontal innovation milestone tunnel, connected orbital ecosystem nodes, principal architects access badges, and R&D lab."
    );

    // ─── Stats Intersection Animation ────────────────────────────────────────
    let countStarted = false;
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countStarted) {
          countStarted = true;
          let prTick = 0;
          let saTick = 0;
          let teTick = 0;
          const interval = setInterval(() => {
            let done = true;
            if (prTick < 20) {
              prTick += 1;
              done = false;
            }
            if (saTick < 98) {
              saTick += 2;
              done = false;
            }
            if (teTick < 15) {
              teTick += 1;
              done = false;
            }
            setStats({ projects: prTick, satisfaction: saTick, tech: teTick });
            if (done) clearInterval(interval);
          }, 25);
        }
      },
      { threshold: 0.15 }
    );

    const statsElem = document.getElementById("impact-telemetry");
    if (statsElem) statsObserver.observe(statsElem);

    setMounted(true);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", initCanvas);
      if (statsElem) statsObserver.unobserve(statsElem);
    };
  }, []);

  const activeEcosystemNode = ECOSYSTEM_NODES.find((node) => node.id === activeEcosystem)!;

  return (
    <div
      ref={containerRef}
      className="bg-[#03040c] text-white min-h-screen relative font-sans overflow-x-hidden"
    >
      {/* ── CINEMATIC CANVAS BACKDROP ─────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      />

      {/* Futuristic Obsidian Ambient Blurs */}
      <div className="absolute top-[10%] left-[-15%] w-[60vw] h-[60vw] bg-cyan-500/5 blur-[200px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-15%] w-[60vw] h-[60vw] bg-purple-500/5 blur-[220px] rounded-full pointer-events-none z-0" />

      {/* ── GLOBAL NAVBAR ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-[#03040c]/70">
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
            <Link href="/projects" className="hover:text-white transition duration-200">
              Projects
            </Link>
            <Link href="/about" className="text-white border-b border-cyan-400 pb-1">
              About
            </Link>
            <Link href="/blog" className="hover:text-white transition duration-200">
              Blog
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

          <Link
            href="/estimate"
            className="hidden md:inline-block relative group overflow-hidden bg-cyan-500 hover:bg-cyan-400 transition-colors duration-300 px-5.5 py-2.5 rounded-full text-sm font-semibold text-black cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <span className="relative z-10">Book Strategy Call</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </Link>

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
                  className="text-gray-300 hover:text-white transition"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white transition"
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white transition"
                >
                  Blog
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
                <Link
                  href="/estimate"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-center py-3.5 rounded-xl transition shadow-[0_0_15px_rgba(6,182,212,0.25)] block text-xs"
                >
                  Book Strategy Call
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── SECTION 1: DIGITAL HEADQUARTERS HERO ────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden bg-gradient-to-b from-[#020307] to-[#03040c] z-10 w-full px-6">
        {/* Futuristic Laser Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            maskImage: "radial-gradient(circle at center, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md px-4.5 py-2.5 rounded-full text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-8 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          >
            <Sparkles size={12} className="animate-pulse" />
            ENTERING VIRTUAL OFFICE PORTAL v2.8
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
          >
            We Don't Just Build Software.
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              We Build Digital Infrastructure.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl"
          >
            Codemates is a core team of senior developers, system architects, and AI integrators assembling highly secure, fully scalable digital platforms for ambitious modern brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-4 items-center justify-center"
          >
            <a
              href="#innovation-tunnel"
              onClick={() => playChime(440, "tick")}
              className="bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition duration-300 px-8 py-4.5 rounded-2xl font-bold flex items-center gap-3 text-black text-sm cursor-pointer"
            >
              Explore Our Story
              <ArrowRight size={16} />
            </a>

            <a
              href="#architects"
              onClick={() => playChime(440, "tick")}
              className="border border-white/10 bg-white/5 hover:bg-white/10 text-white transition duration-300 px-8 py-4.5 rounded-2xl font-bold text-sm cursor-pointer"
            >
              Meet The Architects
            </a>
          </motion.div>

          {/* Interactive Floating Project Nodes */}
          <div className="mt-20 grid grid-cols-3 md:grid-cols-6 gap-4 w-full max-w-4xl relative">
            {["AI Agents", "Cloud Nodes", "Automations", "CRM Vaults", "Telemetry", "RLS Security"].map((tech, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, borderColor: "rgba(6, 182, 212, 0.4)" }}
                onMouseEnter={() => playChime(350 + idx * 40, "tick")}
                className="border border-white/5 bg-white/5 rounded-2xl px-3 py-4 text-center cursor-pointer transition-all duration-300"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mx-auto mb-2.5 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <span className="text-[10px] font-bold tracking-widest text-gray-300 uppercase block font-mono">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE ORIGIN STORY (INNOVATION TUNNEL) ──────────────────────── */}
      <section
        id="innovation-tunnel"
        className="py-32 bg-[#020308] border-y border-white/5 relative z-10 w-full"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs font-mono">
              THE STORYLINE
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
              The Journey Through The
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Innovation Tunnel
              </span>
            </h2>
            <p className="text-gray-400 mt-5 text-base md:text-lg">
              We never wanted to build standard agencies. We set out to bridge the gap between creative visual designs and high-performance server architectures.
            </p>
          </div>

          {/* Tunnel horizontal milestone list */}
          <div className="grid md:grid-cols-4 gap-8 relative mt-16">
            {/* Visual connected grid vector line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/0 pointer-events-none hidden md:block" />

            {MILESTONES.map((stone, idx) => (
              <motion.div
                key={stone.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() => playChime(440 + idx * 50, "tick")}
                className="group border border-white/5 rounded-[28px] p-7 bg-white/5 relative hover:border-cyan-500/30 transition duration-300 overflow-hidden cursor-pointer"
              >
                {/* Neon blur node spot */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/5 blur-2xl rounded-full group-hover:bg-cyan-500/10 transition duration-300" />

                <div className="inline-block px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-[9px] font-bold text-cyan-300 font-mono tracking-widest uppercase mb-6">
                  {stone.year}
                </div>

                <h3 className="text-2xl font-black tracking-tight text-white mb-2 group-hover:text-cyan-300 transition duration-200">
                  {stone.title}
                </h3>
                <span className="text-xs font-semibold text-gray-500 block mb-4">
                  {stone.subtitle}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  {stone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE CODEMATES ECOSYSTEM ──────────────────────────────────── */}
      <section className="py-32 bg-[#03040c] relative z-10 w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* LEFT DETAILS AND GRAPHIC CONTROLS */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs font-mono">
                CYBERNETIC WEB
              </span>
              <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight text-white">
                The Codemates
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Ecosystem Hub
                </span>
              </h2>
              <p className="text-gray-400 mt-5 text-sm md:text-base leading-relaxed">
                Explore the connected orbital nodes mapping our primary technology disciplines. Click or hover any satellite planetary node to inspect technical stacks and descriptions.
              </p>

              {/* Hover dynamic specs details card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEcosystemNode.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="mt-8 border border-white/5 bg-white/5 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md"
                >
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      background: `radial-gradient(circle at center, ${activeEcosystemNode.color}, transparent 80%)`,
                    }}
                  />
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                      style={{ background: `${activeEcosystemNode.color}15` }}
                    >
                      {React.createElement(activeEcosystemNode.icon, {
                        size: 20,
                        style: { color: activeEcosystemNode.color },
                      })}
                    </div>
                    <span className="text-lg font-bold text-white uppercase tracking-wider">
                      {activeEcosystemNode.name}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {activeEcosystemNode.desc}
                  </p>
                  <div className="border-t border-white/5 pt-3.5 flex items-center justify-between text-[10px] font-mono font-bold">
                    <span className="text-gray-500">TECHNOLOGY STACK:</span>
                    <span style={{ color: activeEcosystemNode.color }}>{activeEcosystemNode.tech}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT SIDE INTERACTIVE HOLOGRAPH */}
            <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] md:min-h-[500px]">
              {/* Connected central hub vector illustration */}
              <div className="relative w-[340px] h-[340px] md:w-[440px] md:h-[440px] flex items-center justify-center">
                {/* Center node */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-cyan-500 bg-[#03040c] flex flex-col items-center justify-center relative z-20 shadow-[0_0_35px_rgba(6,182,212,0.4)] cursor-pointer"
                  onClick={() => playChime(523.25, "chord")}
                >
                  <Sparkles className="text-cyan-400 animate-pulse" size={24} />
                  <span className="text-[8px] font-black tracking-widest text-white mt-1.5 uppercase font-mono">
                    CODEMATES
                  </span>
                  <span className="text-[6.5px] font-bold text-cyan-400 tracking-wider font-mono">
                    CORE
                  </span>
                </motion.div>

                {/* Satellite planetary orbits */}
                {mounted && ECOSYSTEM_NODES.map((node, i) => {
                  const angle = (i * 2 * Math.PI) / ECOSYSTEM_NODES.length;
                  const radius = isMobile ? 120 : 165;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  const isSelected = activeEcosystem === node.id;

                  return (
                    <div
                      key={node.id}
                      style={{
                        position: "absolute",
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      className="z-20"
                    >
                      {/* Connection svg lines */}
                      <svg
                        className="absolute pointer-events-none overflow-visible"
                        style={{
                          left: -x,
                          top: -y,
                          width: Math.abs(x),
                          height: Math.abs(y),
                          transform: `scale(${x < 0 ? -1 : 1}, ${y < 0 ? -1 : 1})`,
                          transformOrigin: "top left",
                        }}
                      >
                        <path
                          d={`M0,0 Q${x * 0.3},${y * 0.7} ${x},${y}`}
                          fill="none"
                          stroke={isSelected ? node.color : "rgba(255, 255, 255, 0.05)"}
                          strokeWidth={isSelected ? 1.5 : 0.8}
                          strokeDasharray={isSelected ? "none" : "3,6"}
                          className="transition-colors duration-300"
                        />
                      </svg>

                      <motion.button
                        onClick={() => {
                          setActiveEcosystem(node.id);
                          playChime(350 + i * 50, "tick");
                        }}
                        whileHover={{ scale: 1.15 }}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 relative ${isSelected
                          ? "border-cyan-400 bg-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                          }`}
                      >
                        {React.createElement(node.icon, {
                          size: 22,
                          style: { color: isSelected ? "#00f2fe" : "#9ca3af" },
                        })}
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: OUR PHILOSOPHY ─────────────────────────────────────────── */}
      <section className="py-32 bg-[#020308] border-y border-white/5 relative z-10 w-full px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs font-mono">
            CORE PRINCIPLES
          </span>

          <h2 className="text-3xl md:text-5xl font-black mt-4 leading-snug tracking-tight max-w-4xl mx-auto text-white">
            "Technology Should Solve Problems,
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Not Create Complexity."
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-20 text-left">
            {[
              {
                title: "Build With Purpose",
                desc: "We analyze target conversions first. Every logic block, RLS policy, and animation sequence must deliver direct value.",
              },
              {
                title: "Engineer For Scale",
                desc: "Every database index, Docker container, and API integration is configured to grow gracefully with user demand.",
              },
              {
                title: "Think Long-Term",
                desc: "We establish digital partnerships rather than one-time transaction sheets, committing to maintenance and growth.",
              },
            ].map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="border border-white/5 rounded-3xl p-8 bg-white/5 hover:border-cyan-500/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
                <h3 className="text-xl font-extrabold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: MEET THE ARCHITECTS (TEAM BADGES) ────────────────────────── */}
      <section
        id="architects"
        className="py-32 bg-[#03040c] relative z-10 w-full px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-20">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs font-mono">
              THE ENGINEERS
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
              Meet The Architects
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Digital Identity Badges
              </span>
            </h2>
            <p className="text-gray-400 mt-5 text-sm md:text-base">
              Hover any badge to scan employee credentials, available statuses, social parameters, and technical skills datasets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                onMouseEnter={() => playChime(300 + member.id * 50, "tick")}
                className="group border border-white/10 rounded-[30px] p-6 bg-gradient-to-b from-white/5 to-white/0 relative hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Glass Badge Chip look */}
                <div className="absolute top-0 inset-x-0 h-4.5 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />

                {/* Badge Header Info */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[7.5px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
                      {member.badgeId}
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 text-[6.5px] font-bold text-gray-300 border border-white/5">
                      <span className={`w-1.5 h-1.5 rounded-full ${member.statusColor} animate-pulse`} />
                      {member.status}
                    </div>
                  </div>

                  {/* Profile Graphic / Seed Avatar */}
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden bg-[#060816] mx-auto group-hover:border-cyan-400 transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)]">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-xl font-bold uppercase text-gray-300 group-hover:text-cyan-400 transition duration-300">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-center text-white mb-1 group-hover:text-cyan-300 transition duration-200">
                    {member.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-center text-gray-500 uppercase tracking-wider mb-4 block">
                    {member.position}
                  </span>

                  <p className="text-gray-400 text-xs text-center leading-relaxed font-medium mb-6">
                    "{member.tagline}"
                  </p>
                </div>

                {/* Footer and dynamic Hover skills list */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[6.5px] font-mono text-gray-500 font-bold uppercase">SKILLS MATRIX:</span>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[7.5px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-gray-400 font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2.5">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition duration-200"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-white transition duration-200"
                    >
                      <Mail size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: OUR IMPACT (TELEMETRY COUNTERS) ───────────────────────────── */}
      <section
        id="impact-telemetry"
        className="py-24 bg-[#020308] border-y border-white/5 relative z-10 w-full px-6"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { value: stats.projects, suffix: "+", label: "Projects Delivered" },
            { value: stats.satisfaction, suffix: "%", label: "Client Satisfaction" },
            { value: "24/7", suffix: "", label: "Support Available" },
            { value: stats.tech, suffix: "+", label: "Technologies Mastered" },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className="text-center">
              <h2 className="text-5xl font-black text-cyan-400 font-mono tracking-wide">
                {item.value}
                <span className="text-white">{item.suffix}</span>
              </h2>
              <p className="text-gray-400 mt-3 text-xs md:text-sm font-bold uppercase tracking-widest font-mono">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 7: THE FUTURE LAB (R&D INITIATIVES) ────────────────────────── */}
      <section className="py-32 bg-[#03040c] relative z-10 w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-20">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs font-mono">
              FUTURE MATRIX R&D
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
              Building What Comes Next
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Future Laboratory
              </span>
            </h2>
            <p className="text-gray-400 mt-5 text-sm md:text-base">
              The futuristic solutions of tomorrow are already being built and integrated inside our digital testing labs. Inspect our ongoing research pathways below.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                id: "ai-agents",
                title: "AI Agents",
                desc: "Autonomous workflows capable of executing business logic, customer care triggers, and schedules.",
                status: "ACTIVE TESTING",
              },
              {
                id: "workflows",
                title: "Autonomous Workflows",
                desc: "Intelligent multi-hop connections automating operational workloads across enterprise suites.",
                status: "ACTIVE TESTING",
              },
              {
                id: "analytics",
                title: "Advanced Analytics",
                desc: "Anomaly-detection databases forecasting sales trends and analyzing ledger transactions.",
                status: "ROADMAP",
              },
              {
                id: "saas",
                title: "Enterprise SaaS Platforms",
                desc: "High-performance multi-tenant web portals equipped with dynamic accounting models.",
                status: "IN DEVELOPMENT",
              },
              {
                id: "business",
                title: "Intelligent Systems",
                desc: "RAG vector search nodes organizing files indexes and custom business logic models.",
                status: "IN DEVELOPMENT",
              },
            ].map((rd, i) => (
              <motion.div
                key={rd.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, borderColor: "rgba(167, 139, 250, 0.4)" }}
                onMouseEnter={() => playChime(400 + i * 35, "tick")}
                className="border border-white/5 rounded-3xl p-6 bg-gradient-to-b from-white/5 to-white/0 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 relative cursor-pointer min-h-[220px]"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold font-mono tracking-widest text-purple-400 mb-4 uppercase block">
                    {rd.status}
                  </span>
                  <h3 className="text-lg font-black text-white mb-2 leading-snug">
                    {rd.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-medium">
                    {rd.desc}
                  </p>
                </div>
                <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between text-[7px] font-bold text-gray-500 font-mono uppercase">
                  <span>CM_LAB_INIT_0{i + 1}</span>
                  <ArrowUpRight size={10} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FINAL CTA ───────────────────────────────────────────────── */}
      <section className="py-32 relative z-10 w-full px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-16 text-center">
            {/* Soft background light */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.25),transparent_40%)] pointer-events-none" />

            <h2 className="text-4xl md:text-5xl font-black leading-snug tracking-tight text-white">
              Ready To Build Something
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Remarkable?
              </span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              Let's map out a customized digital transformation architecture that aligns your operational pipelines and grows your revenue securely.
            </p>

            <div className="mt-10 flex flex-wrap gap-4.5 justify-center">
              <Link
                href="/estimate"
                onClick={() => playChime(523.25, "chord")}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4.5 rounded-2xl font-bold transition duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] block text-sm"
              >
                Start A Project
              </Link>
              <Link
                href="/contact"
                onClick={() => playChime(440, "tick")}
                className="border border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-4.5 rounded-2xl font-bold transition duration-300 block text-sm"
              >
                Book A Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 text-center text-gray-500 relative z-10">
        <p className="text-sm font-medium">© 2026 Codemates. All rights reserved.</p>
      </footer>
    </div>
  );
}
