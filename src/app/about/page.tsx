"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "../../commponents/navbar";
import Footer from "../../commponents/footer";
import { useTranslation } from "react-i18next";
import {
  FileText,
  ShieldCheck,
  Award,
  Download,
  Eye,
  CheckCircle2,
  Building2,
  TrendingUp,
  Target,
  Handshake,
  ExternalLink,
  X,
  FileCheck2,
} from "lucide-react";

export default function AboutPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"info" | "docs" | "naufor">("info");
  const [selectedDoc, setSelectedDoc] = useState<{ title: string; desc: string; type: string } | null>(null);

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

  const docs = [
    {
      title: "Markaziy Bank Litsenziyasi",
      desc: "Mikromoliya faoliyatini amalga oshirish bo'yicha O'zbekiston Respublikasi Markaziy Banki litsenziyasi",
      type: "Litsenziya № 0084",
      date: "2024-yil rasmiy tasdiqlangan",
    },
    {
      title: "Davlat Ro'yxatidan O'tish Guvohnomasi",
      desc: "Toshkent shahar Shayxontohur tumani davlat xizmatlari markazi guvohnomasi",
      type: "Guvohnoma № 75094",
      date: "Davlat ro'yxati",
    },
    {
      title: "Yillik Audit Xulosasi (2025/2026)",
      desc: "Mustaqil xalqaro va milliy auditorlik tashkilotining moliyaviy hisobot xulosasi",
      type: "Audit Xulosasi",
      date: "2025/2026 Moliyaviy yil",
    },
    {
      title: "Tashkilot Ustavi va Ichki Qoidalari",
      desc: "Tashkilotning tasdiqlangan rasmiy Ustavi va mijozlar huquqlarini himoya qilish qoidalari",
      type: "Rasmiy Ustav",
      date: "Tasdiqlangan hujjat",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="bg-gradient-to-b from-[#022c22] via-[#004526] to-[#01351d] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-emerald-900/80 border border-emerald-700/60 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-200">
            <Award className="w-4 h-4 text-amber-400" />
            <span>RASMIY MIKROMOLIYALAR TASHKILOTI</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            IMPACT FINANCE Tashkiloti Haqida
          </h1>

          <p className="text-base md:text-lg text-emerald-100/90 max-w-2xl mx-auto font-medium">
            Barqaror moliyaviy kelajak va biznes rivoji yo'lidagi ishonchli korporativ hamkoringiz
          </p>

          <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full mt-4" />
        </div>
      </section>

      {/* Interactive Navigation Tabs */}
      <section className="py-8 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="bg-[#f4f7f5] p-1.5 rounded-full border border-slate-200/80 inline-flex space-x-1">
            <button
              onClick={() => setActiveTab("info")}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${
                activeTab === "info"
                  ? "bg-[#004526] text-white shadow-md"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              Tashkilot Haqida
            </button>

            <button
              onClick={() => setActiveTab("docs")}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${
                activeTab === "docs"
                  ? "bg-[#004526] text-white shadow-md"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              Hujjatlar va Hisobotlar
            </button>

            <button
              onClick={() => setActiveTab("naufor")}
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${
                activeTab === "naufor"
                  ? "bg-[#004526] text-white shadow-md"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              A'zolik va Hamkorlik (НАУФОР)
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Tab 1: Organization Overview & Values */}
        {activeTab === "info" && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Mission & Story Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <h2 className="text-2xl font-black text-[#004526] flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#004526] flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <span>IMPACT FINANCE Missiyasi va Maqsadi</span>
                </h2>

                <p
                  className="text-slate-700 text-sm md:text-base leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: t("about.intro1") }}
                />

                <p
                  className="text-slate-700 text-sm md:text-base leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: t("about.intro2") }}
                />

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start space-x-3 text-xs text-[#004526]">
                  <ShieldCheck className="w-5 h-5 text-[#004526] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold mb-0.5">Markaziy Bank Regulyatsiyasi:</strong>
                    Tashkilot faoliyati O'zbekiston Respublikasi Markaziy Banki qonunchilik talablari hamda moliyaviy shaffoflik me'yorlariga to'liq mos keladi.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="p-8 bg-gradient-to-br from-[#004526] to-[#022c22] text-white rounded-3xl shadow-xl space-y-4 border border-emerald-800">
                  <h3 className="text-xl font-extrabold text-amber-400">Bizning Va'damiz:</h3>
                  <p
                    className="text-sm leading-relaxed font-medium italic text-emerald-100/90"
                    dangerouslySetInnerHTML={{ __html: t("about.closing") }}
                  />
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-sm">Bosh Ofis va Bo'lim:</h4>
                  <p className="text-xs text-slate-600 font-medium">Toshkent shahar, Shayxontohur tumani, O'rda MFY, Labzak ko'chasi 2a-uy</p>
                  <p className="text-xs font-bold text-[#004526]">+998 (55) 515-01-11</p>
                </div>
              </div>
            </div>

            {/* Corporate Values */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h3 className="text-2xl font-black text-slate-900">{t("about.valuesHeading")}</h3>
                <p className="text-xs text-slate-500 font-semibold">Biz amal qiladigan asosiy korporativ tamoyillar</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {["trust", "transparency", "sustainability", "collaboration"].map((key) => {
                  const item = valueIcons[key];
                  return (
                    <div
                      key={key}
                      className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4"
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center shadow-md`}>
                        {item.icon}
                      </div>
                      <div
                        className="text-xs text-slate-700 leading-relaxed font-medium"
                        dangerouslySetInnerHTML={{ __html: t(`about.values.${key}`) }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Documents and Reports (Hujjatlar va hisobotlar) */}
        {activeTab === "docs" && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-[#004526] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Rasmiy Hujjatlar</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900">Hujjatlar va Hisobotlar</h2>
              <p className="text-xs text-slate-500 font-semibold">
                IMPACT FINANCE tashkilotining rasmiy litsenziyalari, guvohnomalari va moliyaviy audit xulosalari
              </p>
            </div>

            {/* Document Download Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {docs.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#004526] flex items-center justify-center border border-emerald-100">
                        <FileCheck2 className="w-6 h-6" />
                      </div>
                      <span className="bg-[#004526] text-emerald-100 text-[10px] font-bold px-3 py-1 rounded-full">
                        {doc.type}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-extrabold text-slate-900">{doc.title}</h3>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{doc.desc}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-semibold">{doc.date}</span>

                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="bg-[#004526] hover:bg-[#00381f] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Hujjatni ko'rish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: NAUFOR Membership (Moliya bozori ishtirokchilari milliy uyushmasi) */}
        {(activeTab === "naufor" || activeTab === "info" || activeTab === "docs") && (
          <div className="mt-16 pt-16 border-t border-slate-200 space-y-8 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Logo Container */}
              <div className="lg:col-span-4 flex justify-center bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
                <div className="relative w-full h-44 max-w-[320px]">
                  <Image
                    src="/naufor.svg"
                    alt="НАУФОР - Moliya bozori ishtirokchilari milliy uyushmasi"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Right NAUFOR Membership Statement */}
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-900 border border-sky-300/60 px-3.5 py-1 rounded-full text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-sky-700" />
                  <span>RASMIY A'ZOLIK BILDIRISHNOMASI</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                  2026-yil 13-avgustdan boshlab "Moliya bozori ishtirokchilari milliy uyushmasi" a'zosi
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  IMPACT FINANCE mikromoliya tashkiloti moliyaviy bozorda mas'uliyatli xizmat ko'rsatish, mijozlar manfaatlari va huquqlarini ishonchli himoya qilish hamda xalqaro moliyaviy standartlarga amal qilish maqsadida <strong>"Moliya bozori ishtirokchilari milliy uyushmasi" (НАУФОР)</strong>ning rasmiy a'zosi bo'lib hisoblanadi.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-100 flex items-center space-x-3 text-xs font-bold text-sky-950">
                    <CheckCircle2 className="w-5 h-5 text-sky-600 flex-shrink-0" />
                    <span>Xalqaro standartlarga moslik</span>
                  </div>

                  <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-100 flex items-center space-x-3 text-xs font-bold text-sky-950">
                    <CheckCircle2 className="w-5 h-5 text-sky-600 flex-shrink-0" />
                    <span>Mijozlar huquqlari kafolati</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Document View Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-6 relative border border-slate-200 shadow-2xl">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
            >
              <X size={20} />
            </button>

            <div className="space-y-2">
              <span className="bg-[#004526] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                {selectedDoc.type}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">{selectedDoc.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{selectedDoc.desc}</p>
            </div>

            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
              <FileCheck2 className="w-12 h-12 text-[#004526] mx-auto" />
              <p className="text-xs text-slate-600 font-bold">
                Rasmiy tasdiqlangan hujjat namunasi (PDF)
              </p>
              <p className="text-[11px] text-slate-400">
                Litsenziya № 0084 • IMPACT FINANCE MFO
              </p>
            </div>

            <div className="flex justify-end space-x-3 text-xs font-bold">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Yopish
              </button>
              <button
                onClick={() => {
                  alert(`"${selectedDoc.title}" hujjati yuklab olinmoqda...`);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#004526] text-white hover:bg-[#00381f] flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>PDF Yuklab olish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
