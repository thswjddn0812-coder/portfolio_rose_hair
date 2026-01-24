"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Scissors, DollarSign, MessageSquare } from "lucide-react";

interface NavigationBarProps {
  onNavigate: (sectionId: string) => void;
  heroVisible?: boolean;
}

export default function NavigationBar({ onNavigate, heroVisible = false }: NavigationBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // 히어로 섹션이 숨겨진 상태에서는 스크롤 위치와 관계없이 항상 네비게이션 바 표시
      if (!heroVisible) {
        setIsVisible(true);
      } else {
        // 히어로 섹션이 보이는 경우에는 스크롤 위치에 따라 결정
        const scrollY = window.scrollY;
        setIsVisible(scrollY >= 50);
      }

      // 현재 활성 섹션 감지
      const sections = ["gallery", "pricing", "location", "reviews"];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroVisible]);

  const navItems = [
    { id: "location", label: "위치", icon: MapPin },
    { id: "gallery", label: "사진", icon: Scissors },
    { id: "pricing", label: "가격", icon: DollarSign },
    { id: "reviews", label: "후기", icon: MessageSquare },
  ];

  // 히어로 섹션이 보이거나 네비게이션 바가 표시될 위치가 아니면 숨김
  if (!isVisible || heroVisible) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* 로고/브랜드 */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-black">
              <img
                src="/RoseHairROgo2.jpg"
                alt="장미 미용실 로고"
                className="w-full h-full object-contain"
                style={{ 
                  display: 'block',
                }}
              />
            </div>
            <h1 className="text-base md:text-xl font-semibold text-white hidden sm:block">
              장미 미용실
            </h1>
          </div>

          {/* 네비게이션 메뉴 */}
          <div className="flex items-center gap-0.5 md:gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white hover:bg-zinc-800"
                  }`}
                  aria-label={item.label}
                >
                  <Icon className="w-4 h-4 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="hidden md:inline text-sm font-medium">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
