"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Code2,
  Globe,
  MessageSquare,
  Sparkles,
  Workflow,
} from "lucide-react";
import NeuralBackground from "../components/NeuralBackground";
import AutomationPipeline from "../components/AutomationPipeline";
import CRMDashboard from "../components/CRMDashboard";
import AIAssistantWidget from "../components/AIAssistantWidget";

const services = [
  {
    title: "Web Development",
    desc: "Modern, high-performance websites and web applications engineered for speed, responsiveness, and seamless user experiences.",
    icon: Globe,
  },
  {
    title: "Custom Software",
    desc: "Bespoke digital platforms, tailored CRM/ERP systems, and custom databases designed to fit your unique business workflows.",
    icon: Code2,
  },
  {
    title: "Chatbot Integration",
    desc: "Intelligent conversational agents and AI voicebots integrated across WhatsApp, websites, and social media platforms.",
    icon: MessageSquare,
  },
  {
    title: "AI Integration through n8n",
    desc: "Connect and automate your entire software stack with advanced multi-step workflows powered by n8n orchestrations.",
    icon: Workflow,
  },
  {
    title: "Bespoke AI Works",
    desc: "Custom LLMs, prompt engineering, semantic search, AI-agents, and automated solutions custom-tailored for your agency needs.",
    icon: Sparkles,
  },
];

const stats = [
  { value: "20+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
  { value: "100%", label: "Secure Systems" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;

export default function Home() {
  return (
    <main className="bg-[#060816] text-white overflow-hidden relative">
      {/* HTML5 Canvas Neural Background */}
      <NeuralBackground />

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b border-white/10 bg-[#060816]/70"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">
            Codemates<span className="text-cyan-400"> India</span>
          </h1>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#">Services</a>
            <a href="#">Projects</a>
            <a href="#">Automation</a>
            <a href="#">Pricing</a>
            <a href="#">Contact</a>
          </div>

          <button className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-2 rounded-full text-sm font-semibold">
            Book Call
          </button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-32 overflow-hidden bg-[#03040b]">

        {/* Premium Masked Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "45px 45px",
            maskImage: "radial-gradient(circle at center, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />

        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md px-4 py-2 rounded-full text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-8 self-start shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Sparkles size={12} className="animate-pulse" />
              Next-Gen Software & Automation Agency
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              Build the Future
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                with AI Automation
              </span>
            </h1>

            <p className="mt-8 text-gray-400 text-lg leading-relaxed max-w-xl">
              We help enterprise brands and fast-growing agencies scale by engineering high-performance custom websites, bespoke software systems, and intelligent multi-step n8n automation pipelines.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <button className="bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition duration-300 px-8 py-4.5 rounded-2xl font-bold flex items-center gap-3 group text-black cursor-pointer text-sm">
                Get Started
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </button>

              <button className="border border-white/10 bg-white/5 hover:bg-white/10 transition duration-300 px-8 py-4.5 rounded-2xl font-bold text-sm cursor-pointer">
                View Projects
              </button>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Custom Software</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> n8n Automation</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Chatbots & AI</span>
            </div>
          </motion.div>

          {/* RIGHT SIDE GRAPHICS */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[480px] w-full mt-12 lg:mt-0">
            {/* Center-Stage: The Core n8n Orchestrator pipeline flow */}
            <div className="relative z-10 w-full max-w-xl transform scale-[0.95] md:scale-100">
              <AutomationPipeline />
            </div>

            {/* Overlapping top-right widget: CRM Dashboard analytics */}
            <motion.div
              initial={{ x: 40, y: -20, opacity: 0 }}
              animate={{ x: 25, y: -50, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -top-16 -right-6 z-20 hidden md:block scale-[0.82] origin-bottom-left"
            >
              <CRMDashboard />
            </motion.div>

            {/* Overlapping bottom-left widget: AI Copilot CLI */}
            <motion.div
              initial={{ x: -40, y: 20, opacity: 0 }}
              animate={{ x: -30, y: 70, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-20 -left-6 z-20 hidden md:block scale-[0.88] origin-top-right"
            >
              <AIAssistantWidget />
            </motion.div>
          </div>
        </div>

        {/* Curved pathway from Hero to Stats */}
        <div className="absolute -bottom-32 left-0 w-full h-64 pointer-events-none z-20 overflow-visible hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 1440 256" fill="none" preserveAspectRatio="none">
            <path
              id="hero-to-stats-path"
              d="M 1150 -10 Q 1150 160, 720 128 T 290 266"
              stroke="rgba(6, 182, 212, 0.18)"
              strokeWidth="3"
              strokeDasharray="10 10"
              strokeLinecap="round"
            />
            <circle r="4.5" fill="#22d3ee" className="shadow-[0_0_12px_#22d3ee]">
              <animateMotion dur="7s" repeatCount="indefinite">
                <mpath href="#hero-to-stats-path" />
              </animateMotion>
            </circle>
            <circle r="9" fill="#22d3ee" opacity="0.3" className="animate-ping">
              <animateMotion dur="7s" repeatCount="indefinite">
                <mpath href="#hero-to-stats-path" />
              </animateMotion>
            </circle>
          </svg>
        </div>
      </section>

      {/* STATS */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-20 border-y border-white/5 bg-[#080b18] relative overflow-visible"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="text-center"
            >
              <h2 className="text-5xl font-bold text-cyan-400">
                {item.value}
              </h2>
              <p className="text-gray-400 mt-3">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Curved pathway from Stats to Services */}
        <div className="absolute -bottom-36 left-0 w-full h-72 pointer-events-none z-20 overflow-visible hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 1440 288" fill="none" preserveAspectRatio="none">
            <path
              id="stats-to-services-path"
              d="M 290 -10 Q 290 180, 720 144 T 1150 298"
              stroke="rgba(139, 92, 246, 0.18)"
              strokeWidth="3"
              strokeDasharray="10 10"
              strokeLinecap="round"
            />
            <circle r="4.5" fill="#a78bfa" className="shadow-[0_0_12px_#a78bfa]">
              <animateMotion dur="8s" repeatCount="indefinite">
                <mpath href="#stats-to-services-path" />
              </animateMotion>
            </circle>
            <circle r="9" fill="#a78bfa" opacity="0.3" className="animate-ping">
              <animateMotion dur="8s" repeatCount="indefinite">
                <mpath href="#stats-to-services-path" />
              </animateMotion>
            </circle>
          </svg>
        </div>
      </motion.section>

      {/* SERVICES */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="py-28 relative overflow-visible"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={cardVariants} className="max-w-3xl">
            <p className="text-cyan-400 font-semibold uppercase tracking-widest">
              SERVICES
            </p>

            <h2 className="text-5xl font-bold mt-4 leading-tight">
              Digital Solutions Built
              <br />
              for Modern Businesses
            </h2>

            <p className="text-gray-400 mt-6 text-lg">
              From websites to AI automation and scalable software systems, we
              build technology that helps businesses grow faster.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {services.map((service, i) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  className="group bg-white/5 border border-white/10 rounded-[30px] p-8 hover:border-cyan-500/40 transition overflow-hidden relative"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-b from-cyan-500/10 to-transparent" />

                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                    <Icon className="text-cyan-400" size={28} />
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {service.desc}
                  </p>

                  <button className="mt-8 text-cyan-400 flex items-center gap-2 font-medium">
                    Learn More
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Curved pathway from Services to CTA */}
        <div className="absolute -bottom-36 left-0 w-full h-72 pointer-events-none z-20 overflow-visible hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 1440 288" fill="none" preserveAspectRatio="none">
            <path
              id="services-to-cta-path"
              d="M 1150 -10 Q 1150 180, 930 144 T 720 298"
              stroke="rgba(6, 182, 212, 0.18)"
              strokeWidth="3"
              strokeDasharray="10 10"
              strokeLinecap="round"
            />
            <circle r="4.5" fill="#22d3ee" className="shadow-[0_0_12px_#22d3ee]">
              <animateMotion dur="7.5s" repeatCount="indefinite">
                <mpath href="#services-to-cta-path" />
              </animateMotion>
            </circle>
            <circle r="9" fill="#22d3ee" opacity="0.3" className="animate-ping">
              <animateMotion dur="7.5s" repeatCount="indefinite">
                <mpath href="#services-to-cta-path" />
              </animateMotion>
            </circle>
          </svg>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95, y: 35 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-28"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-16 text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.2),transparent_40%)]" />

            <h2 className="text-5xl font-bold leading-tight">
              Ready to Transform
              <br />
              Your Business?
            </h2>

            <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
              Build high-converting websites, custom software, intelligent chatbots,
              and automate workflows with Codemates.
            </p>

            <button className="mt-10 bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 rounded-2xl font-semibold text-lg">
              Book Free Consultation
            </button>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="border-t border-white/5 py-10 text-center text-gray-500"
      >
        <p>© 2026 Codemates. All rights reserved.</p>
      </motion.footer>
    </main>
  );
}