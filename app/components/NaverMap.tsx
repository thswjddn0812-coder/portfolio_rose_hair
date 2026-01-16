"use client";
import { useEffect } from "react";

export default function TestMap() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
    script.onload = () => {
      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.415601, 127.133501),
        zoom: 16,
      });
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.415601, 127.133501),
        map,
      });
    };
    document.head.appendChild(script);
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
}
