"use client";

import React from "react";
import { motion } from "framer-motion";

interface ReviewChipProps {
  emoji: string;
  text: string;
  count: number;
  index: number;
  isHighlighted?: boolean;
}

export default function ReviewChip({
  emoji,
  text,
  count,
  index,
  isHighlighted = false,
}: ReviewChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white hover:border-zinc-400 transition-colors ${
        isHighlighted ? "bg-teal-50 border-teal-200" : ""
      }`}
    >
      <span className="text-lg">{emoji}</span>
      <span className="text-sm text-zinc-700">{text}</span>
      <span className="text-sm font-semibold text-blue-600 ml-1">{count}</span>
    </motion.div>
  );
}
