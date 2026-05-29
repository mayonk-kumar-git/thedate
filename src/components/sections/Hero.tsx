import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="hero" data-section="hero" className="min-h-screen relative flex items-center justify-center">
      <div className="absolute inset-0 ambient pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* drifting particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-white/40 pointer-events-none"
          style={{
            left: `${(i * 73) % 100}%`,
            top: `${(i * 41) % 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 w-full max-w-xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="serif italic text-white/75 text-base sm:text-lg"
        >
          Before I officially call you mine...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="serif italic text-white/75 text-base sm:text-lg mt-3"
        >
          there's one small thing I need to ask you.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.6, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
          className="serif mt-10 text-4xl sm:text-6xl leading-[1.05] text-cream tracking-tight"
        >
          Will you go on a<br />
          <span className="italic text-[var(--gold)]">first date</span> with me?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.4, delay: 4 }}
          className="mt-8 text-sm text-white/55 font-light tracking-wide"
        >
          Carefully designed after an unreasonable amount of overthinking.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-[1px] bg-white/60"
        />
        <span className="serif italic text-[11px] text-white/35 mt-2">proceed at your own emotional risk</span>
      </motion.div>
    </section>
  );
}
