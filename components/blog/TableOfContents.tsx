'use client';

import React, { useEffect, useState } from 'react';
import { slugify } from './PortableTextRenderer';

interface HeadingItem {
  id: string;
  text: string;
  level: 'h2' | 'h3';
}

interface TableOfContentsProps {
  content: any[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!content || !Array.isArray(content)) return;

    // Parse h2 and h3 headings from Sanity Portable Text structure
    const parsedHeadings: HeadingItem[] = content
      .filter((block) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
      .map((block) => {
        const text = block.children ? block.children.map((c: any) => c.text).join('') : '';
        return {
          id: slugify(text),
          text,
          level: block.style as 'h2' | 'h3',
        };
      })
      .filter((h) => h.text.trim() !== '');

    setHeadings(parsedHeadings);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    // ScrollSpy implementation with IntersectionObserver
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find entries currently intersecting the viewport
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // Highlight the top-most visible heading
        const topVisible = visibleEntries.reduce((prev, current) => {
          return (prev.boundingClientRect.top < current.boundingClientRect.top) ? prev : current;
        });
        setActiveId(topVisible.target.id);
      }
    };

    const observerOptions = {
      rootMargin: '-100px 0px -60% 0px', // Trigger when heading is in the upper part of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Track all registered headings
    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -96; // Offset for sticky navbar header
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-28 select-none max-h-[calc(100vh-160px)] overflow-y-auto pr-4 hidden lg:block scrollbar-thin scrollbar-thumb-white/10">
      <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 font-sans">
        Table of Contents
      </div>
      <nav className="relative border-l border-white/5 space-y-2.5 font-sans">
        {/* Active Line Highlight Animation Indicator */}
        <div className="absolute left-0 w-[1.5px] bg-gradient-to-b from-cyan-400 to-purple-500 transition-all duration-300 pointer-events-none" />

        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={`block text-sm leading-relaxed transition-all duration-200 cursor-pointer pl-4 relative group ${
              heading.level === 'h3' ? 'pl-8 text-xs' : ''
            } ${
              activeId === heading.id
                ? 'text-cyan-400 font-medium'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {/* Tiny hover dots */}
            <span
              className={`absolute left-0 top-[50%] -translate-y-[50%] w-1.5 h-1.5 rounded-full bg-cyan-400 scale-0 group-hover:scale-100 transition-transform duration-200 ${
                activeId === heading.id ? 'scale-100' : ''
              }`}
            />
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};
