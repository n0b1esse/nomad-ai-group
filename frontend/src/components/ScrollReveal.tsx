"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={defaultVariants}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
