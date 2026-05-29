import { motion } from "framer-motion";

export function Success() {
  return (
    <section id="final" data-section="final" className="min-h-screen relative flex items-center justify-center snap-start pb-20">
      <div className="absolute inset-0 ambient" />
      <div className="absolute inset-0 bg-gradient-radial" style={{ background: "radial-gradient(ellipse at 50% 40%, oklch(0.82 0.11 78 / 0.18), transparent 60%)" }} />
      <div className="grain absolute inset-0" />

      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-[3px] w-[3px] rounded-full bg-[var(--gold)]/60"
          style={{ left: `${(i * 53) % 100}%`, top: `${(i * 29) % 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 w-full max-w-lg px-6 text-center py-16">
        <motion.h2
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.4 }}
          className="serif text-6xl sm:text-7xl italic text-cream"
        >
          Perfect.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.4, delay: 1 }}
          className="serif mt-8 text-xl text-white/80"
        >
          I'll take care of the planning.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.4, delay: 1.8 }}
          className="serif mt-3 text-xl text-white/80"
        >
          You just have to show up.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-xs rounded-2xl border border-[var(--gold)]/30 bg-black/40 backdrop-blur p-6 gold-glow"
        >
          <p className="text-[10px] tracking-[0.4em] text-[var(--gold)]/80 uppercase">Dress Code Recommendation</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="serif text-3xl text-cream italic">black</span>
            <span className="text-white/40">or</span>
            <span className="serif text-3xl italic" style={{ color: "oklch(0.55 0.13 260)" }}>deep blue</span>
          </div>
          <p className="serif italic mt-5 text-sm text-white/65">
            because I already know you'll look breathtaking.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.4, delay: 3.4 }}
          className="mt-16"
        >
          <p className="serif italic text-lg text-cream/90 leading-relaxed">
            Some people find love slowly.<br />
            Somehow, we felt familiar immediately.
          </p>
          <p className="hand mt-10 text-base text-white/40">To be continued…</p>
        </motion.div>
      </div>
    </section>
  );
}
