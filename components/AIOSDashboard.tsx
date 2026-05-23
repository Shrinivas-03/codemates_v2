"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Globe,
  Database,
  Network,
  Cloud,
  BarChart3,
  Shield,
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  Play,
  Zap,
  RefreshCw,
  X,
  Maximize2,
  Send,
  Bot,
  CheckCircle2,
  Lock,
  ExternalLink,
} from "lucide-react";

// ─── TYPES & DATA ────────────────────────────────────────────────────────────

interface WindowData {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  glow: string;
  accent: string;
  desc: string;
}

const MODULES: WindowData[] = [
  {
    id: "web",
    title: "Website Systems",
    icon: Globe,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.15)",
    accent: "from-cyan-400 to-blue-500",
    desc: "Vercel-optimized Next.js architectures built for sub-second speeds and flawless SEO audits.",
  },
  {
    id: "crm",
    title: "CRM Platforms",
    icon: Database,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    accent: "from-violet-400 to-purple-600",
    desc: "Robust customized business administration hubs, lead trackers, and ERP pipeline software.",
  },
  {
    id: "ai",
    title: "AI Automation",
    icon: Network,
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.15)",
    accent: "from-sky-400 to-cyan-600",
    desc: "n8n and LLM agent automations routing operations between databases, Slack, and email systems.",
  },
  {
    id: "hosting",
    title: "Hosting Infrastructure",
    icon: Cloud,
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    accent: "from-emerald-400 to-teal-600",
    desc: "Auto-scaling server setups, Docker systems, and zero-downtime database deployment pipelines.",
  },
  {
    id: "analytics",
    title: "Analytics Engines",
    icon: BarChart3,
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.12)",
    accent: "from-amber-400 to-orange-500",
    desc: "Real-time query telemetry dashboards, user interaction charts, and anomaly monitoring tools.",
  },
  {
    id: "security",
    title: "Security Systems",
    icon: Shield,
    color: "#c084fc",
    glow: "rgba(192,132,252,0.15)",
    accent: "from-fuchsia-400 to-violet-600",
    desc: "Zero-Trust authentication protocols, end-to-end encrypted databases, and security compliance.",
  },
];

// Preset Terminal Auto-commands
const PRESETS = [
  { label: "Run System Diagnostics", cmd: "/diagnose" },
  { label: "Map Intelligent Services", cmd: "/services" },
  { label: "Configure Active Workflows", cmd: "/optimize" },
];

export default function AIOSDashboard() {
  const [bootStep, setBootStep] = useState(0);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [isBooted, setIsBooted] = useState(false);

  // OS Desktop States
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [systemTime, setSystemTime] = useState("");
  const [cpuUsage, setCpuUsage] = useState(14);
  const [latency, setLatency] = useState(24);
  const [isSecure, setIsSecure] = useState(true);

  // Terminal Chat States
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<Array<{ sender: "user" | "system"; text: string }>>([
    { sender: "system", text: "CODENET v4.12 Neural Core initialized successfully." },
    { sender: "system", text: "Type /help or select an action below to command the system." },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ─── 1. SIMULATED SYSTEM BOOT LOOPS ──────────────────────────────────────────
  useEffect(() => {
    const logSequence = [
      "LOADING NEURAL FABRIC v4.12...",
      "ESTABLISHING CRYPTO SHIELD LAYER [SUCCESS]",
      "MAPPING DISTRIBUTED CONTAINER CLUSTERS...",
      "SYNCHRONIZING SECURE CRM PIPELINES...",
      "ESTABLISHING API GATEWAY CONDUITS...",
      "LAUNCHING INTEGRATED AI CHAT AGENTS...",
      "SYSTEM INITIATED. NEURAL INTERFACE ONLINE.",
    ];

    if (bootStep < logSequence.length) {
      const timer = setTimeout(() => {
        setBootLogs((prev) => [...prev, `[INIT] ${logSequence[bootStep]}`]);
        setBootStep((prev) => prev + 1);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsBooted(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [bootStep]);

  // ─── 2. OS REALTIME UPDATES & BACKGROUND METRIC FLUIDS ─────────────────────────
  useEffect(() => {
    if (!isBooted) return;

    // Time Clock Loop
    const timeTimer = setInterval(() => {
      const now = new Date();
      setSystemTime(
        now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    }, 1000);

    // Metric Fluctuations
    const metricTimer = setInterval(() => {
      setCpuUsage((prev) => Math.max(8, Math.min(88, prev + (Math.random() * 8 - 4))));
      setLatency((prev) => Math.max(12, Math.min(48, prev + (Math.random() * 6 - 3))));
    }, 2000);

    return () => {
      clearInterval(timeTimer);
      clearInterval(metricTimer);
    };
  }, [isBooted]);

  // Scroll to bottom of terminal chat
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs, isTyping]);

  // ─── 3. AMBIENT BACKGROUND NEURAL PARTICLES ─────────────────────────────────
  useEffect(() => {
    if (!isBooted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particles Setup
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1 + Math.random() * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Grid Pattern
      ctx.strokeStyle = "rgba(255,255,255,0.015)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw and link nodes
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Loop boundaries
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34,211,238,0.22)";
        ctx.fill();

        // Connect near nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139,92,246,${(1 - dist / 120) * 0.08})`;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isBooted]);

  // ─── 4. COMMAND HANDLER ──────────────────────────────────────────────────────
  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    // Push User Log
    setTerminalLogs((prev) => [...prev, { sender: "user", text: cmd }]);
    setTerminalInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const cleaned = cmd.toLowerCase().trim();

      if (cleaned === "/help") {
        setTerminalLogs((prev) => [
          ...prev,
          { sender: "system", text: "Available System Commands:" },
          { sender: "system", text: "  /diagnose  - Audits security and latency channels." },
          { sender: "system", text: "  /services  - Dispatches full intelligence directory." },
          { sender: "system", text: "  /optimize  - Initiates multi-step workflow optimizations." },
          { sender: "system", text: "  /clear     - Wipes system console logs clean." },
        ]);
      } else if (cleaned === "/clear") {
        setTerminalLogs([]);
      } else if (cleaned === "/diagnose") {
        setTerminalLogs((prev) => [
          ...prev,
          { sender: "system", text: "⚡ INITIATING HARDWARE SECURITY DIAGNOSTICS..." },
          { sender: "system", text: `  CPU Telemetry: Operational [Load: ${cpuUsage.toFixed(1)}%]` },
          { sender: "system", text: `  Virtual Latency: Optimal [${latency.toFixed(0)}ms ping]` },
          { sender: "system", text: "  Zero-Trust Gateways: 100% Secure." },
          { sender: "system", text: "  Diagnostic Report: All systems operating at peak performance." },
        ]);
      } else if (cleaned === "/services") {
        setTerminalLogs((prev) => [
          ...prev,
          { sender: "system", text: "📦 INVENTORING ACTIVE APPLICATION SCHEMAS:" },
          ...MODULES.map((m) => ({
            sender: "system" as const,
            text: `  • [${m.title}] -> ${m.desc}`,
          })),
        ]);
      } else if (cleaned === "/optimize") {
        setTerminalLogs((prev) => [
          ...prev,
          { sender: "system", text: "⚙️ INITIATING WORKFLOW PIPELINE OPTIMIZATION..." },
          { sender: "system", text: "  • Parsing active automation routers..." },
          { sender: "system", text: "  • Compressing query load on global Cloud databases..." },
          { sender: "system", text: "  ✔ Success! Automated operations runtimes optimized by 38.5%." },
        ]);
      } else {
        // AI Fallback
        setTerminalLogs((prev) => [
          ...prev,
          {
            sender: "system",
            text: `Analyzing: "${cmd}". Routing to Codemates intelligent LLM. Active system architecture is operational and optimized for sub-second speeds.`,
          },
        ]);
      }
    }, 750);
  };

  return (
    <div className="relative w-full h-[88vh] min-h-[640px] bg-[#02020a] overflow-hidden text-white font-sans flex flex-col justify-between border-y border-white/5 shadow-inner">
      {/* Dynamic particles and layout matrix */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#02020e] via-[#040616] to-[#0a051d] opacity-90 z-0" />

      <AnimatePresence>
        {/* ─── SYSTEM STARTUP BOOT LOADER ──────────────────────────────────────── */}
        {!isBooted && (
          <motion.div
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-50 bg-[#020207] flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-lg border border-white/10 rounded-2xl bg-black/40 backdrop-blur-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400/90 uppercase font-bold">
                  System Boot Sequence
                </span>
              </div>

              {/* Startup Logs list */}
              <div className="h-48 overflow-y-auto font-mono text-xs text-gray-500 flex flex-col gap-2.5 border-b border-white/5 pb-4 mb-4 select-none scrollbar-thin">
                {bootLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-cyan-500/70 font-semibold">&gt;</span>
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {log}
                    </motion.span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                <span>SYSTEM INTEGRATION STATUS</span>
                <span>{Math.min(100, Math.round((bootStep / 7) * 100))}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full mt-2 overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  animate={{ width: `${(bootStep / 7) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── OS INTERFACE (VISIBLE POST-BOOT) ─────────────────────────────────── */}
      {isBooted && (
        <div className="relative w-full h-full flex flex-col justify-between z-10 select-none">
          
          {/* 1. TOP SYSTEM STATUS BAR */}
          <div className="w-full h-11 border-b border-white/5 backdrop-blur-md bg-black/35 px-4 md:px-6 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 text-white/95 font-bold tracking-wider">
                <Bot size={13} className="text-cyan-400 animate-pulse" />
                <span>CODENET OS</span>
              </div>
              <span className="hidden sm:inline border-r border-white/10 h-3" />
              <div className="hidden sm:flex items-center gap-1.5">
                <Cpu size={12} className="text-cyan-400/80" />
                <span>CPU: <strong className="text-white">{cpuUsage.toFixed(0)}%</strong></span>
              </div>
              <span className="hidden md:inline border-r border-white/10 h-3" />
              <div className="hidden md:flex items-center gap-1.5">
                <Wifi size={12} className="text-purple-400/80" />
                <span>PING: <strong className="text-white">{latency.toFixed(0)}ms</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div
                onClick={() => setIsSecure(!isSecure)}
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition"
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isSecure ? "bg-emerald-400" : "bg-red-400"}`} />
                <span className={isSecure ? "text-emerald-400/90 font-bold" : "text-red-400/90 font-bold"}>
                  {isSecure ? "CORE_SECURE" : "SHIELD_ALERT"}
                </span>
              </div>
              <span className="border-r border-white/10 h-3" />
              <span className="text-white font-semibold tracking-widest">{systemTime || "12:00:00"}</span>
            </div>
          </div>

          {/* 2. MAIN DESKTOP CONSOLE */}
          <div className="flex-1 w-full p-4 md:p-6 grid grid-cols-12 gap-6 overflow-hidden max-w-7xl mx-auto">
            
            {/* LEFT MODULE GRID (SERVICES) */}
            <div className="col-span-12 lg:col-span-8 flex flex-col justify-between gap-4 h-full overflow-y-auto scrollbar-none pr-1">
              <div className="flex flex-col gap-2">
                <h2 className="text-[10px] font-mono tracking-[0.25em] text-cyan-400/70 uppercase font-bold">
                  Active Operational Modules
                </h2>
                <p className="text-xs text-gray-500 leading-normal max-w-xl">
                  Deploy and orchestrate standard custom services. Select any module from your operating deck to open control panels and monitor mock telemetry metrics.
                </p>
              </div>

              {/* Module Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1 mt-3">
                {MODULES.map((m) => {
                  const Icon = m.icon;
                  const isOpened = activeWindow === m.id;
                  return (
                    <motion.div
                      key={m.id}
                      whileHover={{ y: -4, borderColor: `${m.color}35` }}
                      onClick={() => setActiveWindow(m.id)}
                      className={`relative rounded-2xl border p-4.5 bg-black/45 hover:bg-black/60 cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                        isOpened ? "border-cyan-400 bg-cyan-950/5 shadow-[0_0_20px_rgba(6,182,212,0.05)]" : "border-white/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border"
                          style={{ background: `${m.color}0c`, borderColor: `${m.color}25` }}
                        >
                          <Icon size={19} style={{ color: m.color }} />
                        </div>
                        <span className="text-[8px] font-mono text-gray-600 font-bold uppercase tracking-widest">
                          0x{m.id.toUpperCase()}_SYS
                        </span>
                      </div>

                      <div className="mt-4.5">
                        <h3 className="text-[13px] font-bold text-white group-hover:text-cyan-400 transition">
                          {m.title}
                        </h3>
                        <p className="text-[10px] text-gray-500 mt-1.5 leading-relaxed">{m.desc}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-[9px] font-mono border-t border-white/5 pt-3">
                        <span className="flex items-center gap-1 text-gray-500 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          ONLINE
                        </span>
                        <span className="text-cyan-400 font-bold group-hover:underline flex items-center gap-0.5">
                          OPEN MODULE &gt;
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE AI ASSISTANT TERMINAL */}
            <div className="col-span-12 lg:col-span-4 h-full flex flex-col justify-between border border-white/5 bg-black/45 backdrop-blur-2xl rounded-2xl p-4 shadow-xl overflow-hidden min-h-[300px]">
              <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-cyan-400" />
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">
                      Neural OS Terminal
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                    SYS_ONLINE
                  </span>
                </div>
              </div>

              {/* Terminal Logs viewport */}
              <div className="flex-1 overflow-y-auto py-3.5 flex flex-col gap-3 font-mono text-[11px] text-gray-400 scrollbar-none select-text">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className={log.sender === "user" ? "text-right" : "text-left"}>
                    {log.sender === "user" ? (
                      <span className="inline-block bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-white max-w-[85%]">
                        {log.text}
                      </span>
                    ) : (
                      <div className="flex gap-2 items-start max-w-[90%]">
                        <Bot size={12} className="text-cyan-400 mt-0.5 shrink-0" />
                        <span className="leading-relaxed whitespace-pre-wrap">{log.text}</span>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 items-center text-cyan-400 animate-pulse">
                    <Bot size={12} />
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce delay-75" />
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce delay-150" />
                  </div>
                )}
                <div ref={logsEndRef} />
              </div>

              {/* Presets and entry */}
              <div className="border-t border-white/5 pt-3.5 flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCommand(p.cmd)}
                      className="text-[9px] font-mono bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-gray-400 hover:text-white hover:border-cyan-500/30 transition cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCommand(terminalInput)}
                    placeholder="Enter command... (/help)"
                    className="w-full h-9 bg-black/40 border border-white/5 rounded-xl px-3 pr-10 text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40"
                  />
                  <button
                    onClick={() => handleCommand(terminalInput)}
                    className="absolute right-2 text-cyan-400 hover:text-white transition cursor-pointer"
                  >
                    <Send size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. EXPANDABLE FLOATING APP WINDOWS */}
          <AnimatePresence>
            {activeWindow && (
              <div className="absolute inset-0 bg-[#020209]/75 backdrop-blur-sm z-30 flex items-center justify-center p-4">
                {/* Floating OS Window */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: 10 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="w-full max-w-2xl border rounded-2xl bg-[#060816]/95 backdrop-blur-3xl shadow-2xl flex flex-col overflow-hidden h-[80vh] min-h-[460px] max-h-[580px]"
                  style={{
                    borderColor: `${MODULES.find((m) => m.id === activeWindow)?.color}35`,
                    boxShadow: `0 0 50px ${MODULES.find((m) => m.id === activeWindow)?.glow}`,
                  }}
                >
                  {/* OS Window Titlebar */}
                  <div className="h-12 border-b border-white/5 bg-black/40 px-4.5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      {React.createElement(MODULES.find((m) => m.id === activeWindow)?.icon || Globe, {
                        size: 14,
                        style: { color: MODULES.find((m) => m.id === activeWindow)?.color },
                      })}
                      <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/90">
                        {MODULES.find((m) => m.id === activeWindow)?.title} Control Console
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="text-gray-500 hover:text-white transition">
                        <Maximize2 size={11} />
                      </button>
                      <button
                        onClick={() => setActiveWindow(null)}
                        className="w-5.5 h-5.5 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-gray-500 transition cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>

                  {/* OS Window Canvas Content */}
                  <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                    <AppContent windowId={activeWindow} />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* 4. DOCK SYSTEM LAUNCHER */}
          <div className="w-full h-18 border-t border-white/5 backdrop-blur-md bg-black/35 flex items-center justify-center shrink-0">
            <div className="flex items-center gap-3 md:gap-5 px-6 py-2 rounded-full border border-white/5 bg-black/40 shadow-inner">
              {MODULES.map((m) => {
                const Icon = m.icon;
                const isOpened = activeWindow === m.id;
                return (
                  <motion.button
                    key={m.id}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveWindow(m.id)}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center relative transition-all cursor-pointer ${
                      isOpened ? "bg-white/10 border-white/20" : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                    } border`}
                  >
                    <Icon size={19} style={{ color: m.color }} />
                    {isOpened && (
                      <span className="absolute bottom-1 w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: m.color }} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 5. SPECIFIC INTERACTIVE APPLICATION CONTENTS ──────────────────────────────

function AppContent({ windowId }: { windowId: string }) {
  if (windowId === "web") {
    // 🖥 Website Systems
    const [score, setScore] = useState(88);
    const [isOptimizing, setIsOptimizing] = useState(false);

    const optimize = () => {
      setIsOptimizing(true);
      setTimeout(() => {
        setScore(100);
        setIsOptimizing(false);
      }, 1500);
    };

    return (
      <div className="flex flex-col gap-6">
        <div className="border border-white/5 bg-black/30 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Next.js Core Web Vitals Monitor</h4>
            <p className="text-xs text-gray-500 mt-1">Real-time performance metric testing for digital storefronts.</p>
          </div>
          <button
            onClick={optimize}
            disabled={isOptimizing || score === 100}
            className="bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer disabled:opacity-55 disabled:hover:bg-cyan-500"
          >
            {isOptimizing ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} />}
            {isOptimizing ? "Optimizing..." : score === 100 ? "Fully Optimized" : "Run Optimization"}
          </button>
        </div>

        {/* Lighthouse Dials */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Performance", val: score, col: score === 100 ? "text-cyan-400" : "text-amber-400" },
            { label: "SEO Status", val: 100, col: "text-emerald-400" },
            { label: "Accessibility", val: 100, col: "text-emerald-400" },
            { label: "Best Practices", val: 100, col: "text-emerald-400" },
          ].map((d, i) => (
            <div key={i} className="border border-white/5 bg-black/40 rounded-xl p-4 text-center flex flex-col items-center gap-2">
              <div className="relative w-16 h-16 flex items-center justify-center">
                {/* SVG circular track */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
                  <motion.circle
                    cx="32" cy="32" r="26"
                    stroke={d.val === 100 ? "#34d399" : "#22d3ee"}
                    strokeWidth="4" fill="transparent"
                    strokeDasharray={2 * Math.PI * 26}
                    initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - d.val / 100) }}
                    transition={{ duration: 1 }}
                  />
                </svg>
                <span className={`absolute text-xs font-mono font-bold ${d.col}`}>{d.val}</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono tracking-wide font-bold">{d.label}</span>
            </div>
          ))}
        </div>

        {/* Code wireframe diagnostics */}
        <div className="border border-white/5 bg-black/40 rounded-2xl p-4 font-mono text-[10px] text-gray-500 leading-normal flex flex-col gap-1.5">
          <div className="text-white font-bold mb-1 select-none flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-cyan-400" /> SYSTEM BUNDLE DIAGNOSTICS:
          </div>
          <div>&gt; npx next build --minify</div>
          <div>Creating an optimized production build...</div>
          <div>✔ Compiled successfully [Route size: 28kB Edge Optimized]</div>
          <div className="text-cyan-400 font-semibold">&gt; Lighthouse Audits completed. Load speed: 180ms. Perfect Web Vitals.</div>
        </div>
      </div>
    );
  }

  if (windowId === "crm") {
    // 📊 CRM Platforms
    const [leads, setLeads] = useState(42);
    const triggerSync = () => {
      setLeads((prev) => prev + Math.round(Math.random() * 4 + 1));
    };

    return (
      <div className="flex flex-col gap-6">
        <div className="border border-white/5 bg-black/30 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Custom CRM Funnel Hub</h4>
            <p className="text-xs text-gray-500 mt-1">Simulated corporate sales funnel telemetry monitoring tool.</p>
          </div>
          <button
            onClick={triggerSync}
            className="bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={12} className="animate-spin-slow" />
            Ingest Lead Node
          </button>
        </div>

        {/* Pipeline funnel */}
        <div className="flex flex-col gap-3">
          {[
            { label: "Incoming Ingestion", value: leads * 3.5, pct: "w-full", col: "bg-cyan-500" },
            { label: "Qualified Contracts", value: leads * 2.2, pct: "w-[75%]", col: "bg-blue-500" },
            { label: "Workflow Proposal", value: leads * 1.1, pct: "w-[50%]", col: "bg-indigo-500" },
            { label: "Successful Conversions", value: leads, pct: "w-[25%]", col: "bg-purple-500" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>{item.label}</span>
                <span>{Math.round(item.value)} nodes</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: item.pct.replace("w-[","").replace("]%","%") }}
                  className={`h-full rounded-full ${item.col}`}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (windowId === "ai") {
    // ⚙️ AI Automation
    return (
      <div className="flex flex-col gap-6">
        <div className="border border-white/5 bg-black/30 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-white">n8n Automated Workflow Builder</h4>
          <p className="text-xs text-gray-500 mt-1">Multi-step visual agent dispatch connecting SaaS systems.</p>
        </div>

        {/* Workflow visual block */}
        <div className="border border-white/5 bg-black/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 relative overflow-hidden min-h-[180px]">
          <div className="absolute inset-0 bg-radial-grid opacity-15" />

          {/* Trigger Node */}
          <div className="w-24 h-16 rounded-xl border border-cyan-500/30 bg-cyan-950/20 flex flex-col items-center justify-center gap-1 z-10">
            <Zap size={15} className="text-cyan-400" />
            <span className="text-[8px] font-mono font-bold tracking-widest text-cyan-300">WEBHOOK_IN</span>
          </div>

          <div className="h-6 w-[2px] sm:h-[2px] sm:w-12 bg-gradient-to-b sm:bg-gradient-to-r from-cyan-500 to-sky-500 relative shrink-0">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>

          {/* Core Processing Node */}
          <div className="w-24 h-16 rounded-xl border border-sky-500/30 bg-sky-950/20 flex flex-col items-center justify-center gap-1 z-10">
            <Bot size={15} className="text-sky-400" />
            <span className="text-[8px] font-mono font-bold tracking-widest text-sky-300">AI_ROUTER</span>
          </div>

          <div className="h-6 w-[2px] sm:h-[2px] sm:w-12 bg-gradient-to-b sm:bg-gradient-to-r from-sky-500 to-purple-500 relative shrink-0">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>

          {/* Storage Database Node */}
          <div className="w-24 h-16 rounded-xl border border-purple-500/30 bg-purple-950/20 flex flex-col items-center justify-center gap-1 z-10">
            <Database size={15} className="text-purple-400" />
            <span className="text-[8px] font-mono font-bold tracking-widest text-purple-300">CRM_DB_SYNC</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
          <span>Active Pipeline: webhooks &gt;&gt; prompt templates &gt;&gt; databases</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            PIPELINE_OK
          </span>
        </div>
      </div>
    );
  }

  if (windowId === "hosting") {
    // ☁️ Hosting Infrastructure
    const [load, setLoad] = useState(45);
    useEffect(() => {
      const interval = setInterval(() => {
        setLoad((prev) => Math.max(25, Math.min(85, prev + (Math.random() * 12 - 6))));
      }, 1500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="flex flex-col gap-6">
        <div className="border border-white/5 bg-black/30 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Auto-Scaling Cloud Resource Matrix</h4>
            <p className="text-xs text-gray-500 mt-1">Monitors auto-scaling infrastructure, global CDN, and uptime.</p>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded">
            99.99% Uptime
          </span>
        </div>

        {/* Global Node Latency metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { region: "Vercel Edge (APAC)", ping: "14ms", status: "Optimal" },
            { region: "AWS Core (EU West)", ping: "38ms", status: "Optimal" },
            { region: "Cloudflare (US East)", ping: "28ms", status: "Optimal" },
          ].map((node, i) => (
            <div key={i} className="border border-white/5 bg-black/40 rounded-xl p-4.5 flex flex-col gap-2 relative">
              <span className="text-[10px] text-gray-400 font-bold">{node.region}</span>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyan-400 font-bold">{node.ping}</span>
                <span className="text-emerald-400">{node.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Simulated RAM slider */}
        <div className="border border-white/5 bg-black/40 rounded-2xl p-4.5 flex flex-col gap-3">
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
            <span className="flex items-center gap-1"><HardDrive size={11} />CONTAINER MEMORY ALLOCATION</span>
            <span>{load.toFixed(0)} / 512 MB</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div
              animate={{ width: `${(load / 512) * 100 * 3.5}%` }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (windowId === "analytics") {
    // 📈 Analytics Engines
    return (
      <div className="flex flex-col gap-6">
        <div className="border border-white/5 bg-black/30 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-white">System Query Latency Monitor</h4>
          <p className="text-xs text-gray-500 mt-1">Tracks live execution latencies across core database nodes.</p>
        </div>

        {/* Real-time fluctuating SVG line chart */}
        <div className="border border-white/5 bg-black/40 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden h-[180px]">
          <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
            <motion.path
              d="M0,25 Q15,5 30,18 T60,8 T90,20 L100,10 L100,30 L0,30 Z"
              fill="url(#chart-grad)"
              stroke="#fbbf24"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(251,191,36,0.15)" />
                <stop offset="100%" stopColor="rgba(251,191,36,0.00)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Grid lines */}
          <div className="absolute inset-x-4 top-1/4 border-t border-white/5" />
          <div className="absolute inset-x-4 top-2/4 border-t border-white/5" />
          <div className="absolute inset-x-4 top-3/4 border-t border-white/5" />

          <div className="absolute top-2 left-4 text-[8px] font-mono text-gray-600">QUERY RUNTIME (ms)</div>
        </div>

        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
          <span>Telemetry node synchronized: 24 active points per min</span>
          <span className="text-amber-400 font-bold">AVG_LATENCY: 14.2ms</span>
        </div>
      </div>
    );
  }

  if (windowId === "security") {
    // 🛡 Security Systems
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    const runScan = () => {
      setIsScanning(true);
      setScanProgress(0);
    };

    useEffect(() => {
      if (isScanning && scanProgress < 100) {
        const interval = setInterval(() => {
          setScanProgress((p) => Math.min(100, p + 5));
        }, 120);
        return () => clearInterval(interval);
      } else if (scanProgress === 100) {
        setIsScanning(false);
      }
    }, [isScanning, scanProgress]);

    return (
      <div className="flex flex-col gap-6">
        <div className="border border-white/5 bg-black/30 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">OWASP Integrity Vulnerability Scanner</h4>
            <p className="text-xs text-gray-500 mt-1">Performs security auditing across active systems.</p>
          </div>
          <button
            onClick={runScan}
            disabled={isScanning}
            className="bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer disabled:opacity-55"
          >
            {isScanning ? <RefreshCw size={12} className="animate-spin" /> : <Lock size={12} />}
            {isScanning ? `Auditing (${scanProgress}%)` : "Initiate Audit"}
          </button>
        </div>

        {/* Scan progress diagnostics */}
        <div className="border border-white/5 bg-black/40 rounded-2xl p-4.5 font-mono text-[10px] text-gray-500 leading-normal flex flex-col gap-2">
          <div className="text-white font-bold select-none flex items-center gap-1.5 border-b border-white/5 pb-2 mb-1">
            <Lock size={12} className="text-purple-400" /> AUTOMATED SECURITY PROTOCOLS:
          </div>
          <div className="flex items-center justify-between">
            <span>&gt; Zero-Trust RBAC Gateways:</span>
            <span className="text-emerald-400 font-bold">VERIFIED</span>
          </div>
          <div className="flex items-center justify-between">
            <span>&gt; End-to-End JWT Encryption:</span>
            <span className="text-emerald-400 font-bold">ACTIVE</span>
          </div>
          <div className="flex items-center justify-between">
            <span>&gt; OWASP SQL-Injection Scans:</span>
            <span className="text-emerald-400 font-bold">100% CLEAR</span>
          </div>

          {scanProgress > 0 && (
            <div className="mt-2 text-purple-400 font-semibold border-t border-white/5 pt-2">
              &gt; {scanProgress === 100 ? "AUDIT COMPLETED. ZERO VULNERABILITIES IDENTIFIED." : "Auditing network nodes..."}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
