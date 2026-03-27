import { useState, useRef, useEffect } from "react";

export interface AppSwitcherApp {
  label: string;
  url: string;
}

interface AppSwitcherProps {
  currentApp: string;
  userRole: string;
  apps: AppSwitcherApp[];
  onNavigate?: (url: string) => void;
}

function initials(label: string) {
  return label
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function AppSwitcher({ currentApp, userRole, apps, onNavigate }: AppSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  if (userRole !== "admin") return null;

  const others = apps.filter((a) => a.label !== currentApp);
  if (others.length === 0) return null;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md text-muted-foreground text-[13px] font-medium cursor-pointer transition-colors duration-150 hover:bg-muted hover:text-foreground bg-transparent border-none"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
          <rect x="8.5" y="1" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
          <rect x="1" y="8.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
          <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
        </svg>
        Módulos
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 min-w-[200px] bg-card border border-border rounded-xl shadow-xl shadow-black/10 py-1.5 z-50">
          <p className="px-3 pt-1 pb-2 text-[11px] font-medium text-muted-foreground border-b border-border mb-1">
            Em: <span className="text-foreground font-semibold">{currentApp}</span>
          </p>
          {others.map((app) => (
            <button
              key={app.url}
              onClick={() => onNavigate ? onNavigate(app.url) : (window.location.href = app.url)}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] font-medium text-foreground bg-transparent hover:bg-muted transition-colors duration-100 cursor-pointer text-left border-none"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-muted text-muted-foreground text-[10px] font-bold tracking-wide shrink-0">
                {initials(app.label)}
              </span>
              {app.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
