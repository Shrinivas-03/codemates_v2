"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically load the high-end showcase with SSR disabled 
// to ensure perfect access to Canvas drawing and AudioContext APIs
const ProjectGalaxy = dynamic(() => import("@/components/ProjectGalaxy"), {
  ssr: false,
});

export default function ProjectsPage() {
  useEffect(() => {
    document.title = "Project Galaxy | Codemates Ecosystem Showcase";
    
    // Set meta description tag programmatically on mount
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Explore the digital universe of next-gen software systems, custom websites, and advanced AI technologies built by Codemates. An interactive space exploration showcase."
    );
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#03040c] overflow-hidden relative">
      <ProjectGalaxy />
    </main>
  );
}
