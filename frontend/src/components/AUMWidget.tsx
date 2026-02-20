"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const BASE_AUM = 2_847_000_000;
const TICK = 12000;

export function AUMWidget() {
  const [aum, setAum] = useState(BASE_AUM);

  useEffect(() => {
    const id = setInterval(() => {
      setAum((prev) => prev + Math.floor(Math.random() * TICK * 2) - TICK / 2);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const formatted = new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(aum);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="glass-btn flex items-center gap-4 rounded-xl border border-slate-850 bg-slate-950/80 px-6 py-4 backdrop-blur-sm"
    >
      <div className="rounded-lg bg-slate-850 p-2">
        <TrendingUp className="h-5 w-5 text-silver-400" aria-hidden />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-silver-500">
          Assets Under Management
        </p>
        <p className="text-xl font-semibold tabular-nums text-white md:text-2xl">
          $ {formatted}
        </p>
      </div>
    </motion.div>
  );
}
