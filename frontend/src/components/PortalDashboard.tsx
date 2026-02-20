"use client";

import { motion } from "framer-motion";
import { LogOut, MessageCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ScrollReveal } from "@/components/ScrollReveal";

const yieldData = [
  { month: "Авг", value: 100 },
  { month: "Сен", value: 102.2 },
  { month: "Окт", value: 104.1 },
  { month: "Ноя", value: 106.8 },
  { month: "Дек", value: 108.2 },
  { month: "Янв", value: 111.4 },
  { month: "Фев", value: 113.1 },
];

const positions = [
  { name: "GenAI Infra Fund", allocation: "42%", value: "€1.2M" },
  { name: "Quantum Opportunities", allocation: "28%", value: "€0.8M" },
  { name: "Biotech Systems LP", allocation: "30%", value: "€0.85M" },
];

type Props = { onLogout: () => void };

export function PortalDashboard({ onLogout }: Props) {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-28 pb-20 md:px-6">
      <ScrollReveal>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-white md:text-3xl">
            Dashboard
          </h1>
          <button
            type="button"
            onClick={onLogout}
            className="glass-btn flex items-center gap-2 rounded-lg border border-slate-850 px-4 py-2 text-sm text-silver-400 transition hover:border-silver-500 hover:text-white"
          >
            <LogOut size={18} />
            Выход
          </button>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mt-8 rounded-xl border border-slate-850 bg-slate-950/60 p-4 md:p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Доходность (индекс 100)
          </h2>
          <div className="h-64 w-full md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.15)" />
                <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f1218",
                    border: "1px solid #1a1d24",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#c4c8cc" }}
                  formatter={(value: number) => [value.toFixed(1), "Индекс"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  dot={{ fill: "#1a1d24", stroke: "#9ca3af" }}
                  activeDot={{ r: 4, fill: "#c4c8cc" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ScrollReveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <ScrollReveal delay={0.15}>
          <div className="rounded-xl border border-slate-850 bg-slate-950/60 p-4 md:p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Активные позиции
            </h2>
            <ul className="space-y-3">
              {positions.map((p) => (
                <li
                  key={p.name}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-3 last:border-0 last:pb-0"
                >
                  <span className="font-medium text-white">{p.name}</span>
                  <span className="text-sm text-silver-400">
                    {p.allocation} · {p.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="rounded-xl border border-slate-850 bg-slate-950/60 p-4 md:p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Связь с партнёром
            </h2>
            <p className="mb-4 text-sm text-silver-400">
              Вопросы по стратегиям, отчётам или персональному менеджменту.
            </p>
            <a
              href="#"
              className="glass-btn inline-flex items-center gap-2 rounded-lg bg-silver-400 px-4 py-3 text-sm font-medium text-obsidian transition hover:bg-silver-300"
            >
              <MessageCircle size={18} />
              Связаться с партнёром
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
