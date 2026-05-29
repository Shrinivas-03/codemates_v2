"use client";

import React, { useState } from "react";
// import WorkflowUniverse from "../../components/WorkflowUniverse";
import AIOSDashboard from "../../components/AIOSDashboard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="bg-[#020208] text-white min-h-screen overflow-hidden relative font-sans">
      {/* 1. FUTURISTIC BACKGROUND GRID & LIGHT NEBULAS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Obsidian Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Soft Radial Ambient Nebulas */}
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-500/5 blur-[160px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[55vw] h-[55vw] bg-purple-500/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[60vw] h-[60vw] bg-blue-500/5 blur-[200px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-[#020208]/75">
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
            <Link href="/services" className="text-white border-b border-cyan-400 pb-1">
              Services
            </Link>
            <Link href="/projects" className="hover:text-white transition duration-200">
              Projects
            </Link>
            <Link href="/about" className="hover:text-white transition duration-200">
              About
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
              className="md:hidden border-b border-white/5 bg-[#020208]/95 backdrop-blur-2xl overflow-hidden"
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
                  className="text-gray-300 hover:text-white transition"
                >
                  About
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
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-center py-3.5 rounded-xl transition shadow-[0_0_15px_rgba(6,182,212,0.25)] block animate-pulse"
                >
                  Book Strategy Call
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. THE AI OPERATING SYSTEM ENVIRONMENT */}
      <div id="aios-environment" className="relative z-10 pt-20">
        <AIOSDashboard />
      </div>

      {/* PREMIUM CTAS / CONVERTING BOTTOM CAROUSEL */}
      <section className="py-28 relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-2xl p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Back radial ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[120px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Ready to initiate
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              your custom digital transformation?
            </span>
          </h2>

          <p className="text-gray-400 text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Let&#39;s collaborate to design, build, and deploy premium web applications, tailormade software stacks, and automated n8n pipelines for your agency.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <button className="bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)] transition duration-300 px-8 py-4.5 rounded-2xl font-bold flex items-center gap-3 group text-black cursor-pointer text-sm">
              Initiate Project Roadmap
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </button>

            <Link
              href="/"
              className="border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition duration-300 px-8 py-4.5 rounded-2xl font-bold text-sm flex items-center gap-2"
            >
              Back to Home
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 text-center text-xs text-gray-500 bg-[#010105] relative z-10">
        <p className="tracking-wide">© 2026 Codemates India. All rights reserved. Premium engineering, built to last.</p>
      </footer>
    </main>
  );
}

