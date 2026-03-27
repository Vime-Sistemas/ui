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
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded border border-border bg-transparent text-muted-foreground text-[13px] font-medium cursor-pointer transition-colors duration-150 hover:bg-muted hover:text-foreground"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        Módulos
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] right-0 min-w-[180px] bg-card border border-border rounded-xl shadow-md p-1 z-50">
          <p className="px-2.5 pt-1.5 pb-1 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
            Ir para
          </p>
          {others.map((app) => (
            <button
              key={app.url}
              onClick={() => onNavigate ? onNavigate(app.url) : (window.location.href = app.url)}
              className="flex items-center w-full px-2.5 py-2 rounded text-[13px] font-medium text-foreground bg-transparent hover:bg-muted transition-colors duration-100 cursor-pointer text-left border-none"
            >
              {app.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
