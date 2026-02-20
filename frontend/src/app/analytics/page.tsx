"use client";

import Link from "next/link";
import { PatternBg } from "@/components/PatternBg";
import { ScrollReveal } from "@/components/ScrollReveal";

const insights = [
  { date: "2025-02-18", title: "Квартальный обзор: GenAI инфраструктура", category: "Research" },
  { date: "2025-02-10", title: "Риск-метрики и стресс-сценарии Q1", category: "Risk" },
  { date: "2025-01-28", title: "Biotech: обновление позиций и тезис", category: "Strategy" },
  { date: "2025-01-15", title: "Quantum computing — дорожная карта инвестиций", category: "Research" },
  { date: "2024-12-20", title: "Годовой отчёт и прогноз на 2025", category: "Report" },
];

export default function AnalyticsPage() {
  return (
    <div className="relative">
      <PatternBg />
      <section className="relative z-10 mx-auto max-w-4xl px-4 pt-28 pb-20 md:px-6">
        <ScrollReveal>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Insights
          </h1>
          <p className="mt-2 text-silver-400">
            Отчёты и аналитика
          </p>
        </ScrollReveal>

        <ul className="mt-12 space-y-1 border-t border-slate-850">
          {insights.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.05}>
              <li>
                <Link
                  href="#"
                  className="glass-btn flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-slate-850 py-5 transition hover:bg-slate-950/40 md:flex-nowrap"
                >
                  <span className="w-24 shrink-0 text-xs tabular-nums text-silver-500 md:w-28">
                    {item.date}
                  </span>
                  <span className="flex-1 font-medium text-white">
                    {item.title}
                  </span>
                  <span className="shrink-0 text-xs uppercase tracking-wider text-silver-500">
                    {item.category}
                  </span>
                </Link>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
