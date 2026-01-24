"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface HeroPanelProps {
  index: number;
  hoveredSection: number | null;
  isMobile: boolean;
  width: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  overlayBg: string;
  gradientFrom: string;
  sectionId: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  borderClasses?: string;
  heightClasses?: string;
}

export default function HeroPanel({
  index,
  hoveredSection,
  isMobile,
  width,
  imageSrc,
  imageAlt,
  icon: Icon,
  title,
  subtitle,
  overlayBg,
  gradientFrom,
  sectionId,
  onMouseEnter,
  onMouseLeave,
  onClick,
  borderClasses = "",
  heightClasses = "h-[25vh] md:h-full",
}: HeroPanelProps) {
  const isHovered = hoveredSection === index;
  
  // 모든 패널 통일: 처음에는 이미지가 거의 검정색(은은하게) 보이다가 호버 시 선명하게 보이도록
  const imageOpacity = isMobile ? 0.3 : isHovered ? 1 : 0.2;
  // 오버레이는 호버 시 완전히 투명하게, 기본 상태에서는 진하게
  const overlayOpacity = isMobile ? 0.7 : isHovered ? 0 : 0.85;
  // 텍스트와 아이콘도 호버 시 완전히 사라지도록
  const textOpacity = isMobile ? 1 : isHovered ? 0 : 1;

  return (
    <motion.div
      className={`relative cursor-pointer overflow-hidden w-full md:w-auto ${heightClasses} ${borderClasses}`}
      style={{ width }}
      animate={{ width }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* 배경 이미지 */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        animate={{ 
          opacity: imageOpacity,
          filter: isHovered ? "brightness(1.1)" : "brightness(1)"
        }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </motion.div>

      {/* 오버레이 */}
      <motion.div
        className={`absolute inset-0 ${overlayBg} z-10`}
        animate={{ opacity: overlayOpacity }}
        transition={{ duration: 0.5 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} to-transparent`} />
      </motion.div>

      {/* 텍스트와 아이콘 - 오버레이와 별도로 관리 */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-20 text-center text-white font-hero pointer-events-none"
        animate={{ opacity: textOpacity }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <Icon className="w-8 h-8 mx-auto mb-10 text-white" />
          <h2 className="text-4xl md:text-5xl font-semibold tracking-wide mb-2 text-white">{title}</h2>
          <p className="text-lg md:text-xl font-light tracking-widest uppercase text-white">{subtitle}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
