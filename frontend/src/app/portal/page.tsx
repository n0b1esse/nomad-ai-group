"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PatternBg } from "@/components/PatternBg";
import { PortalLogin } from "@/components/PortalLogin";
import { PortalDashboard } from "@/components/PortalDashboard";

export default function PortalPage() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="relative min-h-screen">
      <PatternBg />
      <div className="relative z-10">
        {authenticated ? (
          <PortalDashboard onLogout={() => setAuthenticated(false)} />
        ) : (
          <PortalLogin onSuccess={() => setAuthenticated(true)} />
        )}
      </div>
    </div>
  );
}
