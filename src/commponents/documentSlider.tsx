"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Download,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  FileCheck2,
  Maximize2,
  FileText,
  Sparkles,
} from "lucide-react";

import h1Img from "../h1.png";
import h2Img from "../h2.png";
import h3Img from "../h3.png";

export interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  date: string;
  imgSrc: any;
  publicUrl: string;
  description: string;
}

const docSlides: DocumentItem[] = [
  {
    id: "h1",
    title: "Markaziy Bank Litsenziyasi № 143",
    subtitle: "O'zbekiston Respublikasi Markaziy Banki litsenziyasi (h1.png)",
    type: "Rasmiy Litsenziya",
    date: "2024-yil rasmiy tasdiqlangan",
    imgSrc: h1Img,
    publicUrl: "/h1.png",
    description:
      "IMPACT FINANCE mikromoliya tashkilotining O'zbekiston Respublikasi Markaziy Banki tomonidan berilgan rasmiy litsenziyasi va davlat ro'yxatidan o'tganligini tasdiqlovchi hujjat.",
  },
  {
    id: "h2",
    title: "Davlat Ro'yxatidan O'tish Guvohnomasi",
    subtitle: "Toshkent shahar Shayxontohur tumani DXM guvohnomasi (h2.png)",
    type: "Guvohnoma № 75094",
    date: "Davlat Ro'yxati",
    imgSrc: h2Img,
    publicUrl: "/h2.png",
    description:
      "Tashkilotning yuridik shaxs sifatida davlat ro'yxatiga olinganligi hamda O'zbekiston Respublikasi qonunchiligiga to'liq mos kelishi to'g'risidagi guvohnoma.",
  },
  {
    id: "h3",
    title: "Yillik Audit va Moliyaviy Hisobot Xulosasi",
    subtitle: "Mustaqil auditorlik tashkiloti rasmiy audit xulosasi (h3.png)",
    type: "Audit Xulosasi 2025/2026",
    date: "2025/2026 Moliyaviy yil",
    imgSrc: h3Img,
    publicUrl: "/h3.png",
    description:
      "IMPACT FINANCE tashkilotining moliyaviy barqarorligi va shaffofligini tasdiqlovchi xalqaro va milliy standartlarga muvofiq auditorlik xulosasi.",
  },
];

export default function DocumentSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeDoc = docSlides[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % docSlides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + docSlides.length) % docSlides.length);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (!isPlaying || isModalOpen) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, isModalOpen, handleNext]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, handleNext, handlePrev]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      {/* Slider Header Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#004526] flex items-center justify-center font-bold shadow-xs">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-black text-slate-900">Hujjatlar va Rasmlar Slayderi</h3>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-flex items-center space-x-1">

                <span>Interaktiv Slayd</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              src papkasidagi h1, h2 va h3 rasmiy hujjatlar slayderi
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-[#004526] flex items-center justify-center transition-all shadow-xs"
            title="Oldingi slayd"
            aria-label="Oldingi slayd"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-xs font-bold text-xs ${isPlaying
              ? "bg-[#004526] text-white"
              : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
            title={isPlaying ? "Avto-slaydni to'xtatish" : "Avto-slaydni yoqish"}
            aria-label="Avto-slayd"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-[#004526] flex items-center justify-center transition-all shadow-xs"
            title="Keyingi slayd"
            aria-label="Keyingi slayd"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          <span className="text-xs font-black text-[#004526] px-2.5">
            {currentIndex + 1} / {docSlides.length}
          </span>
        </div>
      </div>

      {/* Main Active Slide Display Card */}
      <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Side Image Viewer Container */}
        <div className="lg:col-span-6 bg-slate-900 relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center group overflow-hidden p-4 sm:p-6">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Active Image */}
          <div className="relative w-full max-w-[340px] aspect-[1/1.414] shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] border border-white/20">
            <Image
              src={activeDoc.imgSrc}
              alt={activeDoc.title}
              fill
              priority
              className="object-contain bg-white"
            />
          </div>

          {/* Hover Overlay Buttons */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 backdrop-blur-xs">
            <button
              onClick={() => {
                setZoomLevel(1);
                setIsModalOpen(true);
              }}
              className="bg-white hover:bg-emerald-50 text-[#004526] font-extrabold px-5 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs transition-transform hover:scale-105"
            >
              <Eye className="w-4 h-4" />
              <span>To'liq ekranda ko'rish</span>
            </button>
          </div>

          {/* Navigation Arrows overlay on Image */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center backdrop-blur-md transition-all shadow-lg border border-white/20"
            aria-label="Oldingi rasmi"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center backdrop-blur-md transition-all shadow-lg border border-white/20"
            aria-label="Keyingi rasmi"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Badge indicator on image */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center space-x-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Fayl: src/{activeDoc.id}.png</span>
          </div>
        </div>

        {/* Right Side Slide Details & Info */}
        <div className="lg:col-span-6 p-6 sm:p-10 space-y-6 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="bg-[#004526] text-emerald-100 text-xs font-black px-3.5 py-1 rounded-full border border-emerald-800">
                {activeDoc.type}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{activeDoc.date}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {activeDoc.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {activeDoc.description}
            </p>
          </div>

          {/* Actions & Zoom trigger */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setZoomLevel(1);
                setIsModalOpen(true);
              }}
              className="flex-1 min-w-[160px] bg-[#004526] hover:bg-[#00361e] text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 text-xs"
            >
              <Maximize2 className="w-4 h-4 text-amber-400" />
              <span>Hujjatni kattalashtirish</span>
            </button>

            <a
              href={activeDoc.publicUrl}
              download={`${activeDoc.id}.png`}
              className="bg-emerald-50 hover:bg-emerald-100 text-[#004526] border border-emerald-200 font-extrabold px-5 py-3 rounded-2xl transition-all flex items-center justify-center space-x-2 text-xs"
            >
              <Download className="w-4 h-4" />
              <span>Yuklab olish</span>
            </a>
          </div>
        </div>
      </div>

      {/* Thumbnails Navigation Row (h1, h2, h3) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {docSlides.map((doc, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={doc.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(false);
              }}
              className={`p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 text-left flex flex-col sm:flex-row items-center gap-3 ${isActive
                ? "bg-white border-[#004526] ring-2 ring-[#004526]/30 shadow-md scale-[1.02]"
                : "bg-white/80 hover:bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
            >
              <div className="relative w-12 h-16 sm:w-14 sm:h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200">
                <Image
                  src={doc.imgSrc}
                  alt={doc.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-1.5">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${isActive
                      ? "bg-[#004526] text-emerald-100"
                      : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    src/{doc.id}.png
                  </span>
                </div>
                <h4
                  className={`text-xs font-bold truncate ${isActive ? "text-slate-900" : "text-slate-600"
                    }`}
                >
                  {doc.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-medium hidden sm:block truncate">
                  {doc.type}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen High-Res Modal Viewer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Modal Header Controls */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white border-b border-white/10 pb-4 z-10">
            <div className="flex items-center space-x-3">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full">
                Fayl: src/{activeDoc.id}.png
              </span>
              <h3 className="text-sm sm:text-base font-bold truncate text-white max-w-xs sm:max-w-md">
                {activeDoc.title}
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              {/* Zoom Controls */}
              <div className="flex items-center space-x-1 bg-white/10 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
                  title="Kichiklashtirish"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold px-2">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
                  title="Kattalashtirish"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <a
                href={activeDoc.publicUrl}
                download={`${activeDoc.id}.png`}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                title="Yuklab olish"
              >
                <Download className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-red-500/80 hover:bg-red-600 text-white transition-colors ml-2"
                title="Yopish (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Image Container */}
          <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center overflow-auto my-4 p-2">
            <div
              className="relative transition-transform duration-200 max-h-[75vh] max-w-[90vw] aspect-[1/1.414] shadow-2xl rounded-xl overflow-hidden bg-white border border-white/20"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <Image
                src={activeDoc.imgSrc}
                alt={activeDoc.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Prev / Next Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Footer Bar */}
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between text-white text-xs font-semibold">
            <span>
              Slayd {currentIndex + 1} / {docSlides.length}
            </span>
            <div className="flex items-center space-x-2">
              {docSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex ? "w-7 bg-amber-400" : "bg-white/40"
                    }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-emerald-200">
              Kattalashtirish uchun tugmalardan foydalaning
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
