"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySliderProps {
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onIndicatorClick: (index: number) => void;
  /** 자동 슬라이드 간격(ms). 0이면 비활성화 */
  autoplayInterval?: number;
}

const TRANSITION = {
  duration: 0.6,
  ease: [0.32, 0.72, 0, 1],
};

// 현재 인덱스를 기준으로 각 이미지의 상대 위치(-2 ~ 2)를 계산
function getOffset(index: number, currentIndex: number, length: number) {
  let offset = index - currentIndex;
  const half = Math.floor(length / 2);
  if (offset > half) offset -= length;
  if (offset < -half) offset += length;
  return offset;
}

export default function GallerySlider({
  images,
  currentIndex,
  onPrevious,
  onNext,
  onIndicatorClick,
  autoplayInterval = 5000,
}: GallerySliderProps) {
  useEffect(() => {
    if (!autoplayInterval || images.length <= 1) return;
    const id = setInterval(() => {
      onNext();
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [autoplayInterval, images.length, onNext]);

  if (!images.length) return null;

  return (
    <div className="relative w-full min-h-[40vh] h-[55vh] max-h-[70vh] overflow-hidden px-2 md:px-4">
      {/* 슬라이드들: 가운데 100%, 양옆 95%가 책 넘기듯이 함께 이동 */}
      {images.map((src, index) => {
        const offset = getOffset(index, currentIndex, images.length);

        // 기본 값
        let x = 0;
        let scale = 0.8;
        let opacity = 0;
        let zIndex = 10;

        if (offset === 0) {
          // 가운데 카드
          x = 0;
          scale = 1;
          opacity = 1;
          zIndex = 30;
        } else if (offset === -1 || offset === 1) {
          // 바로 양옆 카드 (95% 크기)
          x = offset * 320; // 좌우로 260px 정도 이동
          scale = 0.95;
          opacity = 1;
          zIndex = 20;
        } else {
          // 그 외 카드들은 바깥에서 대기
          x = offset * 260;
          scale = 0.9;
          opacity = 0;
          zIndex = 5;
        }

        return (
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex }}
            animate={{ x, scale, opacity }}
            transition={TRANSITION}
          >
            <Image
              src={src}
              alt={`갤러리 ${index + 1}`}
              fill
              sizes="50vw"
              className="object-contain rounded-lg shadow-lg"
              priority={index === currentIndex}
            />
          </motion.div>
        );
      })}

      {/* 이전/다음 버튼 */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={onPrevious}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/95 hover:bg-white shadow-lg border border-zinc-200 flex items-center justify-center transition-colors z-40"
            aria-label="이전 이미지"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-zinc-700" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/95 hover:bg-white shadow-lg border border-zinc-200 flex items-center justify-center transition-colors z-40"
            aria-label="다음 이미지"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-zinc-700" />
          </button>

          {/* 인디케이터 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-40">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onIndicatorClick(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-zinc-800 w-8"
                    : "bg-zinc-300 w-2 hover:bg-zinc-400"
                }`}
                aria-label={`${index + 1}번째 이미지로 이동`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
