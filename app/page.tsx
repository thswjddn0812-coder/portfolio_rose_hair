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
import PricingCard from "./components/PricingCard";
import GallerySlider from "./components/GallerySlider";
import ReviewChip from "./components/ReviewChip";
import ReviewCard from "./components/ReviewCard";
import InfoItem from "./components/InfoItem";
import NavigationBar from "./components/NavigationBar";

export default function Home() {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const [selectedGender, setSelectedGender] = useState<"female" | "male">("female");

  const galleryImages = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
    "/img6.jpg",
  ];

  const heroPanels = [
    {
      index: 0,
      imageSrc: "/placehairsalon2.png",
      imageAlt: "미용실 위치",
      icon: MapPin,
      title: "위치",
      subtitle: "Location",
      overlayBg: "bg-black/90",
      gradientFrom: "from-black/90",
      sectionId: "location",
      heightClasses: "h-[25vh] md:h-full",
      borderClasses:
        "border-x md:border-x border-white border-y md:border-y-0",
    },
    {
      index: 1,
      imageSrc: "/gallery2.png",
      imageAlt: "미용실 갤러리",
      icon: Scissors,
      title: "사진",
      subtitle: "Image",
      overlayBg: "bg-black/90",
      gradientFrom: "from-black/90",
      sectionId: "gallery",
      heightClasses: "h-[25vh] md:h-full",
      borderClasses:
        "border-x md:border-x border-white border-y md:border-y-0",
    },
    {
      index: 2,
      imageSrc: "/price.png",
      imageAlt: "미용실 가격",
      icon: DollarSign,
      title: "가격",
      subtitle: "Pricing",
      overlayBg: "bg-black/90",
      gradientFrom: "from-black/90",
      sectionId: "pricing",
      heightClasses: "h-[25vh] md:h-full",
      borderClasses:
        "border-x md:border-x border-white border-y md:border-y-0",
    },
    {
      index: 3,
      imageSrc: "/reviews.png",
      imageAlt: "미용실 후기",
      icon: MessageSquare,
      title: "후기",
      subtitle: "Review",
      overlayBg: "bg-black/90",
      gradientFrom: "from-black/90",
      sectionId: "reviews",
      heightClasses: "h-[25vh] md:h-full",
      borderClasses:
        "border-x md:border-x border-white border-y md:border-y-0",
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
        { name: "새치커버", price: "45,000원" },
        { name: "기본", price: "50,000원" },
        { name: "기장추가", price: "+@원" },
      ],
      delay: 0.1,
    },
    {
      title: "펌",
      items: [
        { name: "여자 펌 (기본)", price: "50,000원" },
        { name: "여자 펌 A단계", price: "60,000원" },
        { name: "여자 펌 B단계", price: "70,000원" },
        { name: "헤나펌", price: "80,000원" },
        { name: "남자 펌", price: "70,000원" },
        { name: "다운펌", price: "40,000원" },
      ],
      delay: 0.2,
    },
  ];

  const pricingPlans = {
    female: [
      {
        title: "커트",
        subtitle: "여성 가격",
        price: "₩19,000",
        pricePerItem: "(커트 1회)",
        features: [
          "여성 커트 1회",
          "기본 스타일링",
          "무료 상담",
          "7일 이내 예약 가능",
        ],
        buttonText: "예약하기",
        isPopular: false,
        delay: 0,
      },
      {
        title: "염색",
        subtitle: "공통 가격",
        price: "₩50,000",
        pricePerItem: "(기본)",
        features: [
          "새치커버: 45,000원",
          "기본: 50,000원",
          "기장추가: +@원",
        ],
        buttonText: "예약하기",
        isPopular: true,
        delay: 0.1,
      },
      {
        title: "펌",
        subtitle: "여성 가격",
        price: "₩50,000",
        pricePerItem: "(기본)",
        features: [
          "기본: 50,000원",
          "A단계: 60,000원",
          "B단계: 70,000원",
          "헤나펌: 80,000원",
        ],
        buttonText: "예약하기",
        isPopular: false,
        delay: 0.2,
      },
    ],
    male: [
      {
        title: "커트",
        subtitle: "남성 가격",
        price: "₩18,000",
        pricePerItem: "(커트 1회)",
        features: [
          "남성 커트 1회",
          "기본 스타일링",
          "무료 상담",
          "7일 이내 예약 가능",
        ],
        buttonText: "예약하기",
        isPopular: false,
        delay: 0,
      },
      {
        title: "염색",
        subtitle: "공통 가격",
        price: "₩50,000",
        pricePerItem: "(기본)",
        features: [
          "염색+컷: 50,000원",
          "새치커버: 45,000원",
          "기본: 50,000원",
          "기장추가: +@원",
        ],
        buttonText: "예약하기",
        isPopular: true,
        delay: 0.1,
      },
      {
        title: "펌",
        subtitle: "남성 가격",
        price: "₩70,000",
        pricePerItem: "(펌)",
        features: [
          "남자 펌: 70,000원",
          "다운펌: 40,000원",
        ],
        buttonText: "예약하기",
        isPopular: false,
        delay: 0.2,
      },
    ],
  };

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
    // 히어로 섹션이 보일 때는 스크롤 방지
    if (heroVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [heroVisible]);

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
    <>
      {/* 히어로 섹션 - 완전히 별도로 관리 */}
      {heroVisible && (
        <div className="fixed inset-0 z-50 bg-black">
          <div
            className="h-screen flex flex-col md:flex-row overflow-hidden w-full"
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
                onClick={() => {
                  // 히어로 섹션을 숨기고 해당 섹션으로 스크롤
                  setHeroVisible(false);
                  setTimeout(() => {
                    scrollToSection(panel.sectionId);
                  }, 100);
                }}
                borderClasses={panel.borderClasses}
                heightClasses={panel.heightClasses}
              />
            ))}
          </div>
        </div>
      )}

      {/* 메인 페이지 컨텐츠 - 히어로 섹션이 숨겨진 후에만 표시 */}
      {!heroVisible && (
        <div className="min-h-screen bg-white">
          {/* 네비게이션 바 */}
          <NavigationBar onNavigate={scrollToSection} heroVisible={heroVisible} />

      {/* 갤러리 섹션 - 전광판 형태 전체 가로 */}
      <section
        id="gallery"
        className="py-20 px-8 bg-zinc-50 pt-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto mb-8">
          <SectionHeader title="" />
        </div>  

        {/* 전광판: 화면 전체 가로로 꽉 채움 */}
        <div className="w-screen relative left-1/2 right-0 -translate-x-1/2">
          <GallerySlider
            images={galleryImages}
            currentIndex={currentGalleryIndex}
            onPrevious={handleGalleryPrevious}
            onNext={handleGalleryNext}
            onIndicatorClick={setCurrentGalleryIndex}
            autoplayInterval={5000}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mt-12 text-center"
        >
          <p className="text-zinc-600 mb-6">
            세련되고 모던한 인테리어의 편안한 공간에서 최상의 서비스를
            경험하세요
          </p>
        </motion.div>
      </section>

      {/* 가격 섹션 */}
      <section id="pricing" className="min-h-screen py-20 px-8 bg-white pt-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="가격 안내" />

          {/* 성별 선택 탭 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex bg-zinc-100 rounded-lg p-1 gap-2">
              <button
                onClick={() => setSelectedGender("female")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  selectedGender === "female"
                    ? "bg-pink-500 text-white shadow-md"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                여성
              </button>
              <button
                onClick={() => setSelectedGender("male")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  selectedGender === "male"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                남성
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingPlans[selectedGender].map((plan) => (
              <PricingCard
                key={plan.title}
                title={plan.title}
                subtitle={plan.subtitle}
                price={plan.price}
                pricePerItem={plan.pricePerItem}
                features={plan.features}
                buttonText={plan.buttonText}
                isPopular={plan.isPopular}
                delay={plan.delay}
                gender={selectedGender}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center text-zinc-600"
          >
            <p>* 가격은 모발 길이 및 상태에 따라 달라질 수 있습니다.</p>
            <p className="mt-2">* 정확한 가격은 상담 후 안내해드립니다.</p>
          </motion.div>
        </div>
      </section>
      {/* 위치 섹션 */}
      <section id="location" className="min-h-screen py-20 px-8 bg-white pt-24 relative z-10">
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

      {/* 후기 섹션 */}
      <section
        id="reviews"
        className="min-h-screen py-20 px-8 bg-zinc-50 pt-24 relative z-10"
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
      )}
    </>
  );
}
