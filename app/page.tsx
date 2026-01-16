"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Scissors,
  DollarSign,
  Phone,
  Clock,
  MessageSquare,
} from "lucide-react";
import NaverMap from "./components/NaverMap";
import HeroPanel from "./components/HeroPanel";
import SectionHeader from "./components/SectionHeader";
import PriceCard from "./components/PriceCard";
import GallerySlider from "./components/GallerySlider";
import ReviewChip from "./components/ReviewChip";
import ReviewCard from "./components/ReviewCard";
import InfoItem from "./components/InfoItem";
import NavigationBar from "./components/NavigationBar";

export default function Home() {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const galleryImages = [
    "/model1.jpg",
    "/model2.jpg",
    "/model3.jpg",
    "/model4.jpg",
    "/model5.jpg",
    "/model6.jpg",
  ];

  const heroPanels = [
    {
      index: 0,
      imageSrc: "/placehairsalon2.png",
      imageAlt: "미용실 위치",
      icon: MapPin,
      title: "위치",
      subtitle: "Location",
      overlayBg: "bg-black",
      gradientFrom: "from-black/50",
      sectionId: "location",
      heightClasses: "h-[25vh] md:h-full",
      borderClasses:
        "border-x md:border-x border-white/20 border-y md:border-y-0",
    },
    {
      index: 1,
      imageSrc: "/gallery2.png",
      imageAlt: "미용실 갤러리",
      icon: Scissors,
      title: "사진",
      subtitle: "Image",
      overlayBg: "bg-black",
      gradientFrom: "from-black/50",
      sectionId: "gallery",
      heightClasses: "h-[25vh] md:h-full",
      borderClasses:
        "border-x md:border-x border-white/20 border-y md:border-y-0",
    },
    {
      index: 2,
      imageSrc: "/menus2.png",
      imageAlt: "미용실 가격",
      icon: DollarSign,
      title: "가격",
      subtitle: "Pricing",
      overlayBg: "bg-black",
      gradientFrom: "from-black/50",
      sectionId: "pricing",
      heightClasses: "h-[25vh] md:h-full",
      borderClasses:
        "border-x md:border-x border-white/20 border-y md:border-y-0",
    },
    {
      index: 3,
      imageSrc: "/reviews.png",
      imageAlt: "미용실 후기",
      icon: MessageSquare,
      title: "후기",
      subtitle: "Review",
      overlayBg: "bg-zinc-900",
      gradientFrom: "from-zinc-900/50",
      sectionId: "reviews",
      heightClasses: "h-[25vh] md:h-full",
      borderClasses:
        "border-x md:border-x border-white/20 border-y md:border-y-0",
    },
  ];

  const priceData = [
    {
      title: "커트",
      items: [
        { name: "여성 커트", price: "19,000원" },
        { name: "남성 커트", price: "18,000원" },
      ],
    },
    {
      title: "염색",
      items: [
        { name: "전체 염색", price: "45,000원~" },
        { name: "부분 염색", price: "25,000원~" },
        { name: "탈색 + 염색", price: "90,000원~" },
      ],
      delay: 0.1,
    },
    {
      title: "펌",
      items: [
        { name: "일반 펌", price: "50,000원~" },
        { name: "+ 영양제", price: "+@원~" },
      ],
      delay: 0.2,
    },
  ];

  const reviewChips = [
    { emoji: "😊", text: "친절해요", count: 32 },
    { emoji: "💚", text: "원하는 스타일로 잘해줘요", count: 20 },
    { emoji: "👩", text: "스타일 추천을 잘해줘요", count: 12 },
    { emoji: "🪙", text: "가격이 합리적이에요", count: 7 },
    { emoji: "👏", text: "손이 빨라요", count: 5 },
    { emoji: "😟", text: "손상이 적어요", count: 5 },
    { emoji: "💨", text: "관리법을 잘 알려줘요", count: 4 },
    { emoji: "🌹", text: "고급스러워요", count: 2 },
    { emoji: "🧴", text: "좋은 제품을 사용해요", count: 2 },
    { emoji: "🔍", text: "시술이 꼼꼼해요", count: 2 },
  ];

  const reviews = [
    {
      text: "친절하시고 가격도 괜찮고 모바일지역화폐도 사용가능합니다. 원장님 혼자서 운영 하셔서 예약을 하시는 것을 추천합니다.",
      chips: ["자연스러워요", "+3"],
    },
    {
      text: "집앞미용실 신랑이 맘에든다고 자주이용해요",
      chips: ["원하는 스타일로 잘해줘요"],
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const sections = ["hero", "location", "gallery", "pricing", "reviews"];
    let isScrolling = false;
    let scrollAccumulator = 0;
    const scrollThreshold = 50; // 스크롤 임계값
    let scrollTimeout: NodeJS.Timeout;

    const getCurrentSectionIndex = () => {
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const sections = document.querySelectorAll("section, #hero");

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
          currentScroll >= sectionTop - windowHeight / 2 &&
          currentScroll < sectionBottom - windowHeight / 2
        ) {
          return i;
        }
      }
      return 0;
    };

    const scrollToSection = (index: number) => {
      const targetSection = sections[index];
      let targetElement: HTMLElement | null = null;

      if (targetSection === "hero") {
        targetElement = document.getElementById("hero");
      } else {
        targetElement = document.getElementById(targetSection);
      }

      if (targetElement) {
        isScrolling = true;
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) * 0.8, 1000); // 최대 1초
        const startTime = performance.now();

        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeInOutCubic(progress);

          window.scrollTo(0, startPosition + distance * easedProgress);

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            isScrolling = false;
            scrollAccumulator = 0;
          }
        };

        requestAnimationFrame(animateScroll);

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          scrollAccumulator = 0;
        }, duration + 100);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      // 스크롤 양 누적
      scrollAccumulator += Math.abs(e.deltaY);

      // 임계값 이상 스크롤했을 때만 섹션 이동
      if (scrollAccumulator >= scrollThreshold) {
        e.preventDefault();

        const currentSectionIndex = getCurrentSectionIndex();
        let nextSectionIndex = currentSectionIndex;

        if (e.deltaY > 0) {
          // 아래로 스크롤
          nextSectionIndex = Math.min(
            currentSectionIndex + 1,
            sections.length - 1
          );
        } else {
          // 위로 스크롤
          nextSectionIndex = Math.max(currentSectionIndex - 1, 0);
        }

        // 같은 섹션이면 이동하지 않음
        if (nextSectionIndex !== currentSectionIndex) {
          scrollAccumulator = 0;
          scrollToSection(nextSectionIndex);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getWidth = (index: number) => {
    if (isMobile) return "100%";
    if (hoveredSection === null) return "25%";
    if (hoveredSection === index) return "40%";
    return "20%";
  };

  const handleGalleryPrevious = () => {
    setCurrentGalleryIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleGalleryNext = () => {
    setCurrentGalleryIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 바 */}
      <NavigationBar onNavigate={scrollToSection} />

      {/* 히어로 섹션 - 4개의 인터랙티브 패널 */}
      <div
        className="h-screen flex flex-col md:flex-row overflow-hidden"
        id="hero"
      >
        {heroPanels.map((panel) => (
          <HeroPanel
            key={panel.index}
            index={panel.index}
            hoveredSection={hoveredSection}
            isMobile={isMobile}
            width={getWidth(panel.index)}
            imageSrc={panel.imageSrc}
            imageAlt={panel.imageAlt}
            icon={panel.icon}
            title={panel.title}
            subtitle={panel.subtitle}
            overlayBg={panel.overlayBg}
            gradientFrom={panel.gradientFrom}
            sectionId={panel.sectionId}
            onMouseEnter={() => !isMobile && setHoveredSection(panel.index)}
            onMouseLeave={() => !isMobile && setHoveredSection(null)}
            onClick={() => scrollToSection(panel.sectionId)}
            borderClasses={panel.borderClasses}
            heightClasses={panel.heightClasses}
          />
        ))}
      </div>

      {/* 위치 섹션 */}
      <section id="location" className="min-h-screen py-20 px-8 bg-white pt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="위치 및 정보" />

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-96 rounded-lg overflow-hidden relative"
            >
              <NaverMap />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl mb-6 text-black">장미 미용실</h3>
                <p className="text-zinc-600 leading-relaxed text-black">
                  프리미엄 헤어 서비스를 제공하는 모던 미용실입니다. 최고의
                  스타일리스트가 고객님의 아름다움을 완성해드립니다.
                </p>
              </div>

              <div className="space-y-4">
                <InfoItem icon={MapPin} label="주소">
                  <p>
                    도로명:경기도 성남시 분당구 장미로 101 1동 1113호
                    <br />
                    지번:경기도 성남시 분당구 장미동 1113-1
                  </p>
                </InfoItem>

                <InfoItem icon={Phone} label="전화번호">
                  <p>0507-1415-4082</p>
                </InfoItem>

                <InfoItem icon={Clock} label="영업시간">
                  <p>평일: 9:30 - 19:30</p>
                  <p>토요일: 9:30 - 19:30</p>
                  <p className="text-sm mt-1">(매주 일요일일 휴무)</p>
                </InfoItem>
              </div>

              <button className="w-full py-4 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors">
                예약하기
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 갤러리 섹션 */}
      <section
        id="gallery"
        className="min-h-screen py-20 px-8 bg-zinc-50 pt-24"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="사진" />

          <GallerySlider
            images={galleryImages}
            currentIndex={currentGalleryIndex}
            onPrevious={handleGalleryPrevious}
            onNext={handleGalleryNext}
            onIndicatorClick={setCurrentGalleryIndex}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-zinc-600 mb-6">
              세련되고 모던한 인테리어의 편안한 공간에서 최상의 서비스를
              경험하세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* 가격 섹션 */}
      <section id="pricing" className="min-h-screen py-20 px-8 bg-white pt-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="가격 안내" />

          <div className="space-y-6">
            {priceData.map((price, index) => (
              <PriceCard
                key={price.title}
                title={price.title}
                items={price.items}
                delay={price.delay || 0}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-zinc-600"
          >
            <p>* 가격은 모발 길이 및 상태에 따라 달라질 수 있습니다.</p>
            <p className="mt-2">* 정확한 가격은 상담 후 안내해드립니다.</p>
          </motion.div>
        </div>
      </section>

      {/* 후기 섹션 */}
      <section
        id="reviews"
        className="min-h-screen py-20 px-8 bg-zinc-50 pt-24"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="고객 후기" />

          {/* 리뷰 요약 칩 영역 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-2xl font-bold text-black">
                이런 점이 좋았어요
              </h3>
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs">?</span>
              </div>
            </div>
            <p className="text-sm text-zinc-600 mb-6 flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>46회 30명 참여</span>
            </p>

            <div className="flex flex-wrap gap-3">
              {reviewChips.map((chip, index) => (
                <ReviewChip
                  key={index}
                  emoji={chip.emoji}
                  text={chip.text}
                  count={chip.count}
                  index={index}
                  isHighlighted={index === 0}
                />
              ))}
            </div>
          </motion.div>

          {/* 사용자 후기 카드 영역 */}
          <div className="space-y-6 mb-12">
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                text={review.text}
                chips={review.chips}
                index={index}
              />
            ))}
          </div>

          {/* 네이버 리뷰 더 보러가기 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href="https://map.naver.com/p/entry/place/1387710202?c=15.00,0,0,0,dh&placePath=/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium"
            >
              네이버 리뷰 더 보러가기
            </a>
          </motion.div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-black text-white py-12 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl mb-4">장미 미용실</h3>
          <p className="text-zinc-400 mb-2">
            경기도 성남시 분당구 장미로 101 1동 1113호
          </p>
          <p className="text-zinc-400 mb-4">TEL. 0507-1415-4082</p>
          <p className="text-zinc-500 text-sm">
            © 2026 장미 미용실. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
