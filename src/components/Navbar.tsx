import { motion } from "framer-motion";

const items = [
  { id: "hero", symbol: "○", label: "intro" },
  { id: "doodles", symbol: "✦", label: "chaos" },
  { id: "confession", symbol: "☁", label: "truth" },
  { id: "decision", symbol: "♡", label: "us" },
];

export function Navbar({ active, onJump }: { active: string; onJump: (id: string) => void }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <ul className="flex flex-row gap-5 rounded-full border border-white/10 bg-black/30 backdrop-blur-md px-4 py-2">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <button
                onClick={() => onJump(it.id)}
                aria-label={it.label}
                className="group relative flex h-8 w-8 items-center justify-center"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[var(--gold)]/15 ring-1 ring-[var(--gold)]/40"
                    style={{ boxShadow: "0 0 18px -2px oklch(0.82 0.11 78 / 0.55)" }}
                    transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  />
                )}
                <span
                  className={`relative text-[15px] transition-colors duration-500 ${
                    isActive ? "text-[var(--gold)]" : "text-white/45 group-hover:text-white/80"
                  }`}
                >
                  {it.symbol}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
