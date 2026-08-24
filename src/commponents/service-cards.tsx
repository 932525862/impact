"use client";

import { Zap, Sliders, ShieldCheck, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ServiceCards() {
  const { t } = useTranslation();

  const services = t("services.cards", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  const icons = [Zap, Sliders, ShieldCheck];
  const badges = ["24 Soat ichida", "Individual yondashuv", "Minimal hujjatlar"];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="afzalliklarimiz"
      className="py-20 bg-white border-b border-slate-200/60 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("services.title")}
          </h2>

          <p className="text-base text-slate-600 font-medium">
            {t("services.subtitle")}
          </p>

          <div className="w-16 h-1 bg-[#004526] mx-auto rounded-full mt-3" />
        </div>

        {/* 3 Clean Corporate Cards Grid matching Screenshot aesthetics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services &&
            services.map((service, index) => {
              const IconComponent = icons[index % icons.length];
              return (
                <div
                  key={index}
                  className="group bg-[#f4f7f5]/80 hover:bg-white border border-slate-200/80 hover:border-emerald-500/40 rounded-3xl p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    {/* Top Row: Dark Green Icon Box + Pill Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-[#004526] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                        <IconComponent className="w-7 h-7 text-emerald-300" />
                      </div>

                      <span className="text-[11px] font-bold text-slate-500 bg-white group-hover:bg-emerald-50 text-[#004526] px-3 py-1 rounded-full border border-slate-200/80">
                        {badges[index % badges.length]}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#004526] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                    <button
                      onClick={() => scrollToSection("kalkulyator")}
                      className="inline-flex items-center text-xs font-bold text-[#004526] hover:underline space-x-1"
                    >
                      <span>{t("services.more")}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-2xl font-black text-slate-200 group-hover:text-emerald-800/20 transition-colors">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
