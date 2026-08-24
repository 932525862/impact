"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslation } from "react-i18next";
import { UserCheck } from "lucide-react";

import SeoImg1 from "../../public/jalolidin.png";
import SeoImg2 from "../../public/jamoldn.png";
import SeoImg3 from "../../public/mirzo.jpg";
import SeoImg4 from "../../public/mirgulom.png";

export default function WeAreLookingFor() {
  const { t } = useTranslation();

  const items = [
    {
      img: SeoImg1,
      title: t("items.jaloliddin.title"),
      role: t("items.jaloliddin.role"),
      text: t("items.jaloliddin.text"),
    },
    {
      img: SeoImg2,
      title: t("items.jamoliddin.title"),
      role: t("items.jamoliddin.role"),
      text: t("items.jamoliddin.text"),
    },
    {
      img: SeoImg3,
      title: t("items.mirzo.title"),
      role: t("items.mirzo.role"),
      text: t("items.mirzo.text"),
    },
    {
      img: SeoImg4,
      title: t("items.mirgulom.title"),
      role: t("items.mirgulom.role"),
      text: t("items.mirgulom.text"),
    },
  ];

  return (
    <section id="team" className="py-20 bg-white border-b border-slate-200/60 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-[#004526] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200/60">
            <UserCheck className="w-4 h-4 text-[#004526]" />
            <span>RAHBARIYAT</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#004526] tracking-tight">
            {t("sectionTitle")}
          </h2>

          <div className="w-16 h-1 bg-[#004526] mx-auto rounded-full mt-3" />
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#f4f7f5]/80 hover:bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-full h-72 bg-slate-100 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="inline-block bg-[#004526] text-emerald-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full mb-1">
                      {item.role}
                    </span>
                    <h3 className="font-extrabold text-base leading-snug">{item.title}</h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="sm:hidden">
          <Swiper spaceBetween={16} slidesPerView={1.1} centeredSlides={true} className="py-4">
            {items.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between">
                  <div className="relative w-full h-64 bg-slate-100">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="inline-block bg-[#004526] text-emerald-100 text-[10px] font-extrabold px-2 py-0.5 rounded-full mb-1">
                        {item.role}
                      </span>
                      <h3 className="font-extrabold text-base">{item.title}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-slate-600 text-xs leading-relaxed">{item.text}</p>
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
