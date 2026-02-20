"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

type Props = {
  title: string;
  thesis: string;
  risk: "Низкий" | "Средний" | "Высокий";
  icon: LucideIcon;
  index: number;
};

export function VerticalCard({ title, thesis, risk, icon: Icon, index }: Props) {
  const riskColor =
    risk === "Низкий"
      ? "text-emerald-400/90"
      : risk === "Средний"
        ? "text-amber-400/90"
        : "text-rose-400/90";

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.article
        whileHover={{ y: -4 }}
        className="glass-btn group flex flex-col rounded-xl border border-slate-850 bg-slate-950/60 p-6 backdrop-blur-sm transition"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-850 text-silver-400 transition group-hover:text-silver-300">
          <Icon size={24} aria-hidden />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-silver-400">
          {thesis}
        </p>
        <p className={`text-xs font-medium uppercase tracking-wider ${riskColor}`}>
          Риск: {risk}
        </p>
      </motion.article>
    </ScrollReveal>
  );
}
