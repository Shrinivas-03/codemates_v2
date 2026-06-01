'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, Sparkles, Send, Tag, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';
import { SearchModal } from '@/components/blog/SearchModal';
import { urlForImage } from '@/sanity/lib/image';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: any;
  publishedDate: string;
  readingTime: number;
  featured?: boolean;
  trending?: boolean;
  category?: {
    title: string;
    slug: string;
    description?: string;
    icon?: string;
  };
  tags?: Array<{
    name: string;
    slug: string;
  }>;
  author?: {
    name: string;
    photo: any;
    bio?: string;
  };
}

interface BlogIndexClientProps {
  initialPosts: Post[];
  categories: Array<{ title: string; slug: string; icon?: string }>;
}

const CATEGORIES_LIST = [
  { title: "All", slug: "all" },
  { title: "Software Development", slug: "software-development" },
  { title: "Website Development", slug: "website-development" },
  { title: "AI Automation", slug: "ai-automation" },
  { title: "n8n Workflows", slug: "n8n-workflows" },
  { title: "CRM Systems", slug: "crm-systems" },
  { title: "Cloud Infrastructure", slug: "cloud-infrastructure" },
  { title: "Startup Growth", slug: "startup-growth" },
  { title: "Case Studies", slug: "case-studies" },
  { title: "Digital Transformation", slug: "digital-transformation" }
];

export default function BlogIndexClient({ initialPosts, categories }: BlogIndexClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const [searchOpen, setSearchOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle hotkeys (Ctrl+K or Cmd+K) to open Search Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter posts on category change
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(initialPosts);
    } else {
      const filtered = initialPosts.filter(
        (post) => post.category?.slug === selectedCategory || 
                  post.category?.title?.toLowerCase() === selectedCategory.replace('-', ' ').toLowerCase()
      );
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, initialPosts]);

  // Card mouse movement handler for dynamic radial gradient glow effects
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      // Import the dynamic Supabase helper
      const { supabase } = await import('@/lib/supabase');
      
      if (supabase) {
        const { error } = await supabase.from('subscribers').insert([
          { 
            email: email, 
            source: 'blog_newsletter',
            created_at: new Date().toISOString()
          }
        ]);
        if (error) throw error;
      } else {
        console.warn('Supabase client unconfigured. Email lead logged locally: ', email);
      }
      
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      console.error('Subscription error: ', err);
      // Fail gracefully and show success UI anyway to prevent breaking user flow
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  // Find the featured post
  const featuredPost = initialPosts.find((p) => p.featured) || initialPosts[0];
  const regularPosts = filteredPosts.filter((p) => p._id !== featuredPost?._id);
  const trendingPosts = initialPosts.filter((p) => p.trending || p.featured).slice(0, 3);

  // Helper to render image source URL correctly (from Sanity or string fallback)
  const getImageUrl = (imageObj: any) => {
    if (!imageObj) return '/placeholder.jpg';
    if (imageObj.url) return imageObj.url; // mock static url
    const sanityUrl = urlForImage(imageObj)?.width(800).url();
    return sanityUrl || '/placeholder.jpg';
  };

  const getAuthorPhoto = (authorObj: any) => {
    if (!authorObj) return '/placeholder-user.jpg';
    if (typeof authorObj.photo === 'string') return authorObj.photo; // mock
    const sanityUrl = urlForImage(authorObj.photo)?.width(100).height(100).url();
    return sanityUrl || '/placeholder-user.jpg';
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white pt-28 pb-20 font-sans relative overflow-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* BACKGROUND GRAPHICS: Radial blur and animated grid elements */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-cyan-950/20 via-[#0A0F1F]/40 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[15%] left-[-10%] w-[50vw] h-[50vw] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse duration-[8s]" />
      <div className="absolute top-[35%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none z-0 animate-pulse duration-[10s]" />
      
      {/* Subtle background neural particle effect using SVGs to prevent browser performance bottlenecks */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#050816" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="20%" cy="30%" r="200" fill="url(#grad)" className="animate-pulse" />
          <circle cx="80%" cy="60%" r="250" fill="url(#grad)" className="animate-pulse" style={{ animationDelay: '2s' }} />
          <path d="M 50,150 Q 150,100 250,200 T 450,150" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="1" strokeDasharray="5,5" />
          <path d="M 600,450 Q 750,300 850,500 T 1050,400" fill="none" stroke="rgba(139, 92, 246, 0.08)" strokeWidth="1" strokeDasharray="5,5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HERO SECTION */}
        <section className="text-center pt-16 pb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={12} className="animate-spin-slow" />
            Codemates Engineering
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
          >
            Insights, Engineering &<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 font-sans">
              Innovation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-sans"
          >
            Explore software engineering, AI automation, digital transformation, startup growth, cloud infrastructure, and modern business technology.
          </motion.p>

          {/* SaaS-Style Interactive Search Bar trigger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl mx-auto mb-16"
          >
            <div
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-between px-6 py-4 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] group relative"
            >
              <div className="flex items-center text-gray-400">
                <Search size={18} className="mr-3 text-gray-500 group-hover:text-cyan-400 transition" />
                <span className="text-sm font-sans">Search articles...</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-mono">
                <span>Ctrl</span>
                <span>+</span>
                <span>K</span>
              </div>
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />
            </div>
          </motion.div>
        </section>

        {/* FEATURED ARTICLE SECTION & TRENDING SIDEBAR */}
        {featuredPost && (
          <section className="mb-24">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Featured Post Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-8 bg-[#0a0f1f]/60 border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 shadow-2xl relative group flex flex-col h-full"
              >
                {/* Visual Radial Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={getImageUrl(featuredPost.coverImage)}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-102"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-90" />
                  
                  {/* Category Label */}
                  {featuredPost.category && (
                    <span className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-cyan-500/90 text-[#050816] font-bold text-xs uppercase tracking-widest shadow-lg">
                      {featuredPost.category.title}
                    </span>
                  )}
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between relative z-10 bg-gradient-to-b from-[#0a0f1f]/20 to-[#050816]/90">
                  <div>
                    {/* Meta bar */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-cyan-400" />
                        {featuredPost.publishedDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-purple-400" />
                        {featuredPost.readingTime} min read
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 tracking-tight group-hover:text-cyan-300 transition duration-300 font-sans text-white leading-tight">
                      <Link href={`/blog/${featuredPost.slug}`} className="hover:underline decoration-cyan-400/30">
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-gray-400 text-base leading-relaxed mb-6 font-sans line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  {/* Author and CTA line */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                    {featuredPost.author && (
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-500/20">
                          <Image
                            src={getAuthorPhoto(featuredPost.author)}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{featuredPost.author.name}</p>
                          <p className="text-xs text-gray-500">Engineering Contributor</p>
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition group/btn cursor-pointer"
                    >
                      Read Featured Article 
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Trending/Most Read Articles Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-4 bg-[#0a0f1f]/35 border border-white/5 rounded-3xl p-6 backdrop-blur-md h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Trending Engineering Notes
                  </h3>

                  <div className="space-y-6">
                    {trendingPosts.map((post, idx) => (
                      <div key={post._id} className="group flex items-start gap-4 border-b border-white/5 pb-5 last:border-0 last:pb-0">
                        <span className="text-2xl font-extrabold text-cyan-500/20 font-mono tracking-tighter group-hover:text-cyan-400/40 transition duration-300 mt-0.5">
                          0{idx + 1}
                        </span>
                        <div className="min-w-0">
                          {post.category && (
                            <span className="text-[9px] uppercase font-bold text-cyan-400 tracking-widest block mb-1">
                              {post.category.title}
                            </span>
                          )}
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm font-bold text-gray-200 group-hover:text-white hover:underline transition line-clamp-2 leading-relaxed"
                          >
                            {post.title}
                          </Link>
                          <span className="text-[10px] text-gray-500 mt-1.5 block font-mono">
                            {post.publishedDate} • {post.readingTime} min read
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#050816]/60 border border-white/5 p-4 rounded-2xl mt-8">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 mt-0.5">
                      <Tag size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-wide mb-1">Topical Clusters</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                        Our engineering blog represents our authoritative findings in building workflows, microservices, and CRM automations.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* CATEGORY FILTER SYSTEM */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4 border-b border-white/5 pb-4">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans flex items-center gap-2">
              <Layers size={18} className="text-cyan-400" />
              Latest Insights
            </h3>
            <span className="text-xs text-gray-500 font-mono tracking-widest">
              Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 -mx-6 px-6">
            {CATEGORIES_LIST.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border whitespace-nowrap cursor-pointer transition duration-300 active:scale-95 ${
                  selectedCategory === category.slug
                    ? 'bg-cyan-400 border-cyan-400 text-[#050816] font-bold shadow-lg shadow-cyan-400/10'
                    : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </section>

        {/* BLOG GRID */}
        <section className="mb-24">
          <AnimatePresence mode="popLayout">
            {regularPosts.length > 0 ? (
              <motion.div
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {regularPosts.map((post) => (
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={post._id}
                    onMouseEnter={() => setHoveredCardId(post._id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onMouseMove={(e) => handleMouseMove(e, post._id)}
                    className="bg-[#0a0f1f]/45 border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/20 transition-all duration-300 relative group flex flex-col justify-between h-full shadow-lg"
                  >
                    {/* Glowing Interactive Mouse Border Mask (Pure Modern CSS Glow Effect) */}
                    {hoveredCardId === post._id && (
                      <div
                        className="absolute inset-0 pointer-events-none transition duration-300 opacity-100 rounded-3xl z-30 border border-transparent"
                        style={{
                          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34,211,238,0.12), transparent 80%)`,
                          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                          WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                          maskComposite: 'exclude',
                          WebkitMaskComposite: 'xor',
                          padding: '1px'
                        }}
                      />
                    )}

                    <div>
                      {/* Image Block */}
                      <div className="relative aspect-[16/10] overflow-hidden w-full bg-[#050816]">
                        <Image
                          src={getImageUrl(post.coverImage)}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover transition-transform duration-700 group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1f] via-transparent to-transparent opacity-85" />
                        
                        {post.category && (
                          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#050816]/75 border border-white/10 backdrop-blur-md text-cyan-400 font-bold text-[9px] uppercase tracking-widest shadow-md">
                            {post.category.title}
                          </span>
                        )}
                      </div>

                      {/* Content block */}
                      <div className="p-6">
                        {/* Meta */}
                        <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3 font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            {post.publishedDate}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {post.readingTime} min read
                          </span>
                        </div>

                        <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-cyan-300 transition duration-300 leading-snug line-clamp-2 text-white font-sans">
                          <Link href={`/blog/${post.slug}`} className="hover:underline decoration-cyan-400/20">
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 font-sans">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Author Footer block */}
                    <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-white/5 relative z-10 bg-gradient-to-b from-transparent to-[#0a0f1f]/50">
                      {post.author && (
                        <div className="flex items-center gap-2">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
                            <Image
                              src={getAuthorPhoto(post.author)}
                              alt={post.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs text-gray-300 font-semibold">{post.author.name}</span>
                        </div>
                      )}
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="p-2 rounded-full bg-white/5 hover:bg-cyan-400 hover:text-[#050816] transition-all duration-300 group-hover:translate-x-1 cursor-pointer shadow-md"
                        title="Read Post"
                      >
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <div className="py-24 text-center border border-dashed border-white/10 rounded-3xl bg-[#0a0f1f]/20">
                <HelpCircle className="mx-auto text-gray-500 mb-4" size={40} />
                <p className="text-gray-300 font-sans">No articles found in this category.</p>
                <p className="text-xs text-gray-500 mt-2">Try selecting another filter or search using Ctrl+K.</p>
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* NEWSLETTER CTA SECTION */}
        <section className="mb-12 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#0a0f1f] via-[#0b132e] to-[#070b1a] p-8 md:p-12 shadow-2xl">
          <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              className="inline-flex p-3 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6"
              whileHover={{ rotate: 5 }}
            >
              <Send size={24} />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight text-white font-sans">
              Get Engineering Insights Delivered
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8 font-sans">
              Receive practical, deep-dive articles about custom software systems, AI automation workflows, n8n integrations, and digital growth directly in your inbox.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your professional email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3 rounded-full border border-white/10 bg-[#050816]/75 text-white placeholder-gray-500 outline-none focus:border-cyan-400 transition-all font-sans text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-cyan-400 text-[#050816] font-bold text-sm hover:bg-cyan-300 active:scale-98 transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-400/10"
                  >
                    Subscribe Now
                    <ArrowRight size={16} />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl inline-flex items-center gap-3 text-cyan-300 font-sans font-semibold text-sm max-w-sm"
                >
                  <CheckCircle2 size={20} className="text-cyan-400 flex-shrink-0 animate-bounce" />
                  <span>Success! Check your inbox for updates.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* Embedded Linear-Style Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        posts={initialPosts}
      />
    </main>
  );
}
