"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Terminal,
  Database,
  MessageSquare,
  Bot,
  Play,
  CheckCircle,
  Network,
  Cpu,
  Brain,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// ==========================================
// 1. WEB DEVELOPMENT WIDGET
// ==========================================
export function WebDevWidget() {
  const codeLines = [
    "import { motion } from 'framer-motion';",
    "import { Geist } from 'next/font/google';",
    "",
    "export default function App() {",
    "  return (",
    "    <main className='relative min-h-screen'>",
    "      <HeroSection ",
    "        title='SaaS Platform'",
    "        animate={true}",
    "      />",
    "    </main>",
    "  );",
    "}",
  ];

  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % (codeLines.length + 1));
    }, 450);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex flex-col font-mono text-[10px] md:text-xs">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[10px] text-gray-500 font-semibold ml-2">page.tsx</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400/80 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Live Server
        </div>
      </div>

      {/* Editor & Preview Split */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden h-[180px] md:h-[220px]">
        {/* Code Editor */}
        <div className="col-span-7 bg-[#0b0c16] p-3 text-left overflow-y-auto border-r border-white/5 text-gray-400 select-none">
          {codeLines.map((line, idx) => (
            <div
              key={idx}
              className={`transition-all duration-300 ${
                idx < currentLine ? "opacity-100 text-white" : "opacity-30"
              }`}
            >
              <span className="text-gray-600 select-none mr-2 inline-block w-4 text-right">
                {idx + 1}
              </span>
              <span
                className={
                  line.startsWith("import")
                    ? "text-purple-400"
                    : line.includes("export") || line.includes("return")
                    ? "text-cyan-400"
                    : line.includes("<")
                    ? "text-amber-400"
                    : "text-gray-300"
                }
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Live Browser Preview */}
        <div className="col-span-5 bg-[#030408] p-3 flex flex-col justify-center items-center relative overflow-hidden">
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[110px] aspect-[16/10] bg-white/[0.03] border border-white/10 rounded-lg p-1.5 flex flex-col gap-1 shadow-2xl relative z-10"
          >
            {/* Header bar */}
            <div className="flex justify-between items-center px-1">
              <div className="w-4 h-1 bg-white/20 rounded" />
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1 bg-cyan-400 rounded-full" />
                <div className="w-3 h-1 bg-white/10 rounded" />
              </div>
            </div>

            {/* Simulated website graphic */}
            <div className="flex-1 flex flex-col justify-center gap-1.5 px-1 relative">
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(90deg, #22d3ee, #8b5cf6)",
                    "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                    "linear-gradient(90deg, #3b82f6, #22d3ee)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="h-1.5 w-12 rounded"
              />
              <div className="flex gap-1">
                <div className="w-8 h-1 bg-white/20 rounded" />
                <div className="w-5 h-1 bg-white/20 rounded" />
              </div>
              <div className="grid grid-cols-3 gap-0.5 mt-0.5">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="h-4 bg-white/[0.05] border border-white/10 rounded-sm"
                />
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="h-4 bg-white/[0.05] border border-cyan-500/20 rounded-sm"
                />
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="h-4 bg-white/[0.05] border border-purple-500/20 rounded-sm"
                />
              </div>
            </div>
          </motion.div>

          {/* Absolute floating browser nodes */}
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-cyan-500/10 blur-md pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-purple-500/10 blur-md pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. CUSTOM SOFTWARE DEVELOPMENT WIDGET
// ==========================================
export function CustomSoftwareWidget() {
  const [activeBoard, setActiveBoard] = useState(0);
  const tasks = [
    { title: "Invoice DB Orchestrator", status: "Done", tag: "Postgres" },
    { title: "CRM Sync Handler", status: "Active", tag: "Webhook" },
    { title: "Analytics Pipeline", status: "Pending", tag: "Worker" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBoard((prev) => (prev + 1) % 3);
    }, 900);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex flex-col font-sans text-xs">
      {/* Top Database Metrics Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Database size={13} className="text-purple-400" />
          <span className="font-semibold text-gray-300 text-[11px] tracking-wide uppercase">ERP Database Console</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
            OK (2ms)
          </span>
        </div>
      </div>

      {/* Main CRM/Board Display */}
      <div className="flex-1 p-3 bg-[#070810] flex flex-col gap-2 h-[180px] md:h-[220px] justify-center">
        {/* Mini Kanban Columns */}
        <div className="grid grid-cols-3 gap-2">
          {["Backlog", "In Progress", "Production"].map((col, cIdx) => (
            <div key={cIdx} className="bg-white/[0.02] border border-white/5 rounded-lg p-2 flex flex-col gap-1.5 min-h-[110px]">
              <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold tracking-wider uppercase mb-1">
                <span>{col}</span>
                <span className="w-3.5 h-3.5 rounded-full bg-white/5 flex items-center justify-center text-[8px] text-gray-400">
                  {cIdx === 0 && activeBoard === 2 ? 1 : cIdx === 1 && activeBoard === 1 ? 1 : cIdx === 2 && activeBoard === 0 ? 2 : 1}
                </span>
              </div>

              {/* CRM Task Card */}
              <AnimatePresence mode="wait">
                {cIdx === 0 && activeBoard === 0 && (
                  <motion.div
                    key="task-a"
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    className="bg-[#0b0c16] border border-white/10 rounded p-1.5 text-[9px] text-left relative overflow-hidden group shadow-lg"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400" />
                    <p className="text-white font-medium mb-1 truncate">Sync API Records</p>
                    <span className="text-gray-500 bg-white/5 px-1 py-0.5 rounded text-[8px]">API Route</span>
                  </motion.div>
                )}

                {cIdx === 1 && activeBoard === 1 && (
                  <motion.div
                    key="task-b"
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    className="bg-[#0b0c16] border border-cyan-500/30 rounded p-1.5 text-[9px] text-left relative overflow-hidden group shadow-lg"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
                    <p className="text-white font-medium mb-1 truncate">n8n Webhook Hook</p>
                    <span className="text-purple-300 bg-purple-500/10 px-1 py-0.5 rounded text-[8px]">n8n Workflow</span>
                  </motion.div>
                )}

                {cIdx === 2 && activeBoard === 2 && (
                  <motion.div
                    key="task-c"
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    className="bg-[#0b0c16] border border-emerald-500/30 rounded p-1.5 text-[9px] text-left relative overflow-hidden group shadow-lg"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                    <p className="text-emerald-300 font-medium mb-1 truncate">Cloud CDN Sync</p>
                    <span className="text-emerald-300 bg-emerald-500/10 px-1 py-0.5 rounded text-[8px]">Deployed</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Static Task Card */}
              <div className="bg-[#0b0c16]/50 border border-white/5 rounded p-1.5 text-[9px] text-left">
                <p className="text-gray-400 truncate">Optimize Queries</p>
                <span className="text-gray-600 bg-white/5 px-1 py-0.5 rounded text-[8px]">SQL Index</span>
              </div>
            </div>
          ))}
        </div>

        {/* Database Telemetry Stats */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="bg-white/[0.01] border border-white/5 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[10px]">
            <span className="text-gray-500">Read Operations</span>
            <span className="font-mono text-cyan-400 font-bold">14,284/s</span>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[10px]">
            <span className="text-gray-500">Active Handlers</span>
            <span className="font-mono text-purple-400 font-bold">99.98%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. AI AUTOMATION (N8N) WIDGET
// ==========================================
export function AIAutomationWidget() {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 4);
    }, 700);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex flex-col font-sans text-xs relative">
      {/* Node Graph Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Network size={13} className="text-cyan-400" />
          <span className="font-semibold text-gray-300 text-[11px] uppercase tracking-wide">n8n Workflow pipeline</span>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">
          <Play size={8} className="text-cyan-400 fill-cyan-400" />
          Active Run
        </div>
      </div>

      {/* Main n8n Node Workflow Diagram */}
      <div className="flex-1 p-4 bg-[#05060b] flex items-center justify-center relative overflow-hidden h-[180px] md:h-[220px]">
        {/* Animated Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
          {/* Path 1 -> 2 */}
          <path d="M 65 90 H 135" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" fill="none" />
          {pulseIndex === 0 && (
            <motion.circle
              cx={0}
              cy={90}
              r="2"
              fill="#22d3ee"
              animate={{ cx: [65, 135] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="shadow-[0_0_8px_#22d3ee]"
            />
          )}

          {/* Path 2 -> 3 */}
          <path d="M 165 90 H 235" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" fill="none" />
          {pulseIndex === 1 && (
            <motion.circle
              cx={0}
              cy={90}
              r="2"
              fill="#c084fc"
              animate={{ cx: [165, 235] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="shadow-[0_0_8px_#c084fc]"
            />
          )}

          {/* Path 3 -> Split 4A & 4B */}
          <path d="M 265 90 L 305 60" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" fill="none" />
          <path d="M 265 90 L 305 120" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" fill="none" />
          {pulseIndex === 2 && (
            <>
              <motion.circle
                cx={0}
                cy={0}
                r="2"
                fill="#34d399"
                animate={{ cx: [265, 305], cy: [90, 60] }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <motion.circle
                cx={0}
                cy={0}
                r="2"
                fill="#38bdf8"
                animate={{ cx: [265, 305], cy: [90, 120] }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </>
          )}
        </svg>

        {/* Nodes Grid */}
        <div className="flex justify-between items-center w-full max-w-[260px] relative z-10">
          {/* Node 1: Webhook */}
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              animate={pulseIndex === 0 ? { scale: [1, 1.1, 1], borderColor: "rgba(34, 211, 238, 0.6)" } : {}}
              className={`w-9 h-9 rounded-xl flex items-center justify-center bg-[#0d1527] border ${
                pulseIndex === 0 ? "border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]" : "border-white/10"
              }`}
            >
              <Globe size={15} className={pulseIndex === 0 ? "text-cyan-400" : "text-gray-400"} />
            </motion.div>
            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">Webhook</span>
          </div>

          {/* Node 2: OpenAI AI Engine */}
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              animate={pulseIndex === 1 ? { scale: [1, 1.1, 1], borderColor: "rgba(167, 139, 250, 0.6)" } : {}}
              className={`w-9 h-9 rounded-xl flex items-center justify-center bg-[#180e29] border ${
                pulseIndex === 1 ? "border-purple-400/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]" : "border-white/10"
              }`}
            >
              <Brain size={15} className={pulseIndex === 1 ? "text-purple-400" : "text-gray-400"} />
            </motion.div>
            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">GPT-4 Parser</span>
          </div>

          {/* Node 3: PostgreSQL Database */}
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              animate={pulseIndex === 2 ? { scale: [1, 1.1, 1], borderColor: "rgba(52, 211, 153, 0.6)" } : {}}
              className={`w-9 h-9 rounded-xl flex items-center justify-center bg-[#071b14] border ${
                pulseIndex === 2 ? "border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]" : "border-white/10"
              }`}
            >
              {pulseIndex === 3 ? (
                <CheckCircle size={15} className="text-emerald-400" />
              ) : (
                <Database size={15} className={pulseIndex === 2 ? "text-emerald-400" : "text-gray-400"} />
              )}
            </motion.div>
            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">DB Commit</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. AI DEVELOPMENT WIDGET
// ==========================================
export function AIDevWidget() {
  const [tokens, setTokens] = useState<string[]>([]);
  const generatedText = [
    "embedding",
    "vector",
    "similarity",
    "LLM_Agent",
    "RAG_Match",
    "Token_Stream",
  ];

  useEffect(() => {
    let active = true;
    const stream = async () => {
      while (active) {
        for (let i = 0; i <= generatedText.length; i++) {
          if (!active) break;
          setTokens(generatedText.slice(0, i));
          await new Promise((r) => setTimeout(r, 150));
        }
        await new Promise((r) => setTimeout(r, 450));
      }
    };
    stream();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="w-full h-full rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex flex-col font-mono text-[10px] md:text-xs">
      {/* Top Console Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Brain size={13} className="text-purple-400" />
          <span className="font-semibold text-gray-300 text-[11px] uppercase tracking-wide">LLM Agent Workspace</span>
        </div>
        <div className="text-[9px] text-purple-400/80 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-bold">
          Vector Match
        </div>
      </div>

      {/* Embedding Neural Cluster & Console */}
      <div className="flex-1 grid grid-cols-12 bg-[#090514] h-[180px] md:h-[220px] overflow-hidden">
        {/* Terminal Text Console */}
        <div className="col-span-6 p-3 flex flex-col gap-1.5 border-r border-white/5 text-left">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Terminal size={10} />
            <span>query_node.py</span>
          </div>
          <div className="text-gray-400 text-[10px] leading-tight select-none">
            <span className="text-purple-400">&gt;&gt;</span> model.retrieve(
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;top_k=3,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;metric=&quot;cosine&quot;
            <br />
            )
          </div>
          
          {/* Active Token Stream */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {tokens.map((token, tIdx) => (
              <motion.span
                key={tIdx}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-purple-500/10 border border-purple-500/30 px-1.5 py-0.5 rounded text-[8px] text-purple-300 font-mono shadow-[0_0_10px_rgba(167,139,250,0.1)]"
              >
                {token}
              </motion.span>
            ))}
            {tokens.length < generatedText.length && (
              <span className="w-1.5 h-3 bg-purple-400 animate-pulse inline-block align-middle ml-0.5" />
            )}
          </div>
        </div>

        {/* Neural Vector Cluster (3D Similarity Representation) */}
        <div className="col-span-6 flex items-center justify-center p-3 relative bg-black/30 overflow-hidden">
          {/* Glowing Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-purple-500/10 blur-xl pointer-events-none" />

          {/* SVG Vector Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 120 120">
            {/* Center query point */}
            <circle cx="60" cy="60" r="3" fill="#a78bfa" className="shadow-[0_0_10px_#a78bfa]" />
            <circle cx="60" cy="60" r="6" fill="#a78bfa" opacity="0.3" className="animate-ping" />

            {/* Vector lines to similarity clusters */}
            <line x1="60" y1="60" x2="30" y2="35" stroke="rgba(167, 139, 250, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="60" y1="60" x2="90" y2="40" stroke="rgba(167, 139, 250, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="60" y1="60" x2="70" y2="90" stroke="rgba(167, 139, 250, 0.2)" strokeWidth="1" />

            {/* Cluster node particles */}
            <motion.circle
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              cx="30" cy="35" r="4.5" fill="#c084fc"
            />
            <motion.circle
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              cx="90" cy="40" r="3.5" fill="#c084fc"
            />
            <circle cx="70" cy="90" r="2.5" fill="#8b5cf6" opacity="0.6" />

            {/* Labels floating */}
            <text x="18" y="24" fill="#a78bfa" fontSize="6px" className="font-semibold">0.96 Match</text>
            <text x="82" y="29" fill="#a78bfa" fontSize="6px" className="font-semibold">0.89 Match</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. CHATBOT INTEGRATION WIDGET
// ==========================================
export function ChatbotWidget() {
  const [chatCycle, setChatCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setChatCycle((prev) => (prev + 1) % 3);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex flex-col font-sans text-xs relative">
      {/* Bot Chat Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <MessageSquare size={13} className="text-cyan-400" />
          <span className="font-semibold text-gray-300 text-[11px] uppercase tracking-wide">WhatsApp AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-400">Agent Online</span>
        </div>
      </div>

      {/* Simulated Chat Dialogue Screen */}
      <div className="flex-1 p-3 bg-[#05060b] flex flex-col justify-end gap-2.5 h-[180px] md:h-[220px]">
        {/* Chat History stack */}
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[160px] pb-1">
          
          {/* User Message */}
          <div className="flex gap-2 items-start justify-end">
            <div className="bg-[#1b253b] border border-cyan-500/20 text-cyan-100 rounded-2xl rounded-tr-sm px-2.5 py-1.5 text-[9px] text-right max-w-[80%] font-medium">
              Integrate AI on our landing page.
            </div>
            <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-[7px] font-bold text-cyan-300 shrink-0">
              USR
            </div>
          </div>

          {/* Chatbot Responses base on Cycle */}
          <AnimatePresence mode="wait">
            {chatCycle >= 0 && (
              <motion.div
                key={`bot-typing-${chatCycle}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-2 items-start"
              >
                <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Bot size={10} className="text-purple-400" />
                </div>
                
                {chatCycle === 0 ? (
                  /* Loading typing dots */
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-2.5 py-2.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                ) : chatCycle === 1 ? (
                  /* Answer part 1 */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/[0.03] border border-white/10 text-gray-300 rounded-2xl rounded-tl-sm px-2.5 py-1.5 text-[9px] text-left max-w-[80%] leading-relaxed"
                  >
                    Sure! I can deploy a floating widget that captures queries and handles leads via n8n.
                  </motion.div>
                ) : (
                  /* Answer part 2 */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/[0.03] border border-purple-500/20 text-purple-200 rounded-2xl rounded-tl-sm px-2.5 py-1.5 text-[9px] text-left max-w-[80%] leading-relaxed"
                  >
                    Webhook linked successfully. Test chat is live across WhatsApp & Slack. 🚀
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Channels Integrations visual float */}
        <div className="flex gap-1.5 self-start text-[8px] text-gray-500 bg-white/[0.02] border border-white/5 rounded-full px-2 py-0.5 mt-1">
          <span>Channels:</span>
          <span className="text-cyan-400">Web</span> • 
          <span className="text-emerald-400">WhatsApp</span> • 
          <span className="text-purple-400">Slack</span>
        </div>
      </div>
    </div>
  );
}
