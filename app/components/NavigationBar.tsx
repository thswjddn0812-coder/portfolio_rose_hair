"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Scissors, DollarSign, MessageSquare } from "lucide-react";

interface NavigationBarProps {
  onNavigate: (sectionId: string) => void;
}

export default function NavigationBar({ onNavigate }: NavigationBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const locationSection = document.getElementById("location");
      if (locationSection) {
        const locationTop = locationSection.offsetTop;
        const scrollY = window.scrollY;
        setIsVisible(scrollY >= locationTop - 100);
      }

      // 현재 활성 섹션 감지
      const sections = ["location", "gallery", "pricing", "reviews"];
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
  }, []);

  const navItems = [
    { id: "location", label: "위치", icon: MapPin },
    { id: "gallery", label: "사진", icon: Scissors },
    { id: "pricing", label: "가격", icon: DollarSign },
    { id: "reviews", label: "후기", icon: MessageSquare },
  ];

  if (!isVisible) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* 로고/브랜드 */}
          <div className="flex items-center">
            <h1 className="text-base md:text-xl font-semibold text-white">
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
