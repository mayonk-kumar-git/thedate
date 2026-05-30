import { motion } from "framer-motion";

export function Success() {
  return (
    <section id="final" data-section="final" className="min-h-[85dvh] relative flex items-end justify-center snap-start pb-28 pt-12">

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
          className="mx-auto mt-12 max-w-[300px] relative bg-[var(--paper)] p-5 flex flex-row-reverse items-center gap-4 text-[var(--ink)]"
          style={{
            boxShadow: "0 4px 20px -6px rgba(0,0,0,0.3)",
          }}
        >
          {/* Tape strips - rectangular pieces overlaying corners */}
          <svg className="absolute -top-2 -left-3 w-10 h-6 z-10 rotate-[-45deg]" viewBox="0 0 40 12" fill="none">
            <rect x="0" y="0" width="40" height="12" rx="1" fill="rgba(255,235,150,0.55)" stroke="rgba(200,180,100,0.3)" strokeWidth="0.5" />
          </svg>
          <svg className="absolute -top-2 -right-3 w-10 h-6 z-10 rotate-[45deg]" viewBox="0 0 40 12" fill="none">
            <rect x="0" y="0" width="40" height="12" rx="1" fill="rgba(255,235,150,0.55)" stroke="rgba(200,180,100,0.3)" strokeWidth="0.5" />
          </svg>
          <svg className="absolute -bottom-2 -left-3 w-10 h-6 z-10 rotate-[45deg]" viewBox="0 0 40 12" fill="none">
            <rect x="0" y="0" width="40" height="12" rx="1" fill="rgba(255,235,150,0.55)" stroke="rgba(200,180,100,0.3)" strokeWidth="0.5" />
          </svg>
          <svg className="absolute -bottom-2 -right-3 w-10 h-6 z-10 rotate-[-45deg]" viewBox="0 0 40 12" fill="none">
            <rect x="0" y="0" width="40" height="12" rx="1" fill="rgba(255,235,150,0.55)" stroke="rgba(200,180,100,0.3)" strokeWidth="0.5" />
          </svg>
          {/* Simple dress doodle */}
          <div className="shrink-0 w-16 h-28 text-ink/80">
            <svg viewBox="0 0 169 261" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full dress-draw">
              <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M61 26 C69 18, 75 10, 84 4 C92 10, 99 18, 107 26" />
                <path d="M61 26 C67 35, 73 40, 84 46 C95 40, 101 35, 107 26" />
                <path d="M84 4 C84 18, 83 31, 84 46" />
                <path d="M70 46 C62 58, 60 76, 61 91 C62 108, 65 126, 67 142" />
                <path d="M98 46 C105 58, 108 75, 107 91 C106 110, 101 127, 95 143" />
                <path d="M67 142 C56 156, 46 172, 37 188 C29 203, 21 219, 16 235 C30 240, 43 245, 55 248 C65 250, 76 251, 86 248" />
                <path d="M95 143 C103 156, 112 172, 121 188 C128 200, 136 211, 146 218 C154 224, 161 228, 166 228 C168 232, 169 236, 168 240 C156 247, 141 250, 126 249 C116 248, 107 245, 98 240" />
                <path d="M84 158 C88 170, 93 182, 100 194 C106 205, 112 215, 118 224 C121 229, 122 235, 120 240 C111 242, 103 242, 95 240" />
                <path d="M16 235 C23 239, 31 242, 39 244 C47 246, 54 247, 61 247 C68 246, 74 245, 80 244" />
                <path d="M98 240 C105 245, 113 247, 122 248 C133 249, 144 248, 155 245 C160 244, 164 242, 168 240" />
                <path d="M87 238 C85 241, 83 244, 80 246" />
              </g>
            </svg>
          </div>

          <div className="flex flex-col">
            <p className="serif italic text-sm text-ink/80">I want you in a<br /><span className="font-semibold text-ink">black</span> or <span className="font-semibold" style={{ color: "oklch(0.35 0.15 260)" }}>midnight blue</span> dress</p>
            <p className="serif italic mt-2 text-[11px] text-ink/60">
              because I already know you'll look breathtaking.
            </p>
          </div>
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
          <p className="hand mt-10 text-base text-white/40">To forever…</p>
        </motion.div>
      </div>
    </section>
  );
}
