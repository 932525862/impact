"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslation } from "react-i18next";

export default function WeAreLookingFor() {
  const { t } = useTranslation();

  const items = [
    {
      img: "/bank.jpeg",
      title: t("items.jaloliddin.title"),
      text: t("items.jaloliddin.text"),
    },
    {
      img: "/bank.jpeg",
      title: t("items.jamoliddin.title"),
      text: t("items.jamoliddin.text"),
    },
    {
      img: "/bank.jpeg",
      title: t("items.mirzo.title"),
      text: t("items.mirzo.text"),
    },
    {
      img: "/bank.jpeg",
      title: t("items.mirgulom.title"),
      text: t("items.mirgulom.text"),
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl text-[#004526] font-bold text-center mb-12">
          {t("sectionTitle")}
        </h2>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="relative w-full h-68">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 text-[#004526]">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="sm:hidden">
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {items.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="relative w-full h-48">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-[#000000] text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
