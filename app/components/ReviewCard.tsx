"use client";

import React from "react";
import { motion } from "framer-motion";

interface ReviewCardProps {
  text: string;
  chips: string[];
  index: number;
}

export default function ReviewCard({ text, chips, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg p-6 border border-zinc-200 hover:border-zinc-400 transition-colors shadow-sm"
    >
      <p className="text-zinc-700 leading-relaxed mb-4">{text}</p>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, chipIndex) => (
          <span
            key={chipIndex}
            className="px-3 py-1 bg-zinc-100 rounded-full text-sm text-zinc-600"
          >
            {chip}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
