"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown, Clock, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../../public/logo2.png";
import { useTranslation } from "react-i18next";
import i18n from "../../lib/i18n";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("UZ");
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "uz";
    i18n.changeLanguage(savedLang);
    setCurrentLang(savedLang.toUpperCase());
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang.toLowerCase());
    localStorage.setItem("lang", lang.toLowerCase());
    setCurrentLang(lang);
    setLangOpen(false);
  };

  const navigateOrScroll = (id: string) => {
    setIsOpen(false);
    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full font-sans">
      {/* Executive Dark Slate Top Bar */}
      <div className="bg-[#022c22] text-emerald-100 text-[11px] py-2 px-4 border-b border-emerald-950/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left License & Location Badges */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-emerald-900/60 px-3 py-1 rounded-full text-emerald-200 border border-emerald-700/50">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-white">{t("topBar.license")}</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-[#004526] px-3 py-1 rounded-full text-emerald-200 border border-emerald-800/80">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>{t("topBar.hours")}</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-[#004526] px-3 py-1 rounded-full text-emerald-200 border border-emerald-800/80">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>{t("topBar.address")}</span>
            </div>
          </div>

          {/* Right Hotline Call & Language Switcher */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 font-semibold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60">
              <Phone className="w-3 h-3 text-amber-400 animate-pulse" />
              <span className="text-emerald-300">{t("topBar.hotline")}</span>
              <a
                href="tel:+998555150111"
                className="text-white hover:text-amber-400 font-extrabold transition-colors ml-1"
              >
                +998 (55) 515-01-11
              </a>
            </div>

            {/* Language Dropdown Pill */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-1 text-[11px] font-bold text-white bg-[#004526] hover:bg-emerald-800 px-3 py-1 rounded-full border border-emerald-600 transition shadow-xs"
              >
                <span>{currentLang}</span>
                <ChevronDown className="h-3 w-3 text-emerald-300" />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-1.5 w-28 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden text-slate-800 py-1">
                  {["UZ", "RU", "EN"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className="block w-full text-left px-3.5 py-1.5 text-xs font-bold hover:bg-emerald-50 hover:text-[#004526]"
                    >
                      {lang === "UZ" ? "O'zbekcha" : lang === "RU" ? "Русский" : "English"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Header */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Brand Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src={Logo}
                alt="IMPACT FINANCE"
                width={190}
                height={42}
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Center Pill Menu Container */}
            <div className="hidden lg:flex items-center bg-[#f4f7f5] p-1.5 rounded-full border border-slate-200/80 shadow-2xs">
              <button
                onClick={() => navigateOrScroll("home")}
                className={`px-4 py-2 text-xs font-extrabold rounded-full transition-all ${
                  pathname === "/" ? "bg-white text-[#004526] shadow-xs" : "text-slate-800 hover:bg-white hover:text-[#004526]"
                }`}
              >
                {t("home")}
              </button>

              {/* Biz haqimizda Dedicated Route Link */}
              <Link
                href="/about"
                className={`px-4 py-2 text-xs font-extrabold rounded-full transition-all ${
                  pathname === "/about"
                    ? "bg-[#004526] text-white shadow-xs"
                    : "text-slate-800 hover:bg-white hover:text-[#004526]"
                }`}
              >
                {t("aboutNav")}
              </Link>

              <button
                onClick={() => navigateOrScroll("afzalliklarimiz")}
                className="px-4 py-2 hover:bg-white text-slate-800 hover:text-[#004526] font-extrabold text-xs rounded-full transition-all"
              >
                {t("advantages")}
              </button>
              <button
                onClick={() => navigateOrScroll("xizmatlar")}
                className="px-4 py-2 hover:bg-white text-slate-800 hover:text-[#004526] font-extrabold text-xs rounded-full transition-all"
              >
                {t("services1")}
              </button>
              <button
                onClick={() => navigateOrScroll("kalkulyator")}
                className="px-4 py-2 hover:bg-white text-slate-800 hover:text-[#004526] font-extrabold text-xs rounded-full transition-all"
              >
                {t("calculator1")}
              </button>
              <button
                onClick={() => navigateOrScroll("team")}
                className="px-4 py-2 hover:bg-white text-slate-800 hover:text-[#004526] font-extrabold text-xs rounded-full transition-all"
              >
                {t("teamNav")}
              </button>
              <button
                onClick={() => navigateOrScroll("kontaktlar")}
                className="px-4 py-2 hover:bg-white text-slate-800 hover:text-[#004526] font-extrabold text-xs rounded-full transition-all"
              >
                {t("contacts")}
              </button>
            </div>

            {/* Right Action Button: Shimmering Emerald Pill CTA */}
            <div className="hidden lg:block">
              <button
                onClick={() => navigateOrScroll("kontaktlar")}
                className="bg-gradient-to-r from-[#004526] to-[#022c22] hover:from-[#00381f] hover:to-[#011a14] text-white font-extrabold text-xs px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all flex items-center space-x-2 active:scale-95 border border-emerald-700/40"
              >
                <span>{t("applyNow")}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-xl text-slate-800 hover:bg-slate-100"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 mt-2 px-4 pt-3 pb-6 space-y-1 shadow-2xl">
            <button
              onClick={() => navigateOrScroll("home")}
              className="block w-full text-left text-slate-800 hover:text-[#004526] font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50"
            >
              {t("home")}
            </button>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-slate-800 hover:text-[#004526] font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50"
            >
              {t("aboutNav")}
            </Link>
            <button
              onClick={() => navigateOrScroll("afzalliklarimiz")}
              className="block w-full text-left text-slate-800 hover:text-[#004526] font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50"
            >
              {t("advantages")}
            </button>
            <button
              onClick={() => navigateOrScroll("xizmatlar")}
              className="block w-full text-left text-slate-800 hover:text-[#004526] font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50"
            >
              {t("services1")}
            </button>
            <button
              onClick={() => navigateOrScroll("kalkulyator")}
              className="block w-full text-left text-slate-800 hover:text-[#004526] font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50"
            >
              {t("calculator1")}
            </button>
            <button
              onClick={() => navigateOrScroll("team")}
              className="block w-full text-left text-slate-800 hover:text-[#004526] font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50"
            >
              {t("teamNav")}
            </button>
            <button
              onClick={() => navigateOrScroll("kontaktlar")}
              className="block w-full text-left text-slate-800 hover:text-[#004526] font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50"
            >
              {t("contacts")}
            </button>
            <div className="pt-2">
              <button
                onClick={() => navigateOrScroll("kontaktlar")}
                className="w-full bg-[#004526] text-white font-bold py-3 rounded-full text-center"
              >
                {t("applyNow")}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
