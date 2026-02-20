"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Главная" },
  { href: "/#verticals", label: "Стратегии" },
  { href: "/about", label: "О нас" },
  { href: "/portal", label: "Инвестор-портал" },
  { href: "/analytics", label: "Insights" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-850/80 bg-obsidian/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white transition hover:text-silver-300"
        >
          Nomad AI Group
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition hover:text-white ${
                  pathname === href || (href === "/" && pathname === "/")
                    ? "text-silver-300"
                    : "text-silver-500"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="glass-btn rounded-lg p-2 text-silver-400 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Меню"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-850 bg-obsidian md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-silver-400 hover:bg-slate-850 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
