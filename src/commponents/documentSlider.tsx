"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
} from "lucide-react";
import { useTranslation } from "react-i18next";

import page1Img from "../audit_page_1.png";
import page2Img from "../audit_page_2.png";
import page3Img from "../audit_page_3.png";
import page4Img from "../audit_page_4.png";

export interface AuditPageItem {
  pageNumber: number;
  title: string;
  subtitle: string;
  imgSrc: any;
}

export default function DocumentSlider() {
  const { t } = useTranslation();

  const pages: AuditPageItem[] = useMemo(
    () => [
      {
        pageNumber: 1,
        title: "Sahifa 1",
        subtitle: "Mustaqil audit xulosasi (Auditor fikri / Мнение)",
        imgSrc: page1Img,
      },
      {
        pageNumber: 2,
        title: "Sahifa 2",
        subtitle: "Boshqaruv va auditor mas'uliyati",
        imgSrc: page2Img,
      },
      {
        pageNumber: 3,
        title: "Sahifa 3",
        subtitle: "Xalqaro audit standartlari (МСА)",
        imgSrc: page3Img,
      },
      {
        pageNumber: 4,
        title: "Sahifa 4",
        subtitle: "Rasmiy imzo, muhr va auditor sertifikati",
        imgSrc: page4Img,
      },
    ],
    []
  );

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const activePage = pages[currentPageIndex] || pages[0];
  const pdfUrl = "/audit-report-2025-2026.pdf";

  const handleNext = useCallback(() => {
    setCurrentPageIndex((prev) => (prev + 1) % pages.length);
  }, [pages.length]);

  const handlePrev = useCallback(() => {
    setCurrentPageIndex((prev) => (prev - 1 + pages.length) % pages.length);
  }, [pages.length]);

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
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#004526] flex items-center justify-center font-bold shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-black text-slate-900">
                {t("docSlider.items.h3.title")}
              </h3>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-flex items-center space-x-1">
                <span>4 Sahifali PDF</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Mustaqil auditorlik tashkiloti (Assent Audit International) rasmiy audit xulosasi
            </p>
          </div>
        </div>

        {/* Page Switcher Controls */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-[#004526] flex items-center justify-center transition-all shadow-2xs"
            title={t("docSlider.prevSlide")}
            aria-label={t("docSlider.prevSlide")}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-2xs font-bold text-xs ${
              isPlaying
                ? "bg-[#004526] text-white"
                : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
            title={isPlaying ? t("docSlider.pauseAuto") : t("docSlider.playAuto")}
            aria-label="Avto-slayd"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-[#004526] flex items-center justify-center transition-all shadow-2xs"
            title={t("docSlider.nextSlide")}
            aria-label={t("docSlider.nextSlide")}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          <span className="text-xs font-black text-[#004526] px-2.5">
            {currentPageIndex + 1} / {pages.length}
          </span>
        </div>
      </div>

      {/* Main Active Page Card */}
      <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Side Image Viewer */}
        <div className="lg:col-span-6 bg-slate-900 relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center group overflow-hidden p-4 sm:p-6">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Active Page Image */}
          <div className="relative w-full max-w-[340px] aspect-[1/1.414] shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] border border-white/20">
            <Image
              src={activePage.imgSrc}
              alt={activePage.title}
              fill
              priority
              className="object-contain bg-white"
            />
          </div>

          {/* Hover Overlay Button */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 backdrop-blur-2xs">
            <button
              onClick={() => {
                setZoomLevel(1);
                setIsModalOpen(true);
              }}
              className="bg-white hover:bg-emerald-50 text-[#004526] font-extrabold px-5 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs transition-transform hover:scale-105"
            >
              <Eye className="w-4 h-4" />
              <span>{t("docSlider.fullscreenBtn")}</span>
            </button>
          </div>

          {/* Navigation Arrows on Image */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center backdrop-blur-md transition-all shadow-lg border border-white/20"
            aria-label={t("docSlider.prevSlide")}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center backdrop-blur-md transition-all shadow-lg border border-white/20"
            aria-label={t("docSlider.nextSlide")}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Badge indicator on image */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center space-x-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Sahifa {activePage.pageNumber} / {pages.length}</span>
          </div>
        </div>

        {/* Right Side Info & Action Buttons */}
        <div className="lg:col-span-6 p-6 sm:p-10 space-y-6 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="bg-[#004526] text-emerald-100 text-xs font-black px-3.5 py-1 rounded-full border border-emerald-800">
                Audit Xulosasi 2025/2026
              </span>
              <span className="text-xs text-slate-400 font-semibold">2025/2026 Moliyaviy yil</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {t("docSlider.items.h3.title")}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {t("docSlider.items.h3.description")}
            </p>

            <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 text-xs font-bold text-[#004526] flex items-center space-x-2">
              <FileCheck2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>{activePage.subtitle}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setZoomLevel(1);
                setIsModalOpen(true);
              }}
              className="flex-1 min-w-[160px] bg-[#004526] hover:bg-[#00361e] text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 text-xs"
            >
              <Maximize2 className="w-4 h-4 text-amber-400" />
              <span>{t("docSlider.zoomDoc")}</span>
            </button>

            <a
              href={pdfUrl}
              download="audit-report-2025-2026.pdf"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-50 hover:bg-emerald-100 text-[#004526] border border-emerald-200 font-extrabold px-5 py-3 rounded-2xl transition-all flex items-center justify-center space-x-2 text-xs"
            >
              <Download className="w-4 h-4" />
              <span>{t("docSlider.download")}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Pages Thumbnails Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {pages.map((p, idx) => {
          const isActive = idx === currentPageIndex;
          return (
            <button
              key={p.pageNumber}
              onClick={() => {
                setCurrentPageIndex(idx);
                setIsPlaying(false);
              }}
              className={`p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 text-left flex flex-col sm:flex-row items-center gap-3 ${
                isActive
                  ? "bg-white border-[#004526] ring-2 ring-[#004526]/30 shadow-md scale-[1.02]"
                  : "bg-white/80 hover:bg-white border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <div className="relative w-12 h-16 sm:w-14 sm:h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200">
                <Image
                  src={p.imgSrc}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-1.5">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      isActive
                        ? "bg-[#004526] text-emerald-100"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {p.title}
                  </span>
                </div>
                <p className="text-[10px] text-slate-600 font-bold truncate">
                  {p.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen High-Res Modal Viewer for 4 Pages */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Modal Header Controls */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white border-b border-white/10 pb-4 z-10">
            <div className="flex items-center space-x-3">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full">
                Sahifa {activePage.pageNumber} / {pages.length}
              </span>
              <h3 className="text-sm sm:text-base font-bold truncate text-white max-w-xs sm:max-w-md">
                {t("docSlider.items.h3.title")} — {activePage.subtitle}
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              {/* Zoom Controls */}
              <div className="flex items-center space-x-1 bg-white/10 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
                  title={t("docSlider.zoomOut")}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold px-2">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
                  title={t("docSlider.zoomIn")}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Download PDF button */}
              <a
                href={pdfUrl}
                download="audit-report-2025-2026.pdf"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#00381f] font-bold text-xs flex items-center space-x-1.5 shadow-md transition-colors"
                title={t("docSlider.download")}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">PDF Yuklab olish</span>
              </a>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-red-500/80 hover:bg-red-600 text-white transition-colors ml-2"
                title={t("docSlider.close")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Image Container */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center overflow-auto my-3 p-2">
            <div
              className="transition-transform duration-200 shadow-2xl rounded-2xl overflow-hidden bg-white border border-white/20 flex items-center justify-center p-1"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <Image
                src={activePage.imgSrc}
                alt={activePage.title}
                width={1240}
                height={1753}
                className="max-h-[70vh] sm:max-h-[75vh] w-auto h-auto object-contain rounded-xl"
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
          <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-md rounded-2xl p-2.5 border border-white/15 flex flex-wrap items-center justify-between gap-2 text-white text-xs font-semibold">
            <span className="text-amber-300 font-bold px-2">
              Sahifa {currentPageIndex + 1} / {pages.length}
            </span>
            <div className="flex items-center space-x-1.5">
              {pages.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPageIndex(i)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    i === currentPageIndex
                      ? "bg-amber-400 text-slate-950 shadow-md"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {p.pageNumber}-sahifa
                </button>
              ))}
            </div>
            <span className="text-[11px] text-emerald-200 hidden sm:inline px-2">
              {t("docSlider.useButtonsToZoom")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
