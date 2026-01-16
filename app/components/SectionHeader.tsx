"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  delay?: number;
  className?: string;
}

export default function SectionHeader({
  title,
  delay = 0,
  className = "text-5xl mb-16 text-center text-black",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <h2 className={className}>{title}</h2>
    </motion.div>
  );
}
