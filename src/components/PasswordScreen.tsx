import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const wrongMessages = [
  "nice try, but no.",
  "that's not even close.",
  "are you guessing?",
  "I said if you're her, you'd know.",
  "still wrong.",
  "maybe try remembering harder.",
  "nope. not that either.",
  "you're really committed to being wrong.",
  "I admire the persistence.",
  "wrong again. shocking.",
];

export function PasswordScreen({ onSuccess }: { onSuccess: () => void }) {
  const [time1, setTime1] = useState(["", "", "", ""]);
  const [time2, setTime2] = useState(["", "", "", ""]);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refs1 = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const refs2 = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleInput = (
    value: string,
    index: number,
    timeArr: string[],
    setTimeArr: (v: string[]) => void,
    refs: React.RefObject<HTMLInputElement | null>[]
  ) => {
    if (!/^\d?$/.test(value)) return;
    const newArr = [...timeArr];
    newArr[index] = value;
    setTimeArr(newArr);

    if (value && index < 3) {
      refs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    index: number,
    timeArr: string[],
    setTimeArr: (v: string[]) => void,
    refs: React.RefObject<HTMLInputElement | null>[]
  ) => {
    if (e.key === "Backspace" && !timeArr[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  const checkPassword = () => {
    const t1 = time1[0] + time1[1] + ":" + time1[2] + time1[3];
    const t2 = time2[0] + time2[1] + ":" + time2[2] + time2[3];

    if (t1 === "03:22" && t2 === "03:33") {
      setSuccess(true);
      setMessage("welcome my queen, Rushali");
      setTimeout(() => onSuccess(), 2000);
    } else {
      const msg = wrongMessages[attempts % wrongMessages.length];
      setMessage(msg);
      setAttempts((a) => a + 1);
      if (messageTimer.current) clearTimeout(messageTimer.current);
      messageTimer.current = setTimeout(() => setMessage(null), 3500);
    }
  };

  const allFilled = time1.every((d) => d !== "") && time2.every((d) => d !== "");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: success ? 0 : 1 }}
      transition={{ duration: 1.2, delay: success ? 1 : 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#03040A]"
    >
      <div className="w-full max-w-sm px-8 text-center">
        {/* Heading */}
        <p className="serif italic text-lg text-cream/80">
          if you are <span className="uppercase text-[var(--gold)] font-semibold">HER</span>, you know it
        </p>

        {/* Date hint */}
        <p className="hand text-2xl text-[var(--gold)] mt-4">22nd April</p>

        {/* Time inputs */}
        <div className="mt-10 flex flex-col gap-6">
          {/* Time 1 */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {[0, 1].map((i) => (
                <input
                  key={`t1-${i}`}
                  ref={refs1[i]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={time1[i]}
                  onChange={(e) => handleInput(e.target.value, i, time1, setTime1, refs1)}
                  onKeyDown={(e) => handleKeyDown(e, i, time1, setTime1, refs1)}
                  className="w-10 h-12 text-center text-xl font-mono bg-white/5 border border-white/20 rounded-lg text-cream focus:border-[var(--gold)] focus:outline-none transition"
                />
              ))}
            </div>
            <span className="text-cream/60 text-xl font-mono">:</span>
            <div className="flex gap-1">
              {[2, 3].map((i) => (
                <input
                  key={`t1-${i}`}
                  ref={refs1[i]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={time1[i]}
                  onChange={(e) => handleInput(e.target.value, i, time1, setTime1, refs1)}
                  onKeyDown={(e) => handleKeyDown(e, i, time1, setTime1, refs1)}
                  className="w-10 h-12 text-center text-xl font-mono bg-white/5 border border-white/20 rounded-lg text-cream focus:border-[var(--gold)] focus:outline-none transition"
                />
              ))}
            </div>
            <span className="text-cream/40 text-xs ml-2">AM</span>
          </div>

          {/* Time 2 */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {[0, 1].map((i) => (
                <input
                  key={`t2-${i}`}
                  ref={refs2[i]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={time2[i]}
                  onChange={(e) => handleInput(e.target.value, i, time2, setTime2, refs2)}
                  onKeyDown={(e) => handleKeyDown(e, i, time2, setTime2, refs2)}
                  className="w-10 h-12 text-center text-xl font-mono bg-white/5 border border-white/20 rounded-lg text-cream focus:border-[var(--gold)] focus:outline-none transition"
                />
              ))}
            </div>
            <span className="text-cream/60 text-xl font-mono">:</span>
            <div className="flex gap-1">
              {[2, 3].map((i) => (
                <input
                  key={`t2-${i}`}
                  ref={refs2[i]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={time2[i]}
                  onChange={(e) => handleInput(e.target.value, i, time2, setTime2, refs2)}
                  onKeyDown={(e) => handleKeyDown(e, i, time2, setTime2, refs2)}
                  className="w-10 h-12 text-center text-xl font-mono bg-white/5 border border-white/20 rounded-lg text-cream focus:border-[var(--gold)] focus:outline-none transition"
                />
              ))}
            </div>
            <span className="text-cream/40 text-xs ml-2">AM</span>
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={checkPassword}
          disabled={!allFilled}
          className="mt-8 px-8 py-3 rounded-xl serif italic text-base border border-[var(--gold)]/40 text-[var(--gold)] bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          enter
        </button>

        {/* Dog doodle + message */}
        <div className="mt-10 flex flex-col items-center">
          <div className="h-10 relative w-full flex items-end justify-center">
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0"
                >
                  <div className="relative px-4 py-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur text-xs text-cream/80 whitespace-nowrap">
                    {message}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20" />
                    <div className="absolute -bottom-3 left-1/2 translate-x-1 w-1.5 h-1.5 rounded-full bg-white/10 border border-white/20" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Puppy doodle */}
          <svg width="80" height="80" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="doodle">
            <g stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M82 42 C80 34,78 30,82 28" />
              <path d="M90 40 C90 32,90 28,92 26" />
              <path d="M98 42 C100 34,102 30,98 28" />
              <path d="M42 68C25 55,18 78,35 88" />
              <path d="M138 68C155 55,162 78,145 88" />
              <path d="M40 80C40 55,60 45,78 48C85 42,95 42,102 48C120 45,140 55,140 80L140 125L40 125Z" />
              <path d="M67 78 Q71 72 75 78" />
              <path d="M105 78 Q109 72 113 78" />
              <path d="M87 86Q90 82 93 86Q90 90 87 86" fill="rgba(255,255,255,0.7)" />
              <path d="M90 88 L90 96" />
              <path d="M90 96 C80 104,70 100,65 98" />
              <path d="M90 96 C100 104,110 100,115 98" />
              <path d="M70 110 C66 118,66 125,70 132" />
              <path d="M110 110 C114 118,114 125,110 132" />
              <circle cx="55" cy="130" r="10" />
              <circle cx="125" cy="130" r="10" />
              <path d="M10 130 H50" />
              <path d="M130 130 H170" />
            </g>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
