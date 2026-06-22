"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Code2,
  Globe,
  MessageSquare,
  Sparkles,
  Workflow,
  Menu,
  X,
  Mail,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NeuralBackground = dynamic(() => import("../components/NeuralBackground"), { ssr: false });
const AutomationPipeline = dynamic(() => import("../components/AutomationPipeline"), { ssr: false });
const CRMDashboard = dynamic(() => import("../components/CRMDashboard"), { ssr: false });
const AIAssistantWidget = dynamic(() => import("../components/AIAssistantWidget"), { ssr: false });

const services = [
  {
    id: "web-dev",
    slug: "web-development",
    title: "Web Development",
    desc: "Modern, high-performance websites and web applications engineered for speed, responsiveness, and seamless user experiences.",
    icon: Globe,
  },
  {
    id: "custom-software",
    slug: "custom-software-development",
    title: "Custom Software",
    desc: "Bespoke digital platforms, tailored CRM/ERP systems, and custom databases designed to fit your unique business workflows.",
    icon: Code2,
  },
  {
    id: "chatbot-integration",
    slug: "crm-development", // linked custom CRM development
    title: "CRM & Chatbot Integration",
    desc: "Intelligent conversational agents and custom sales CRM software development integrated across your business workflows.",
    icon: MessageSquare,
  },
  {
    id: "ai-automation",
    slug: "n8n-automation", // expert n8n automation
    title: "AI Integration through n8n",
    desc: "Connect and automate your entire software stack with advanced multi-step workflows powered by n8n orchestrations.",
    icon: Workflow,
  },
  {
    id: "ai-development",
    slug: "ai-automation", // bespoke AI automation
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

const TEAM = [
  {
    id: 1,
    name: "Shrinivas Nadager",
    position: "Founder & CEO",
    tagline: "Translating customer visions into enterprise-grade digital systems.",
    skills: ["Software Architecture", "Product Strategy", "AI Expert"],
    linkedin: "www.linkedin.com/in/shrinivas-nadager",
    email: "shrinivasnadager03@gmail.com",
    status: "ONLINE",
    statusColor: "bg-emerald-400",
    imageUrl: "/picsgn.png",
    badgeId: "CM-CEO-001",
  },
  {
    id: 2,
    name: "Syed Danish",
    position: "CTO | full stack engineer",
    tagline: "Transforming ideas into high-performance systems.",
    skills: ["Next.js", "FastAPI", "PostgreSQL", "Flask", "AWS"],
    linkedin: "https://www.linkedin.com/in/syed-danish-354259251",
    email: "syeddanish1092@gmail.com",
    status: "CODING",
    statusColor: "bg-cyan-400",
    imageUrl: "/danish.jpeg",
    badgeId: "CM-DEV-042",
  },
  {
    id: 3,
    name: "Narasareddy",
    position: "Frontend Lead and AI Expert",
    tagline: "Crafting Realistic Design and Machines.",
    skills: ["Python", "Machine Learning", "React", "Tailwind CSS"],
    linkedin: "https://linkedin.com",
    email: "narasareddy8296@gmail.com",
    status: "ONLINE",
    statusColor: "bg-emerald-400",
    imageUrl: "/nara.png",
    badgeId: "CM-AI-018",
  },
  {
    id: 4,
    name: "Ramchandra",
    position: "Principal UI/UX Designer & Full Stack Developer",
    tagline: "Structuring visual storytelling, design tokens, and memorable interactions.",
    skills: ["Figma", "Design Systems", "Interactive Design", "Java", "SpringBoot"],
    linkedin: "https://www.linkedin.com/in/ramchandra-18-/",
    email: "rajalasangi@gmail.com",
    status: "IN MEETING",
    statusColor: "bg-purple-400",
    imageUrl: "/ram.jpg",
    badgeId: "CM-DSN-009",
  },
  {
    id: 5,
    name: "Basawaraja Gurikar",
    position: "DevOps Engineer & Security Expert",
    tagline: "Maintaining reliable servers, CI/CD pipes, and dockerized microservices.",
    skills: ["Docker & Kubernetes", "AWS Cloud", "Redis Caching", "OWASP 10", "BrupSuite"],
    linkedin: "https://www.linkedin.com/in/basavaraj-h-gurikar-95b739284/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BKlR8OkpcSU%2BMlxrHwwasLQ%3D%3D",
    email: "basavarajagurikar2004@gmail.com",
    status: "CODING",
    statusColor: "bg-cyan-400",
    imageUrl: "/basawa.jpg",
    badgeId: "CM-OPS-031",
  },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link href="/" className="text-2xl font-bold tracking-wide flex items-center gap-2 group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-cyan-400 transition duration-300">
              Codemates
            </span>
            <span className="text-cyan-400 tracking-tight font-extrabold group-hover:text-white transition duration-300">
              India
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/" className="hover:text-white transition duration-200">Home</Link>
            <Link href="/services" className="hover:text-white transition duration-200">Services</Link>
            <Link href="/projects" className="hover:text-white transition duration-200">Projects</Link>
            <Link href="/about" className="hover:text-white transition duration-200">About</Link>
            <Link href="/blog" className="hover:text-white transition duration-200">Blog</Link>
            <Link href="/careers" className="hover:text-white transition duration-200">Careers</Link>
            <Link href="/estimate" className="hover:text-white transition duration-200">Estimate</Link>
            <Link href="/contact" className="hover:text-white transition duration-200">Contact</Link>
          </div>

          <Link href="/estimate" className="hidden md:inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            Book Call
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
              className="md:hidden border-b border-white/5 bg-[#060816]/95 backdrop-blur-2xl overflow-hidden"
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
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-center py-3.5 rounded-xl transition shadow-[0_0_15px_rgba(6,182,212,0.25)] block"
                >
                  Book Call
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              Leading Software Development Company
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                & AI Automation Agency
              </span>
            </h1>

            <p className="mt-8 text-gray-400 text-lg leading-relaxed max-w-xl">
              Codemates is a premium custom software development company and website development company. We help enterprise brands and fast-growing agencies scale by engineering bespoke CRM development systems and intelligent multi-step n8n automation services.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link href="/estimate" className="bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition duration-300 px-8 py-4.5 rounded-2xl font-bold flex items-center gap-3 group text-black cursor-pointer text-sm">
                Get Custom Software Quote
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>

              <Link href="/projects" className="border border-white/10 bg-white/5 hover:bg-white/10 text-white transition duration-300 px-8 py-4.5 rounded-2xl font-bold text-sm">
                View Projects
              </Link>
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
              Enterprise Software Development
              <br />
              & Digital Transformation
            </h2>

            <p className="text-gray-400 mt-6 text-lg">
              As a full-service website development company and AI automation company, we engineer custom ERP software, business automation services, and scalable web solutions that help businesses grow faster.
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

                  <Link href={`/services/${service.slug}`} className="mt-8 text-cyan-400 flex items-center gap-2 font-medium hover:text-cyan-300 transition-colors">
                    Learn More
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
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

      {/* TEAM MEMBER CAROUSEL */}
      <section className="py-24 bg-[#03040c] relative overflow-hidden z-10 w-full border-t border-white/5">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes infiniteScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infiniteScroll 35s linear infinite;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs font-mono">
            THE ARCHITECTS
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
            Meet The Engineers
          </h2>
          <p className="text-gray-400 mt-4 text-sm md:text-base max-w-2xl mx-auto">
            The core builders of Codemates India. Hover over any badge to inspect credentials, tech skills datasets, and live status.
          </p>
        </div>

        {/* Infinite Carousel Wrapper */}
        <div className="relative w-full overflow-hidden flex py-4 select-none">
          {/* Left/Right fading edge masks for high-end cinematic gradient */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#03040c] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#03040c] to-transparent z-20 pointer-events-none" />

          {/* Scrolling track: duplicated 2 times for seamless infinite loops */}
          <div className="flex gap-6 animate-infinite-scroll min-w-max px-3">
            {[...TEAM, ...TEAM].map((member, i) => (
              <div
                key={`${member.id}-${i}`}
                className="w-[260px] border border-white/10 rounded-[30px] p-6 bg-gradient-to-b from-white/5 to-white/0 relative hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group"
              >
                {/* Glass Badge Chip look */}
                <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />

                {/* Badge Header Info */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[7.5px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
                      {member.badgeId}
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 text-[6.5px] font-bold text-gray-300 border border-white/5">
                      <span className={`w-1.2 h-1.2 rounded-full ${member.statusColor} animate-pulse`} />
                      {member.status}
                    </div>
                  </div>

                  {/* Profile Graphic / Seed Avatar */}
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-5 relative overflow-hidden bg-[#060816] mx-auto transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] group-hover:border-cyan-400">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-lg font-bold uppercase text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black text-center text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <span className="text-[9px] font-mono font-bold text-center text-gray-500 uppercase tracking-wider mb-3 block">
                    {member.position}
                  </span>

                  <p className="text-gray-400 text-[11px] text-center leading-relaxed font-medium mb-5 min-h-[50px]">
                    "{member.tagline}"
                  </p>
                </div>

                {/* Footer and dynamic Hover skills list */}
                <div className="flex flex-col gap-3.5 border-t border-white/5 pt-4">
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
                      <Mail size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              and automate workflows with Codemates. Let's discuss your custom software quote.
            </p>

            <Link href="/contact" className="mt-10 bg-cyan-500 hover:bg-cyan-400 text-black inline-block shadow-[0_0_20px_rgba(6,182,212,0.3)] transition px-8 py-4.5 rounded-2xl font-semibold text-lg relative z-10 cursor-pointer">
              Book AI Automation Consultation
            </Link>
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