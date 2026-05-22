"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Bot,
  Database,
  MessageSquare,
  Workflow,
  Sparkles,
  Zap,
} from "lucide-react";

export default function AutomationPipeline() {
  return (
    <div className="relative w-full max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-[32px] p-6 lg:p-8 backdrop-blur-xl shadow-2xl overflow-hidden group">
      {/* Glow Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none transition group-hover:bg-cyan-500/20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none transition group-hover:bg-blue-500/20" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Workflow className="text-cyan-400" size={20} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">n8n AI Orchestration</h4>
            <p className="text-xs text-gray-400">Real-time automation engine</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Active
        </div>
      </div>

      {/* Pipeline Diagram */}
      <div className="relative grid grid-cols-4 gap-4 items-center min-h-[220px]">
        {/* SVG Cable Lines Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Cable 1: Top Trigger -> n8n */}
          <path
            d="M 120 70 Q 160 70, 180 110"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />
          {/* Cable 2: Bottom Trigger -> n8n */}
          <path
            d="M 120 150 Q 160 150, 180 110"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />
          {/* Cable 3: n8n -> AI Agent */}
          <path
            d="M 270 110 L 330 110"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />
          {/* Cable 4: AI Agent -> Top Action */}
          <path
            d="M 420 110 Q 440 60, 480 60"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />
          {/* Cable 5: AI Agent -> Center Action */}
          <path
            d="M 420 110 L 480 110"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />
          {/* Cable 6: AI Agent -> Bottom Action */}
          <path
            d="M 420 110 Q 440 160, 480 160"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="2"
          />

          {/* Animated Glowing Pulses */}
          <path
            d="M 120 70 Q 160 70, 180 110"
            fill="none"
            stroke="url(#gradient-cyan)"
            strokeWidth="2"
            strokeDasharray="20 180"
            className="animate-[dash_3s_linear_infinite]"
          />
          <path
            d="M 120 150 Q 160 150, 180 110"
            fill="none"
            stroke="url(#gradient-blue)"
            strokeWidth="2"
            strokeDasharray="20 180"
            className="animate-[dash_3.5s_linear_infinite_reverse]"
          />
          <path
            d="M 270 110 L 330 110"
            fill="none"
            stroke="url(#gradient-purple)"
            strokeWidth="2.5"
            strokeDasharray="15 80"
            className="animate-[dash_2s_linear_infinite]"
          />
          <path
            d="M 420 110 Q 440 60, 480 60"
            fill="none"
            stroke="url(#gradient-cyan)"
            strokeWidth="2"
            strokeDasharray="10 90"
            className="animate-[dash_2.5s_linear_infinite]"
          />
          <path
            d="M 420 110 L 480 110"
            fill="none"
            stroke="url(#gradient-purple)"
            strokeWidth="2"
            strokeDasharray="10 90"
            className="animate-[dash_1.8s_linear_infinite]"
          />
          <path
            d="M 420 110 Q 440 160, 480 160"
            fill="none"
            stroke="url(#gradient-blue)"
            strokeWidth="2"
            strokeDasharray="10 90"
            className="animate-[dash_3s_linear_infinite]"
          />

          {/* Define gradients for the paths */}
          <defs>
            <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <style jsx global>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -200;
            }
          }
        `}</style>

        {/* Column 1: Triggers */}
        <div className="flex flex-col gap-8 z-10 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#0b1120] border border-white/10 rounded-2xl p-3 flex items-center gap-3 shadow-lg w-[110px]"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Globe className="text-cyan-400" size={16} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Trigger</p>
              <p className="text-xs font-semibold text-white">Webhook</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#0b1120] border border-white/10 rounded-2xl p-3 flex items-center gap-3 shadow-lg w-[110px]"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <MessageSquare className="text-blue-400" size={16} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Trigger</p>
              <p className="text-xs font-semibold text-white">WhatsApp</p>
            </div>
          </motion.div>
        </div>

        {/* Column 2: Orchestration Node */}
        <div className="flex justify-center z-10">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="relative w-20 h-20 rounded-3xl bg-[#090d1a] border-2 border-cyan-500/30 flex items-center justify-center shadow-xl group/node"
          >
            <div className="absolute inset-0 rounded-3xl bg-cyan-500/10 blur-[10px] opacity-60 animate-pulse" />
            <Workflow className="text-cyan-400 relative z-10" size={32} />
            <div className="absolute -bottom-6 text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
              n8n Router
            </div>
          </motion.div>
        </div>

        {/* Column 3: AI Cognitive Engine */}
        <div className="flex justify-center z-10">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="relative w-20 h-20 rounded-3xl bg-[#090d1a] border-2 border-purple-500/30 flex items-center justify-center shadow-xl group/node"
          >
            <div className="absolute inset-0 rounded-3xl bg-purple-500/10 blur-[10px] opacity-60 animate-pulse" />
            <Bot className="text-purple-400 relative z-10" size={32} />
            <Sparkles className="text-cyan-400 absolute top-1 right-1" size={14} />
            <div className="absolute -bottom-6 text-[10px] text-purple-300 font-semibold tracking-wider uppercase">
              AI Agent
            </div>
          </motion.div>
        </div>

        {/* Column 4: Integrations */}
        <div className="flex flex-col gap-4 z-10 items-end justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#0b1120] border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5 shadow-lg w-[110px]"
          >
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Database className="text-purple-400" size={14} />
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Sync</p>
              <p className="text-[11px] font-semibold text-white">CRM Database</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#0b1120] border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5 shadow-lg w-[110px]"
          >
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Zap className="text-cyan-400" size={14} />
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Notify</p>
              <p className="text-[11px] font-semibold text-white">n8n Engine</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#0b1120] border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5 shadow-lg w-[110px]"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <MessageSquare className="text-blue-400" size={14} />
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Alert</p>
              <p className="text-[11px] font-semibold text-white">Slack/WhatsApp</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
