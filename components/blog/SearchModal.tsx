'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

interface PostItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: any[];
  category?: {
    title: string;
    slug: string;
  };
  tags?: Array<{
    name: string;
    slug: string;
  }>;
  publishedDate?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: PostItem[];
}

const getPortableTextText = (content: any[]): string => {
  if (!content || !Array.isArray(content)) return '';
  return content
    .map((block) => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map((c: any) => c.text).join(' ');
    })
    .join(' ');
};

const SUGGESTIONS = [
  'AI Automation',
  'n8n workflows',
  'CRM systems',
  'Software development',
  'Digital Transformation',
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, posts }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Trigger search on query change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase().trim();
    const filtered = posts.filter((post) => {
      const titleMatch = post.title?.toLowerCase().includes(lowerQuery);
      const excerptMatch = post.excerpt?.toLowerCase().includes(lowerQuery);
      const categoryMatch = post.category?.title?.toLowerCase().includes(lowerQuery);
      const tagsMatch = post.tags?.some((t) => t.name?.toLowerCase().includes(lowerQuery));
      const contentText = post.content ? getPortableTextText(post.content) : '';
      const contentMatch = contentText?.toLowerCase().includes(lowerQuery);

      return titleMatch || excerptMatch || categoryMatch || tagsMatch || contentMatch;
    });

    setResults(filtered);
    setSelectedIndex(0);
  }, [query, posts]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard navigation (Arrows, Enter, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const limit = results.length > 0 ? results.length : SUGGESTIONS.length;
          return (prev + 1) % limit;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const limit = results.length > 0 ? results.length : SUGGESTIONS.length;
          return (prev - 1 + limit) % limit;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0) {
          handleSelect(results[selectedIndex].slug);
        } else {
          setQuery(SUGGESTIONS[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (slug: string) => {
    onClose();
    router.push(`/blog/${slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#0a0f1f]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden font-sans backdrop-blur-xl"
          >
            {/* Search Input Area */}
            <div className="flex items-center px-6 py-4 border-b border-white/5 relative">
              <Search className="text-gray-400 mr-4" size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search articles by title, tag, category, content..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent text-white w-full border-none outline-none text-base placeholder-gray-500 focus:ring-0"
              />
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/5 cursor-pointer ml-4"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Listing Area */}
            <div className="max-h-[380px] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10">
              {query.trim() === '' ? (
                // Initial State: Suggestions & Hints
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest px-3 mb-2 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-cyan-400" />
                    Trending Suggestions
                  </div>
                  <div className="space-y-1">
                    {SUGGESTIONS.map((suggestion, idx) => (
                      <button
                        key={suggestion}
                        onClick={() => setQuery(suggestion)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between text-sm transition duration-150 cursor-pointer ${
                          selectedIndex === idx
                            ? 'bg-white/5 text-cyan-400'
                            : 'text-gray-400 hover:bg-white/[0.02] hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Search size={14} className="opacity-65" />
                          {suggestion}
                        </span>
                        {selectedIndex === idx && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            Search <CornerDownLeft size={10} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                // Search Results
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">
                    Found {results.length} article{results.length > 1 ? 's' : ''}
                  </div>
                  <div className="space-y-1">
                    {results.map((post, idx) => (
                      <div
                        key={post._id}
                        onClick={() => handleSelect(post.slug)}
                        className={`px-4 py-3 rounded-lg flex items-start gap-4 cursor-pointer transition duration-150 relative group ${
                          selectedIndex === idx
                            ? 'bg-white/5 border-l-2 border-cyan-400 pl-3 text-cyan-300'
                            : 'border-l-2 border-transparent text-gray-300 hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="p-2 rounded bg-white/5 text-cyan-400 border border-white/5 mt-0.5">
                          <FileText size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {post.category && (
                              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400/90 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                                {post.category.title}
                              </span>
                            )}
                            <span className="text-gray-500 text-xs">{post.publishedDate}</span>
                          </div>
                          <h4 className={`text-sm font-semibold truncate ${
                            selectedIndex === idx ? 'text-white' : 'text-gray-200 group-hover:text-white'
                          }`}>
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center self-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight size={14} className="translate-x-[-4px] group-hover:translate-x-0 transition" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // No Results
                <div className="py-12 text-center">
                  <p className="text-gray-400 text-sm">No articles match &quot;{query}&quot;</p>
                  <p className="text-xs text-gray-500 mt-2">Try searching for other terms like &quot;automation&quot; or &quot;workflows&quot;.</p>
                </div>
              )}
            </div>

            {/* Footer / Shortcut Legends */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-white/5 bg-[#050812] text-[10px] text-gray-500 font-sans tracking-wide">
              <div className="flex gap-4">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-gray-400">↑↓</kbd> Navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-gray-400">Enter</kbd> Select
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-gray-400">Esc</kbd> Close
                </span>
              </div>
              <div>Codemates Engineering</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
