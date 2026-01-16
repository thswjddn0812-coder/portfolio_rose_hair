import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 이 줄을 반드시 추가하세요!
  images: {
    unoptimized: true, // Cloudflare Pages 정적 배포 시 이미지 최적화 경고 방지
  },
};

export default nextConfig;
