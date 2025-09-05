"use client";

import { Clock, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [Clock, CheckCircle, TrendingUp];
const colors = [
  "from-blue-500 to-blue-600",
  "from-green-500 to-green-600",
  "from-purple-500 to-purple-600",
];

export function ServiceCards() {
  const { t } = useTranslation();

  const services = t("services.cards", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <section
      id="afzalliklarimiz"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 text-balance">
            {t("services.title")}
          </h2>
          <p className="text-xl font-semibold text-gray-600 max-w-3xl mx-auto text-pretty">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const IconComponent = icons[index];
            return (
              <div
                key={index}
                className="group relative overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 rounded-3xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#578f27]/10 to-[#578f27]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative p-10 h-full">
                  <div className="space-y-8">
                    <div className="flex items-start justify-between">
                      <div className="text-8xl font-black text-gray-100 group-hover:text-[#578f27]/20 transition-colors duration-300 leading-none">
                        {index + 1}
                      </div>
                      <div
                        className={`bg-gradient-to-br ${colors[index]} p-5 rounded-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xl`}
                      >
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-2xl font-black text-gray-900 leading-tight text-balance group-hover:text-[#578f27] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-pretty font-medium text-lg group-hover:text-gray-700 transition-colors">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-6">
                      <div className="flex items-center text-[#578f27] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <span className="text-base">{t("services.more")}</span>
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </div>
                    </div>
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
