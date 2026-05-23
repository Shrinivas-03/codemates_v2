"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Code2,
  Database,
  Network,
  Brain,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Globe,
  Bot,
  Zap,
  Layers,
  Shield,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import RoadmapParticles from "../../components/RoadmapParticles";
import {
  WebDevWidget,
  CustomSoftwareWidget,
  AIAutomationWidget,
  AIDevWidget,
  ChatbotWidget,
} from "../../components/CardWidgets";

// Services Data with customized visual assets
const servicesData = [
  {
    id: "web-dev",
    title: "Web Development",
    shortDesc: "Next-Gen Performance & Immersive Design",
    desc: "We build modern, high-performance websites and rich web applications engineered for hyper-speed, seamless responsiveness, and advanced user experiences. From Vercel-optimized Next.js architectures to lightweight fluid layouts, we engineer for maximum conversion.",
    icon: Globe,
    color: "cyan",
    gradient: "from-cyan-400 via-blue-500 to-indigo-500",
    shadow: "shadow-cyan-500/10",
    glowColor: "rgba(34, 211, 238, 0.15)",
    badges: ["Next.js 16", "React 19", "Tailwind v4", "Framer Motion"],
    widget: <WebDevWidget />,
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    shortDesc: "Scalable Enterprise ERP & Cloud Database Hubs",
    desc: "Bespoke digital ecosystems, custom-tailored CRM dashboards, and cloud-native database solutions designed to eliminate manual bottlenecks. We map your agency's unique operating workflows into secure, enterprise-grade software that scales as you grow.",
    icon: Database,
    color: "purple",
    gradient: "from-purple-400 via-indigo-500 to-violet-500",
    shadow: "shadow-purple-500/10",
    glowColor: "rgba(167, 139, 250, 0.15)",
    badges: ["PostgreSQL", "Node.js", "REST APIs", "Prisma ORM"],
    widget: <CustomSoftwareWidget />,
  },
  {
    id: "ai-automation",
    title: "AI Automation (n8n)",
    shortDesc: "Zero-Overhead Orchestrated Workflows",
    desc: "Connect your software stack, email servers, CRM, and databases with advanced n8n orchestrations. We automate tedious administrative tasks, invoice generations, customer routing, and multi-step pipeline actions, freeing your team for high-value operations.",
    icon: Network,
    color: "cyan",
    gradient: "from-cyan-400 via-teal-500 to-emerald-500",
    shadow: "shadow-emerald-500/10",
    glowColor: "rgba(34, 211, 238, 0.15)",
    badges: ["n8n.io", "Active Workflows", "API Integrations", "Webhooks"],
    widget: <AIAutomationWidget />,
  },
  {
    id: "ai-development",
    title: "AI Development",
    shortDesc: "Custom Models, Semantic Search & Neural Agents",
    desc: "Inject cutting-edge cognitive intelligence directly into your systems. We build bespoke large language model pipelines, semantic vector search capabilities, custom prompt orchestrations, and intelligent autonomous agents that process operations with extreme speed.",
    icon: Brain,
    color: "purple",
    gradient: "from-purple-400 via-fuchsia-500 to-pink-500",
    shadow: "shadow-fuchsia-500/10",
    glowColor: "rgba(167, 139, 250, 0.15)",
    badges: ["GPT-4 / Claude 3.5", "Pinecone Vector", "RAG Systems", "AI Agents"],
    widget: <AIDevWidget />,
  },
  {
    id: "chatbot-integration",
    title: "Chatbot Integration",
    shortDesc: "24/7 Intelligent Omnichannel Support",
    desc: "Conversational voicebots and web assistants deployed seamlessly across WhatsApp, websites, Slack, and social channels. Programmed with semantic context memory, our chatbots resolve support tickets instantly and seamlessly hand over complex deals to human agents.",
    icon: MessageSquare,
    color: "cyan",
    gradient: "from-cyan-400 via-sky-500 to-blue-500",
    shadow: "shadow-blue-500/10",
    glowColor: "rgba(34, 211, 238, 0.15)",
    badges: ["WhatsApp API", "NLP Context", "Slack Bot Integration", "Omnichannel"],
    widget: <ChatbotWidget />,
  },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position for the vertical glowing pipeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth scroll progression using spring physics
  const pathLengthSpring = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 22,
    restDelta: 0.001,
  });

  // State to track hovering cards for dynamic radial glows
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

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
            <Link href="/#automation" className="hover:text-white transition duration-200">
              Automation
            </Link>
            <Link href="/#pricing" className="hover:text-white transition duration-200">
              Pricing
            </Link>
            <Link href="/#contact" className="hover:text-white transition duration-200">
              Contact
            </Link>
          </div>

          <button className="relative group overflow-hidden bg-cyan-500 hover:bg-cyan-400 transition-colors duration-300 px-5.5 py-2.5 rounded-full text-sm font-semibold text-black cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <span className="relative z-10">Book Strategy Call</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden flex flex-col justify-center items-center z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Sparkles Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md px-4.5 py-2 rounded-full text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-8 shadow-[0_0_20px_rgba(6,182,212,0.05)]"
          >
            <Sparkles size={11} className="animate-pulse text-cyan-400" />
            Capabilities & Roadmaps
          </motion.div>

          {/* Futuristic Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
          >
            Capabilities engineered
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              for digital domination.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Explore our service journey. Scroll down to see our glowing digital transformation roadmap, showcasing our advanced engineering and bespoke AI ecosystems.
          </motion.p>
        </div>

        {/* Dynamic bottom pulsing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.9, 0.3], y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-14 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            document.getElementById("services-timeline")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Scroll to Initiate Roadmap</span>
          <div className="w-5 h-8.5 rounded-full border border-white/20 flex justify-center p-1">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
        </motion.div>
      </section>

      {/* ROADMAP TIMELINE SECTION */}
      <section id="services-timeline" ref={containerRef} className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        
        {/* The Center Vertical Timeline Spine */}
        <div className="absolute left-[30px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[3px] pointer-events-none z-10">
          
          {/* Base Background Path (Unlit) */}
          <div className="w-full h-full bg-white/[0.04] rounded-full absolute inset-0" />
          
          {/* Active Lit Path (Linked to scroll position) */}
          <svg className="w-[3px] h-full absolute inset-0 overflow-visible" preserveAspectRatio="none">
            <motion.line
              x1="1.5"
              y1="0"
              x2="1.5"
              y2="100%"
              stroke="url(#lit-gradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{ pathLength: pathLengthSpring }}
            />
            
            {/* Liquid Glow Linear Gradient Definitions */}
            <defs>
              <linearGradient id="lit-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* RENDER DYNAMIC SERVICE JOURNEY ROWS */}
        <div className="flex flex-col gap-28 md:gap-36 relative">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            const isLeft = index % 2 === 0;

            return (
              <ServiceRow
                key={service.id}
                service={service}
                index={index}
                isLeft={isLeft}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                mousePosition={mousePosition}
                handleMouseMove={handleMouseMove}
              />
            );
          })}
        </div>
      </section>

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

// ==========================================
// SEPARATE DYNAMIC SERVICE ROW COMPONENT
// ==========================================
interface ServiceRowProps {
  service: typeof servicesData[0];
  index: number;
  isLeft: boolean;
  hoveredCard: number | null;
  setHoveredCard: (index: number | null) => void;
  mousePosition: { x: number; y: number };
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
}

function ServiceRow({
  service,
  index,
  isLeft,
  hoveredCard,
  setHoveredCard,
  mousePosition,
  handleMouseMove,
}: ServiceRowProps) {
  const Icon = service.icon;
  const rowRef = useRef<HTMLDivElement>(null);
  
  // Track viewport presence for specific active animations
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      ref={rowRef}
      onViewportEnter={() => setIsActive(true)}
      onViewportLeave={() => setIsActive(false)}
      viewport={{ once: false, amount: 0.35 }}
      className="grid grid-cols-12 items-center gap-0 relative"
    >
      
      {/* A. NODE COMPONENT (Positioned absolutely on mobile, centered grid on desktop) */}
      <div className="absolute left-[16px] md:left-auto md:col-start-6 md:col-span-2 flex justify-center items-center z-20 pointer-events-none">
        
        {/* Canvas particle generator around the active node */}
        <div className="w-[200px] h-[200px] absolute flex items-center justify-center pointer-events-none">
          <RoadmapParticles active={isActive} color={index % 2 === 0 ? "cyan" : "purple"} />
        </div>

        {/* Main Hexagonal Node Container */}
        <motion.div
          animate={{
            scale: isActive ? 1.25 : 1,
            borderColor: isActive
              ? service.color === "cyan"
                ? "rgba(34, 211, 238, 1)"
                : "rgba(167, 139, 250, 1)"
              : "rgba(255, 255, 255, 0.08)",
            boxShadow: isActive
              ? `0 0 30px ${service.glowColor}, inset 0 0 15px ${service.glowColor}`
              : "0 0 0px transparent",
          }}
          transition={{ duration: 0.5 }}
          className={`w-[32px] h-[32px] md:w-[42px] md:h-[42px] bg-[#020208] border-2 rounded-full flex items-center justify-center relative cursor-pointer`}
        >
          {/* Internal core active glowing dot */}
          <motion.div
            animate={{
              scale: isActive ? [1, 1.3, 1] : 1,
              opacity: isActive ? 1 : 0.4,
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full bg-gradient-to-r ${service.gradient}`}
          />

          {/* Ambient SVG laser shooter pointing laterally to the card */}
          {isActive && (
            <svg
              className={`absolute top-1/2 -translate-y-1/2 h-[2px] w-[50px] md:w-[100px] pointer-events-none hidden md:block overflow-visible`}
              style={{
                left: isLeft ? "auto" : "100%",
                right: isLeft ? "100%" : "auto",
              }}
            >
              <motion.line
                x1={isLeft ? "100%" : "0"}
                y1="1"
                x2={isLeft ? "0" : "100%"}
                y2="1"
                stroke={service.color === "cyan" ? "#22d3ee" : "#a78bfa"}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </svg>
          )}
        </motion.div>
      </div>

      {/* B. GLASSMORPHIC SERVICE CARD SECTION */}
      <div
        className={`col-span-12 pl-[56px] pr-2 md:pl-0 md:col-span-5 ${
          isLeft ? "md:col-start-1 text-left md:text-right" : "md:col-start-8 text-left"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`group relative rounded-[28px] border bg-[#060815]/40 backdrop-blur-3xl p-6 md:p-8 flex flex-col gap-6 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
            hoveredCard === index
              ? service.color === "cyan"
                ? "border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.1)]"
                : "border-purple-500/40 shadow-[0_0_40px_rgba(139,92,246,0.1)]"
              : "border-white/10"
          }`}
        >
          {/* Card Back-gradient Glow following cursor coordinates */}
          {hoveredCard === index && (
            <div
              className="absolute pointer-events-none rounded-full w-[250px] h-[250px] opacity-15 blur-[55px] transition-all duration-75"
              style={{
                background: `radial-gradient(circle, ${
                  service.color === "cyan" ? "#22d3ee" : "#a78bfa"
                } 0%, transparent 70%)`,
                left: `${mousePosition.x - 125}px`,
                top: `${mousePosition.y - 125}px`,
              }}
            />
          )}

          {/* Card Header Info */}
          <div className={`flex flex-col gap-3 ${isLeft ? "md:items-end" : "items-start"}`}>
            
            {/* Hexagonal Tech-Stack Icon Wrapper */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-[#0d1527] border ${
                isActive
                  ? service.color === "cyan"
                    ? "border-cyan-500/30 text-cyan-400"
                    : "border-purple-500/30 text-purple-400"
                  : "border-white/10 text-gray-500"
              }`}
            >
              <Icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
            </div>

            {/* Title / Mini Stats Title */}
            <div>
              <p
                className={`text-[10px] md:text-xs font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r ${service.gradient}`}
              >
                {service.shortDesc}
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1 group-hover:text-cyan-400 transition-colors duration-300">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Long Description Text */}
          <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
            {service.desc}
          </p>

          {/* Skill Technology Tags */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : "justify-start"}`}>
            {service.badges.map((badge, bIdx) => (
              <span
                key={bIdx}
                className="text-[9px] md:text-[10px] font-bold text-gray-400 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Embedded Custom high-end interactive tech widget */}
          <div className="w-full mt-2 relative z-20">
            {service.widget}
          </div>

          {/* Hover trigger - Connect with CTA */}
          <div
            className={`text-sm font-bold flex items-center gap-1.5 transition-colors duration-300 ${
              isActive
                ? service.color === "cyan"
                  ? "text-cyan-400"
                  : "text-purple-400"
                : "text-gray-500 group-hover:text-white"
            } ${isLeft ? "md:self-end" : "self-start"}`}
          >
            Initiate Service Flow
            <ArrowRight size={13} className="transition group-hover:translate-x-1" />
          </div>
        </motion.div>
      </div>

      {/* C. DECORATIVE OPPOSITE SIDE (desktop only, alternate empty grids or tech metrics) */}
      <div className={`hidden md:block col-span-5 ${isLeft ? "col-start-8 pl-8" : "col-start-1 pr-8"}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`flex flex-col gap-4 select-none ${isLeft ? "items-start" : "items-end"}`}
        >
          {/* Hologram abstract vector wireframe lines */}
          <div className="w-full max-w-[280px] h-[100px] border border-dashed border-white/10 rounded-2xl flex items-center justify-center p-4 relative">
            <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">System Telemetry</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse" />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 0 50 Q 25 15, 50 50 T 100 50"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}
