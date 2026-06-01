'use client';

import React, { useState } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Maximize2, X } from 'lucide-react';
import { urlForImage } from '@/sanity/lib/image';

// Slugify helper to map headings to anchor links
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// 1. Sleek Code Block Component with Copy Action
interface CodeBlockProps {
  value: {
    language?: string;
    code: string;
    filename?: string;
  };
}

const CodeBlock: React.FC<CodeBlockProps> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const lines = value.code.trim().split('\n');

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0f24] shadow-2xl relative group font-mono text-sm leading-relaxed">
      {/* File Header Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#050816] border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          {value.filename && (
            <span className="text-gray-400 text-xs ml-2 font-sans tracking-wide">
              {value.filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs font-sans text-gray-500">
          <span className="uppercase font-semibold text-cyan-400/80 tracking-widest">{value.language || 'text'}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 hover:text-white transition duration-200 cursor-pointer active:scale-95"
            title="Copy Code"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span className="text-green-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="p-6 overflow-x-auto flex max-h-[500px]">
        {/* Line Numbers */}
        <div className="select-none text-right pr-4 text-gray-600 text-xs flex flex-col border-r border-white/5 min-w-[2.5rem]">
          {lines.map((_, idx) => (
            <span key={idx} className="block leading-6">
              {idx + 1}
            </span>
          ))}
        </div>
        {/* Real Code Body */}
        <pre className="pl-6 text-gray-300 flex-1 leading-6 whitespace-pre font-mono selection:bg-cyan-500/30">
          <code>{value.code}</code>
        </pre>
      </div>
    </div>
  );
};

// 2. Expandable Rich Image Block Component with Framer Motion Zoom
interface ImageBlockProps {
  value: {
    alt: string;
    caption?: string;
    asset: any;
  };
}

const ImageBlock: React.FC<ImageBlockProps> = ({ value }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const imageUrl = urlForImage(value)?.url();

  if (!imageUrl) return null;

  return (
    <>
      <figure className="my-10 relative group">
        <div
          onClick={() => setIsZoomed(true)}
          className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0f24] cursor-zoom-in group hover:border-cyan-500/30 transition-all duration-300"
        >
          <Image
            src={imageUrl}
            alt={value.alt}
            width={800}
            height={500}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            priority={false}
          />
          {/* Zoom Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transform scale-90 group-hover:scale-100 transition-all duration-300">
              <Maximize2 size={20} />
            </div>
          </div>
        </div>
        {value.caption && (
          <figcaption className="mt-3 text-center text-sm text-gray-500 italic font-sans">
            {value.caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-6xl max-h-[80vh] w-full h-full flex items-center justify-center pointer-events-none"
            >
              <Image
                src={imageUrl}
                alt={value.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </motion.div>
            {value.caption && (
              <p className="mt-6 text-gray-400 font-sans text-base max-w-xl text-center pointer-events-none select-none">
                {value.caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// 3. Custom PortableText Components Mapping
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 leading-8 text-gray-300 font-sans text-lg">{children}</p>,
    h1: ({ children }) => {
      const text = React.Children.toArray(children).join('');
      return (
        <h1
          id={slugify(text)}
          className="text-4xl md:text-5xl font-extrabold tracking-tight mt-16 mb-6 text-white font-sans scroll-mt-24"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      const text = React.Children.toArray(children).join('');
      return (
        <h2
          id={slugify(text)}
          className="text-2xl md:text-3xl font-bold tracking-tight mt-14 mb-5 text-white font-sans scroll-mt-24 flex items-center group"
        >
          <span className="text-cyan-400 mr-2 opacity-50 select-none font-light">#</span>
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = React.Children.toArray(children).join('');
      return (
        <h3
          id={slugify(text)}
          className="text-xl md:text-2xl font-bold mt-10 mb-4 text-white font-sans scroll-mt-24 flex items-center"
        >
          <span className="text-purple-400 mr-2 opacity-50 select-none font-light">##</span>
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-8 mb-3 text-white font-sans">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 border-l-4 border-cyan-500 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 py-4 pr-4 rounded-r-2xl italic text-xl text-gray-300 font-sans relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/[0.01] pointer-events-none" />
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 text-gray-300 text-lg space-y-3 font-sans">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 text-gray-300 text-lg space-y-3 font-sans">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  types: {
    image: ImageBlock,
    code: CodeBlock,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-white/10 border border-white/5 text-cyan-400 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target={rel ? '_blank' : undefined}
          className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-400/30 hover:decoration-cyan-400 transition-colors font-medium cursor-pointer"
        >
          {children}
        </a>
      );
    },
  },
};

interface PortableTextRendererProps {
  value: any;
}

export const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({ value }) => {
  return (
    <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-sans">
      <PortableText value={value} components={components} />
    </div>
  );
};
