"use client";

export function PatternBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute -top-1/2 -right-1/4 h-full w-1/2 rounded-full bg-slate-850/30 blur-3xl" />
      <div className="absolute -bottom-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-slate-850/20 blur-3xl" />
    </div>
  );
}
