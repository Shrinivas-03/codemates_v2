"use client";

import { motion as m } from "framer-motion";
import {
  TrendingUp,
  Users,
  Activity,
  ArrowUpRight,
  Shield,
  Layers,
} from "lucide-react";

export default function CRMDashboard() {
  return (
    <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      {/* Background glow overlay */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500/10 blur-[80px] pointer-events-none transition group-hover:bg-blue-500/15" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 blur-[80px] pointer-events-none transition group-hover:bg-purple-500/15" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
            Codemates Hub
          </span>
          <h4 className="text-xl font-bold text-white mt-0.5">Enterprise CRM</h4>
        </div>
        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <Layers className="text-blue-400" size={16} />
        </div>
      </div>

      {/* Grid of micro-stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <m.div
          whileHover={{ y: -3 }}
          className="bg-[#0b1120]/60 border border-white/5 rounded-2xl p-4 flex flex-col relative"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <Users size={16} className="text-cyan-400" />
            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5">
              +28% <ArrowUpRight size={8} />
            </span>
          </div>
          <span className="text-2xl font-bold text-white">4,812</span>
          <span className="text-[10px] text-gray-400 mt-1">Total Leads Ingested</span>
        </m.div>

        <m.div
          whileHover={{ y: -3 }}
          className="bg-[#0b1120]/60 border border-white/5 rounded-2xl p-4 flex flex-col relative"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <TrendingUp size={16} className="text-purple-400" />
            <span className="text-[10px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5">
              99.2%
            </span>
          </div>
          <span className="text-2xl font-bold text-white">41.8k</span>
          <span className="text-[10px] text-gray-400 mt-1">Tasks Completed</span>
        </m.div>
      </div>

      {/* SVG Chart Preview */}
      <div className="bg-[#0b1120]/40 border border-white/5 rounded-2xl p-4 mb-6 relative">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
            <Activity size={12} className="text-emerald-400" /> System Velocity
          </span>
          <span className="text-[10px] text-gray-400 font-medium">Live Feed</span>
        </div>

        {/* Dynamic Line Chart */}
        <div className="h-24 w-full relative">
          <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
            {/* Chart Grid Lines */}
            <line x1="0" y1="25" x2="300" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="75" x2="300" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

            {/* Glowing Gradient under the curve */}
            <defs>
              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Area Path */}
            <path
              d="M 0 80 Q 50 30, 100 65 T 200 20 T 300 45 L 300 100 L 0 100 Z"
              fill="url(#chart-glow)"
            />

            {/* Line Path */}
            <m.path
              d="M 0 80 Q 50 30, 100 65 T 200 20 T 300 45"
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Line Gradient */}
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            {/* Floating Point Indicators */}
            <circle cx="200" cy="20" r="3.5" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" className="animate-ping origin-center" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            <circle cx="200" cy="20" r="3" fill="#8b5cf6" stroke="#fff" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold uppercase tracking-wider px-1">
          <span>Deployment logs</span>
          <span className="flex items-center gap-1"><Shield size={10} className="text-cyan-400" /> SECURE</span>
        </div>

        <div className="flex items-center gap-3 bg-[#080d19]/40 border border-white/5 rounded-xl p-2.5 hover:bg-[#080d19]/60 transition">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
          <span className="text-[11px] text-gray-300 font-mono leading-none truncate">
            web-server-prod-v12.deploy.success
          </span>
          <span className="text-[9px] text-gray-500 font-mono ml-auto">0.4ms</span>
        </div>

        <div className="flex items-center gap-3 bg-[#080d19]/40 border border-white/5 rounded-xl p-2.5 hover:bg-[#080d19]/60 transition">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shrink-0" />
          <span className="text-[11px] text-gray-300 font-mono leading-none truncate">
            n8n-webhook-trigger.received_payload
          </span>
          <span className="text-[9px] text-gray-500 font-mono ml-auto">12ms</span>
        </div>
      </div>
    </div>
  );
}
