"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { UserCheck, Briefcase } from "lucide-react";

import SeoImg1 from "../../public/jalolidin.png";
import SeoImg2 from "../../public/jamoldn.png";
import SeoImg3 from "../../public/mirzo.jpg";
import SeoImg4 from "../../public/mirgulom.png";

export default function TeamSection() {
  const { t } = useTranslation();

  const items = [
    {
      img: SeoImg1,
      title: t("items.jaloliddin.title"),
      role: t("items.jaloliddin.role"),
      text: t("items.jaloliddin.text"),
      objectPos: "object-top",
    },
    {
      img: SeoImg2,
      title: t("items.jamoliddin.title"),
      role: t("items.jamoliddin.role"),
      text: t("items.jamoliddin.text"),
      objectPos: "object-top",
    },
    {
      img: SeoImg3,
      title: t("items.mirzo.title"),
      role: t("items.mirzo.role"),
      text: t("items.mirzo.text"),
      objectPos: "object-top",
    },
    {
      img: SeoImg4,
      title: t("items.mirgulom.title"),
      role: t("items.mirgulom.role"),
      text: t("items.mirgulom.text"),
      objectPos: "object-top",
    },
  ];

  return (
    <section id="team" className="py-20 bg-slate-50 border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-100/80 text-[#004526] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-300/50 shadow-xs">
            <UserCheck className="w-4 h-4 text-[#004526]" />
            <span>{t("teamBadge")}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("sectionTitle")}
          </h2>

          <div className="w-20 h-1 bg-[#004526] mx-auto rounded-full mt-3" />
        </div>

        {/* Vertical Executive List Top to Bottom */}
        <div className="space-y-10 md:space-y-14">
          {items.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden p-6 sm:p-8 lg:p-10"
              >
                <div
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center gap-8 lg:gap-12`}
                >
                  {/* Image Container: Portrait aspect ratio showing full shoulders & suit */}
                  <div className="w-full lg:w-5/12 flex-shrink-0 flex justify-center">
                    <div className="relative w-full max-w-md aspect-[3/4] sm:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100 group">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className={`object-cover ${item.objectPos} group-hover:scale-105 transition-transform duration-500`}
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                  </div>

                  {/* Information Container */}
                  <div className="w-full lg:w-7/12 space-y-5">
                    <div className="space-y-2">
                      <div className="inline-flex items-center space-x-2 bg-emerald-50 text-[#004526] px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-200/80">
                        <Briefcase className="w-4 h-4 text-[#004526]" />
                        <span>{item.role}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    <div className="w-16 h-1.5 bg-amber-400 rounded-full" />

                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


