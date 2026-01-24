"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  pricePerItem?: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  delay?: number;
  gender?: "female" | "male";
}

export default function PricingCard({
  title,
  subtitle,
  price,
  pricePerItem,
  features,
  buttonText,
  isPopular = false,
  delay = 0,
  gender = "female",
}: PricingCardProps) {
  const genderColors = {
    female: {
      border: "border-pink-500",
      badge: "bg-pink-500",
      button: "bg-pink-500 hover:bg-pink-600",
      accent: "text-pink-500",
    },
    male: {
      border: "border-blue-500",
      badge: "bg-blue-500",
      button: "bg-blue-500 hover:bg-blue-600",
      accent: "text-blue-500",
    },
  };

  const colors = genderColors[gender];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-lg shadow-md p-8 flex flex-col border-2 ${colors.border}`}
    >
      {isPopular && (
        <div className={`absolute -top-3 right-4 ${colors.badge} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
          인기
        </div>
      )}
      
      {/* 성별 배지 */}
      <div className={`absolute -top-3 left-4 ${colors.badge} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
        {gender === "female" ? "여성" : "남성"}
      </div>

      <div className="mb-6 mt-4">
        <h3 className="text-2xl font-bold text-black mb-1">{title}</h3>
        <p className="text-sm text-zinc-600">{subtitle}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-bold text-black">{price}</span>
        </div>
        {pricePerItem && (
          <p className="text-sm text-zinc-600">{pricePerItem}</p>
        )}
      </div>

      <div className="flex-1 space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <Check className={`w-5 h-5 ${colors.accent} flex-shrink-0 mt-0.5`} />
            <span className="text-sm text-zinc-700">{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-3 rounded-lg font-medium transition-colors text-white ${
          isPopular
            ? colors.button
            : "bg-black hover:bg-zinc-800"
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
}
