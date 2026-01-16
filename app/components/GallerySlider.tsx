"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySliderProps {
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onIndicatorClick: (index: number) => void;
}

export default function GallerySlider({
  images,
  currentIndex,
  onPrevious,
  onNext,
  onIndicatorClick,
}: GallerySliderProps) {
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <div className="relative max-w-6xl mx-auto px-8">
      <div className="relative flex items-center justify-center gap-4">
        {/* 이전 이미지 (왼쪽) */}
        <motion.div
          key={`prev-${prevIndex}-${currentIndex}`}
          initial={{ opacity: 0, x: -50, scale: 0.8 }}
          animate={{ opacity: 0.6, x: 0, scale: 0.8 }}
          exit={{ opacity: 0, x: -50, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-1/4 h-64 rounded-lg overflow-hidden relative flex-shrink-0"
        >
          <Image
            src={images[prevIndex]}
            alt={`이전 이미지`}
            fill
            sizes="(max-width: 1280px) 25vw, 320px"
            className="object-cover"
          />
        </motion.div>

        {/* 현재 이미지 (가운데) */}
        <motion.div
          key={`current-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-1/2 h-96 rounded-lg overflow-hidden relative flex-shrink-0 shadow-xl"
        >
          <Image
            src={images[currentIndex]}
            alt={`현재 이미지 ${currentIndex + 1}`}
            fill
            sizes="(max-width: 1280px) 50vw, 640px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* 다음 이미지 (오른쪽) */}
        <motion.div
          key={`next-${nextIndex}-${currentIndex}`}
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 0.6, x: 0, scale: 0.8 }}
          exit={{ opacity: 0, x: 50, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-1/4 h-64 rounded-lg overflow-hidden relative flex-shrink-0"
        >
          <Image
            src={images[nextIndex]}
            alt={`다음 이미지`}
            fill
            sizes="(max-width: 1280px) 25vw, 320px"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* 이전/다음 버튼 */}
      <button
        onClick={onPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-colors z-10"
        aria-label="이전 이미지"
      >
        <ChevronLeft className="w-6 h-6 text-zinc-700" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-colors z-10"
        aria-label="다음 이미지"
      >
        <ChevronRight className="w-6 h-6 text-zinc-700" />
      </button>

      {/* 인디케이터 */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndicatorClick(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-black w-8" : "bg-zinc-300"
            }`}
            aria-label={`${index + 1}번째 이미지로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
