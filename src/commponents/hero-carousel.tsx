"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export function HeroCarousel() {
  const { t } = useTranslation();

  const carouselTexts = t("hero.carousel", { returnObjects: true }) as string[];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselTexts.length]);

  return (
    <section
      id="home"
      className="relative bg-white min-h-[700px] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-green-50/30" />

      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 bg-[#578f27] rounded-3xl transform rotate-12 animate-pulse"></div>
        <div className="absolute top-60 right-40 w-32 h-32 bg-[#578f27]/60 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-[#578f27]/40 rounded-2xl transform -rotate-6"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#578f27]/80 rounded-xl transform rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#578f27] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#578f27]/60 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-[#578f27]/40 rounded-full animate-pulse delay-200"></div>
              </div>
              <span className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
                {t("hero.slogan")}
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight text-balance">
                <span className="text-[#000000] font-black">
                  {carouselTexts[currentIndex].split(" ").slice(0, 2).join(" ")}
                </span>
                <span className="block mt-2 font-black">
                  {carouselTexts[currentIndex].split(" ").slice(2).join(" ")}
                </span>
              </h1>

              <div className="flex space-x-2">
                {carouselTexts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-12 bg-[#578f27]"
                        : "w-6 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg text-pretty font-bold">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const section = document.getElementById("kontaktlar");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center justify-center bg-[#578f27] hover:bg-[#578f27]/90 text-white px-12 py-6 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 group h-16 rounded-md"
              >
                {t("hero.button")}
                <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/home.jpeg"
                alt={t("hero.image_alt")}
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#578f27]/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
