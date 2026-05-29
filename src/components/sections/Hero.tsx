import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="hero" data-section="hero" className="min-h-screen relative flex items-center justify-center snap-start pb-20">

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
        <p className="serif italic text-white/75 text-base sm:text-lg">
          Before I officially call you mine...
        </p>

        <p className="serif italic text-white/75 text-base sm:text-lg mt-3">
          there's one small thing I need to ask you.
        </p>

        <h1 className="serif mt-10 text-4xl sm:text-6xl leading-[1.05] text-cream tracking-tight">
          Will you go on a<br />
          <span className="italic text-[var(--gold)]">first date</span> with me?
        </h1>

        <p className="mt-8 text-[10px] text-white/35 font-light tracking-wide">
          Carefully designed after an unreasonable amount of overthinking.
        </p>
      </div>

      <div className="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-[1px] bg-white/60"
        />
        <span className="serif italic text-[11px] text-white/35 mt-2">proceed at your own emotional risk</span>
      </div>
    </section>
  );
}
