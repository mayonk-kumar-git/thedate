import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Card = {
  article: string;
  title: string;
  doodle: React.ReactNode;
  body: string;
  footer: string;
  color: string;
};

const Crown = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    {/* Crown body */}
    <path d="M20 72 L20 45 L35 58 L50 35 L65 58 L80 45 L80 72 Z" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
    {/* Crown band */}
    <path d="M20 72 L80 72 L80 78 L20 78 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    {/* Jewels on tips */}
    <circle cx="20" cy="44" r="2.5" fill="currentColor"/>
    <circle cx="50" cy="34" r="3" fill="currentColor"/>
    <circle cx="80" cy="44" r="2.5" fill="currentColor"/>
    {/* Band jewels */}
    <circle cx="35" cy="75" r="1.5" fill="currentColor"/>
    <circle cx="50" cy="75" r="2" fill="currentColor"/>
    <circle cx="65" cy="75" r="1.5" fill="currentColor"/>
    {/* Sparkles */}
    <path d="M88 30 L90 26 L92 30 L88 30 M12 35 L14 31 L16 35 L12 35" stroke="currentColor" strokeWidth="1" fill="none"/>
  </svg>
);

const ChatBubble = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M20 22 Q20 18 24 18 H76 Q80 18 80 22 V55 Q80 59 76 59 H45 L30 72 V59 H24 Q20 59 20 55 Z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <circle cx="38" cy="38" r="3" fill="currentColor"/>
    <circle cx="50" cy="38" r="3" fill="currentColor"/>
    <circle cx="62" cy="38" r="3" fill="currentColor"/>
    <path d="M35 48 Q50 54 65 48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

const Calendar = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M20 28 L80 28 L80 82 L20 82 Z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <path d="M20 42 L80 42" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M32 20 L32 36 M50 20 L50 36 M68 20 L68 36" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M35 55 L45 65 L65 50" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VinylRecord = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
    <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="50" cy="50" r="4" fill="currentColor"/>
    <path d="M62 30 Q70 35 72 42" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M28 62 Q32 70 40 72" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

const PaintPalette = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M50 18 Q20 18 18 50 Q18 82 48 82 Q58 82 58 72 Q58 64 65 64 Q82 64 82 48 Q82 18 50 18 Z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <circle cx="35" cy="35" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="55" cy="30" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="30" cy="55" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="45" cy="65" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M70 35 L72 32 L74 38 L76 30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

const Notebook = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M25 15 H75 V85 H25 Z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <path d="M35 15 V85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/>
    <path d="M42 30 L68 30 M42 40 L65 40 M42 50 L60 50 M42 60 L67 60 M42 70 L55 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="30" cy="30" r="2" fill="currentColor"/>
    <circle cx="30" cy="50" r="2" fill="currentColor"/>
    <circle cx="30" cy="70" r="2" fill="currentColor"/>
  </svg>
);

const GiftBox = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M18 40 H82 V82 H18 Z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <path d="M15 30 H85 V40 H15 Z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <path d="M50 30 V82" stroke="currentColor" strokeWidth="2"/>
    <path d="M50 30 C50 30 35 20 30 22 Q25 24 28 28 Q32 32 50 30" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    <path d="M50 30 C50 30 65 20 70 22 Q75 24 72 28 Q68 32 50 30" stroke="currentColor" strokeWidth="1.8" fill="none"/>
  </svg>
);

const TeddyBear = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <circle cx="32" cy="22" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="68" cy="22" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="50" cy="45" r="22" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <circle cx="42" cy="40" r="3" fill="currentColor"/>
    <circle cx="58" cy="40" r="3" fill="currentColor"/>
    <ellipse cx="50" cy="50" rx="5" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M45 55 Q50 60 55 55" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M35 65 Q50 80 65 65" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="50" cy="85" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const Suitcase = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M18 35 H82 V78 H18 Z" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
    <path d="M35 35 V22 Q35 18 39 18 H61 Q65 18 65 22 V35" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <path d="M18 50 H82" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M22 62 L22 72 M78 62 L78 72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M30 82 Q50 88 70 82" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

const Heart = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M50 80 C20 58 15 32 32 25 Q42 22 50 35 Q58 22 68 25 C85 32 80 58 50 80 Z"
      stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
    <path d="M50 45 Q52 50 50 55" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M44 48 Q50 52 56 48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

const cards: Card[] = [
  { article: "Article I", title: "Princess Treatment", doodle: <Crown/>, body: "You are hereby enrolled in a lifetime subscription of cheesy pickup lines, shameless flirting, and a concerning amount of admiration. Side effects may include being reminded regularly that you're beautiful, brilliant, and entirely too easy to adore.", footer: "royal treatment included", color: "#FFE4E1" },
  { article: "Article II", title: "Unfiltered Nonsense", doodle: <ChatBubble/>, body: "You agree to tolerate an endless stream of double-meaning jokes, inappropriate timing, questionable humor, and backchodi. Especially during moments where responsible adults would probably choose seriousness.", footer: "maturity sold separately", color: "#E8F4FD" },
  { article: "Article III", title: "Time Blindness", doodle: <Calendar/>, body: "Date duration: as long as it takes. Conversations may accidentally continue until sunrise. We reserve the right to lose track of time entirely and pretend it was intentional.", footer: "watches discouraged", color: "#FFF3E0" },
  { article: "Article IV", title: "Cultural Exchange Program", doodle: <VinylRecord/>, body: "I reserve the right to judge your movie and music choices. However, you are required to introduce me to entirely new worlds of stories, songs, and artists so that we can discover and enjoy them together.", footer: "friendly criticism only", color: "#EDE7F6" },
  { article: "Article V", title: "Shared Cringe", doodle: <PaintPalette/>, body: "We are contractually obligated to experience the cringiest things together. This includes pottery, painting dates, cooking experiments, handwritten letters, and every other activity we claim is cheesy before secretly enjoying.", footer: "embarrassment shared equally", color: "#FFF8E1" },
  { article: "Article VI", title: "Memory Archive", doodle: <Notebook/>, body: "I will remember the smallest details, random stories, passing comments, favorite snacks, and tiny observations you casually mention. Even the ones you've forgotten telling me.", footer: "backed up permanently", color: "#E8EAF6" },
  { article: "Article VII", title: "Gift Embargo Removal", doodle: <GiftBox/>, body: "The embargo on gifts is officially lifted. I reserve the unrestricted right to surprise you with thoughtful presents, random flowers, unnecessary treats, and things that simply reminded me of you.", footer: "imports now unrestricted", color: "#F1F8E9" },
  { article: "Article VIII", title: "Lower Your Shields", doodle: <TeddyBear/>, body: "You will have to let your guard down around me. Even though I know you're capable of carrying the world on your own, you'll have to let me help sometimes. This includes allowing yourself to be silly, vulnerable, dramatic, and that little girl again.", footer: "this clause is non-negotiable", color: "#FDE7F0" },
  { article: "Article IX", title: "Documentary of Us", doodle: <Suitcase/>, body: "We will travel the world, collect ridiculous stories, take too many pictures, and document every little adventure. One day we'll look back and realize we accidentally built a documentary out of memories.", footer: "passport strongly encouraged", color: "#E0F7FA" },
  { article: "Article X", title: "The Only Real Clause", doodle: <Heart/>, body: "Above all, you get to be entirely yourself. No pretending. No performing. No filters. Just you. That's the only clause that actually matters.", footer: "signed, sincerely", color: "#FCE4EC" },
];

export function Doodles() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      setActive(Math.round(el.scrollLeft / (w * 0.82)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="doodles" data-section="doodles" className="min-h-[100dvh] relative flex flex-col justify-center snap-start pb-16">

      <div className="relative z-10 pt-2 px-6 text-center">
        <p className="hand text-2xl text-ink/90">terms &amp; conditions</p>
        <p className="text-[11px] tracking-[0.3em] text-ink/40 uppercase mt-1">scroll sideways →</p>
      </div>

      <div
        ref={scrollerRef}
        className="snap-x-cards relative z-10 mt-2 flex gap-4 px-[9vw] py-4"
      >
        {cards.map((c, i) => {
          const isActive = i === active;
          return (
            <motion.article
              key={i}
              className="snap-card wobble-border shrink-0 w-[82vw] max-w-[360px] h-[55vh] max-h-[460px] p-4 flex flex-col shadow-[0_0_40px_-5px_rgba(255,255,255,0.25)]"
              style={{ backgroundColor: c.color, color: "var(--ink)" }}
              animate={{
                scale: isActive ? 1 : 0.94,
                rotate: isActive ? 0 : i < active ? -4 : 4,
                opacity: isActive ? 1 : 0.7,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              <header className="flex items-start justify-between">
                <div>
                  <h3 className="serif text-2xl">{c.article}</h3>
                  <p className="serif font-bold text-base mt-1">{c.title}</p>
                </div>
                <span className="hand text-sm opacity-50">{String(i+1).padStart(2,'0')}</span>
              </header>

              <div className="flex-1 flex items-center justify-center my-2">
                {c.doodle}
              </div>

              <p className="serif text-sm leading-snug">{c.body}</p>

              <footer className="mt-2 pt-2 border-t border-dashed border-ink/30">
                <p className="hand text-base opacity-70">{c.footer}</p>
              </footer>
            </motion.article>
          );
        })}
        <div className="shrink-0 w-[8vw]" />
      </div>

      <div className="relative z-10 flex justify-center gap-1.5 pb-10">
        {cards.map((_, i) => (
          <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i===active ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-ink/20"}`} />
        ))}
      </div>
    </section>
  );
}
