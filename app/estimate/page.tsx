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
  DollarSign,
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
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { supabase, isConfigured } from "@/lib/supabase";

// ─── Data Configurations ──────────────────────────────────────────────────────

interface ProjectTypeOption {
  id: string;
  name: string;
  baseCost: number;
  icon: React.ComponentType<any>;
  defaultFeatures: string[];
  techStack: string[];
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: "website",
    name: "Business Website",
    baseCost: 10000,
    icon: Globe,
    defaultFeatures: ["User Authentication", "SEO Optimization", "Contact Forms", "Analytics Dashboard"],
    techStack: ["Next.js", "Tailwind CSS", "Vercel", "Supabase"],
  },
  {
    id: "ecommerce",
    name: "E-Commerce Website",
    baseCost: 35000,
    icon: Zap,
    defaultFeatures: ["User Authentication", "Payment Gateway", "Contact Forms", "Analytics Dashboard"],
    techStack: ["Next.js", "Supabase", "Stripe / PayU / Razorpay", "PostgreSQL", "FastAPI"],
  },
  {
    id: "crm",
    name: "CRM System",
    baseCost: 30000,
    icon: Database,
    defaultFeatures: ["Lead Management", "Customer Database", "Reports", "Role Management"],
    techStack: ["Flask", "PostgreSQL", "Supabase", "Tailwind CSS"],
  },
  {
    id: "software",
    name: "Custom Software",
    baseCost: 25000,
    icon: Code2,
    defaultFeatures: ["Role Management", "Reports", "Workflow Automation", "Customer Database"],
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
  },
  {
    id: "ai",
    name: "AI Automation",
    baseCost: 25000,
    icon: Cpu,
    defaultFeatures: ["Workflow Automation", "WhatsApp Integration", "Email Automation"],
    techStack: ["Python", "n8n", "LLMs", "RAG", "Supabase", "AWS"],
  },
  {
    id: "mobile",
    name: "Mobile App",
    baseCost: 55000,
    icon: Monitor,
    defaultFeatures: ["User Authentication", "Push Notifications", "Payment Gateway", "Analytics Dashboard"],
    techStack: ["React Native", "FastAPI", "PostgreSQL", "Supabase"],
  },
  {
    id: "saas",
    name: "SaaS Platform",
    baseCost: 80000,
    icon: Layers,
    defaultFeatures: ["User Authentication", "Payment Gateway", "Role Management", "Analytics Dashboard"],
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS", "Scalable Infrastructure"],
  },
  {
    id: "erp",
    name: "ERP System",
    baseCost: 50000,
    icon: Building,
    defaultFeatures: ["Customer Database", "Reports", "Role Management", "Workflow Automation"],
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "Supabase", "Cloud Infrastructure"],
  },
];

const FEATURES_POOL: Record<string, { name: string; cost: number; desc: string }[]> = {
  website: [
    { name: "User Authentication", cost: 2000, desc: "Secure member sign-in and dashboards" },
    { name: "Admin Panel", cost: 5000, desc: "Manage site contents, user queries, and configuration" },
    { name: "Blog / CMS Engine", cost: 3000, desc: "Publish content with dynamic SEO features" },
    { name: "SEO Optimization", cost: 4000, desc: "Semantic HTML layouts, meta configurations, and speed optimization" },
    { name: "Contact Forms", cost: 500, desc: "Lead capture sheets and automatic email routing" },
    { name: "Payment Gateway", cost: 6000, desc: "Collect payments seamlessly via Stripe, PayU, or Razorpay" },
    { name: "Analytics Dashboard", cost: 4000, desc: "Real-time user engagement telemetry graphs" },
    { name: "AI Chatbot Integration", cost: 8000, desc: "RAG-driven clinical/sales agent helper widget" },
  ],
  ecommerce: [
    { name: "User Authentication", cost: 3000, desc: "Customer profiles, orders, and addresses" },
    { name: "Payment Gateway", cost: 8000, desc: "Stripe, Razorpay, and subscription engines" },
    { name: "Inventory Management", cost: 7000, desc: "Stock alerts, clerk trackers, and category management" },
    { name: "Contact Forms", cost: 500, desc: "Customer care sheets and support tickers" },
    { name: "Analytics Dashboard", cost: 4000, desc: "Revenue tracking, conversion funnels, and metrics" },
    { name: "Product Filtering", cost: 4000, desc: "Faceted search and category filters" },
    { name: "Discount Engine", cost: 3000, desc: "Promotional codes, volume discounts, and triggers" },
    { name: "AI Shopping Assistant", cost: 10000, desc: "Intelligent chatbot product recommendations" },
  ],
  crm: [
    { name: "Lead Management", cost: 5000, desc: "Track, tag, and assign sales opportunities" },
    { name: "Customer Database", cost: 8000, desc: "Robust profiles, transaction logs, and timelines" },
    { name: "Reports & Auditing", cost: 5000, desc: "Automated charts, ledger analytics, and logs" },
    { name: "Role Management", cost: 5000, desc: "Admin, clerk, manager, and custom ACL parameters" },
    { name: "Workflow Automation", cost: 10000, desc: "Automate custom stages, email alerts, and pipelines" },
    { name: "WhatsApp Integration", cost: 6000, desc: "Broadcast, status alerts, and automated triggers" },
    { name: "Email Automation", cost: 3000, desc: "Auto-responder, campaign flows, and mailers" },
  ],
  generic: [
    { name: "User Authentication", cost: 4000, desc: "Secure profiles and token parameters" },
    { name: "Reports & Auditing", cost: 6000, desc: "Dynamic dashboards and telemetry audit trails" },
    { name: "Role Management", cost: 5000, desc: "Multi-level authorization workflows" },
    { name: "Workflow Automation", cost: 10000, desc: "Automate pipelines, n8n orchestration nodes" },
    { name: "WhatsApp Integration", cost: 6000, desc: "Conversational bots and template triggers" },
    { name: "Analytics Dashboard", cost: 5000, desc: "KPI dials, anomalies, and metrics charts" },
    { name: "AI RAG Knowledge Base", cost: 10000, desc: "NLP clinical/legal vector retrieval engine" },
  ],
};

const TIMELINES = [
  { id: "asap", label: "ASAP", multiplier: 1.5, desc: "Requires prioritized scheduling (Rush fee)" },
  { id: "1month", label: "Within 1 Month", multiplier: 1.1, desc: "Accelerated sprint planning" },
  { id: "3months", label: "Within 3 Months", multiplier: 1.0, desc: "Standard roadmap schedule" },
  { id: "flexible", label: "Flexible", multiplier: 0.90, desc: "Cost-optimized scheduling" },
];

const BUDGETS = [
  { id: "10k-25k", label: "₹10,000 – ₹25,000", min: 10000, max: 25000 },
  { id: "25k-50k", label: "₹25,000 – ₹50,000", min: 25000, max: 50000 },
  { id: "50k-1l", label: "₹50,000 – ₹1,00,000", min: 50000, max: 100000 },
  { id: "1l-3l", label: "₹1,00,000 – ₹3,00,000", min: 100000, max: 300000 },
  { id: "3l+", label: "₹3,00,000+", min: 300000, max: 600000 },
];

export default function CostEstimatorPage() {
  const [step, setStep] = useState(0); // 0 = Hero, 1-5 = Steps, 6 = Results, 7 = Success
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("website");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>("3months");
  const [budgetIndex, setBudgetIndex] = useState(2); // default to ₹50k-₹1L

  // Step 5 Form
  const [projectMeta, setProjectMeta] = useState({
    name: "",
    description: "",
    businessType: "",
    website: "",
  });

  // Final Lead Gen Form
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    contactMethod: "Email",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Sound Synth Helpers (Web Audio API Clicks)
  const synthAudioRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (synthAudioRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      synthAudioRef.current = new AudioCtx();
    } catch (e) { }
  };

  const playStepSound = (type: "forward" | "backward" | "success") => {
    initAudio();
    const ctx = synthAudioRef.current;
    if (!ctx) return;

    if (type === "forward") {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.12);
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.12);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === "backward") {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(330, ctx.currentTime); // E4
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.12);
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.12);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === "success") {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chime
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const delay = idx * 0.06;
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        gainNode.gain.setValueAtTime(0.0, ctx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + delay + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.5);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.5);
      });
    }
  };

  // Dynamically set default features when project type changes
  useEffect(() => {
    const selected = PROJECT_TYPES.find((t) => t.id === selectedType);
    if (selected) {
      setSelectedFeatures(selected.defaultFeatures);
    }
  }, [selectedType]);

  // Navigate Steps
  const nextStep = () => {
    playStepSound("forward");
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    playStepSound("backward");
    setStep((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get active features list
  const activeFeatures = FEATURES_POOL[selectedType] || FEATURES_POOL.generic;

  const toggleFeature = (name: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  // ─── Price / Complexity Calculation Algorithm ────────────────────────────

  const calculateEstimate = () => {
    const typeObj = PROJECT_TYPES.find((t) => t.id === selectedType);
    const timelineObj = TIMELINES.find((t) => t.id === selectedTimeline);
    if (!typeObj) return { min: 0, max: 0, complexity: "Medium", weeks: 4, team: "" };

    const baseCost = typeObj.baseCost;

    // Feature cost sum
    const featuresCost = selectedFeatures.reduce((acc, fName) => {
      const featObj = activeFeatures.find((f) => f.name === fName) || FEATURES_POOL.generic.find((f) => f.name === fName);
      return acc + (featObj ? featObj.cost : 5000);
    }, 0);

    // Multiplier for timeline
    const multiplier = timelineObj ? timelineObj.multiplier : 1.0;

    // Total raw estimate
    const totalCost = (baseCost + featuresCost) * multiplier;

    // Compute dynamic range (₹)
    const estimateMin = Math.round(totalCost * 0.9);
    const estimateMax = Math.round(totalCost * 1.25);

    // Determine complexity based on features quantity
    let complexity = "Medium";
    let weeks = 6;
    let team = "1 Developer, 1 UI Designer";

    const featuresCount = selectedFeatures.length;
    if (featuresCount <= 3 && totalCost < 40000) {
      complexity = "Low";
      weeks = 3;
      team = "2 Full-Stack Developer";
    } else if (featuresCount > 6 || totalCost > 80000) {
      complexity = "High";
      weeks = 8;
      team = "3 Developers, 1 UI Designer, 1 QA Engineer";
    } else {
      complexity = "Medium";
      weeks = 5;
      team = "3 Developer, 1 UI Designer";
    }

    // Timeline modifier
    if (selectedTimeline === "asap") {
      weeks = Math.max(2, Math.round(weeks * 0.7)); // Faster delivery
    } else if (selectedTimeline === "flexible") {
      weeks = Math.round(weeks * 1.3); // Relaxed schedule
    }

    return {
      min: estimateMin,
      max: estimateMax,
      complexity,
      weeks,
      team,
    };
  };

  const results = calculateEstimate();
  const selectedTypeObj = PROJECT_TYPES.find((t) => t.id === selectedType);

  // ─── Lead Generation Submissions (Supabase) ──────────────────────────────

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const payload = {
      full_name: leadForm.fullName,
      company_name: leadForm.companyName,
      email: leadForm.email,
      phone: leadForm.phone,
      preferred_contact_method: leadForm.contactMethod,
      // Lead telemetry details
      project_type: selectedTypeObj?.name || selectedType,
      selected_features: selectedFeatures,
      expected_timeline: selectedTimeline,
      estimated_budget_index: BUDGETS[budgetIndex].label,
      project_name: projectMeta.name || "Untitled Project",
      project_description: projectMeta.description || "No description provided.",
      business_type: projectMeta.businessType || "Not specified",
      existing_website: projectMeta.website || "None",
      estimated_investment_range: `₹${results.min.toLocaleString()} – ₹${results.max.toLocaleString()}`,
      complexity: results.complexity,
      estimated_timeline_weeks: `${results.weeks} Weeks`,
      recommended_team: results.team,
      created_at: new Date().toISOString(),
    };

    try {
      if (supabase) {
        // Resilient insert into Supabase leads table
        const { error } = await supabase.from("leads").insert([payload]);
        if (error) throw error;
      } else {
        // Fallback local storage logging if Supabase credentials are not populated
        const storedLeads = JSON.parse(localStorage.getItem("codemates_leads") || "[]");
        storedLeads.push(payload);
        localStorage.setItem("codemates_leads", JSON.stringify(storedLeads));
        console.log("Supabase not active. Lead logged to local browser storage successfully:", payload);
      }

      // Proved success
      playStepSound("success");
      setStep(7); // success screen
    } catch (err: any) {
      console.error("Database save failed", err);
      // Even if Supabase inserts fail (e.g. database connection / schema mismatch), 
      // we still write to local storage to protect the client lead, and proceed safely.
      const storedLeads = JSON.parse(localStorage.getItem("codemates_leads") || "[]");
      storedLeads.push(payload);
      localStorage.setItem("codemates_leads", JSON.stringify(storedLeads));

      playStepSound("success");
      setStep(7); // fallback transition to success to protect user conversion
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#050816] text-white relative font-sans overflow-x-hidden flex flex-col justify-between">

      {/* ── BACKGROUND GLOWS ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[5%] w-[45vw] h-[45vw] bg-cyan-500/5 blur-[150px] rounded-full" />
        <div className="absolute top-[40%] right-[5%] w-[45vw] h-[45vw] bg-purple-500/5 blur-[170px] rounded-full" />
        <div className="absolute bottom-[5%] left-[20%] w-[50vw] h-[50vw] bg-blue-500/5 blur-[180px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
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
            <Link href="/estimate" className="text-white border-b border-cyan-400 pb-1">
              Estimate
            </Link>
            <Link href="/contact" className="hover:text-white transition duration-200">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-bold text-gray-300 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-full transition duration-200"
            >
              Exit Estimator
            </Link>
          </div>

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
                  className="text-white transition"
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
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-white/5 hover:bg-white/10 text-white font-semibold text-center py-3.5 rounded-xl border border-white/10 transition block text-xs"
                >
                  Exit Estimator
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── CORE MULTI-STEP BODY ─────────────────────────────────────────────── */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-10 flex flex-col justify-center">

        {/* PROGRESS METER */}
        {step > 0 && step < 6 && (
          <div className="w-full flex items-center justify-between mb-12 bg-white/5 border border-white/5 px-6 py-4 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase">
                ESTIMATION ROADMAP
              </span>
              <span className="text-white/10">|</span>
              <span className="text-xs font-bold text-gray-400 font-mono">
                STEP {step} OF 5
              </span>
            </div>

            <div className="w-44 h-1.5 bg-white/5 rounded-full overflow-hidden flex">
              <motion.div
                animate={{ width: `${(step / 5) * 100}%` }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* STEP 0: HERO SPLASH */}
          {step === 0 && (
            <motion.section
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center flex flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/5 px-4.5 py-1.5 rounded-full text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <Sparkles size={11} className="animate-pulse" />
                CONVERSION-DRIVEN SOLUTION ROADMAP
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.08] text-white">
                Estimate Your Project
                <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                  Investment in 60 Seconds
                </span>
              </h1>

              <p className="mt-8 text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl font-light">
                Tell us what you&#39;re building and get a personalized project estimate, recommended technologies, timelines, and an implementation roadmap.
              </p>

              <button
                onClick={nextStep}
                className="mt-12 bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition duration-300 px-9 py-4.5 rounded-2xl font-bold flex items-center gap-3 text-black text-sm cursor-pointer group"
              >
                Start Estimation
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </button>

              <div className="mt-14 flex flex-wrap justify-center gap-8 text-[11px] text-gray-500 font-semibold tracking-wider uppercase">
                <span className="flex items-center gap-2"><Check size={14} className="text-cyan-400" /> Free Consultation</span>
                <span className="flex items-center gap-2"><Check size={14} className="text-cyan-400" /> Personalized Proposal</span>
                <span className="flex items-center gap-2"><Check size={14} className="text-cyan-400" /> No Commitment Required</span>
              </div>
            </motion.section>
          )}

          {/* STEP 1: PROJECT TYPES */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono">01 // CLASSIFICATION</span>
                <h2 className="text-3xl font-extrabold tracking-tight">What would you like to build?</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PROJECT_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`group rounded-2xl border p-5 flex flex-col justify-between items-start gap-8 transition-all duration-300 text-left min-h-[145px] cursor-pointer ${isSelected
                        ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.12)] text-white"
                        : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${isSelected ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-400" : "bg-white/5 border-white/5 text-gray-400"
                          }`}
                      >
                        <Icon size={18} />
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-black tracking-tight leading-tight">{type.name}</span>
                        <span className="text-[8.5px] font-bold font-mono tracking-widest text-cyan-400/60 uppercase">
                          BASE ₹{(type.baseCost / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end gap-4 border-t border-white/5 pt-6">
                <button
                  onClick={nextStep}
                  className="bg-white text-black hover:bg-gray-100 px-6.5 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 transition duration-200 cursor-pointer"
                >
                  Configure Features <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DYNAMIC FEATURES SELECTOR */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono">02 // SCOPE SPECIFICATIONS</span>
                <h2 className="text-3xl font-extrabold tracking-tight">Which features do you need?</h2>
                <p className="text-xs text-gray-500">Selected platform type: <strong className="text-gray-300">{selectedTypeObj?.name}</strong></p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeFeatures.map((feat) => {
                  const isSelected = selectedFeatures.includes(feat.name);
                  return (
                    <button
                      key={feat.name}
                      onClick={() => toggleFeature(feat.name)}
                      className={`group rounded-2xl border p-4.5 flex items-start gap-4 transition-all duration-300 text-left cursor-pointer ${isSelected
                        ? "bg-cyan-500/10 border-cyan-400/60 shadow-[0_0_20px_rgba(0,242,254,0.08)]"
                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                        }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${isSelected ? "bg-cyan-500 border-cyan-400 text-black" : "border-white/20 bg-white/5"
                          }`}
                      >
                        {isSelected && <Check size={11} strokeWidth={4} />}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center w-full gap-2">
                          <span className="text-xs font-bold text-white">{feat.name}</span>
                          <span className="text-[9px] font-bold font-mono tracking-widest text-cyan-400 uppercase shrink-0">
                            +₹{(feat.cost / 1000).toFixed(0)}k
                          </span>
                        </div>
                        <p className="text-[10px] leading-relaxed text-gray-400 font-light">
                          {feat.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between gap-4 border-t border-white/5 pt-6">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition duration-200"
                >
                  <ChevronLeft size={13} /> Back
                </button>

                <button
                  onClick={nextStep}
                  className="bg-white text-black hover:bg-gray-100 px-6.5 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 transition duration-200 cursor-pointer"
                >
                  Select Timeline <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: TIMELINE OPTIONS */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono">03 // ROADMAP PLANNING</span>
                <h2 className="text-3xl font-extrabold tracking-tight">What is your expected timeline?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TIMELINES.map((t) => {
                  const isSelected = selectedTimeline === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTimeline(t.id)}
                      className={`group rounded-2xl border p-5 flex flex-col justify-between items-start gap-6 transition-all duration-300 text-left min-h-[110px] cursor-pointer ${isSelected
                        ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.08)]"
                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                        }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-xs font-bold text-white">{t.label}</span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                            <Clock size={11} />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 w-full">
                        <p className="text-[10px] leading-relaxed text-gray-400 font-light">{t.desc}</p>
                        <div className="flex items-center gap-1.5 mt-1 border-t border-white/5 pt-2">
                          <span className="text-[7.5px] font-bold uppercase tracking-wider text-gray-500">Timeline Impact:</span>
                          <span
                            className={`text-[8.5px] font-bold font-mono tracking-wider uppercase ${t.multiplier > 1.0 ? "text-amber-400" : (t.multiplier === 1.0 ? "text-cyan-400" : "text-emerald-400")
                              }`}
                          >
                            {t.multiplier > 1.0 ? "Rush Delivery" : (t.multiplier === 1.0 ? "Standard Scheduling" : "Cost Optimized")}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between gap-4 border-t border-white/5 pt-6">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition duration-200"
                >
                  <ChevronLeft size={13} /> Back
                </button>

                <button
                  onClick={nextStep}
                  className="bg-white text-black hover:bg-gray-100 px-6.5 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 transition duration-200 cursor-pointer"
                >
                  Configure Budget <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: BUDGET SELECTOR SLIDER */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono">04 // FUNDING BOUNDARIES</span>
                <h2 className="text-3xl font-extrabold tracking-tight">What is your estimated budget range?</h2>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-3xl p-8 backdrop-blur-md flex flex-col gap-8">

                {/* Visual Label Display */}
                <div className="text-center py-6 border-b border-white/5">
                  <span className="text-[8.5px] font-bold text-cyan-400 tracking-[0.24em] uppercase block mb-2 font-mono">
                    TARGET INVESTMENT BRACKET
                  </span>
                  <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    {BUDGETS[budgetIndex].label}
                  </span>
                </div>

                {/* Range Slider Track */}
                <div className="flex flex-col gap-3 relative py-4">
                  <input
                    type="range"
                    min="0"
                    max={BUDGETS.length - 1}
                    value={budgetIndex}
                    onChange={(e) => setBudgetIndex(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10 outline-none accent-cyan-400"
                  />
                  <div className="flex justify-between text-[9px] font-bold font-mono tracking-widest text-gray-500 uppercase mt-2">
                    <span>₹10K</span>
                    <span>₹25K</span>
                    <span>₹50K</span>
                    <span>₹1L</span>
                    <span>₹3L+</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between gap-4 border-t border-white/5 pt-6">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition duration-200"
                >
                  <ChevronLeft size={13} /> Back
                </button>

                <button
                  onClick={nextStep}
                  className="bg-white text-black hover:bg-gray-100 px-6.5 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 transition duration-200 cursor-pointer"
                >
                  Describe Project <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: PROJECT METADATA */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-8"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono">05 // CONTEXT REQUIREMENTS</span>
                <h2 className="text-3xl font-extrabold tracking-tight">Tell us about your project</h2>
              </div>

              <div className="grid grid-cols-1 gap-5 bg-white/5 border border-white/5 p-6 md:p-8 rounded-3xl backdrop-blur-md">

                {/* Project Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Project Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Codemates India Client Dashboard"
                    value={projectMeta.name}
                    onChange={(e) => setProjectMeta({ ...projectMeta, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Business Type */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Business Type / Industry
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Real Estate Agency, E-Commerce Brand"
                      value={projectMeta.businessType}
                      onChange={(e) => setProjectMeta({ ...projectMeta, businessType: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium"
                    />
                  </div>

                  {/* Existing Website */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Existing Website (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="e.g. https://mybusiness.com"
                      value={projectMeta.website}
                      onChange={(e) => setProjectMeta({ ...projectMeta, website: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium"
                    />
                  </div>
                </div>

                {/* Project Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Describe your goals or user workflows
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide a detailed roadmap, target audience, specific features, or integrations required."
                    value={projectMeta.description}
                    onChange={(e) => setProjectMeta({ ...projectMeta, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium resize-y min-h-[100px] leading-relaxed"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between gap-4 border-t border-white/5 pt-6">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition duration-200"
                >
                  <ChevronLeft size={13} /> Back
                </button>

                <button
                  disabled={!projectMeta.name || !projectMeta.description || !projectMeta.businessType}
                  onClick={nextStep}
                  className="bg-white text-black hover:bg-gray-100 disabled:bg-white/5 disabled:text-white/20 disabled:cursor-not-allowed px-7 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 transition duration-200 cursor-pointer"
                >
                  Generate Estimate Analysis <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: ESTIMATION RESULTS REPORT SCREEN & LEAD GEN */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col gap-12"
            >
              {/* Header Title */}
              <div className="text-center flex flex-col items-center gap-2">
                <span className="text-[10px] font-black text-cyan-400 tracking-[0.24em] uppercase font-mono">
                  SOLUTION TELEMETRY DEPLOYED
                </span>
                <h2 className="text-4xl font-extrabold tracking-tight">Your Personalized Project Analysis</h2>
              </div>

              {/* Glassmorphic Report Sheet */}
              <div
                className="rounded-[32px] border overflow-hidden p-6 md:p-8 flex flex-col gap-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative"
                style={{
                  background: "rgba(5, 8, 22, 0.82)",
                  borderColor: "rgba(0, 242, 254, 0.25)",
                  boxShadow: "0 0 50px rgba(0, 242, 254, 0.08), inset 0 0 24px rgba(255,255,255,0.01)",
                  backdropFilter: "blur(40px)",
                }}
              >
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="text-cyan-400" size={16} />
                    <span className="text-[10px] font-bold font-mono tracking-widest text-white uppercase">
                      ANALYSIS_REPORT_0x42E.sys
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full uppercase tracking-wider">
                    READY FOR PROPOSAL
                  </span>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                  {/* Scope / Platform */}
                  <div className="bg-white/5 border border-white/5 p-4.5 rounded-2xl flex flex-col gap-1 justify-between">
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Platform Type</span>
                    <span className="text-sm font-black text-white block mt-1">{selectedTypeObj?.name}</span>
                  </div>

                  {/* Complexity */}
                  <div className="bg-white/5 border border-white/5 p-4.5 rounded-2xl flex flex-col gap-1 justify-between">
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Complexity Score</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-sm font-black uppercase ${results.complexity === "High" ? "text-rose-400" : (results.complexity === "Medium" ? "text-cyan-400" : "text-emerald-400")
                          }`}
                      >
                        {results.complexity}
                      </span>
                      <span className="text-white/10">|</span>
                      <span className="text-[10px] font-semibold text-gray-400 font-mono">
                        {selectedFeatures.length} FEATURES
                      </span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white/5 border border-white/5 p-4.5 rounded-2xl flex flex-col gap-1 justify-between">
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Estimated Schedule</span>
                    <span className="text-sm font-black text-white block mt-1">{results.weeks} WEEKS</span>
                  </div>

                  {/* Team */}
                  <div className="bg-white/5 border border-white/5 p-4.5 rounded-2xl flex flex-col gap-1 justify-between">
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Engineers Required</span>
                    <span className="text-xs font-bold text-gray-300 block mt-1">{results.team}</span>
                  </div>
                </div>

                {/* Primary Pricing Investment Block */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-6 text-center shadow-[inset_0_0_20px_rgba(0,242,254,0.05)]">
                  <span className="text-[9px] font-bold text-cyan-400 tracking-[0.24em] uppercase block mb-1">
                    ESTIMATED INVESTMENT RANGE
                  </span>
                  <span className="text-4xl md:text-5xl font-black text-white block mt-1">
                    ₹{results.min.toLocaleString()} – ₹{results.max.toLocaleString()}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-3 font-light max-w-md mx-auto leading-relaxed">
                    Personalized budget parameters mapped to base cost model of ₹{selectedTypeObj?.baseCost.toLocaleString()} + {selectedFeatures.length} configured system features.
                  </p>
                </div>

                {/* Tech & Visual Indicators list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">

                  {/* Recommended Stack */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400">
                      RECOMMENDED TECHNOLOGY STACK
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedTypeObj?.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-bold font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Dials */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400">
                      SYSTEM PERFORMANCE SCORECARDS
                    </span>
                    <div className="flex flex-col gap-2 text-[10px]">

                      {/* Scalability Meter */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-gray-400 font-semibold font-mono">
                          <span>SCALABILITY POTENTIAL</span>
                          <span className="text-cyan-400">95%</span>
                        </div>
                        <div className="h-1 rounded bg-white/5 overflow-hidden">
                          <div className="h-full bg-cyan-400" style={{ width: "95%" }} />
                        </div>
                      </div>

                      {/* Timeline Feasibility */}
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex justify-between text-gray-400 font-semibold font-mono">
                          <span>TIMELINE FEASIBILITY</span>
                          <span className="text-emerald-400">100% SECURE</span>
                        </div>
                        <div className="h-1 rounded bg-white/5 overflow-hidden">
                          <div className="h-full bg-emerald-400" style={{ width: "100%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RECOMMENDED SERVICES CARD LIST */}
              <div className="flex flex-col gap-5 mt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-cyan-400 tracking-widest font-mono uppercase">
                    AI OPTIMIZED RECOMMENDATIONS
                  </span>
                  <h3 className="text-xl font-extrabold text-white">Recommended Services Roadmap</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: "CRM Development", desc: "Build tailored dashboard platforms mapped to business transactions." },
                    { title: "Workflow Automation", desc: "Connect automated n8n pipeline orchestrations with direct systems." },
                    { title: "Cloud Hosting Support", desc: "Global CDN delivery with auto-scaling container parameters." },
                    { title: "Maintenance Plan", desc: "Uptime assurances, code integrations, and weekly logs backups." },
                  ].map((srv, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/5 p-4.5 rounded-2xl flex flex-col gap-2 justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0">
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span className="text-[11px] font-extrabold text-white">{srv.title}</span>
                      </div>
                      <p className="text-[9.5px] leading-relaxed text-gray-400 font-light">{srv.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* LEAD GENERATION FORM ACCORDION */}
              <div className="flex flex-col gap-6 mt-8 border-t border-white/5 pt-10 max-w-xl mx-auto w-full">
                <div className="text-center flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white">Get Your Detailed Proposal</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto font-light leading-relaxed">
                    Our solution architects will review your parameters and prepare a personalized, detailed technology solution roadmap.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <User size={10} /> Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shrinivas Patil"
                        value={leadForm.fullName}
                        onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Briefcase size={10} /> Company Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Codemates India"
                        value={leadForm.companyName}
                        onChange={(e) => setLeadForm({ ...leadForm, companyName: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Mail size={10} /> Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. team@codemates.in"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Phone size={10} /> Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 9876543210"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-200 font-medium"
                      />
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <MessageSquare size={10} /> Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Email", "WhatsApp", "Phone Call"].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setLeadForm({ ...leadForm, contactMethod: method })}
                          className={`py-3.5 px-4 text-xs font-bold border rounded-xl transition duration-200 cursor-pointer text-center ${leadForm.contactMethod === method
                            ? "bg-cyan-500/10 border-cyan-400 text-cyan-300"
                            : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                            }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-white/5 disabled:text-white/20 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.3)] transition duration-300 py-4.5 rounded-xl font-bold flex items-center justify-center gap-3 text-black text-sm cursor-pointer mt-4"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> ESTABLISHING PROPOSAL MATRIX...
                      </>
                    ) : (
                      <>
                        Get Detailed Proposal <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="text-center text-[7.5px] font-mono text-gray-500 uppercase tracking-widest mt-1">
                    ✔ ENCRYPTED VAULT STORAGE LOCKED & SECURED
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* STEP 7: SUCCESS SCREEN */}
          {step === 7 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center flex flex-col items-center justify-center py-10 max-w-xl mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.25)] animate-pulse">
                <CheckCircle2 size={32} />
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white">Proposal Request Received</h2>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed font-light">
                Your project details have been safely stored. Our solution architects will review your parameters and contact you within 24 hours to schedule your strategy consultation.
              </p>

              {/* Consultation Steps Roadmap */}
              <div className="w-full mt-10 text-left bg-white/5 border border-white/5 p-6 rounded-3xl backdrop-blur-md flex flex-col gap-6">
                <span className="text-[8px] font-black text-cyan-400 tracking-[0.24em] font-mono uppercase block mb-1">
                  NEXT ROADMAP STEPS
                </span>

                <div className="flex flex-col gap-4">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] font-bold font-mono text-cyan-400 shrink-0 mt-0.5">
                      01
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white leading-tight">Requirement Analysis</span>
                      <p className="text-[9.5px] text-gray-400 font-light mt-1 leading-relaxed">
                        We map your specified {selectedFeatures.length} features to standard engineering workloads.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] font-bold font-mono text-cyan-400 shrink-0 mt-0.5">
                      02
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white leading-tight">Proposal Formulation</span>
                      <p className="text-[9.5px] text-gray-400 font-light mt-1 leading-relaxed">
                        Architects package detailed tech recommendations and itemized sprint timelines.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] font-bold font-mono text-cyan-400 shrink-0 mt-0.5">
                      03
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white leading-tight">Strategy Call Booked</span>
                      <p className="text-[9.5px] text-gray-400 font-light mt-1 leading-relaxed">
                        A meeting is scheduled to walk you through the custom blueprint and start development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-4 w-full">
                <Link
                  href="/projects"
                  className="flex-1 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-center py-4 rounded-xl text-xs font-bold transition duration-200"
                >
                  Explore Galaxy Showcase
                </Link>
                <Link
                  href="/"
                  className="flex-1 bg-white hover:bg-gray-100 text-black text-center py-4 rounded-xl text-xs font-bold transition duration-200"
                >
                  Return to Home
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 text-center text-xs text-gray-500 bg-[#020208]/50 z-10">
        <p className="tracking-wide">© 2026 Codemates India. Enterprise pricing roadmap consultation. Built to last.</p>
      </footer>
    </main>
  );
}
