"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  Upload,
  CheckCircle2,
  X,
  FileText,
  Loader2,
  Briefcase,
  TrendingUp,
  Brain,
  Rocket,
  ShieldCheck,
  UserCheck,
  Check,
  Menu
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";

const NeuralBackground = dynamic(() => import("@/components/NeuralBackground"), { ssr: false });

// Interfaces
interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Do you hire freshers?",
    answer: "Yes, we look for capability, mindset, and drive rather than years on a resume. If you have an owner's mindset and a willingness to learn rapidly, you'll fit right in."
  },
  {
    question: "Do you offer internships?",
    answer: "Yes, we run intensive, hands-on startup internships where you work directly on client-facing applications and automation platforms."
  },
  {
    question: "Is this a traditional job?",
    answer: "No. This is a Founding Growth Partner role. Instead of fixed, passive salaries, you are compensated via revenue sharing and project bonuses, matching your impact directly with company earnings."
  },
  {
    question: "How does revenue sharing work?",
    answer: "For every client account or project you help secure, manage, or grow, you receive a pre-agreed percentage of the contract value. There is no cap on your earnings."
  },
  {
    question: "Can I contribute part-time?",
    answer: "Absolutely. The role is remote and flexible. We focus purely on output and commitment to growth, allowing you to balance this with other pursuits."
  },
  {
    question: "Do I need sales experience?",
    answer: "While experience helps, we prioritize clear communication, an understanding of modern tech (AI, low-code, web apps), and an entrepreneurial attitude. We will guide you on the rest."
  }
];

const VALUES = [
  {
    title: "Innovation",
    desc: "Deploying next-gen AI, automation pipelines, and modern web frameworks ahead of the curve.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30"
  },
  {
    title: "Ownership",
    desc: "Taking pride in the details, driving initiatives autonomously, and speaking up for the best ideas.",
    gradient: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/30"
  },
  {
    title: "Learning",
    desc: "Relentless curiosity. Up-skilling constantly across LLMs, product frameworks, and business strategies.",
    gradient: "from-indigo-500/20 to-purple-500/20",
    border: "border-indigo-500/30"
  },
  {
    title: "Collaboration",
    desc: "Working in real-time, sharing knowledge freely, and scaling capabilities together.",
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30"
  },
  {
    title: "Execution",
    desc: "Ideas are cheap. We build, ship, iterate rapidly, and measure success by actual business metrics.",
    gradient: "from-pink-500/20 to-cyan-500/20",
    border: "border-pink-500/30"
  }
];

const PROCESS_STEPS = [
  {
    title: "Application Review",
    desc: "We analyze your mindset, answers, and background to see if there is an initial alignment."
  },
  {
    title: "Introductory Discussion",
    desc: "A brief sync to meet the team, share motivations, and clarify the partner framework."
  },
  {
    title: "Vision Alignment Conversation",
    desc: "An in-depth talk about startup culture, revenue sharing, and your growth plan."
  },
  {
    title: "Collaboration Assessment",
    desc: "A short test drive working alongside us on an actual strategy or mock campaign."
  },
  {
    title: "Partner Onboarding",
    desc: "Setting up your tools, pipelines, partner dashboard, and launching your first initiative."
  }
];

const BENEFITS = [
  "Revenue share from successful projects",
  "Long-term growth opportunity",
  "Real startup experience",
  "Direct involvement in business decisions",
  "Opportunity to become a key growth partner",
  "Build your personal brand alongside the company"
];

const RESPONSIBILITIES = [
  "Generate quality leads",
  "Build relationships with businesses",
  "Identify potential clients",
  "Promote company services",
  "Help acquire new projects",
  "Support business growth initiatives",
  "Collaborate with the Codemates team",
  "Contribute ideas for company expansion"
];

export default function CareersClient() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Step 1: Personal Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [location, setLocation] = useState("");

  // Step 2: Mindset Questions
  const [question1, setQuestion1] = useState(""); // What are you looking for?
  const [question2, setQuestion2] = useState(""); // How would you prefer to earn?
  const [question3, setQuestion3] = useState(""); // How will you help Codemates grow?
  const [question4, setQuestion4] = useState(""); // Which mindset best describes you?
  const [question5, setQuestion5] = useState(""); // Are you comfortable collaborating?
  const [question6, setQuestion6] = useState(""); // What creates sustainable growth?
  const [question7, setQuestion7] = useState(""); // Are you genuinely interested in partnership?

  // Step 3: Resume Upload
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollFormToTop = () => {
    const formEl = document.getElementById("application-form-container");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNextStep = () => {
    // Basic validation
    if (currentStep === 1) {
      if (!fullName.trim() || !email.trim() || !phone.trim() || !location.trim()) {
        setSubmitError("Please fill out all required fields.");
        return;
      }
      setSubmitError("");
    } else if (currentStep === 2) {
      if (!question1 || !question2 || !question3.trim() || !question4 || !question5 || !question6 || !question7) {
        setSubmitError("Please answer all questions before proceeding.");
        return;
      }
      setSubmitError("");
    }
    setCurrentStep((prev) => prev + 1);
    setTimeout(scrollFormToTop, 50);
  };

  const handlePrevStep = () => {
    setSubmitError("");
    setCurrentStep((prev) => prev - 1);
    setTimeout(scrollFormToTop, 50);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const validExtensions = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (validExtensions.includes(selectedFile.type) || /\.(pdf|doc|docx)$/i.test(selectedFile.name)) {
        setResumeFile(selectedFile);
        setSubmitError("");
      } else {
        setSubmitError("Invalid file type. Please upload a PDF, DOC, or DOCX resume.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!resumeFile) {
      setSubmitError("Please upload your resume.");
      return;
    }

    if (!declarationChecked) {
      setSubmitError("You must agree to the partnership declaration.");
      return;
    }

    setIsSubmitting(true);

    try {
      let resumeUrl = "";

      if (supabase) {
        // 1. Upload to Supabase Storage
        const fileExt = resumeFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `resumes/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("career-resumes")
          .upload(filePath, resumeFile);

        if (uploadError) {
          throw new Error(`Resume upload failed: ${uploadError.message}`);
        }

        // 2. Get Public URL
        const { data: urlData } = supabase.storage
          .from("career-resumes")
          .getPublicUrl(filePath);

        resumeUrl = urlData?.publicUrl || "";
      } else {
        // Fallback mock URL if Supabase client is warning/offline
        resumeUrl = `https://mock-storage.codemates.in/resumes/${Date.now()}-${resumeFile.name}`;
      }

      // 3. Save application data
      const applicationData = {
        full_name: fullName,
        email: email,
        phone: phone,
        linkedin: linkedin,
        location: location,
        job_type: question1,
        earning_preference: question2,
        growth_contribution: question3,
        mindset: question4,
        team_collaboration: question5,
        growth_priority: question6,
        partnership_interest: question7,
        resume_url: resumeUrl,
      };

      if (supabase) {
        const { error: dbError } = await supabase
          .from("job_applications")
          .insert([applicationData]);

        if (dbError) {
          throw new Error(`Database submission failed: ${dbError.message}`);
        }
      } else {
        // Mock save to console/localStorage for development
        console.log("Mock Application Submitting:", applicationData);
      }

      // Send confirmation email
      try {
        const emailRes = await fetch("/api/careers/apply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            fullName,
          }),
        });
        if (!emailRes.ok) {
          const errText = await emailRes.json().catch(() => ({}));
          console.error("Failed to send confirmation email:", errText.error || emailRes.statusText);
        }
      } catch (emailErr) {
        console.error("Error calling send confirmation email API:", emailErr);
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openFormAndScroll = () => {
    setIsFormOpen(true);
    setIsModalOpen(false);
    setTimeout(() => {
      const formEl = document.getElementById("application-form-container");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="bg-[#060816] text-white min-h-screen relative font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
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
            <Link href="/careers" className="text-white border-b-2 border-cyan-400 pb-1 font-semibold">Careers</Link>
            <Link href="/estimate" className="hover:text-white transition duration-200">Estimate</Link>
            <Link href="/contact" className="hover:text-white transition duration-200">Contact</Link>
          </div>

          <Link href="/estimate" className="hidden md:inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            Book Call
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white transition cursor-pointer p-1"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition">Home</Link>
                <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition">Services</Link>
                <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition">Projects</Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition">About</Link>
                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition">Blog</Link>
                <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="text-white transition">Careers</Link>
                <Link href="/estimate" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition">Estimate</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white transition">Contact</Link>
                <Link href="/estimate" onClick={() => setIsMobileMenuOpen(false)} className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-center py-3.5 rounded-xl transition shadow-[0_0_15px_rgba(6,182,212,0.25)] block">
                  Book Call
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            maskImage: "radial-gradient(circle at center, black, transparent 80%)"
          }}
        />
        <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-purple-500/10 blur-[180px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md px-4 py-2 rounded-full text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-8 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          >
            <Sparkles size={12} className="animate-pulse" />
            Build as an Employee or Partner
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
          >
            Build The Future <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              With Us
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Join a team building AI systems, automation platforms, custom software, and digital products that solve real-world business problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-12 flex flex-wrap gap-5 justify-center items-center"
          >
            <a
              href="#opportunity-section"
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white transition duration-300 px-8 py-4 rounded-2xl font-bold text-sm tracking-wide"
            >
              View Opportunity
            </a>
          </motion.div>
        </div>
      </section>

      {/* WHY JOIN CODEMATES */}
      <section className="py-24 bg-[#03040c] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs font-mono">
              THE VALUE PROPOSITION
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
              Why Partner With Us?
            </h2>
            <p className="text-gray-400 mt-4 text-sm md:text-base">
              We operate differently. We build high-impact platforms, emphasize extreme ownership, and distribute project rewards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real-World Projects",
                desc: "Work on products used by actual businesses.",
                icon: Briefcase
              },
              {
                title: "Learn & Grow",
                desc: "Continuous learning and startup exposure.",
                icon: Brain
              },
              {
                title: "Modern Technologies",
                desc: "AI, Cloud, Automation, Full Stack Development.",
                icon: Rocket
              },
              {
                title: "Ownership Mindset",
                desc: "Think beyond tasks and contribute to growth.",
                icon: UserCheck
              },
              {
                title: "Startup Experience",
                desc: "Build products from idea to execution.",
                icon: TrendingUp
              },
              {
                title: "Long-Term Growth",
                desc: "Grow with the company and create impact.",
                icon: ShieldCheck
              }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-[30px] transition-all duration-300 relative group hover:border-cyan-500/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                    <Icon className="text-cyan-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPEN OPPORTUNITY SECTION */}
      <section id="opportunity-section" className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs font-mono">
              ACTIVE ENGAGEMENT
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
              Open Opportunities
            </h2>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-[35px] p-8 md:p-12 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[100px] pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-purple-500/5 blur-[35px] pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/5 pb-8 mb-8">
              <div>
                <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                  Partnership Opportunity
                </span>
                <h3 className="text-2xl md:text-3xl font-black mt-4 text-white group-hover:text-cyan-300 transition-colors">
                  Founding Growth Partner (Sales & Marketing)
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition shadow-[0_0_15px_rgba(6,182,212,0.25)] flex items-center gap-2"
              >
                View Details
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm font-medium">
              <div>
                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1 font-mono">LOCATION</span>
                <span className="text-gray-300">Remote / Hybrid</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1 font-mono">COMMITMENT</span>
                <span className="text-gray-300">Flexible</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1 font-mono">COMPENSATION</span>
                <span className="text-cyan-400 font-semibold">Revenue Share / Project-Based</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL MODAL OVERLAY */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#03040b]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#080a1a] border border-white/10 rounded-[35px] max-w-3xl w-full max-h-[85vh] overflow-y-auto relative z-10 p-6 md:p-10 shadow-[0_0_50px_rgba(6,182,212,0.15)] scrollbar-thin"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition cursor-pointer p-1"
              >
                <X size={20} />
              </button>

              <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                Opportunity Details
              </span>

              <h3 className="text-2xl md:text-3xl font-black text-white mt-4 mb-6">
                Founding Growth Partner (Sales & Marketing)
              </h3>

              <div className="space-y-8 text-sm md:text-base leading-relaxed">
                <div>
                  <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-xs mb-3 font-mono">ROLE OVERVIEW</h4>
                  <p className="text-gray-300 mb-4 font-semibold">
                    We are not looking for a traditional employee.
                  </p>
                  <p className="text-gray-400 mb-4">
                    We are looking for someone who wants to grow alongside the company and become a long-term growth partner.
                  </p>
                  <p className="text-gray-400 mb-2">This opportunity is ideal for individuals who:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
                    <li>Want to build something meaningful</li>
                    <li>Have an entrepreneurial mindset</li>
                    <li>Enjoy sales, marketing, networking, and business growth</li>
                    <li>Want to earn through successful projects rather than fixed monthly salaries</li>
                    <li>Are interested in growing with a technology startup</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-xs mb-3 font-mono">YOUR RESPONSIBILITIES</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
                    {RESPONSIBILITIES.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-xs mb-3 font-mono">WHAT YOU RECEIVE</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-cyan-400 font-medium">
                    {BENEFITS.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3.5 border border-white/10 rounded-xl hover:bg-white/5 text-sm font-semibold tracking-wide transition"
                >
                  Cancel
                </button>
                <button
                  onClick={openFormAndScroll}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition"
                >
                  Apply As Growth Partner
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* APPLICATION FORM & SUCCESS CONTAINER */}
      <section id="application-form-container" className="py-20 relative">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {!isFormOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center py-10 bg-white/5 border border-white/10 rounded-[35px] p-8 md:p-12 relative overflow-hidden"
              >
                <h3 className="text-2xl font-black mb-4">Start Your Application Journey</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">
                  Ready to align with our team? Fill out our premium multi-step partner alignment process.
                </p>
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-black text-sm tracking-wide transition inline-flex items-center gap-2"
                >
                  Apply As Growth Partner
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            ) : isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#080a1a] border border-cyan-500/20 rounded-[35px] p-8 md:p-12 text-center shadow-[0_0_40px_rgba(6,182,212,0.1)] relative overflow-hidden"
              >
                <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-cyan-400" size={32} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Application Submitted Successfully</h3>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  Thank you for your interest in becoming a Growth Partner at Codemates.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto">
                  We are looking for people who want to build, grow, and succeed together. If your profile aligns with our vision, we will reach out for further discussion.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-[#080a1a] border border-white/10 rounded-[35px] p-6 md:p-10 shadow-xl relative"
              >
                {/* Close Form option */}
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-6 right-6 text-gray-500 hover:text-white transition cursor-pointer p-1"
                >
                  <X size={20} />
                </button>

                {/* Stepper Indicators */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
                          currentStep >= step
                            ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                            : "bg-white/5 border border-white/10 text-gray-500"
                        }`}
                      >
                        {currentStep > step ? <Check size={12} /> : step}
                      </div>
                      <span
                        className={`text-xs font-semibold tracking-wider uppercase hidden sm:inline ${
                          currentStep === step ? "text-cyan-400" : "text-gray-500"
                        }`}
                      >
                        {step === 1 ? "Personal" : step === 2 ? "Questions" : "Upload"}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* STEP 1 */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <h4 className="text-lg font-bold text-white mb-2">Step 1: Personal Information</h4>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider font-mono text-gray-400">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full bg-white/5 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-500 rounded-xl px-4 py-3.5 text-sm transition outline-none placeholder:text-gray-600"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider font-mono text-gray-400">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. john@example.com"
                            className="w-full bg-white/5 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-500 rounded-xl px-4 py-3.5 text-sm transition outline-none placeholder:text-gray-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider font-mono text-gray-400">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full bg-white/5 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-500 rounded-xl px-4 py-3.5 text-sm transition outline-none placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider font-mono text-gray-400">LinkedIn URL</label>
                        <input
                          type="url"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          placeholder="e.g. https://linkedin.com/in/username"
                          className="w-full bg-white/5 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-500 rounded-xl px-4 py-3.5 text-sm transition outline-none placeholder:text-gray-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider font-mono text-gray-400">Current Location *</label>
                        <input
                          type="text"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Bangalore, India (Remote / Hybrid)"
                          className="w-full bg-white/5 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-500 rounded-xl px-4 py-3.5 text-sm transition outline-none placeholder:text-gray-600"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2 */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h4 className="text-lg font-bold text-white mb-2">Step 2: Growth Partner Questions</h4>

                      {/* Q1 */}
                      <div className="space-y-2.5">
                        <span className="text-sm text-gray-300 block font-medium">1. What are you looking for?</span>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {["A Job", "A Long-Term Company Partnership", "Exploring Both Opportunities"].map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setQuestion1(opt)}
                              className={`px-4 py-3 rounded-xl border text-xs text-left font-semibold transition ${
                                question1 === opt
                                  ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
                                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q2 */}
                      <div className="space-y-2.5">
                        <span className="text-sm text-gray-300 block font-medium">2. How would you prefer to earn?</span>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {["Fixed Monthly Salary", "Revenue Share From Successful Projects", "Combination Of Both"].map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setQuestion2(opt)}
                              className={`px-4 py-3 rounded-xl border text-xs text-left font-semibold transition ${
                                question2 === opt
                                  ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
                                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q3 */}
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300 block font-medium">3. How will you help Codemates grow?</label>
                        <textarea
                          maxLength={200}
                          value={question3}
                          onChange={(e) => setQuestion3(e.target.value)}
                          placeholder="Briefly pitch your growth plan or strategy..."
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm transition outline-none placeholder:text-gray-600 resize-none"
                        />
                        <div className="flex justify-end text-xs text-gray-500 font-mono">
                          {question3.length} / 200
                        </div>
                      </div>

                      {/* Q4 */}
                      <div className="space-y-2.5">
                        <span className="text-sm text-gray-300 block font-medium">4. Which mindset best describes you?</span>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {["Employee", "Owner", "Partner"].map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setQuestion4(opt)}
                              className={`px-4 py-3 rounded-xl border text-xs text-left font-semibold transition ${
                                question4 === opt
                                  ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
                                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q5 */}
                      <div className="space-y-2.5">
                        <span className="text-sm text-gray-300 block font-medium">5. Are you comfortable collaborating with other team members to achieve company goals?</span>
                        <div className="grid grid-cols-2 gap-3 max-w-xs">
                          {["Yes", "No"].map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setQuestion5(opt)}
                              className={`px-4 py-3 rounded-xl border text-xs text-center font-semibold transition ${
                                question5 === opt
                                  ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
                                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q6 */}
                      <div className="space-y-2.5">
                        <span className="text-sm text-gray-300 block font-medium">6. What creates sustainable growth?</span>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {["More Clients", "Happy Clients", "Both Together"].map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setQuestion6(opt)}
                              className={`px-4 py-3 rounded-xl border text-xs text-left font-semibold transition ${
                                question6 === opt
                                  ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
                                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q7 */}
                      <div className="space-y-2.5">
                        <span className="text-sm text-gray-300 block font-medium">7. Are you genuinely interested in becoming a company partner rather than a traditional employee?</span>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {["Yes", "No", "Need More Information"].map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setQuestion7(opt)}
                              className={`px-4 py-3 rounded-xl border text-xs text-left font-semibold transition ${
                                question7 === opt
                                  ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
                                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3 */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h4 className="text-lg font-bold text-white mb-2">Step 3: Resume Upload</h4>

                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider font-mono text-gray-400">Upload Resume *</label>
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-white/10 hover:border-cyan-500/40 bg-white/5 rounded-2xl p-8 text-center cursor-pointer transition"
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                          {resumeFile ? (
                            <div className="flex flex-col items-center gap-2">
                              <FileText className="text-cyan-400 mb-2" size={32} />
                              <span className="text-sm font-semibold text-white truncate max-w-xs">
                                {resumeFile.name}
                              </span>
                              <span className="text-xs text-gray-500 font-mono">
                                {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="text-gray-500 mb-2" size={32} />
                              <span className="text-sm text-gray-300 font-semibold">Select files from computer</span>
                              <span className="text-xs text-gray-500 font-mono">PDF, DOC, DOCX (Max 10MB)</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={declarationChecked}
                            onChange={(e) => setDeclarationChecked(e.target.checked)}
                            className="mt-1 accent-cyan-500 h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                          />
                          <span className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                            I understand that this opportunity is based on partnership, contribution, and project success rather than a guaranteed monthly salary.
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {/* Errors */}
                  {submitError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-semibold">
                      {submitError}
                    </div>
                  )}

                  {/* Form Footer Action Buttons */}
                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-6 py-3 border border-white/10 rounded-xl hover:bg-white/5 text-sm font-semibold transition"
                      >
                        Previous
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold text-sm transition"
                      >
                        Next Step
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3.5 rounded-xl font-bold text-sm transition shadow-[0_0_15px_rgba(6,182,212,0.25)] flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={16} />
                            Submitting...
                          </>
                        ) : (
                          "Apply As Growth Partner"
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* LIFE AT CODEMATES */}
      <section className="py-24 bg-[#03040c] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs font-mono">
              CULTURE & VIBES
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
              Life At Codemates
            </h2>
            <p className="text-gray-400 mt-4 text-sm md:text-base">
              A glimpse into the operating system of our organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {VALUES.map((value, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className={`bg-gradient-to-br ${value.gradient} border ${value.border} rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[220px] backdrop-blur-md transition-all duration-300 relative group`}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-black text-white">{value.title}</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mt-6">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs font-mono">
              THE JOURNEY
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
              Hiring Process
            </h2>
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-12">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#060816] border-2 border-white/10 group-hover:border-cyan-400 flex items-center justify-center text-xs font-bold font-mono transition-colors">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-[#03040c] border-y border-white/5 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs font-mono">
              KNOWLEDGE BASE
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-sm md:text-base text-white hover:text-cyan-400 transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180 text-cyan-400" : ""
                    }`}
                    size={18}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-12 md:p-16 text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.2),transparent_40%)]" />

            <h2 className="text-4xl md:text-5xl font-black leading-tight text-white mb-6">
              Ready To Build Something Meaningful?
            </h2>

            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              We look for creators, growth architects, and long-term partners. Submit your profile today to start the collaboration dialogue.
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <button
                onClick={openFormAndScroll}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-8 py-4.5 rounded-2xl text-sm md:text-base tracking-wide transition shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
              >
                Apply As Growth Partner
              </button>
              <Link
                href="/projects"
                className="border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4.5 rounded-2xl text-sm md:text-base tracking-wide transition"
              >
                Join The Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 text-center text-gray-500 bg-[#03040c]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="text-lg font-bold tracking-wide flex items-center gap-1.5 group">
            <span className="text-white group-hover:text-cyan-400 transition">Codemates</span>
            <span className="text-cyan-400 group-hover:text-white transition">India</span>
          </Link>
          <p className="text-sm">© 2026 Codemates. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/careers" className="text-cyan-400 hover:text-white transition">Careers</Link>
            <Link href="/estimate" className="hover:text-white transition">Estimate</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
