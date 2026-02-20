"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-850 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 text-silver-500">
            <Shield size={18} aria-hidden />
            <span className="text-sm">Nomad AI Group. Защищённые B2B решения.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-silver-500">
            <Link href="/about" className="transition hover:text-silver-300">
              О нас
            </Link>
            <Link href="/portal" className="transition hover:text-silver-300">
              Инвестор-портал
            </Link>
            <Link href="/analytics" className="transition hover:text-silver-300">
              Insights
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-silver-500">
          © {new Date().getFullYear()} Nomad AI Group. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
