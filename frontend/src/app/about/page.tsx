"use client";

import { motion } from "framer-motion";
import { Linkedin, User } from "lucide-react";
import { PatternBg } from "@/components/PatternBg";
import { ScrollReveal } from "@/components/ScrollReveal";

const team = [
  { name: "Alex Volkov", role: "Managing Partner", profile: "#" },
  { name: "Maria Chen", role: "Head of Research", profile: "#" },
  { name: "James Okonkwo", role: "Quant & Risk", profile: "#" },
];

export default function AboutPage() {
  return (
    <div className="relative">
      <PatternBg />
      <section className="relative z-10 mx-auto max-w-3xl px-4 pt-28 pb-16 md:px-6">
        <ScrollReveal>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Философия Nomad
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-8 space-y-6 text-silver-400 leading-relaxed">
            <p>
              Nomad AI Group строит капитал как цифрового кочевника: адаптивные
              системы, глобальная диверсификация и алгоритмическая дисциплина.
              Мы не привязаны к одной юрисдикции или классу активов — мы
              перемещаем капитал туда, где технологии и данные дают измеримое
              преимущество.
            </p>
            <p>
              Надёжность для нас — это прозрачность методологии, контроль риска
              и долгосрочное выравнивание интересов с инвесторами. Команда
              объединяет опыт в quantitative finance, машинном обучении и
              операционном управлении активами.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h2 className="mt-16 text-2xl font-semibold text-white">
            Команда
          </h2>
          <p className="mt-2 text-sm text-silver-500">
            Имена, роли и ссылки на защищённые профили
          </p>
        </ScrollReveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={0.25 + i * 0.05}>
              <motion.li
                whileHover={{ y: -2 }}
                className="glass-btn flex items-center gap-4 rounded-xl border border-slate-850 bg-slate-950/60 p-4 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-850 text-silver-500">
                  <User size={22} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-sm text-silver-500">{member.role}</p>
                </div>
                <a
                  href={member.profile}
                  className="shrink-0 rounded-lg p-2 text-silver-500 transition hover:bg-slate-850 hover:text-silver-300"
                  aria-label={`Профиль ${member.name}`}
                >
                  <Linkedin size={20} />
                </a>
              </motion.li>
            </ScrollReveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
