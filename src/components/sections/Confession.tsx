import { motion } from "framer-motion";

const slides = [
  ["We met when neither of us was searching."],
  ["And somehow…", "among billions of people…", "we found each other anyway."],
  ["Maybe that's what magic looks like."],
  ["You started feeling like home so naturally", "that I didn't even notice when it happened."],
  ["Same soul.", "Different bodies."],
  ["And if life becomes difficult someday…", "I still want it to be with you."],
];

export function Confession() {
  return (
    <section id="confession" data-section="confession" className="relative">
      {slides.map((lines, i) => (
        <div
          key={i}
          className="min-h-screen relative flex items-center justify-center snap-start pb-20"
        >
          <div className="relative z-10 px-8 max-w-xl text-center">
            {lines.map((line, j) => (
              <motion.p
                key={j}
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 1.6, delay: 0.4 + j * 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`serif italic leading-[1.25] text-cream ${
                  lines.length === 1 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl mt-4"
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
