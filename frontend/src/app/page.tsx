"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Dna, Sparkles } from "lucide-react";
import { PatternBg } from "@/components/PatternBg";
import { AUMWidget } from "@/components/AUMWidget";
import { VerticalCard } from "@/components/VerticalCard";
import { ScrollReveal } from "@/components/ScrollReveal";

const verticals = [
  {
    title: "GenAI Infrastructure",
    thesis:
      "Инвестиции в инфраструктуру генеративного ИИ: GPU-кластеры, дата-центры и платформы для обучения моделей. Фокус на долгосрочных контрактах с лидерами рынка.",
    risk: "Средний" as const,
    icon: Sparkles,
  },
  {
    title: "Quantum Computing",
    thesis:
      "Ранние позиции в квантовых вычислениях и смежных технологиях. Партнёрства с лабораториями и стартапами на стадии коммерциализации.",
    risk: "Высокий" as const,
    icon: Cpu,
  },
  {
    title: "Biotech Systems",
    thesis:
      "Системная биотехнология и точная медицина: инструменты диагностики, платформы данных и терапии следующего поколения с измеримым клиническим выходом.",
    risk: "Средний" as const,
    icon: Dna,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-24 pb-16 md:px-6">
        <PatternBg />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Nomad AI Group: Алгоритмическое управление капиталом
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-lg text-silver-400 md:text-xl">
              B2B инвестиционные стратегии на стыке AI и глобальных рынков
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/portal"
                className="glass-btn inline-flex items-center rounded-lg bg-silver-400 px-6 py-3 text-sm font-medium text-obsidian transition hover:bg-silver-300"
              >
                Инвестор-портал
              </Link>
              <Link
                href="/#verticals"
                className="glass-btn inline-flex items-center rounded-lg border border-slate-850 bg-slate-950/60 px-6 py-3 text-sm font-medium text-white transition hover:border-silver-500 hover:bg-slate-850"
              >
                Наши стратегии
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="mt-12 flex justify-center">
              <AUMWidget />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        id="verticals"
        className="relative border-t border-slate-850 bg-slate-950/30 px-4 py-20 md:px-6"
      >
        <PatternBg />
        <div className="relative z-10 mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
              Инвестиционные вертикали
            </h2>
            <p className="mx-auto max-w-2xl text-center text-silver-400">
              Стратегии с чётким тезисом и прозрачной оценкой риска
            </p>
          </ScrollReveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((v, i) => (
              <VerticalCard key={v.title} {...v} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
