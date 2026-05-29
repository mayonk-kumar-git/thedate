import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import mine1 from "@/images/memories/mine/mine_1.jpeg";
import mine2 from "@/images/memories/mine/mine_2.JPG";
import mine3 from "@/images/memories/mine/mine_3.JPG";
import hers1 from "@/images/memories/hers/hers_1.jpg";
import hers2 from "@/images/memories/hers/hers_2.jpeg";
import hers3 from "@/images/memories/hers/hers_3.jpeg";
import ours1 from "@/images/memories/ours/ours_1.jpg";
import ours2 from "@/images/memories/ours/ours_2.jpeg";
import ours3 from "@/images/memories/ours/ours_3.jpeg";

type Bubble = {
  id: number;
  type: "mine" | "hers" | "ours" | "future";
  size: number;
  x: number;
  y: number;
  delay: number;
  label: string;
  caption: string;
  image?: string;
};

const futurePlaceholders = [
  "awaiting a sunset together",
  "future memory loading...",
  "loading shared laughter...",
  "placeholder for our first trip",
  "reserved for spontaneous adventures",
  "photo not taken yet",
];

const bubbles: Bubble[] = [
  // My memories - scattered around the sphere
  { id: 1, type: "mine", size: 72, x: 15, y: 12, delay: 0, label: "", caption: "", image: mine1 },
  { id: 2, type: "mine", size: 62, x: 68, y: 8, delay: 0.8, label: "", caption: "", image: mine2 },
  { id: 3, type: "mine", size: 58, x: 3, y: 48, delay: 1.4, label: "", caption: "", image: mine3 },
  // Her memories - mid ring
  { id: 4, type: "hers", size: 68, x: 72, y: 45, delay: 0.3, label: "", caption: "", image: hers1 },
  { id: 5, type: "hers", size: 60, x: 12, y: 72, delay: 1.1, label: "", caption: "", image: hers2 },
  { id: 6, type: "hers", size: 64, x: 65, y: 78, delay: 0.6, label: "", caption: "", image: hers3 },
  // Our memories - center cluster
  { id: 7, type: "ours", size: 82, x: 32, y: 32, delay: 0.2, label: "", caption: "", image: ours1 },
  { id: 8, type: "ours", size: 76, x: 45, y: 52, delay: 0.9, label: "", caption: "", image: ours2 },
  { id: 9, type: "ours", size: 70, x: 28, y: 58, delay: 1.5, label: "", caption: "", image: ours3 },
  // Future memories - outer ring
  { id: 10, type: "future", size: 66, x: 42, y: 2, delay: 0.5, label: futurePlaceholders[0], caption: "Future memory slot available." },
  { id: 11, type: "future", size: 60, x: 82, y: 25, delay: 1.2, label: futurePlaceholders[1], caption: "Future memory slot available." },
  { id: 12, type: "future", size: 68, x: 78, y: 65, delay: 0.7, label: futurePlaceholders[2], caption: "Future memory slot available." },
  { id: 13, type: "future", size: 56, x: 45, y: 85, delay: 1.8, label: futurePlaceholders[3], caption: "Future memory slot available." },
  { id: 14, type: "future", size: 62, x: 5, y: 85, delay: 1.0, label: futurePlaceholders[4], caption: "Future memory slot available." },
  { id: 15, type: "future", size: 58, x: 0, y: 28, delay: 2.0, label: futurePlaceholders[5], caption: "Future memory slot available." },
];

const blobPaths = [
  "M45,0 C70,0 90,20 90,45 C90,70 70,90 45,90 C20,90 0,70 0,45 C0,20 20,0 45,0",
  "M42,2 C68,0 88,22 90,48 C92,72 68,92 44,90 C18,88 0,68 2,44 C4,18 18,4 42,2",
  "M48,0 C72,4 92,24 88,50 C84,74 66,90 42,88 C16,86 0,66 4,42 C8,16 24,-4 48,0",
  "M44,1 C66,0 90,18 90,44 C90,72 72,90 46,90 C20,90 2,72 0,46 C-2,20 22,2 44,1",
];

function getBubbleStyle(bubble: Bubble) {
  const baseOpacity = bubble.type === "ours" ? 0.35 : bubble.type === "future" ? 0.15 : 0.25;
  const borderColor = bubble.type === "ours"
    ? "rgba(255,255,255,0.25)"
    : bubble.type === "future"
    ? "rgba(255,255,255,0.1)"
    : "rgba(255,255,255,0.15)";
  const bgColor = bubble.type === "ours"
    ? `rgba(255,255,255,${baseOpacity})`
    : bubble.type === "future"
    ? `rgba(180,180,220,${baseOpacity})`
    : `rgba(220,220,240,${baseOpacity})`;

  return { borderColor, bgColor };
}

export function Memories() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="memories" data-section="memories" className="min-h-screen relative flex flex-col items-center justify-center snap-start pb-20 overflow-hidden">

      {/* Heading */}
      <div className="relative z-10 px-8 max-w-md text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="serif italic text-base sm:text-lg text-cream/90 leading-relaxed"
        >
          We've already lived so many stories on our own.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="serif italic text-base sm:text-lg text-cream/90 leading-relaxed mt-2"
        >
          I think it's time we start collecting some <span className="text-[var(--gold)]">together</span>.
        </motion.p>
      </div>

      {/* Memory Universe */}
      <div className="relative z-10 w-full max-w-md h-[50vh] mx-auto">
        {bubbles.map((bubble) => {
          const style = getBubbleStyle(bubble);
          const pathIndex = bubble.id % blobPaths.length;
          const isExpanded = expanded === bubble.id;

          return (
            <motion.div
              key={bubble.id}
              className="absolute cursor-pointer"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: bubble.size,
                height: bubble.size,
                zIndex: bubble.type === "ours" ? 3 : bubble.type === "future" ? 1 : 2,
              }}
              animate={{
                y: [0, -4 - (bubble.id % 3) * 2, 0],
                scale: [1, 1.08 + (bubble.id % 4) * 0.02, 0.95, 1],
              }}
              transition={{
                duration: 6 + (bubble.id % 4),
                repeat: Infinity,
                delay: bubble.delay,
                ease: "easeInOut",
              }}
              onClick={() => setExpanded(isExpanded ? null : bubble.id)}
            >
              <svg
                viewBox="0 0 90 90"
                className="w-full h-full"
                style={{ filter: bubble.type === "ours" ? "drop-shadow(0 0 8px rgba(255,255,255,0.15))" : "none" }}
              >
                <defs>
                  <clipPath id={`blob-clip-${bubble.id}`}>
                    <path d={blobPaths[pathIndex]} />
                  </clipPath>
                </defs>
                {bubble.image ? (
                  <image
                    href={bubble.image}
                    x="0" y="0" width="90" height="90"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#blob-clip-${bubble.id})`}
                  />
                ) : (
                  <path
                    d={blobPaths[pathIndex]}
                    fill={style.bgColor}
                  />
                )}
                <path
                  d={blobPaths[pathIndex]}
                  fill="none"
                  stroke={style.borderColor}
                  strokeWidth="1"
                />
              </svg>

              {/* Future memory label */}
              {bubble.type === "future" && bubble.label && (
                <span className="absolute inset-0 flex items-center justify-center text-[7px] text-white/40 text-center px-1 leading-tight hand">
                  {bubble.label}
                </span>
              )}

              {/* Type indicator dot */}
              {bubble.type !== "future" && (
                <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
                  bubble.type === "ours" ? "bg-[var(--gold)]/60" : "bg-white/30"
                }`} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Expanded bubble overlay */}
      <AnimatePresence>
        {expanded !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setExpanded(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-64 h-64 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 90 90" className="w-full h-full absolute inset-0">
                <defs>
                  <clipPath id="blob-clip-expanded">
                    <path d={blobPaths[expanded % blobPaths.length]} />
                  </clipPath>
                </defs>
                {bubbles.find(b => b.id === expanded)?.image ? (
                  <image
                    href={bubbles.find(b => b.id === expanded)?.image}
                    x="0" y="0" width="90" height="90"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#blob-clip-expanded)"
                  />
                ) : (
                  <path
                    d={blobPaths[expanded % blobPaths.length]}
                    fill="rgba(255,255,255,0.08)"
                  />
                )}
                <path
                  d={blobPaths[expanded % blobPaths.length]}
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="0.5"
                />
              </svg>
              <div className="relative z-10 text-center px-8 mt-4">
                <p className="serif italic text-lg text-cream/90">
                  {bubbles.find(b => b.id === expanded)?.caption}
                </p>
                {bubbles.find(b => b.id === expanded)?.type === "future" && (
                  <p className="hand text-sm text-white/40 mt-3">
                    {bubbles.find(b => b.id === expanded)?.label}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom text */}
      <div className="relative z-10 px-8 max-w-md text-center mt-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="serif italic text-base text-white/60 leading-relaxed"
        >
          We already have our own stories.<br />
          I can't wait to see the ones we write together.
        </motion.p>
      </div>
    </section>
  );
}
