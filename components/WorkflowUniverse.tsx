"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Database,
  Brain,
  Cloud,
  BarChart3,
  ShieldCheck,
  ArrowUpRight,
  X,
  Zap,
} from "lucide-react";

// ─── Service Nodes ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "web",
    label: "Website\nDevelopment",
    icon: Globe,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.20)",
    accent: "from-cyan-400 to-blue-500",
    desc: "Hyper-performance Next.js websites engineered for conversion, SEO, and immersive user experiences at enterprise scale.",
    tags: ["Next.js 16", "React 19", "Vercel Edge"],
    x: 0.22,
    y: 0.30,
    radius: 28,
  },
  {
    id: "crm",
    label: "CRM\nSystems",
    icon: Database,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.20)",
    accent: "from-violet-400 to-purple-600",
    desc: "Bespoke CRM & ERP ecosystems with live telemetry, role-based permissions, and multi-tenant data pipelines.",
    tags: ["Postgres", "Prisma", "REST APIs"],
    x: 0.76,
    y: 0.24,
    radius: 26,
  },
  {
    id: "ai",
    label: "AI\nAutomation",
    icon: Brain,
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.20)",
    accent: "from-sky-400 to-cyan-600",
    desc: "End-to-end n8n orchestration pipelines connecting your entire software stack into one intelligent automation layer.",
    tags: ["n8n Flows", "LLM Agents", "Webhooks"],
    x: 0.50,
    y: 0.18,
    radius: 32,
  },
  {
    id: "cloud",
    label: "Cloud\nHosting",
    icon: Cloud,
    color: "#34d399",
    glow: "rgba(52,211,153,0.18)",
    accent: "from-emerald-400 to-teal-600",
    desc: "Zero-downtime cloud deployments with auto-scaling infrastructure, global CDN, and 99.99% uptime SLAs.",
    tags: ["Vercel", "AWS", "Cloudflare"],
    x: 0.19,
    y: 0.68,
    radius: 25,
  },
  {
    id: "analytics",
    label: "Analytics\nDashboards",
    icon: BarChart3,
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.16)",
    accent: "from-amber-400 to-orange-500",
    desc: "Real-time telemetry dashboards with interactive charts, live KPI dials, and intelligent anomaly detection.",
    tags: ["D3.js", "PostHog", "SQL"],
    x: 0.78,
    y: 0.70,
    radius: 26,
  },
  {
    id: "security",
    label: "Cyber\nSecurity",
    icon: ShieldCheck,
    color: "#c084fc",
    glow: "rgba(192,132,252,0.18)",
    accent: "from-fuchsia-400 to-violet-600",
    desc: "Enterprise-grade security: end-to-end encryption, penetration testing, RBAC, and OWASP compliance built-in.",
    tags: ["Zero-Trust", "TLS 1.3", "Auth0"],
    x: 0.50,
    y: 0.78,
    radius: 25,
  },
];

const CONNECTIONS: [number, number][] = [
  [2, 0], [2, 1], [2, 3], [2, 4], [2, 5],
  [0, 3], [1, 4], [3, 5], [4, 5], [0, 1],
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Star  { fx: number; fy: number; r: number; a: number; sp: number }
interface Pulse { ci: number; t: number; sp: number; col: string }

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkflowUniverse() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const canvRef  = useRef<HTMLCanvasElement>(null);
  const rafRef   = useRef(0);
  const tickRef  = useRef(0);
  const mouseRef = useRef({ nx: 0.5, ny: 0.5 });
  const camRef   = useRef({ ox: 0, oy: 0 });
  const starsRef = useRef<Star[]>([]);
  const pulseRef = useRef<Pulse[]>([]);
  const dimsRef  = useRef({ w: 0, h: 0 });

  const [hovered,  setHovered]  = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [ready,    setReady]    = useState(false);

  // ── reliable dimension capture (useLayoutEffect fires after paint) ──────────
  const measure = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    dimsRef.current = { w, h };

    const cv = canvRef.current;
    if (cv) { cv.width = w; cv.height = h; }

    if (!starsRef.current.length) {
      starsRef.current = Array.from({ length: 200 }, () => ({
        fx: Math.random(), fy: Math.random(),
        r: 0.4 + Math.random() * 1.0,
        a: 0.08 + Math.random() * 0.45,
        sp: 0.00006 + Math.random() * 0.00014,
      }));
    }

    if (!pulseRef.current.length) {
      pulseRef.current = CONNECTIONS.map((_, i) => ({
        ci: i,
        t: Math.random(),
        sp: 0.0014 + Math.random() * 0.0022,
        col: SERVICES[CONNECTIONS[i][0]].color,
      }));
    }

    setReady(true);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // ── mouse tracking ─────────────────────────────────────────────────────────
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { w, h } = dimsRef.current;
    if (!w) return;
    const r = wrapRef.current!.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    mouseRef.current = { nx: cx / w, ny: cy / h };

    // hit-test
    let hit: string | null = null;
    for (const svc of SERVICES) {
      const px = svc.x * w + camRef.current.ox;
      const py = svc.y * h + camRef.current.oy;
      if (Math.hypot(cx - px, cy - py) < svc.radius + 18) { hit = svc.id; break; }
    }
    setHovered(hit);
  }, []);

  const onMouseLeave = useCallback(() => setHovered(null), []);

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { w, h } = dimsRef.current;
    if (!w) return;
    const r = wrapRef.current!.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    let hit: string | null = null;
    for (const svc of SERVICES) {
      const px = svc.x * w + camRef.current.ox;
      const py = svc.y * h + camRef.current.oy;
      if (Math.hypot(cx - px, cy - py) < svc.radius + 18) { hit = svc.id; break; }
    }
    setSelected(prev => prev === hit ? null : hit);
  }, []);

  // ── render loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;

    const cv  = canvRef.current!;
    const ctx = cv.getContext("2d")!;

    const frame = () => {
      const { w, h } = dimsRef.current;
      if (!w || !h) { rafRef.current = requestAnimationFrame(frame); return; }

      tickRef.current++;
      const tick = tickRef.current;

      // camera drift
      camRef.current.ox = lerp(camRef.current.ox, (mouseRef.current.nx - 0.5) * -20, 0.028);
      camRef.current.oy = lerp(camRef.current.oy, (mouseRef.current.ny - 0.5) * -14, 0.028);
      const { ox, oy } = camRef.current;

      ctx.clearRect(0, 0, w, h);

      // ── background ──────────────────────────────────────────────────────────
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.42, w * 0.9);
      bg.addColorStop(0,   "#0b0d24");
      bg.addColorStop(0.55,"#060818");
      bg.addColorStop(1,   "#02020e");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // soft nebula blobs
      const nebulas = [
        { x: 0.25, y: 0.35, r: w * 0.32, col: "rgba(34,100,211,0.04)"  },
        { x: 0.75, y: 0.60, r: w * 0.30, col: "rgba(139,92,246,0.04)"  },
        { x: 0.50, y: 0.20, r: w * 0.22, col: "rgba(56,189,248,0.05)"  },
      ];
      for (const nb of nebulas) {
        const g = ctx.createRadialGradient(nb.x*w+ox*0.4, nb.y*h+oy*0.4, 0, nb.x*w+ox*0.4, nb.y*h+oy*0.4, nb.r);
        g.addColorStop(0, nb.col); g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(nb.x*w+ox*0.4, nb.y*h+oy*0.4, nb.r, 0, Math.PI*2); ctx.fill();
      }

      // ── hex grid overlay ────────────────────────────────────────────────────
      const hexSize = 34;
      const hexW    = hexSize * 2;
      const hexH    = Math.sqrt(3) * hexSize;
      ctx.strokeStyle = "rgba(100,140,255,0.035)";
      ctx.lineWidth   = 0.7;
      const cols = Math.ceil(w / hexW) + 2;
      const rows = Math.ceil(h / hexH) + 2;
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const cx2 = col * hexW * 0.75 + (ox * 0.15);
          const cy2 = row * hexH + (col % 2 === 0 ? 0 : hexH / 2) + (oy * 0.15);
          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const angle = (Math.PI / 3) * s - Math.PI / 6;
            const px = cx2 + hexSize * Math.cos(angle);
            const py = cy2 + hexSize * Math.sin(angle);
            s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath(); ctx.stroke();
        }
      }

      // ── stars ───────────────────────────────────────────────────────────────
      for (const s of starsRef.current) {
        s.fx = (s.fx + s.sp) % 1;
        const sx = s.fx * w + ox * 0.25;
        const sy = s.fy * h + oy * 0.25;
        const tw = 0.55 + 0.45 * Math.sin(tick * 0.025 + s.fy * 30);
        ctx.beginPath(); ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190,215,255,${s.a * tw})`;
        ctx.fill();
      }

      // ── node pixel positions (with float) ────────────────────────────────────
      const NP = SERVICES.map((svc, i) => {
        const floatY = Math.sin(tick * 0.016 + i * 1.15) * 6;
        return { x: svc.x * w + ox, y: svc.y * h + oy + floatY };
      });

      // ── connections ─────────────────────────────────────────────────────────
      for (const [ai, bi] of CONNECTIONS) {
        const a = NP[ai]; const b = NP[bi];
        const isHov = hovered === SERVICES[ai].id || hovered === SERVICES[bi].id;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = isHov ? "rgba(120,180,255,0.22)" : "rgba(80,110,180,0.09)";
        ctx.lineWidth = isHov ? 1.4 : 0.8;
        ctx.setLineDash([4, 8]); ctx.stroke(); ctx.setLineDash([]);
      }

      // ── data pulses ──────────────────────────────────────────────────────────
      for (const p of pulseRef.current) {
        p.t = (p.t + p.sp) % 1;
        const [ai, bi] = CONNECTIONS[p.ci];
        const a = NP[ai]; const b = NP[bi];
        const px = lerp(a.x, b.x, p.t);
        const py = lerp(a.y, b.y, p.t);
        // trail
        const tg = ctx.createRadialGradient(px, py, 0, px, py, 10);
        tg.addColorStop(0, `${p.col}55`); tg.addColorStop(1, `${p.col}00`);
        ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI*2);
        ctx.fillStyle = tg; ctx.fill();
        // dot
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI*2);
        ctx.fillStyle = p.col;
        ctx.shadowColor = p.col; ctx.shadowBlur = 10;
        ctx.fill(); ctx.shadowBlur = 0;
      }

      // ── planet nodes ────────────────────────────────────────────────────────
      SERVICES.forEach((svc, i) => {
        const { x: nx, y: ny } = NP[i];
        const isHov = hovered === svc.id || selected === svc.id;
        const r     = svc.radius;
        const scale = isHov ? 1.18 : 1.0;
        const sr    = r * scale;

        // outer ambient aura
        const aura = ctx.createRadialGradient(nx, ny, 0, nx, ny, sr * 2.4);
        aura.addColorStop(0, `${svc.color}${isHov ? "2a" : "14"}`);
        aura.addColorStop(0.5, `${svc.color}06`);
        aura.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(nx, ny, sr * 2.4, 0, Math.PI*2);
        ctx.fillStyle = aura; ctx.fill();

        // orbiting ellipse (animated rotation)
        const angle = (tick * 0.008 + i * 0.9);
        ctx.save();
        ctx.translate(nx, ny); ctx.rotate(angle);
        ctx.beginPath(); ctx.ellipse(0, 0, sr + 14, 5, 0, 0, Math.PI*2);
        ctx.strokeStyle = `${svc.color}${isHov ? "55" : "25"}`;
        ctx.lineWidth = 0.9; ctx.stroke();
        ctx.restore();

        // planet body
        const bg2 = ctx.createRadialGradient(nx - sr*0.28, ny - sr*0.28, 0, nx, ny, sr);
        bg2.addColorStop(0, `${svc.color}${isHov ? "66" : "3a"}`);
        bg2.addColorStop(1, "#060816ee");
        ctx.beginPath(); ctx.arc(nx, ny, sr, 0, Math.PI*2);
        ctx.fillStyle = bg2; ctx.fill();

        // planet border glow
        ctx.beginPath(); ctx.arc(nx, ny, sr, 0, Math.PI*2);
        ctx.strokeStyle = isHov ? svc.color : `${svc.color}80`;
        ctx.lineWidth   = isHov ? 2 : 1;
        ctx.shadowColor = svc.color;
        ctx.shadowBlur  = isHov ? 22 : 8;
        ctx.stroke(); ctx.shadowBlur = 0;

        // label below planet
        const lblY = ny + sr + 18;
        const lines = svc.label.split("\n");
        ctx.textAlign    = "center";
        ctx.textBaseline = "top";
        ctx.font         = `${isHov ? 600 : 500} 10px Inter,system-ui,sans-serif`;
        ctx.fillStyle    = isHov ? "#ffffff" : "rgba(180,210,255,0.65)";
        lines.forEach((ln, li) => ctx.fillText(ln, nx, lblY + li * 13));
      });

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready, hovered, selected]);

  // ── card positioning ───────────────────────────────────────────────────────
  const activeId  = selected ?? hovered;
  const activeSvc = SERVICES.find(s => s.id === activeId) ?? null;

  const { w: dw, h: dh } = dimsRef.current;
  const CARD_W = 292;
  let cardLeft = 0;
  let cardTop  = 0;
  if (activeSvc && dw) {
    const nx = activeSvc.x * dw + camRef.current.ox;
    const ny = activeSvc.y * dh + camRef.current.oy;
    cardLeft = Math.max(12, Math.min(dw - CARD_W - 12, nx - CARD_W / 2));
    cardTop  = Math.max(72, ny - 200);
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(520px, 75vh, 720px)", background: "#02020e" }}
    >
      {/* ── header text ────────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 pt-8 flex flex-col items-center z-20 pointer-events-none select-none">
        <motion.p
          initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45 }}
          className="text-[10px] font-bold tracking-[0.22em] uppercase text-cyan-400/60 mb-2"
        >
          Interactive Workflow Universe
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.06 }}
          className="text-2xl md:text-[28px] font-extrabold tracking-tight text-white/90 text-center"
        >
          Six intelligent systems.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            One connected universe.
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.14 }}
          className="text-gray-500 text-[11px] mt-1.5 max-w-xs text-center px-4"
        >
          Hover or click any planet to explore its capabilities.
        </motion.p>
      </div>

      {/* ── canvas wrapper ─────────────────────────────────────────────────── */}
      <div
        ref={wrapRef}
        className="absolute inset-0 cursor-crosshair"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <canvas ref={canvRef} className="absolute inset-0 w-full h-full" />

        {/* ── glassmorphic info card ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeSvc && dw > 0 && (
            <motion.div
              key={activeSvc.id}
              initial={{ opacity: 0, scale: 0.87, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 6 }}
              transition={{ type: "spring", stiffness: 340, damping: 24 }}
              className="absolute z-30 pointer-events-auto"
              style={{ left: cardLeft, top: cardTop, width: CARD_W }}
            >
              <PlanetCard svc={activeSvc} onClose={() => setSelected(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── bottom legend ───────────────────────────────────────────────────── */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 px-4">
          {SERVICES.map(svc => {
            const Icon = svc.icon;
            const on   = hovered === svc.id || selected === svc.id;
            return (
              <div key={svc.id} className="flex items-center gap-1.5 transition-opacity duration-200" style={{ opacity: on ? 1 : 0.38 }}>
                <Icon size={10} style={{ color: svc.color }} />
                <span className="text-[9px] font-medium text-gray-400 tracking-wide">{svc.label.replace("\n"," ")}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── top/bottom fade ─────────────────────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#060816] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#060816] to-transparent pointer-events-none z-10" />
    </section>
  );
}

// ─── Planet Info Card ─────────────────────────────────────────────────────────

function PlanetCard({ svc, onClose }: { svc: typeof SERVICES[0]; onClose: () => void }) {
  const Icon = svc.icon;
  return (
    <div
      className="relative rounded-[20px] overflow-hidden border"
      style={{
        background: "rgba(6,8,22,0.88)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        borderColor: `${svc.color}30`,
        boxShadow: `0 0 48px ${svc.glow}, 0 8px 40px rgba(0,0,0,0.65)`,
      }}
    >
      {/* accent line */}
      <div className={`h-[2px] w-full bg-gradient-to-r ${svc.accent}`} />

      <div className="p-5 flex flex-col gap-3.5">
        {/* header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}40` }}
            >
              <Icon size={17} style={{ color: svc.color }} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: svc.color }}>
                Codemates
              </p>
              <h3 className="text-[13px] font-extrabold text-white leading-tight">
                {svc.label.replace("\n", " ")}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition shrink-0 mt-0.5"
          >
            <X size={11} />
          </button>
        </div>

        {/* desc */}
        <p className="text-gray-400 text-[11px] leading-relaxed">{svc.desc}</p>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5">
          {svc.tags.map(tag => (
            <span
              key={tag}
              className="text-[9px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${svc.color}12`, border: `1px solid ${svc.color}28`, color: svc.color }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* live bar */}
        <LiveBar color={svc.color} />

        {/* footer */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: svc.color }} />
            <span className="text-[9px] text-gray-500 font-medium">Node Online</span>
          </div>
          <button className="flex items-center gap-1 text-[10px] font-bold" style={{ color: svc.color }}>
            Explore <ArrowUpRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Animated Telemetry Bar ───────────────────────────────────────────────────

function LiveBar({ color }: { color: string }) {
  const [pct, setPct] = useState(72);
  useEffect(() => {
    const id = setInterval(() => setPct(60 + Math.random() * 35), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[9px] font-medium" style={{ color }}>
        <span className="flex items-center gap-1"><Zap size={9} />System Load</span>
        <span>{pct.toFixed(0)}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}60, ${color})` }}
        />
      </div>
    </div>
  );
}
