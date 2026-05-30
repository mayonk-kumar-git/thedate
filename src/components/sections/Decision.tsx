import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const popups = [
  "Bold choice.",
  "I genuinely didn't think you'd press that.",
  "That wasn't very future-wife-like behavior.",
  "Forehead kiss. Final offer.",
  "",
];

export function Decision({ onYes }: { onYes: () => void }) {
  const [lives, setLives] = useState(5);
  const [popup, setPopup] = useState<string | null>(null);
  const [morphing, setMorphing] = useState(false);
  const popupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noAbsorbed = lives === 0;

  const handleNo = () => {
    if (lives === 0) return;
    const next = lives - 1;
    setLives(next);
    setPopup(popups[5 - lives]);
    if (popupTimer.current) clearTimeout(popupTimer.current);
    popupTimer.current = setTimeout(() => setPopup(null), 4500);
    if (next === 0) {
      setTimeout(() => setMorphing(true), 800);
    }
  };

  return (
    <section id="decision" data-section="decision" className="min-h-[100dvh] relative flex items-center justify-center snap-start pb-16">

      <div className="relative z-10 w-full max-w-md px-6 text-center">

        <div className="mt-12">
          <p className="serif text-3xl sm:text-5xl leading-[1.05] text-cream tracking-tight">
            Would you like to go on a<br />
            <span className="italic text-[var(--gold)]">date</span> with me?
          </p>
          <p className="mt-3 serif italic text-[11px] text-white/50">Choose wisely.</p>
          <p className="mt-3 serif italic text-[11px] text-white/50">You're about to sign up for a lifetime of flirting, cheesy lines, clinginess, and being adored a slightly unreasonable amount.</p>
          <p className="mt-3 serif italic text-[11px] text-white/50">But more than anything you will have to let me make you feel safe, cherished, and free to be that little girl again. Unfortunately, this particular clause is non-negotiable.</p>
        </div>

        <div className="mt-12 relative h-[150px] w-56 mx-auto">
          <motion.button
            onClick={onYes}
            animate={{
              width: `${192 + (5 - lives) * 10}px`,
              height: `${62 + (5 - lives) * 8}px`,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-xl bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)] serif italic text-lg tracking-wide hover:bg-[var(--gold)]/30 transition"
          >
            yes
            <motion.span
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="absolute inset-0 rounded-xl ring-1 ring-[var(--gold)]/50"
            />
          </motion.button>

          <AnimatePresence>
            {!noAbsorbed && (
              <motion.button
                key="no"
                exit={{ scaleY: 0, scaleX: 0.8, opacity: 0, filter: "blur(6px)" }}
                animate={{
                  scaleX: 1 - (5 - lives) * 0.04,
                  scaleY: 1 - (5 - lives) * 0.1,
                  opacity: 1 - (5 - lives) * 0.12,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onClick={handleNo}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 py-1.5 rounded-xl border border-white/25 text-white/75 serif italic text-lg tracking-wide hover:bg-white/5 transition flex flex-col items-center gap-1"
              >
                no
                <span className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 8 8" className="select-none" style={{ imageRendering: "pixelated" }}>
                      <rect x="1" y="0" width="2" height="1" fill={i < lives ? "oklch(0.78 0.16 25)" : "rgba(255,255,255,0.2)"} />
                      <rect x="5" y="0" width="2" height="1" fill={i < lives ? "oklch(0.78 0.16 25)" : "rgba(255,255,255,0.2)"} />
                      <rect x="0" y="1" width="4" height="1" fill={i < lives ? "oklch(0.78 0.16 25)" : "rgba(255,255,255,0.2)"} />
                      <rect x="4" y="1" width="4" height="1" fill={i < lives ? "oklch(0.78 0.16 25)" : "rgba(255,255,255,0.2)"} />
                      <rect x="0" y="2" width="8" height="1" fill={i < lives ? "oklch(0.78 0.16 25)" : "rgba(255,255,255,0.2)"} />
                      <rect x="0" y="3" width="8" height="1" fill={i < lives ? "oklch(0.78 0.16 25)" : "rgba(255,255,255,0.2)"} />
                      <rect x="1" y="4" width="6" height="1" fill={i < lives ? "oklch(0.78 0.16 25)" : "rgba(255,255,255,0.2)"} />
                      <rect x="2" y="5" width="4" height="1" fill={i < lives ? "oklch(0.78 0.16 25)" : "rgba(255,255,255,0.2)"} />
                      <rect x="3" y="6" width="2" height="1" fill={i < lives ? "oklch(0.78 0.16 25)" : "rgba(255,255,255,0.2)"} />
                    </svg>
                  ))}
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-2 h-8">
          <AnimatePresence>
            {!noAbsorbed && (
              <motion.p
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="hand mt-0 text-base text-white/55"
              >
                I dare you to say no
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 h-28 relative flex flex-col items-center">
          <div className="h-12 relative w-full">
            <AnimatePresence>
              {popup && !noAbsorbed && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-0"
                >
                  <div className="relative px-5 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur text-xs text-cream/80 font-medium shadow-lg whitespace-nowrap">
                    {popup}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                    <div className="absolute -bottom-4 left-1/2 translate-x-1 w-2 h-2 rounded-full bg-white/10 border border-white/20" />
                  </div>
                </motion.div>
              )}
              {noAbsorbed && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-0"
                >
                  <div className="relative px-5 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur text-xs text-cream/80 font-medium shadow-lg whitespace-nowrap">
                    i am not taking no for an answer
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                    <div className="absolute -bottom-4 left-1/2 translate-x-1 w-2 h-2 rounded-full bg-white/10 border border-white/20" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Puppy doodle - always visible */}
          <svg width="100" height="100" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-3 doodle">
            <g stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              {/* Hair tufts */}
              <path d="M82 42 C80 34,78 30,82 28" />
              <path d="M90 40 C90 32,90 28,92 26" />
              <path d="M98 42 C100 34,102 30,98 28" />
              {/* Left Ear */}
              <path d="M42 68C25 55,18 78,35 88" />
              {/* Right Ear */}
              <path d="M138 68C155 55,162 78,145 88" />
              {/* Head */}
              <path d="M40 80C40 55,60 45,78 48C85 42,95 42,102 48C120 45,140 55,140 80L140 125L40 125Z" />
              {/* Eyes */}
              <path d="M67 78 Q71 72 75 78" />
              <path d="M105 78 Q109 72 113 78" />
              {/* Nose */}
              <path d="M87 86Q90 82 93 86Q90 90 87 86" fill="rgba(255,255,255,0.7)" />
              {/* Mouth */}
              <path d="M90 88 L90 96" />
              <path d="M90 96 C80 104,70 100,65 98" />
              <path d="M90 96 C100 104,110 100,115 98" />
              {/* Body Fur Lines */}
              <path d="M70 110 C66 118,66 125,70 132" />
              <path d="M110 110 C114 118,114 125,110 132" />
              {/* Paws */}
              <circle cx="55" cy="130" r="10" />
              <circle cx="125" cy="130" r="10" />
              {/* Ground */}
              <path d="M10 130 H50" />
              <path d="M130 130 H170" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
