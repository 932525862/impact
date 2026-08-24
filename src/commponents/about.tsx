"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Award, Target, Handshake, FileCheck2, Building2, CheckCircle2, ArrowRight, Laptop, Clock3, Banknote } from "lucide-react";

export default function AboutUs() {
  const { t } = useTranslation();

  const valueIcons: Record<string, { icon: React.ReactNode; bg: string }> = {
    trust: {
      icon: <Building2 className="w-6 h-6 text-amber-400 stroke-[1.8]" />,
      bg: "from-[#004526] to-[#022c22]",
    },
    transparency: {
      icon: <FileCheck2 className="w-6 h-6 text-amber-400 stroke-[1.8]" />,
      bg: "from-[#004526] to-emerald-900",
    },
    sustainability: {
      icon: <Target className="w-6 h-6 text-emerald-300 stroke-[1.8]" />,
      bg: "from-[#004526] to-[#022c22]",
    },
    collaboration: {
      icon: <Handshake className="w-6 h-6 text-amber-400 stroke-[1.8]" />,
      bg: "from-[#004526] to-emerald-950",
    },
  };

  const steps = [
    {
      num: "01",
      icon: <Laptop className="w-6 h-6 text-amber-400" />,
      title: t("steps.step1.title"),
      desc: t("steps.step1.desc"),
    },
    {
      num: "02",
      icon: <Clock3 className="w-6 h-6 text-amber-400" />,
      title: t("steps.step2.title"),
      desc: t("steps.step2.desc"),
    },
    {
      num: "03",
      icon: <Banknote className="w-6 h-6 text-amber-400" />,
      title: t("steps.step3.title"),
      desc: t("steps.step3.desc"),
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 text-slate-900 font-sans border-b border-slate-200/60 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-100/80 text-[#004526] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-300/50 shadow-xs">
            <Award className="w-4 h-4 text-[#004526]" />
            <span>{t("about.badge")}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("about.heading")}
          </h2>

          <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
            {t("about.subheading")}
          </p>

          <div className="w-20 h-1 bg-[#004526] mx-auto rounded-full mt-4" />
        </div>

        {/* How It Works Step Cards Bar (3-Step Process) */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h3 className="text-2xl font-black text-slate-900">{t("steps.title")}</h3>
            <p className="text-xs text-slate-500 font-semibold">{t("steps.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 relative space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#004526] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {s.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-800/30 transition-colors">
                    {s.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-[#004526] transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-slate-200/80 space-y-6">
              <h3 className="text-2xl font-black text-[#004526] flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Target className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span>IMPACT FINANCE Missiyasi</span>
              </h3>

              <p
                className="text-slate-700 text-base leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: t("about.intro1") }}
              />

              <p
                className="text-slate-700 text-base leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: t("about.intro2") }}
              />

              {/* License Notice Box */}
              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 flex items-start space-x-3 text-xs text-[#004526]">
                <ShieldCheck className="w-5 h-5 text-[#004526] flex-shrink-0 mt-0.5" />
                <div className="font-medium">
                  <strong className="block font-bold mb-0.5">Davlat Regulyatori Standartlari:</strong>
                  Tashkilot faoliyati O'zbekiston Respublikasi Markaziy Banki qonunchilik talablari va moliyaviy barqarorlik normalariga to'liq mos keladi.
                </div>
              </div>
            </div>

            {/* Closing Quote */}
            <div className="p-6 bg-gradient-to-r from-[#004526] to-[#022c22] text-white rounded-3xl shadow-lg border border-emerald-800/80">
              <p
                className="text-sm md:text-base italic font-medium leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("about.closing") }}
              />
            </div>
          </div>

          {/* Right Corporate Pillars Grid */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-[#004526]" />
              <span>{t("about.valuesHeading")}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["trust", "transparency", "sustainability", "collaboration"].map((key) => {
                const item = valueIcons[key];
                return (
                  <div
                    key={key}
                    className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4 group"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      {item.icon}
                    </div>

                    <div
                      className="text-sm text-slate-700 leading-relaxed font-medium"
                      dangerouslySetInnerHTML={{ __html: t(`about.values.${key}`) }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Strip Grid */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-1 border-r border-slate-100 last:border-r-0">
            <div className="text-3xl md:text-4xl font-black text-[#004526]">{t("about.stats.clients")}</div>
            <div className="text-xs text-slate-500 font-semibold">{t("about.stats.clientsText")}</div>
          </div>
          <div className="text-center space-y-1 border-r border-slate-100 last:border-r-0">
            <div className="text-3xl md:text-4xl font-black text-[#004526]">{t("about.stats.experience")}</div>
            <div className="text-xs text-slate-500 font-semibold">{t("about.stats.experienceText")}</div>
          </div>
          <div className="text-center space-y-1 border-r border-slate-100 last:border-r-0">
            <div className="text-3xl md:text-4xl font-black text-[#004526]">{t("about.stats.approval")}</div>
            <div className="text-xs text-slate-500 font-semibold">{t("about.stats.approvalText")}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl md:text-4xl font-black text-[#004526]">{t("about.stats.speed")}</div>
            <div className="text-xs text-slate-500 font-semibold">{t("about.stats.speedText")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
