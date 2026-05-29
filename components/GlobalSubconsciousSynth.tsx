"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function GlobalSubconsciousSynth() {
  const [audioActive, setAudioActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // References to keep nodes alive and allow proper cleanup
  const nodesRef = useRef<{
    ctx: AudioContext;
    masterGain: GainNode;
    oscillators: OscillatorNode[];
    lfos: OscillatorNode[];
  } | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
        setAudioActive(true);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // 1. MASTER VOLUME (Set to a beautifully listenable, premium low background level)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.022, ctx.currentTime); 
      masterGain.connect(ctx.destination);

      // List of all active oscillators and LFOs to track for garbage collection/cleanup
      const oscillators: OscillatorNode[] = [];
      const lfos: OscillatorNode[] = [];

      // 2. LUSH DELAY / REVERB FEEDBACK LOOP (Creates a massive space ambient depth)
      const delayNode = ctx.createDelay(2.0);
      const feedbackNode = ctx.createGain();
      
      delayNode.delayTime.setValueAtTime(0.8, ctx.currentTime); // 800ms delay time
      feedbackNode.gain.setValueAtTime(0.48, ctx.currentTime); // lush organic feedback

      // Connect delay loop: Delay -> Feedback -> Delay
      delayNode.connect(feedbackNode);
      feedbackNode.connect(delayNode);
      
      // Delay outputs to master output
      delayNode.connect(masterGain);

      // 3. MASTER RESOURCED LOWPASS FILTER (Soft, warm, velvety analog synth feel)
      const masterFilter = ctx.createBiquadFilter();
      masterFilter.type = "lowpass";
      masterFilter.frequency.setValueAtTime(320, ctx.currentTime); // Filter out any harsh high frequencies
      masterFilter.Q.setValueAtTime(1.5, ctx.currentTime);

      // Filter outputs to both direct master and delay node
      masterFilter.connect(masterGain);
      masterFilter.connect(delayNode);

      // 4. GENERATIVE HARMONIC PAD OSCILLATORS (A beautiful, evolving A minor 9 / C major space chord)
      // We use triangle waves filtered down to sound like soft warm analog pads.
      const padConfig = [
        { freq: 110.00, type: "triangle", lfoSpeed: 0.04, baseGain: 0.08, modulation: 0.05 }, // A2 (Base Root)
        { freq: 164.81, type: "sine", lfoSpeed: 0.033, baseGain: 0.12, modulation: 0.06 },   // E3 (Fifth - space fifth interval resonance)
        { freq: 196.00, type: "triangle", lfoSpeed: 0.025, baseGain: 0.07, modulation: 0.04 }, // G3 (Minor 7th)
        { freq: 246.94, type: "sine", lfoSpeed: 0.02, baseGain: 0.10, modulation: 0.05 },     // B3 (9th - gorgeous open tone)
        { freq: 329.63, type: "triangle", lfoSpeed: 0.015, baseGain: 0.05, modulation: 0.03 } // E4 (High harmonic extension)
      ];

      padConfig.forEach((config) => {
        // Create Pad Voice
        const osc = ctx.createOscillator();
        const voiceGain = ctx.createGain();

        osc.type = config.type as OscillatorType;
        osc.frequency.setValueAtTime(config.freq, ctx.currentTime);

        // Slow LFO for organic volume swells (so the sound breathes naturally like ocean waves)
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();

        lfo.frequency.setValueAtTime(config.lfoSpeed, ctx.currentTime);
        lfoGain.gain.setValueAtTime(config.modulation, ctx.currentTime);
        
        // Connect LFO to modulate individual voice gain
        lfo.connect(lfoGain).connect(voiceGain.gain);
        voiceGain.gain.setValueAtTime(config.baseGain, ctx.currentTime);

        // Connect voice to master filter
        osc.connect(voiceGain).connect(masterFilter);

        // Start modules
        osc.start();
        lfo.start();

        oscillators.push(osc);
        lfos.push(lfo);
      });

      // 5. BINAURAL THETA FOCUS COMPONENT (Ultra-quiet deep integration for focus)
      const leftOsc = ctx.createOscillator();
      const rightOsc = ctx.createOscillator();
      const leftPanner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const rightPanner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const focusGain = ctx.createGain();

      focusGain.gain.setValueAtTime(0.04, ctx.currentTime); // Keep binaural waves ultra silent in background
      focusGain.connect(masterGain);

      leftOsc.type = "sine";
      leftOsc.frequency.setValueAtTime(110, ctx.currentTime); // Left Ear Carrier
      
      rightOsc.type = "sine";
      rightOsc.frequency.setValueAtTime(116, ctx.currentTime); // Right Ear Carrier (6Hz Delta-Theta focus difference)

      if (leftPanner && rightPanner) {
        leftPanner.pan.setValueAtTime(-1, ctx.currentTime);
        rightPanner.pan.setValueAtTime(1, ctx.currentTime);
        
        leftOsc.connect(leftPanner).connect(focusGain);
        rightOsc.connect(rightPanner).connect(focusGain);
      } else {
        leftOsc.connect(focusGain);
        rightOsc.connect(focusGain);
      }

      leftOsc.start();
      rightOsc.start();
      oscillators.push(leftOsc, rightOsc);

      nodesRef.current = {
        ctx,
        masterGain,
        oscillators,
        lfos
      };

      setAudioActive(true);
    } catch (e) {
      console.warn("Web Audio API not supported on this browser:", e);
    }
  };

  const toggleMute = () => {
    if (!audioCtxRef.current) {
      initAudio();
      return;
    }

    if (audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
      setAudioActive(false);
    } else {
      audioCtxRef.current.resume();
      setAudioActive(true);
    }
  };

  useEffect(() => {
    // Adheres strictly to browser autoplay policies: trigger silently on first user interaction
    const handleInteraction = () => {
      initAudio();
      // Remove listeners once active
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("scroll", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      
      // Clean up all active audio nodes on unmount
      if (nodesRef.current) {
        const { oscillators, lfos, ctx } = nodesRef.current;
        try {
          oscillators.forEach((osc) => {
            try { osc.stop(); } catch (e) {}
          });
          lfos.forEach((lfo) => {
            try { lfo.stop(); } catch (e) {}
          });
          ctx.close();
        } catch (e) {
          console.warn("Error cleaning up Web Audio API nodes:", e);
        }
        nodesRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed bottom-28 right-6 md:right-8 z-50 pointer-events-auto">
      <button
        onClick={toggleMute}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-[9.5px] font-bold tracking-widest font-mono uppercase transition-all duration-300 backdrop-blur-md cursor-pointer ${
          audioActive
            ? "bg-cyan-500/10 border-cyan-400/30 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:bg-cyan-500/20"
            : "bg-white/5 border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-400"
        }`}
        title={audioActive ? "Mute Ambient Soundtrack" : "Enable Ambient Soundtrack"}
      >
        {audioActive ? (
          <>
            <Volume2 size={12} className="animate-pulse text-cyan-400" />
            <span>SOUNDTRACK ACTIVE</span>
          </>
        ) : (
          <>
            <VolumeX size={12} />
            <span>MUSIC MUTED</span>
          </>
        )}
      </button>
    </div>
  );
}
