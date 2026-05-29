import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const popups = [
  "wow. rude.",
  "interesting decision.",
  "this is emotionally expensive.",
  "reconsidering your choices is free.",
  "",
];

export function Decision({ onYes }: { onYes: () => void }) {
  const [lives, setLives] = useState(5);
  const [popup, setPopup] = useState<string | null>(null);
  const [morphing, setMorphing] = useState(false);
  const noAbsorbed = lives === 0;

  const handleNo = () => {
    if (lives === 0) return;
    const next = lives - 1;
    setLives(next);
    setPopup(popups[5 - lives]);
    setTimeout(() => setPopup(null), 1600);
    if (next === 0) {
      setTimeout(() => setMorphing(true), 800);
    }
  };

  const heartsLine = "❤".repeat(lives) + "♡".repeat(5 - lives);

  return (
    <section id="decision" data-section="decision" className="min-h-screen relative flex items-center justify-center snap-start pb-20">

      <div className="relative z-10 w-full max-w-md px-6 text-center">

        <div className="mt-12">
          <p className="serif text-3xl sm:text-5xl leading-[1.05] text-cream tracking-tight">
            Would you like to go on a<br />
            <span className="italic text-[var(--gold)]">date</span> with me?
          </p>
          <p className="mt-3 text-xs text-white/45 tracking-wide">This action may be irreversible.</p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 relative h-16">
          <AnimatePresence>
            {!noAbsorbed && (
              <motion.button
                key="no"
                exit={{ scale: 0, opacity: 0, filter: "blur(8px)" }}
                animate={morphing ? { x: 60, opacity: 0, scale: 0.5 } : {}}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                onClick={handleNo}
                className="px-6 py-3 rounded-full border border-white/25 text-white/75 text-sm tracking-wide hover:bg-white/5 transition"
              >
                no
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            onClick={onYes}
            animate={noAbsorbed ? { scale: [1, 1.18, 1.05] } : {}}
            transition={{ duration: 1 }}
            className="relative px-8 py-3 rounded-full bg-gradient-to-br from-[var(--gold)] to-[oklch(0.7_0.13_60)] text-[var(--midnight)] font-medium tracking-wide gold-glow"
          >
            yes
            <motion.span
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="absolute inset-0 rounded-full ring-1 ring-[var(--gold)]/50"
            />
          </motion.button>
        </div>

        <div className="mt-8">
          <div className="text-2xl tracking-widest select-none" style={{ color: "oklch(0.78 0.16 25)" }}>
            {heartsLine}
          </div>
          <p className="hand mt-2 text-base text-white/55">I dare you.</p>
        </div>

        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="absolute left-1/2 -translate-x-1/2 mt-6 px-4 py-2 rounded-xl bg-black/70 border border-white/10 backdrop-blur text-sm text-cream"
            >
              {popup}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
