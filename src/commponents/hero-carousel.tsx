"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ShieldCheck, Zap, FileText, Lock, Calculator, ArrowRight, CheckCircle2, TrendingUp, Users2, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HeroCarousel() {
  const { t } = useTranslation();

  const carouselTexts = t("hero.carousel", { returnObjects: true }) as string[];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Quick Embedded Calculator State inside Hero Widget
  const [heroAmount, setHeroAmount] = useState<number>(30000000);
  const [heroTerm, setHeroTerm] = useState<number>(12);
  const [heroMonthlyPayment, setHeroMonthlyPayment] = useState<number>(0);

  useEffect(() => {
    if (!carouselTexts || carouselTexts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [carouselTexts?.length]);

  // Calculate live monthly payment inside Hero Widget (42% default annual rate)
  useEffect(() => {
    const annualRate = 0.42;
    const monthlyRate = annualRate / 12;
    const n = heroTerm;
    if (monthlyRate > 0 && n > 0 && heroAmount > 0) {
      const annuity = heroAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -n)));
      setHeroMonthlyPayment(annuity);
    }
  }, [heroAmount, heroTerm]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("uz-UZ").format(Math.round(num));
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const applyWithHeroParams = () => {
    const section = document.getElementById("kontaktlar");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentText = carouselTexts && carouselTexts[currentIndex] ? carouselTexts[currentIndex] : "Har qanday ehtiyoj uchun mikrokredit";

  return (
    <section id="home" className="relative bg-gradient-to-b from-[#022c22] via-[#004526] to-[#01351d] text-white pt-10 pb-16 overflow-hidden font-sans">
      {/* Subtle Financial Mesh Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Decorative Orbs */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[560px]">
          {/* Left Column Pitch Content */}
          <div className="lg:col-span-7 space-y-7">
            {/* License Tag Pill */}
            <div className="inline-flex items-center space-x-2 bg-emerald-900/80 border border-emerald-700/60 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-200 backdrop-blur-md shadow-lg">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t("hero.slogan")}</span>
            </div>

            {/* Dynamic Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.12] tracking-tight transition-all duration-500 min-h-[110px]">
                {currentText}
              </h1>

              {/* Indicator Lines */}
              <div className="flex space-x-2 pt-1">
                {carouselTexts &&
                  carouselTexts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "w-10 bg-amber-400" : "w-4 bg-emerald-800/80 hover:bg-emerald-700"
                      }`}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-emerald-100/90 font-medium leading-relaxed max-w-xl">
              {t("hero.description")}
            </p>

            {/* Benefit Tags Bar */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="flex items-center space-x-2 bg-emerald-900/40 border border-emerald-700/40 p-2.5 rounded-xl text-xs text-emerald-100 font-semibold backdrop-blur-xs">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>15 Min Tasdiq</span>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-900/40 border border-emerald-700/40 p-2.5 rounded-xl text-xs text-emerald-100 font-semibold backdrop-blur-xs">
                <FileText className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Minimal Hujjat</span>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-900/40 border border-emerald-700/40 p-2.5 rounded-xl text-xs text-emerald-100 font-semibold backdrop-blur-xs">
                <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>0% Yashirin To'lov</span>
              </div>
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => scrollToSection("xizmatlar")}
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl shadow-xl hover:shadow-amber-500/20 transition-all duration-200 group text-sm"
              >
                <span>{t("hero.button")}</span>
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("kalkulyator")}
                className="inline-flex items-center justify-center bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-700/70 text-white font-bold px-7 py-4 rounded-2xl backdrop-blur-md transition-all duration-200 text-sm space-x-2"
              >
                <Calculator className="w-4 h-4 text-emerald-300" />
                <span>{t("hero.calcButton")}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Embedded Live Quick Loan Calculator Widget (Interactive Bank Feature) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-100 relative z-20 space-y-6">
              {/* Widget Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-[#004526]" />
                    <span>Tezkor Kredit Hisoblagichi</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Imtiyozli shartlar bilan oylik to'lovni aniqlang</p>
                </div>
                <span className="bg-emerald-100 text-[#004526] text-xs font-black px-3 py-1 rounded-full border border-emerald-200">
                  42% yillikdan
                </span>
              </div>

              {/* Amount Presets & Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Kredit summasi:</span>
                  <span className="text-sm font-extrabold text-[#004526] bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                    {formatNumber(heroAmount)} UZS
                  </span>
                </div>

                <input
                  type="range"
                  min="5000000"
                  max="100000000"
                  step="5000000"
                  value={heroAmount}
                  onChange={(e) => setHeroAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004526]"
                />

                {/* Preset Buttons */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {[10000000, 30000000, 50000000, 100000000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setHeroAmount(amt)}
                      className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                        heroAmount === amt
                          ? "bg-[#004526] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {amt / 1000000} mln
                    </button>
                  ))}
                </div>
              </div>

              {/* Term Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Kredit muddati:</span>
                  <span className="text-sm font-extrabold text-[#004526] bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                    {heroTerm} oy
                  </span>
                </div>

                <input
                  type="range"
                  min="3"
                  max="36"
                  step="3"
                  value={heroTerm}
                  onChange={(e) => setHeroTerm(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004526]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>3 oy</span>
                  <span>12 oy</span>
                  <span>24 oy</span>
                  <span>36 oy</span>
                </div>
              </div>

              {/* Monthly Payment Summary Box */}
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-slate-50 rounded-2xl border border-emerald-200/80 space-y-1">
                <span className="text-xs font-bold text-[#004526] uppercase tracking-wider block">
                  Taxminiy Oylik To'lov:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#004526]">
                  {formatNumber(heroMonthlyPayment)}{" "}
                  <span className="text-xs font-bold text-emerald-800">UZS / oy</span>
                </div>
              </div>

              {/* Instant Action CTA Button */}
              <button
                onClick={applyWithHeroParams}
                className="w-full bg-[#004526] hover:bg-[#02331c] text-white font-extrabold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm"
              >
                <span>Hoziroq Ariza Topshirish</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Corporate Trust & Milestones Strip Banner */}
        <div className="mt-14 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="border-r border-white/10 last:border-r-0 px-2 space-y-1">
            <div className="text-3xl md:text-4xl font-black text-amber-400">10,000+</div>
            <div className="text-xs text-emerald-200 font-semibold">{t("about.stats.clientsText")}</div>
          </div>
          <div className="border-r border-white/10 last:border-r-0 px-2 space-y-1">
            <div className="text-3xl md:text-4xl font-black text-white">15+ Yil</div>
            <div className="text-xs text-emerald-200 font-semibold">{t("about.stats.experienceText")}</div>
          </div>
          <div className="border-r border-white/10 last:border-r-0 px-2 space-y-1">
            <div className="text-3xl md:text-4xl font-black text-white">98%</div>
            <div className="text-xs text-emerald-200 font-semibold">{t("about.stats.approvalText")}</div>
          </div>
          <div className="px-2 space-y-1">
            <div className="text-3xl md:text-4xl font-black text-amber-400">15 Min</div>
            <div className="text-xs text-emerald-200 font-semibold">{t("about.stats.speedText")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
