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
  
  // 모바일일 때는 이미지가 은은하게 보이도록, 데스크톱일 때는 호버 시에만 보이도록
  const imageOpacity = isMobile ? 0.3 : isHovered ? 1 : 0;
  // 모바일일 때는 오버레이를 약간 투명하게, 데스크톱일 때는 호버 시에만 숨김
  const overlayOpacity = isMobile ? 0.7 : isHovered ? 0 : 1;

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
        animate={{ opacity: imageOpacity }}
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
        className={`absolute inset-0 ${overlayBg} flex items-center justify-center z-10`}
        animate={{ opacity: overlayOpacity }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center text-white">
          <Icon className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-4xl mb-2">{title}</h2>
          <p className="text-lg opacity-80">{subtitle}</p>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} to-transparent`} />
      </motion.div>
    </motion.div>
  );
}
