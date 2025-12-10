"use client";

import { useEffect, useRef } from "react";

interface LetterGlitchProps {
  words?: string[];
  opacity?: number;
  color?: string;
}

export function LetterGlitch({
  words = [
    "BLOCKCHAIN",
    "NEURAL",
    "QUANTUM",
    "ALGORITHM",
    "PROTOCOL",
    "ENCRYPTION",
    "TENSOR",
    "MACHINE",
    "LEARNING",
    "ARTIFICIAL",
    "INTELLIGENCE",
    "NETWORK",
    "COMPUTE",
    "OPTIMIZE",
    "SCALE",
    "DEPLOY",
    "INNOVATE",
  ],
  opacity = 0.08,
  color = "#FF0033",
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Letter particles
    interface Particle {
      x: number;
      y: number;
      text: string;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      rotation: number;
      rotationSpeed: number;
    }

    const particles: Particle[] = [];
    const particleCount = 30;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: words[Math.floor(Math.random() * words.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 30 + 20,
        alpha: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Wrap around edges
        if (particle.x < -100) particle.x = canvas.width + 100;
        if (particle.x > canvas.width + 100) particle.x = -100;
        if (particle.y < -100) particle.y = canvas.height + 100;
        if (particle.y > canvas.height + 100) particle.y = -100;

        // Draw text
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.font = `bold ${particle.size}px monospace`;
        ctx.fillStyle = color;
        ctx.globalAlpha = particle.alpha * opacity;

        // Add glitch effect randomly
        if (Math.random() > 0.98) {
          ctx.translate(Math.random() * 4 - 2, Math.random() * 4 - 2);
        }

        ctx.fillText(particle.text, 0, 0);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationId);
    };
  }, [words, opacity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    />
  );
}

