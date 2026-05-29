import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  { text: "downloading courage...", pct: 12 },
  { text: "loading blissful calmness...", pct: 24 },
  { text: "preparing butterflies...", pct: 36 },
  { text: 'compiling all "let\'s see", "eventually"...', pct: 50, hold: 3800 },
  { text: "checking if she'll say yes...", pct: 64, hold: 3200 },
  { text: "waited 8 long years...", pct: 82 },
  { text: "can't risk another regret...", pct: 99, hold: 3200, deepen: true },
  { text: "proceeding...", pct: 100 },
];

export function Loading({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(-1); // -1 = initializing
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"loading" | "final" | "out">("loading");
  const [deepen, setDeepen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStep(0), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step < 0 || phase !== "loading") return;
    const cur = messages[step];
    if (!cur) {
      setPhase("final");
      return;
    }
    if (cur.deepen) setDeepen(true);
    setPct(cur.pct);
    const t = setTimeout(() => setStep((s) => s + 1), cur.hold ?? 2500);
    return () => clearTimeout(t);
  }, [step, phase]);

  useEffect(() => {
    if (phase !== "final") return;
    const t1 = setTimeout(() => setPhase("out"), 4000);
    const t2 = setTimeout(() => onDone(), 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase, onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${phase === "out" ? "pointer-events-none" : ""}`}
    >
      <div className="absolute inset-0 ambient" />
      <motion.div
        animate={{ opacity: deepen ? 0.85 : 0.5 }}
        transition={{ duration: 1.4 }}
        className="absolute inset-0 bg-black"
      />
      <div className="grain absolute inset-0" />

      {/* Skip button — only show during loading phase */}
      {phase === "loading" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => setPhase("final")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors duration-300 font-mono"
        >
          skip
        </motion.button>
      )}

      <div className="relative z-10 w-full max-w-sm px-8 text-center">
        <AnimatePresence mode="wait">
          {phase === "loading" && (
            <motion.div key="load" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.6 }}>
              <p className="serif text-cream/90 text-lg sm:text-xl tracking-wide cursor-blink">
                initializing first date request
              </p>

              <div className="mt-10 h-[2px] w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--cream)]"
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="mt-2 text-[10px] tracking-[0.3em] text-white/40 uppercase">{pct}%</div>

              <div className="mt-10 min-h-[2.5rem] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {step >= 0 && messages[step] && (
                    <motion.p
                      key={step}
                      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="text-sm text-white/70 font-mono"
                    >
                      {messages[step].text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {phase !== "loading" && (
            <motion.p
              key="final"
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
              className="serif italic text-cream text-xl sm:text-2xl leading-relaxed"
            >
              curated for the most beautiful<br/>soul in the whole world
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
