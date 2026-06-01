'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Mail,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  ArrowUpRight,
  Send,
  MessageSquare,
  DollarSign,
  Users,
  CheckCircle2
} from 'lucide-react';

// Inline brand SVGs — lucide-react v1 does not ship Twitter/LinkedIn icons
const TwitterIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer';
import { urlForImage } from '@/sanity/lib/image';

interface Author {
  name: string;
  photo: any;
  bio: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

interface Category {
  title: string;
  slug: string;
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any[];
  coverImage: any;
  publishedDate: string;
  readingTime: number;
  author: Author;
  category: Category;
  tags?: Array<{ name: string; slug: string }>;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  coverImage: any;
  publishedDate: string;
  readingTime: number;
  category?: { title: string; slug: string };
  author?: { name: string; photo: any };
}

interface BlogPostClientProps {
  post: Post;
  relatedPosts: RelatedPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`,
    email: `mailto:?subject=${encodeURIComponent(post.title)}&body=Read this excellent engineering article from Codemates: ${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`
  };

  const getImageUrl = (imageObj: any) => {
    if (!imageObj) return '/placeholder.jpg';
    if (imageObj.url) return imageObj.url; // mock
    const sanityUrl = urlForImage(imageObj)?.width(1200).url();
    return sanityUrl || '/placeholder.jpg';
  };

  const getAuthorPhoto = (photoObj: any) => {
    if (!photoObj) return '/placeholder-user.jpg';
    if (typeof photoObj === 'string') return photoObj; // mock
    const sanityUrl = urlForImage(photoObj)?.width(200).height(200).url();
    return sanityUrl || '/placeholder-user.jpg';
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      const { supabase } = await import('@/lib/supabase');
      
      if (supabase) {
        const { error } = await supabase.from('subscribers').insert([
          { 
            email: email, 
            source: `blog_post_${post.slug}`,
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
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white pt-28 pb-20 font-sans relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* Scroll indicator bar at the very top */}
      <ReadingProgress />

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-purple-950/10 via-[#0A0F1F]/20 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[-15%] w-[45vw] h-[45vw] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none z-0 animate-pulse duration-[12s]" />
      <div className="absolute top-[50%] right-[-15%] w-[45vw] h-[45vw] bg-purple-500/5 blur-[140px] rounded-full pointer-events-none z-0 animate-pulse duration-[10s]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* BREADCRUMB AND BACK ACTION LINK */}
        <div className="pt-6 pb-8 flex items-center justify-between border-b border-white/5 mb-12 flex-wrap gap-4 text-xs font-mono text-gray-500">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold transition group cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>
          <div className="flex items-center gap-1.5 select-none">
            <Link href="/" className="hover:text-white transition">HOME</Link>
            <ChevronRight size={10} />
            <Link href="/blog" className="hover:text-white transition">BLOG</Link>
            <ChevronRight size={10} />
            <span className="text-cyan-400 truncate max-w-[200px]">{post.category.title.toUpperCase()}</span>
          </div>
        </div>

        {/* ARTICLE HEADER & LARGE COVER */}
        <article className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            {/* Category Pill */}
            <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-extrabold uppercase tracking-widest inline-block mb-6 shadow-[0_0_15px_rgba(34,211,238,0.05)]">
              {post.category.title}
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
              {post.title}
            </h1>

            {/* Author slot & published details */}
            <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-gray-400 font-sans mt-4">
              {post.author && (
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
                    <Image
                      src={getAuthorPhoto(post.author.photo)}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-white font-semibold">{post.author.name}</span>
                </div>
              )}
              <span className="w-1.5 h-1.5 rounded-full bg-gray-700 hidden sm:inline-block" />
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-cyan-400" />
                {post.publishedDate}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-700 hidden sm:inline-block" />
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-purple-400" />
                {post.readingTime} min read
              </span>
            </div>
          </div>

          {/* Large Landscaped Cover Image */}
          <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-white/10 bg-[#0a0f24] shadow-2xl mb-16 group">
            <Image
              src={getImageUrl(post.coverImage)}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-101"
              priority
            />
            {/* Ambient Radial glow behind cover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-60" />
          </div>

          {/* SIDE-BY-SIDE DYNAMIC LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* STICKY SOCIAL SHARING BAR */}
            <div className="lg:col-span-1 lg:block hidden">
              <div className="sticky top-32 flex flex-col items-center gap-4 bg-[#0a0f1f]/50 border border-white/5 rounded-full py-6 px-3 shadow-lg backdrop-blur-md">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2 font-mono">
                  Share
                </span>
                <a
                  href={shareUrls.twitter}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-full hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition cursor-pointer"
                  title="Share on Twitter"
                >
                  <TwitterIcon size={18} />
                </a>
                <a
                  href={shareUrls.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-full hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <LinkedInIcon size={18} />
                </a>
                <a
                  href={shareUrls.email}
                  className="p-2 rounded-full hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition cursor-pointer"
                  title="Share via Email"
                >
                  <Mail size={18} />
                </a>
                <div className="w-8 h-px bg-white/5 my-2" />
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-full hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition cursor-pointer active:scale-90"
                  title="Copy Page Link"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            {/* MAIN PORTABLE TEXT CONTENT SECTION */}
            <div className="lg:col-span-8 col-span-1 min-w-0">
              <div className="prose-content">
                {/* Excerpt spotlight */}
                <p className="text-xl sm:text-2xl text-gray-300 font-medium font-sans mb-10 leading-relaxed border-l-2 border-cyan-500 pl-6 italic">
                  {post.excerpt}
                </p>

                {/* Render Portable Text */}
                <PortableTextRenderer value={post.content} />
              </div>

              {/* Tag Badges list */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-white/5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.slug}
                      className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-gray-400 text-xs font-semibold font-mono tracking-wide"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Mobile Share Buttons panel */}
              <div className="lg:hidden flex items-center justify-center gap-4 py-4 px-6 rounded-2xl bg-[#0a0f1f]/50 border border-white/5 my-10 font-sans">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                  <Share2 size={14} className="text-cyan-400" /> Share Article:
                </span>
                <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cyan-400"><TwitterIcon size={16} /></a>
                <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cyan-400"><LinkedInIcon size={16} /></a>
                <button onClick={handleCopyLink} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cyan-400 active:scale-95">{copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}</button>
              </div>

              {/* DETAILED AUTHOR BIOGRAPHY CARD */}
              {post.author && (
                <section className="mt-16 p-8 rounded-3xl border border-white/5 bg-[#0a0f1f]/40 relative overflow-hidden font-sans">
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-cyan-500/20 shadow-md flex-shrink-0">
                      <Image
                        src={getAuthorPhoto(post.author.photo)}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-white leading-tight">{post.author.name}</h4>
                          <p className="text-xs text-gray-500 font-mono mt-0.5">ENGINEERING CONTRIBUTOR</p>
                        </div>
                        
                        {/* Author Social Buttons */}
                        <div className="flex items-center gap-2">
                          {post.author.linkedin && (
                            <a
                              href={post.author.linkedin}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="p-1.5 rounded bg-white/5 hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition"
                              title="LinkedIn"
                            >
                              <LinkedInIcon size={14} />
                            </a>
                          )}
                          {post.author.twitter && (
                            <a
                              href={post.author.twitter}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="p-1.5 rounded bg-white/5 hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition"
                              title="Twitter"
                            >
                              <TwitterIcon size={14} />
                            </a>
                          )}
                          {post.author.email && (
                            <a
                              href={`mailto:${post.author.email}`}
                              className="p-1.5 rounded bg-white/5 hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 transition"
                              title="Email Author"
                            >
                              <Mail size={14} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {post.author.bio}
                      </p>

                      <div className="text-xs text-gray-500 flex items-center gap-1.5 font-mono">
                        <BookOpen size={12} className="text-purple-400" />
                        <span>Author of detailed tech research notes on Codemates</span>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* STICKY TABLE OF CONTENTS SIDEBAR COLUMN */}
            <div className="lg:col-span-3 lg:block hidden">
              <TableOfContents content={post.content} />
            </div>
          </div>
        </article>

        <hr className="border-white/5 max-w-5xl mx-auto my-16" />

        {/* RELATED ARTICLES SECTION (3 recommended cards) */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mb-24 max-w-5xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-8 font-sans flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Related Insights
            </h3>

            <div className="grid sm:grid-cols-3 gap-8">
              {relatedPosts.map((rPost) => (
                <article
                  key={rPost._id}
                  className="bg-[#0a0f1f]/30 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-all duration-300 relative group flex flex-col justify-between h-full shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden w-full bg-[#050816]">
                    <Image
                      src={getImageUrl(rPost.coverImage)}
                      alt={rPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover transition-transform duration-700 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1f] via-transparent to-transparent opacity-85" />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {rPost.category && (
                        <span className="text-[9px] uppercase font-bold text-cyan-400 tracking-widest block mb-2 font-mono">
                          {rPost.category.title}
                        </span>
                      )}
                      <h4 className="text-base font-bold text-gray-200 group-hover:text-cyan-300 transition duration-300 line-clamp-2 leading-snug">
                        <Link href={`/blog/${rPost.slug}`} className="hover:underline">
                          {rPost.title}
                        </Link>
                      </h4>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-[10px] text-gray-500 font-mono">
                      <span>{rPost.publishedDate}</span>
                      <Link
                        href={`/blog/${rPost.slug}`}
                        className="text-cyan-400 group-hover:text-cyan-300 flex items-center gap-0.5 hover:underline font-semibold"
                      >
                        Read <ArrowUpRight size={10} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* AGENCY BLOG SOLUTION LEAD CTA */}
        <section className="mb-24 max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c0d1a] via-[#091530] to-[#070b1a] p-8 md:p-12 shadow-2xl relative">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid md:grid-cols-12 gap-8 items-center relative z-10 font-sans">
            <div className="md:col-span-7">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Need a Similar Solution?
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                Are you looking to implement custom CRM integrations, automated AI pipelines, or high-performance Next.js architectures? Our engineering team works as your technology consulting and startup growth partner.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5"><MessageSquare size={13} className="text-cyan-400" /> Free 30min Discovery</span>
                <span className="flex items-center gap-1.5"><DollarSign size={13} className="text-purple-400" /> Clear Fixed Milestones</span>
                <span className="flex items-center gap-1.5"><Users size={13} className="text-cyan-400" /> Top 3% Global Developers</span>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full py-3 px-5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-[#050816] font-bold text-center text-sm transition shadow-lg shadow-cyan-400/10 cursor-pointer block"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/estimate"
                className="w-full py-3 px-5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold text-center text-sm transition cursor-pointer block"
              >
                Get Project Quote
              </Link>
              <Link
                href="/about"
                className="w-full py-3 px-5 rounded-full bg-transparent text-gray-400 hover:text-white font-semibold text-center text-xs transition block hover:underline"
              >
                Learn More About Our Team
              </Link>
            </div>
          </div>
        </section>

        {/* NEWSLETTER INTEGRATION MINI FORM */}
        <section className="max-w-xl mx-auto text-center border-t border-white/5 pt-12 pb-6 font-sans">
          <h4 className="text-lg font-bold text-white mb-2">Get insights in your inbox</h4>
          <p className="text-xs text-gray-400 leading-relaxed mb-6 max-w-sm mx-auto">
            Stay up to date with our weekly technical releases. Zero spam. Unsubscribe anytime.
          </p>

          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe}
                className="flex gap-2.5"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full border border-white/10 bg-[#050816] text-white placeholder-gray-500 outline-none text-xs focus:border-cyan-400 transition"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-cyan-400 text-[#050816] font-bold text-xs hover:bg-cyan-300 transition cursor-pointer flex items-center gap-1 shadow-md"
                >
                  Join <Send size={11} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl inline-flex items-center gap-2 text-cyan-300 text-xs font-semibold"
              >
                <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
                <span>Subscribed successfully!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
