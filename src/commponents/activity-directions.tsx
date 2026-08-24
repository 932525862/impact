"use client";

import { useState } from "react";
import Image from "next/image";
import { X, CheckCircle2, ChevronRight, Percent, Calendar, FileText, UserCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ActivityDirections() {
  const { t } = useTranslation();

  const activities = [
    {
      key: "biznes",
      image: "/mikro1.jpeg",
      category: "business",
    },
    {
      key: "biznesPlus",
      image: "/mikro2.jpeg",
      category: "business",
    },
    {
      key: "oson",
      image: "/mikro3.jpeg",
      category: "individual",
    },
    {
      key: "ishonch",
      image: "/mikro4.jpeg",
      category: "individual",
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("all");
  const [selected, setSelected] = useState<number | null>(null);

  const filteredActivities = activities.filter((act) => {
    if (activeTab === "all") return true;
    return act.category === activeTab;
  });

  const scrollToContact = (loanTitle: string) => {
    setSelected(null);
    const section = document.getElementById("kontaktlar");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="xizmatlar" className="py-20 bg-white border-b border-slate-200/60 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Badge Pill matching Screenshot 1 */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-[#004526] border border-emerald-200/80 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <span>RASMIY MAHSULOTLAR KATALOGI</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#004526] tracking-tight">
            {t("section.title")} <span className="text-slate-900">{t("section.highlight")}</span>
          </h2>

          <p className="text-base text-slate-600 font-medium">
            {t("section.subtitle")}
          </p>

          <div className="w-16 h-1 bg-[#004526] mx-auto rounded-full mt-2" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#f4f7f5] p-1.5 rounded-full border border-slate-200/80 inline-flex space-x-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === "all"
                  ? "bg-[#004526] text-white shadow-sm"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              {t("section.filter.all")}
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === "business"
                  ? "bg-[#004526] text-white shadow-sm"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              {t("section.filter.business")}
            </button>
            <button
              onClick={() => setActiveTab("individual")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === "individual"
                  ? "bg-[#004526] text-white shadow-sm"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              {t("section.filter.individual")}
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredActivities.map((activity) => {
            const originalIndex = activities.findIndex((a) => a.key === activity.key);
            const title = t(`activities.${activity.key}.title`);
            const badge = t(`activities.${activity.key}.badge`);
            const desc = t(`activities.${activity.key}.desc`);
            const foiz = t(`activities.${activity.key}.foiz`);
            const muddat = t(`activities.${activity.key}.muddat`);

            return (
              <div
                key={activity.key}
                className="bg-[#f4f7f5]/80 hover:bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Dark Overlay & Badge */}
                  <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00381f] via-slate-900/30 to-transparent" />

                    <div className="absolute top-4 left-4 bg-[#004526] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                      {badge}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold">{title}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <p className="text-slate-600 text-xs leading-relaxed font-medium">
                      {desc}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1">
                        <div className="flex items-center space-x-1 text-xs text-[#004526] font-bold">
                          <Percent className="w-3.5 h-3.5" />
                          <span>Yillik foiz</span>
                        </div>
                        <div className="text-sm font-extrabold text-slate-900">{foiz}</div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
                        <div className="flex items-center space-x-1 text-xs text-slate-600 font-bold">
                          <Calendar className="w-3.5 h-3.5 text-[#004526]" />
                          <span>Muddati</span>
                        </div>
                        <div className="text-sm font-extrabold text-slate-900">{muddat}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelected(originalIndex)}
                    className="w-full bg-[#004526] hover:bg-[#00381f] text-white font-bold text-xs py-3 rounded-2xl transition-colors shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <span>{t("section.button")}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Modal Window */}
      {selected !== null && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full relative overflow-hidden max-h-[90vh] flex flex-col border border-slate-200">
            {/* Modal Header */}
            <div className="bg-[#00381f] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider">
                  {t(`activities.${activities[selected].key}.badge`)}
                </span>
                <h3 className="text-2xl font-extrabold mt-0.5">
                  {t(`activities.${activities[selected].key}.title`)}
                </h3>
              </div>
              <button
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                onClick={() => setSelected(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#004526]" />
                  <span>Kredit Parametrlari</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 font-bold block">{t("section.modal.mijoz")}:</span>
                    <span className="font-semibold text-slate-900">
                      {t(`activities.${activities[selected].key}.mijoz`, { joinArrays: ", " })}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 font-bold block">{t("section.modal.foiz")}:</span>
                    <span className="font-semibold text-slate-900">
                      {t(`activities.${activities[selected].key}.foiz`)}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 font-bold block">{t("section.modal.muddat")}:</span>
                    <span className="font-semibold text-slate-900">
                      {t(`activities.${activities[selected].key}.muddat`)}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 font-bold block">{t("section.modal.garov")}:</span>
                    <span className="font-semibold text-slate-900">
                      {t(`activities.${activities[selected].key}.garov`, { joinArrays: ", " })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Requirements List */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2 flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-[#004526]" />
                  <span>{t("section.modal.talablar")}</span>
                </h4>

                <ul className="space-y-2 text-xs">
                  {(
                    t(`activities.${activities[selected].key}.talablar`, {
                      returnObjects: true,
                    }) as string[]
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer Action */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-3 text-xs font-bold">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Yopish
              </button>
              <button
                onClick={() => scrollToContact(t(`activities.${activities[selected].key}.title`))}
                className="px-5 py-2 rounded-xl bg-[#004526] hover:bg-[#00381f] text-white shadow-sm"
              >
                {t("section.modal.apply")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
