"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, CheckCircle2, ChevronRight, Play } from "lucide-react";

const steps = [
  { id: 1, text: "Ingesting WhatsApp PDF invoice...", status: "active" },
  { id: 2, text: "Extracting transaction & metadata fields...", status: "pending" },
  { id: 3, text: "Validating line items via custom AI agent...", status: "pending" },
  { id: 4, text: "Syncing values with ERP & CRM databases...", status: "pending" },
];

export default function AIAssistantWidget() {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeSteps, setActiveSteps] = useState(steps);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted) return;

    const timer = setTimeout(() => {
      if (currentStep < steps.length) {
        setActiveSteps((prev) =>
          prev.map((step, idx) => {
            if (idx === currentStep) return { ...step, status: "completed" };
            if (idx === currentStep + 1) return { ...step, status: "active" };
            return step;
          })
        );
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        // Reset after 4 seconds to loop the showcase
        const resetTimer = setTimeout(() => {
          setActiveSteps(steps);
          setCurrentStep(0);
          setIsCompleted(false);
        }, 4000);
        return () => clearTimeout(resetTimer);
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [currentStep, isCompleted]);

  return (
    <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      {/* Top border glowing gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      {/* Header bar */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-gray-400" />
          <span className="text-[11px] font-mono text-gray-400">codemates-copilot.sh</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-semibold text-cyan-400 font-mono">Running</span>
        </div>
      </div>

      {/* Search Input Simulation */}
      <div className="bg-[#080d19]/80 border border-white/5 rounded-xl p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChevronRight size={14} className="text-cyan-400 shrink-0" />
          <span className="text-xs font-mono text-white leading-none">
            process-invoice --source=whatsapp --ai-agent=extractor
          </span>
        </div>
        <Play size={10} className="text-cyan-400 fill-cyan-400/20" />
      </div>

      {/* AI Processing Steps */}
      <div className="flex flex-col gap-3 font-mono text-xs text-gray-300">
        {activeSteps.map((step, idx) => (
          <div
            key={step.id}
            className={`flex items-start gap-3 p-2 rounded-xl transition-all duration-300 ${
              step.status === "active"
                ? "bg-cyan-500/5 border border-cyan-500/10 text-cyan-200"
                : step.status === "completed"
                ? "text-gray-400"
                : "opacity-40"
            }`}
          >
            {step.status === "completed" ? (
              <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
            ) : step.status === "active" ? (
              <div className="relative shrink-0 mt-1">
                <span className="absolute inset-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <span className="block w-2 h-2 bg-cyan-400 rounded-full" />
              </div>
            ) : (
              <div className="w-2 h-2 bg-gray-600 rounded-full shrink-0 mt-1.5" />
            )}
            <span className="leading-tight text-[11px]">{step.text}</span>
          </div>
        ))}
      </div>

      {/* Complete Showcase Overlay */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 bg-[#060816]/95 flex flex-col items-center justify-center text-center p-6 rounded-[28px] z-20 border border-cyan-500/20"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
              <Sparkles className="text-cyan-400" size={26} />
            </div>
            <h5 className="text-sm font-bold text-white font-mono">Orchestration Complete</h5>
            <p className="text-[10px] text-cyan-400 font-mono mt-1">
              Data successfully synced with ERP • 0.8s
            </p>
            <div className="mt-4 px-3 py-1 bg-cyan-500/10 rounded-full text-[10px] text-cyan-300 font-mono font-semibold">
              ✔ 100% Accuracy
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
