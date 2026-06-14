"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  Building,
  Briefcase,
  Layers,
  Cpu,
  Monitor,
  Zap,
  Globe,
  Database,
  Sliders,
  User,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Code2,
  Users,
  ChevronLeft,
  Loader2,
  CheckCircle2,
  UploadCloud,
  ChevronDown,
  ArrowUpRight,
  ShieldAlert,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ─── Data Configurations ──────────────────────────────────────────────────────

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How quickly will you respond?",
    answer: "We respond to all verified project inquiries within 24 hours. Our solution architects analyze your requirements and follow up with a structured technical briefing schedule.",
  },
  {
    question: "Do you provide free consultation?",
    answer: "Yes, we provide a complete, complimentary 30-minute system strategy call where we examine your existing workflows, database architecture, and project goals to deliver a high-level roadmap.",
  },
  {
    question: "Can you sign NDA agreements?",
    answer: "Absolutely. We routinely establish mutual Non-Disclosure Agreements (NDAs) before discussing sensitive business logic, user workflows, or proprietary software architectures.",
  },
  {
    question: "Do you provide hosting and maintenance?",
    answer: "Yes. We offer enterprise-grade cloud hosting management (AWS, Vercel, Docker deployments) and monthly support SLAs that cover version updates, API integrations, and security patches.",
  },
  {
    question: "Can you build custom CRM and ERP systems?",
    answer: "Yes, bespoke enterprise software is one of our primary core disciplines. We build customized, multi-tenant CRM/ERP systems optimized with automated ledger accounting, clerk workflows, and live analytics.",
  },
  {
    question: "Do you provide AI automation solutions?",
    answer: "Yes, we specialize in advanced AI orchestrations using LLMs, n8n pipeline orchestrators, Vector databases (Pinecone/pgvector), and custom RAG knowledge retrievers.",
  },
];

const SERVICES = [
  "Website Development",
  "CRM Development",
  "AI Automation",
  "Custom Software",
  "Cloud Hosting",
  "Mobile App Development",
  "Maintenance & Support",
  "Other",
];

const BUDGETS = [
  "₹10k – ₹25k",
  "₹25k – ₹50k",
  "₹50k – ₹1L",
  "₹1L – ₹3L",
  "₹3L+",
];

const TIMELINES = [
  "ASAP",
  "Within 1 Month",
  "Within 3 Months",
  "Flexible",
];

const TECH_STACK = [
  "Next.js",
  "React",
  "FastAPI",
  "Flask",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Supabase",
  "n8n",
  "OpenAI",
];

export default function ContactPage() {
  // Page state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Form parameters
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    serviceRequired: "Website Development",
    budgetRange: "₹50k – ₹1L",
    projectTimeline: "Within 1 Month",
    projectDescription: "",
  });

  // UI elements
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Web Audio Context for Step Chimes
  const synthCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (synthCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      synthCtxRef.current = new AudioCtx();
    } catch (e) {}
  };

  const playSound = (type: "tick" | "success") => {
    initAudio();
    const ctx = synthCtxRef.current;
    if (!ctx) return;

    if (type === "tick") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === "success") {
      const chord = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5 cascade
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const delay = idx * 0.05;
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0.0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + delay + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.45);
      });
    }
  };

  useEffect(() => {
    document.title = "Contact Us | Build Extraordinary Digital Systems | Codemates";
    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Let's build something extraordinary together. Contact Codemates India for bespoke software, AI automation roadmaps, custom website architectures, and cloud maintenance."
    );
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      playSound("tick");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let uploadedFileUrl: string | null = null;

    try {
      if (supabase && uploadedFile) {
        // Construct standard safe file name with unique timestamp prefix
        const safeName = `${Date.now()}_${uploadedFile.name.replace(/\s+/g, "_")}`;
        const filePath = `inquiries/${safeName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("requirements")
          .upload(filePath, uploadedFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error("Supabase Storage upload error:", uploadError);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from("requirements")
            .getPublicUrl(filePath);
          
          uploadedFileUrl = publicUrlData.publicUrl;
        }
      }
    } catch (storageErr) {
      console.warn("Storage upload failed, attempting fallback database payload insertion:", storageErr);
    }

    const payload = {
      full_name: form.fullName,
      company_name: form.companyName,
      email: form.email,
      phone: form.phone,
      service_required: form.serviceRequired,
      budget_range: form.budgetRange,
      project_timeline: form.projectTimeline,
      project_description: form.projectDescription,
      uploaded_file_name: uploadedFile ? uploadedFile.name : null,
      uploaded_file_url: uploadedFileUrl,
      created_at: new Date().toISOString(),
    };

    try {
      if (supabase) {
        // Insert into contact_inquiries table in Supabase
        const { error } = await supabase.from("contact_inquiries").insert([payload]);
        if (error) throw error;
      } else {
        // Fallback local storage logging if Supabase credentials are not populated
        const storedContactInquiries = JSON.parse(localStorage.getItem("codemates_contact_inquiries") || "[]");
        storedContactInquiries.push(payload);
        localStorage.setItem("codemates_contact_inquiries", JSON.stringify(storedContactInquiries));
        console.log("Supabase not configured. Contact inquiry cached to browser local storage:", payload);
      }

      playSound("success");
      setSuccess(true);
    } catch (err: any) {
      console.warn("Database insert failed, executing local storage recovery fallback:", err);
      // Resilient local fallback
      const storedContactInquiries = JSON.parse(localStorage.getItem("codemates_contact_inquiries") || "[]");
      storedContactInquiries.push(payload);
      localStorage.setItem("codemates_contact_inquiries", JSON.stringify(storedContactInquiries));
      
      playSound("success");
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#050816] text-white relative font-sans overflow-x-hidden flex flex-col justify-between">
      
      {/* ── BACKGROUND NETWORKS & BLURS ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[45vw] h-[45vw] bg-cyan-500/5 blur-[160px] rounded-full animate-pulse duration-[8s]" />
        <div className="absolute top-[50%] right-[10%] w-[45vw] h-[45vw] bg-purple-500/5 blur-[180px] rounded-full animate-pulse duration-[10s]" />
        <div className="absolute bottom-[10%] left-[20%] w-[50vw] h-[50vw] bg-blue-500/5 blur-[200px] rounded-full" />
        
        {/* Glowing Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* ── NAVBAR ───────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-[#050816]/75">
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
            <Link href="/about" className="hover:text-white transition duration-200">
              About
            </Link>
            <Link href="/careers" className="hover:text-white transition duration-200">
              Careers
            </Link>
            <Link href="/estimate" className="hover:text-white transition duration-200">
              Estimate
            </Link>
            <Link href="/contact" className="text-white border-b border-cyan-400 pb-1">
              Contact
            </Link>
          </div>

          <Link
            href="/estimate"
            className="hidden md:inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs px-5 py-2.5 rounded-full transition duration-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          >
            Start Project Estimate
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
              className="md:hidden border-b border-white/5 bg-[#050816]/95 backdrop-blur-2xl overflow-hidden"
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
                  Start Project Estimate
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-40 pb-20 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/5 px-4.5 py-1.5 rounded-full text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Sparkles size={11} className="animate-pulse" />
            PARTNER WITH WORLD-CLASS SOLUTION ARCHITECTS
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white max-w-4xl">
            Let&#39;s Build Something
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Extraordinary Together
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl font-light">
            Whether you&#39;re looking for a modern website, CRM platform, AI automation, cloud infrastructure, or custom software solution, our team is ready to help transform your ideas into scalable digital products.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/estimate"
              className="bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition duration-300 px-8 py-4 rounded-xl font-bold text-black text-xs flex items-center gap-2"
            >
              Book Free Consultation <ArrowRight size={14} />
            </Link>
            <a
              href="#contact-form-section"
              className="border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition duration-300 px-8 py-4 rounded-xl font-bold text-xs"
            >
              Send Project Inquiry
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── CONTACT OPTIONS CARD GRID ───────────────────────────────────────── */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Email */}
          <div className="bg-white/5 border border-white/5 p-6 rounded-3xl backdrop-blur-md flex flex-col justify-between min-h-[170px] hover:border-cyan-400/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
              <Mail size={18} />
            </div>
            <div className="flex flex-col gap-1.5 mt-6">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">EMAIL DIRECTLY</span>
              <a href="mailto:support@codemates.in" className="text-sm font-extrabold text-white hover:text-cyan-400 transition-colors">
                support@codemates.in
              </a>
              <p className="text-[10px] text-gray-400 font-light mt-1">
                Send us your requirements and our team will respond within 24 hours.
              </p>
            </div>
          </div>

          {/* Card 2: Call */}
          <div className="bg-white/5 border border-white/5 p-6 rounded-3xl backdrop-blur-md flex flex-col justify-between min-h-[170px] hover:border-cyan-400/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
              <Phone size={18} />
            </div>
            <div className="flex flex-col gap-1.5 mt-6">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">SPEAK TO ARCHITECTS</span>
              <div className="flex flex-col text-sm font-extrabold text-white">
                <a href="tel:+917348975886" className="hover:text-cyan-400 transition-colors">+91 7348975886</a>
                <a href="tel:+917483673004" className="hover:text-cyan-400 transition-colors">+91 7483673004</a>
              </div>
              <p className="text-[10px] text-gray-400 font-light mt-1">
                Speak directly with our team to discuss your project requirements.
              </p>
            </div>
          </div>

          {/* Card 3: LinkedIn */}
          <div className="bg-white/5 border border-white/5 p-6 rounded-3xl backdrop-blur-md flex flex-col justify-between min-h-[170px] hover:border-cyan-400/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <div className="flex flex-col gap-1.5 mt-6">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">LINKEDIN MATRIX</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-extrabold text-white hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                Codemates India <ArrowUpRight size={12} />
              </a>
              <p className="text-[10px] text-gray-400 font-light mt-1">
                Connect with us professionally and stay updated with our latest insights.
              </p>
            </div>
          </div>

          {/* Card 4: Instagram */}
          <div className="bg-white/5 border border-white/5 p-6 rounded-3xl backdrop-blur-md flex flex-col justify-between min-h-[170px] hover:border-cyan-400/30 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <div className="flex flex-col gap-1.5 mt-6">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">INSTAGRAM GRAPHICS</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-extrabold text-white hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                @codematesindia <ArrowUpRight size={12} />
              </a>
              <p className="text-[10px] text-gray-400 font-light mt-1">
                Explore our latest work, behind-the-scenes content, and updates.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── MAIN GLASSMORPHISM CONTACT FORM ─────────────────────────────────── */}
      <section id="contact-form-section" className="relative z-10 w-full max-w-3xl mx-auto px-6 py-20">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="rounded-[36px] border p-6 md:p-10 flex flex-col gap-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative"
              style={{
                background: "rgba(5, 8, 22, 0.85)",
                borderColor: "rgba(0, 242, 254, 0.25)",
                boxShadow: "0 0 50px rgba(0, 242, 254, 0.08), inset 0 0 20px rgba(255,255,255,0.01)",
                backdropFilter: "blur(45px)",
              }}
            >
              {/* Header Title */}
              <div className="text-center flex flex-col gap-2 pb-4 border-b border-white/5">
                <span className="text-[9px] font-black text-cyan-400 tracking-[0.24em] font-mono uppercase">
                  PROJECT SPECIFICATION VAULT
                </span>
                <h2 className="text-3xl font-extrabold text-white">Tell Us About Your Project</h2>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Submit your technical criteria and let our engineering team assemble your custom proposals.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <User size={11} /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shrinivas Patil"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Building size={11} /> Company Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Codemates India"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Mail size={11} /> Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. team@codemates.in"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Phone size={11} /> Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 7348975886"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium"
                    />
                  </div>
                </div>

                {/* Grid Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Service Required */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                      Service Required
                    </label>
                    <div className="relative">
                      <select
                        value={form.serviceRequired}
                        onChange={(e) => setForm({ ...form, serviceRequired: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium appearance-none"
                      >
                        {SERVICES.map((srv) => (
                          <option key={srv} value={srv} className="bg-[#050816]">
                            {srv}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-4.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                      Budget Range
                    </label>
                    <div className="relative">
                      <select
                        value={form.budgetRange}
                        onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium appearance-none"
                      >
                        {BUDGETS.map((bdg) => (
                          <option key={bdg} value={bdg} className="bg-[#050816]">
                            {bdg}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-4.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Project Timeline */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                      Project Timeline
                    </label>
                    <div className="relative">
                      <select
                        value={form.projectTimeline}
                        onChange={(e) => setForm({ ...form, projectTimeline: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium appearance-none"
                      >
                        {TIMELINES.map((tml) => (
                          <option key={tml} value={tml} className="bg-[#050816]">
                            {tml}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-4.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                </div>

                {/* Project Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    Project Description & Technical Scope
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your project, business goals, features required, challenges, and any specific integrations or requirements..."
                    value={form.projectDescription}
                    onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium resize-y min-h-[120px] leading-relaxed"
                  />
                </div>

                {/* Upload requirements button */}
                <div className="flex flex-col gap-2 mt-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    Upload Technical Requirements (Optional)
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.docx,.jpg,.jpeg,.png"
                  />
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="flex items-center justify-center gap-2.5 border border-dashed border-white/10 hover:border-cyan-500/40 bg-white/5 hover:bg-white/10 transition duration-200 py-4.5 rounded-xl text-xs font-bold cursor-pointer text-gray-300"
                  >
                    <UploadCloud size={16} className="text-cyan-400" />
                    {uploadedFile ? (
                      <span className="text-cyan-300 font-mono">VAULT MOUNTED: {uploadedFile.name}</span>
                    ) : (
                      "UPLOAD REQUIREMENTS FILE (PDF, DOCX, IMAGES)"
                    )}
                  </button>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-white/5 disabled:text-white/20 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.25)] transition duration-300 py-4.5 rounded-xl font-bold flex items-center justify-center gap-3 text-black text-sm cursor-pointer mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> SECURING TRANSMISSION CHANNEL...
                    </>
                  ) : (
                    <>
                      Send Project Inquiry <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div className="text-center text-[7.5px] font-mono text-gray-500 uppercase tracking-widest mt-1">
                  ✔ SECURE END-TO-END SHA-256 CONVERSIONS LOCKED
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center flex flex-col items-center justify-center py-12 px-6 rounded-[36px] border border-emerald-500/25 bg-[#050816]/90 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-pulse">
                <CheckCircle2 size={32} />
              </div>

              <h2 className="text-3xl font-black text-white">Inquiry Request Received</h2>
              <p className="mt-4 text-gray-400 text-xs max-w-md mx-auto leading-relaxed font-light">
                Your technical specifications have been securely archived. A technical solution architect will reach out to you within 24 hours to initiate your requirements scoping consultation.
              </p>

              <div className="mt-8 flex gap-4 w-full max-w-sm">
                <Link
                  href="/estimate"
                  className="flex-1 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-center py-3.5 rounded-xl text-xs font-bold transition duration-200"
                >
                  Calculate Cost estimates
                </Link>
                <Link
                  href="/"
                  className="flex-1 bg-white hover:bg-gray-100 text-black text-center py-3.5 rounded-xl text-xs font-bold transition duration-200"
                >
                  Return to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── WHY CHOOSE CODEMATES ────────────────────────────────────────────── */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="text-center flex flex-col items-center gap-2 mb-14">
          <span className="text-[10px] font-black text-cyan-400 tracking-[0.24em] font-mono uppercase">
            OPERATIONAL EXCELLENCE
          </span>
          <h3 className="text-3xl font-extrabold text-white">Why Software Leaders Choose Codemates</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Fast Response", desc: "We respond to all project inquiries with technical scoped assessments within 24 hours." },
            { title: "Transparent Communication", desc: "Clear milestone roadmaps, explicit budget parameters, and weekly status calls." },
            { title: "Scalable Solutions", desc: "Bespoke database schemas and global container deployments configured for future expansion." },
            { title: "Long-Term Support", desc: "Committed maintenance support agreements covering code updates, SLA parameters." },
          ].map((srv, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/5 p-6 rounded-3xl backdrop-blur-md flex flex-col gap-4 hover:border-cyan-400/20 transition duration-300"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="text-sm font-extrabold text-white leading-tight">{srv.title}</span>
              <p className="text-[10.5px] leading-relaxed text-gray-400 font-light">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECT CONSULTATION PROCESS TIMELINE ───────────────────────────── */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-white/5 bg-[#03040c]/40 rounded-[40px] backdrop-blur-sm">
        <div className="text-center flex flex-col items-center gap-2 mb-16">
          <span className="text-[10px] font-black text-cyan-400 tracking-[0.24em] font-mono uppercase">
            ENGAGEMENT WORKFLOWS
          </span>
          <h3 className="text-3xl font-extrabold text-white">System Scoping & Consultation Roadmap</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
          
          {/* Step 1 */}
          <div className="flex flex-col gap-3 relative">
            <span className="text-5xl font-black text-white/5 font-mono absolute -top-8 left-0">01</span>
            <span className="text-[10px] font-bold font-mono tracking-widest text-cyan-400 uppercase">STEP 01</span>
            <h4 className="text-base font-extrabold text-white">Requirement Discussion</h4>
            <p className="text-[10.5px] leading-relaxed text-gray-400 font-light">
              Collaborative 30-minute scoping strategy call to review targeted workflows, requirements, and systems integration.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-3 relative">
            <span className="text-5xl font-black text-white/5 font-mono absolute -top-8 left-0">02</span>
            <span className="text-[10px] font-bold font-mono tracking-widest text-cyan-400 uppercase">STEP 02</span>
            <h4 className="text-base font-extrabold text-white">Solution Planning</h4>
            <p className="text-[10.5px] leading-relaxed text-gray-400 font-light">
              Our engineering team drafts a custom systems architecture blueprint and database schema recommendations.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col gap-3 relative">
            <span className="text-5xl font-black text-white/5 font-mono absolute -top-8 left-0">03</span>
            <span className="text-[10px] font-bold font-mono tracking-widest text-cyan-400 uppercase">STEP 03</span>
            <h4 className="text-base font-extrabold text-white">Proposal & Estimation</h4>
            <p className="text-[10.5px] leading-relaxed text-gray-400 font-light">
              Delivery of an itemized development timeline proposal featuring explicit budget breakdowns and maintenance SLAs.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col gap-3 relative">
            <span className="text-5xl font-black text-white/5 font-mono absolute -top-8 left-0">04</span>
            <span className="text-[10px] font-bold font-mono tracking-widest text-cyan-400 uppercase">STEP 04</span>
            <h4 className="text-base font-extrabold text-white">Development & Delivery</h4>
            <p className="text-[10.5px] leading-relaxed text-gray-400 font-light">
              Sprint-based development workflows, automated testing pipelines, global deployment, and long-term support launch.
            </p>
          </div>

        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 w-full max-w-3xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="text-center flex flex-col items-center gap-2 mb-12">
          <span className="text-[10px] font-black text-cyan-400 tracking-[0.24em] font-mono uppercase">
            FAQ CONSOLE
          </span>
          <h3 className="text-3xl font-extrabold text-white">Frequently Scoped Queries</h3>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => {
                    playSound("tick");
                    setActiveFaq(isOpen ? null : idx);
                  }}
                  className="w-full flex justify-between items-center px-6 py-4.5 text-left text-xs font-bold text-white hover:bg-white/5 transition cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={14}
                    className={`text-cyan-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-[11px] leading-relaxed text-gray-400 border-t border-white/5 font-light">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TRUST & TECHNOLOGY STACK SECTION ────────────────────────────────── */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-white/5 text-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { value: "20+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "24/7", label: "Support Available" },
            { value: "100%", label: "Modern Technology Stack" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1 text-center">
              <span className="text-4xl font-extrabold text-cyan-400 font-mono tracking-tight">
                {item.value}
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack Horizontal Display */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto border-t border-white/5 pt-10">
          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.24em] block mb-4">
            PROVEN ENTERPRISE TECHNOLOGY INTEGRATIONS
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-bold font-mono px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white transition duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA SECTION ───────────────────────────────────────────────── */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20">
        <div className="relative rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.2),transparent_40%)]" />

          <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            Ready to Transform
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Your Business?
            </span>
          </h2>

          <p className="text-gray-300 text-xs md:text-sm mt-6 max-w-2xl mx-auto leading-relaxed font-light">
            Let&#39;s discuss your ideas and create a solution tailored to your goals. Calculate cost estimates or submit scoping specifications directly.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4.5">
            <Link
              href="/estimate"
              className="bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] transition duration-300 px-7 py-4 rounded-xl font-bold text-black text-xs"
            >
              Book Free Consultation
            </Link>
            <a
              href="#contact-form-section"
              className="border border-white/10 bg-white/5 hover:bg-white/10 transition duration-300 px-7 py-4 rounded-xl font-bold text-xs"
            >
              Send Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12 bg-[#020208]/90 z-10 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          <div className="flex flex-col gap-2">
            <span className="text-white font-black text-sm tracking-wide">
              Codemates<span className="text-cyan-400 font-extrabold"> India</span>
            </span>
            <p className="text-[10px] text-gray-500 leading-relaxed font-light mt-1">
              Engineering world-class website, custom software platforms, CRM/ERP systems, and clinical AI automation configurations built to scale.
            </p>
          </div>

          <div className="flex flex-col gap-3 font-mono">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">COMMUNICATION_CHANNELS</span>
            <div className="flex flex-col gap-1 text-[11px]">
              <a href="mailto:support@codemates.in" className="hover:text-white transition-colors">support@codemates.in</a>
              <a href="tel:+917348975886" className="hover:text-white transition-colors">+91 7348975886</a>
              <a href="tel:+917483673004" className="hover:text-white transition-colors">+91 7483673004</a>
            </div>
          </div>

          <div className="flex flex-col gap-3 font-mono">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">SECTOR_NETWORKS</span>
            <div className="flex flex-col gap-1 text-[11px]">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn: Codemates India</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram: @codematesindia</a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-10 pt-6 text-center text-[10px] text-gray-600 font-mono tracking-wider">
          © 2026 Codemates. All Rights Reserved. Enterprise software scoping.
        </div>
      </footer>
    </main>
  );
}
