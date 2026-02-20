"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";

type Props = { onSuccess: () => void };

export function PortalLogin({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 800);
  };

  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center px-4 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <h1 className="text-center text-2xl font-bold text-white">
          Инвестор-портал
        </h1>
        <p className="mt-2 text-center text-sm text-silver-500">
          Вход в защищённую зону
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-850 bg-slate-950/80 p-6 backdrop-blur-sm"
        >
          <label className="block">
            <span className="mb-1 block text-xs text-silver-500">Email</span>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-500"
                aria-hidden
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="partner@company.com"
                required
                className="w-full rounded-lg border border-slate-850 bg-obsidian py-2.5 pl-10 pr-4 text-white placeholder:text-silver-500 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
              />
            </div>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-silver-500">Пароль</span>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-500"
                aria-hidden
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-850 bg-obsidian py-2.5 pl-10 pr-4 text-white placeholder:text-silver-500 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
              />
            </div>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="glass-btn mt-2 w-full rounded-lg bg-silver-400 py-3 text-sm font-medium text-obsidian transition hover:bg-silver-300 disabled:opacity-60"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
