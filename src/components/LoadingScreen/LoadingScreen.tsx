import { useEffect, useState } from "react";

interface LoadingScreenProps {
  words?: string[];
}

const defaultWords = [
  "Carregando",
  "Aguarde",
  "Preparando",
  "Sincronizando",
  "Iniciando",
];

type Phase = "enter" | "hold" | "exit";

export function LoadingScreen({ words = defaultWords }: LoadingScreenProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("enter");

  useEffect(() => {
    const durations: Record<Phase, number> = {
      enter: 400,
      hold: 900,
      exit: 350,
    };

    const next: Record<Phase, Phase> = {
      enter: "hold",
      hold: "exit",
      exit: "enter",
    };

    const timer = setTimeout(() => {
      if (phase === "exit") {
        setIndex((i) => (i + 1) % words.length);
      }
      setPhase(next[phase]);
    }, durations[phase]);

    return () => clearTimeout(timer);
  }, [phase, index, words.length]);

  const transforms: Record<Phase, string> = {
    enter: "translateY(0)",
    hold: "translateY(0)",
    exit: "translateY(-110%)",
  };

  const opacities: Record<Phase, number> = {
    enter: 1,
    hold: 1,
    exit: 0,
  };

  const incoming: Record<Phase, string> = {
    enter: "translateY(0)",
    hold: "translateY(0)",
    exit: "translateY(-110%)",
  };

  const word = words[index];
  const nextWord = words[(index + 1) % words.length];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div className="relative overflow-hidden h-[4.5rem] flex items-center">
        {/* word exiting */}
        <span
          aria-hidden="true"
          className="absolute text-5xl font-bold tracking-tight text-foreground select-none"
          style={{
            transform: transforms[phase],
            opacity: opacities[phase],
            transition:
              phase === "exit"
                ? "transform 350ms cubic-bezier(0.4,0,1,1), opacity 350ms ease"
                : phase === "enter"
                ? "transform 400ms cubic-bezier(0,0,0.2,1)"
                : "none",
          }}
        >
          {word}
        </span>

        {/* word entering (peeks from below on exit) */}
        <span
          aria-hidden="true"
          className="absolute text-5xl font-bold tracking-tight text-foreground select-none"
          style={{
            transform:
              phase === "exit" ? "translateY(0)" : "translateY(110%)",
            opacity: phase === "exit" ? 0.15 : 0,
            transition:
              phase === "exit"
                ? "transform 350ms cubic-bezier(0.4,0,1,1)"
                : "none",
          }}
        >
          {nextWord}
        </span>

        {/* screen reader only */}
        <span className="sr-only">{word}</span>
      </div>

      {/* pulse line */}
      <div className="mt-8 w-8 h-px bg-foreground/20 relative overflow-hidden rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-foreground/60 rounded-full"
          style={{
            animation: "vime-pulse 1.65s ease-in-out infinite",
            width: "40%",
          }}
        />
      </div>

      <style>{`
        @keyframes vime-pulse {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(250%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}
