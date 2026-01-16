"use client";

import React from "react";
import { motion } from "framer-motion";

interface PriceItem {
  name: string;
  price: string;
}

interface PriceCardProps {
  title: string;
  items: PriceItem[];
  delay?: number;
}

export default function PriceCard({ title, items, delay = 0 }: PriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="border border-zinc-200 rounded-lg p-8 hover:border-black transition-colors"
    >
      <h3 className="text-2xl mb-4 text-black">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-zinc-600 text-black">{item.name}</span>
            <span className="text-xl text-black">{item.price}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
