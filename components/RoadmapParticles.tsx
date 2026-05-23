"use client";

import React, { useEffect, useRef } from "react";

interface RoadmapParticlesProps {
  active: boolean;
  color?: "cyan" | "purple" | "both";
  speedMultiplier?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  decay: number;
}

export default function RoadmapParticles({
  active,
  color = "both",
  speedMultiplier = 1,
}: RoadmapParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getParticleColor = () => {
      if (color === "cyan") return "rgba(34, 211, 238, ";
      if (color === "purple") return "rgba(167, 139, 250, ";
      return Math.random() > 0.5 ? "rgba(34, 211, 238, " : "rgba(167, 139, 250, ";
    };

    const spawnParticle = () => {
      if (!canvas) return;
      const x = canvas.width / 2 + (Math.random() - 0.5) * 20;
      // Spawn near the center vertical line
      const y = canvas.height / 2 + (Math.random() - 0.5) * 20;
      
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.2 + Math.random() * 0.8) * speedMultiplier;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed * 0.4 + (Math.random() - 0.5) * 0.2,
        vy: -Math.abs(Math.sin(angle) * speed) - 0.4, // Always drift upwards
        alpha: 1.0,
        size: 1 + Math.random() * 2.5,
        color: getParticleColor(),
        decay: 0.005 + Math.random() * 0.015,
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles if node is active
      if (active && particles.length < 50 && Math.random() > 0.4) {
        spawnParticle();
      }

      // Update and draw particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        // Draw particle with glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        
        // Add subtle shadow for extra futuristic look
        ctx.shadowColor = p.color.includes("34") ? "#22d3ee" : "#a78bfa";
        ctx.shadowBlur = p.size * 2.5;
        
        ctx.fill();
        ctx.restore();
      });

      // Filter out faded particles
      particles = particles.filter((p) => p.alpha > 0);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, color, speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-screen"
    />
  );
}
