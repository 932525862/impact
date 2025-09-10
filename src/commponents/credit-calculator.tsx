"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function CreditCalculator() {
  const { t } = useTranslation();

  const [creditAmount, setCreditAmount] = useState<string>("1000000");
  const [creditTerm, setCreditTerm] = useState<string>("3");
  const [interestRate, setInterestRate] = useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    if (
      interestRate &&
      !isNaN(Number(interestRate)) &&
      creditAmount &&
      creditTerm
    ) {
      const principal = Number(creditAmount);
      const annualRate = Number(interestRate) / 100;
      const monthlyRate = annualRate / 12;
      const n = Number(creditTerm);

      if (monthlyRate > 0) {
        const annuity =
          principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -n)));
        setMonthlyPayment(annuity);
      } else {
        setMonthlyPayment(principal / n);
      }
    } else {
      setMonthlyPayment(0);
    }
  }, [creditAmount, creditTerm, interestRate]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("uz-UZ").format(num);
  };

  return (
    <div id="kalkulyator" className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {t("calculator.title")}{" "}
              <span style={{ color: "#004526" }}>
                {t("calculator.highlight")}
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              {t("calculator.description")}
            </p>
          </div>
          <div className="hidden md:block">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#578f2720" }}
            >
              <svg
                className="w-8 h-8"
                style={{ color: "#004526" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Right side - Result */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t("calculator.offer")}
              </h3>

              <div className="mb-8">
                <p className="text-gray-600 mb-2">{t("calculator.monthlyPayment")}</p>
                <p className="text-4xl font-bold" style={{ color: "#004526" }}>
                  {monthlyPayment > 0
                    ? formatNumber(Math.round(monthlyPayment))
                    : "0"}{" "}
                  <span className="text-xl">{t("calculator.currency")}</span>
                </p>
              </div>

              <button
                onClick={() => {
                  const section = document.getElementById("kontaktlar");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-200 mb-6"
                style={{ backgroundColor: "#004526" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4a7a22")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#004526")
                }
              >
                {t("calculator.button")}
              </button>

              <div className="hidden md:block text-xm text-gray-500 leading-relaxed">
                {t("calculator.info")}
              </div>
            </div>

            {/* Left side - Controls */}
            <div className="space-y-8">
              {/* Credit Amount */}
              <div>
                <label className="block text-gray-600 text-sm mb-3">
                  {t("calculator.creditAmount.label")}
                </label>
                <input
                  type="number"
                  placeholder={t("calculator.creditAmount.placeholder")!}
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004526] focus:border-transparent text-[#000000] text-lg"
                />
              </div>

              {/* Credit Term */}
              <div>
                <label className="block text-gray-600 text-sm mb-3">
                  {t("calculator.creditTerm.label")}
                </label>
                <input
                  type="number"
                  placeholder={t("calculator.creditTerm.placeholder")!}
                  value={creditTerm}
                  onChange={(e) => setCreditTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004526] focus:border-transparent text-[#000000] text-lg"
                />
              </div>

              {/* Interest Rate Input */}
              <div>
                <label className="block text-gray-600 text-sm mb-3">
                  {t("calculator.interestRate.label")}
                </label>
                <input
                  type="number"
                  placeholder={t("calculator.interestRate.placeholder")!}
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004526] focus:border-transparent text-[#000000] text-lg"
                />
              </div>

              {/* Contact Info */}
              <div
                className="rounded-lg p-6"
                style={{ backgroundColor: "#578f2710" }}
              >
                <h3 className="font-bold mb-2" style={{ color: "#004526" }}>
                  {t("calculator.noteTitle")}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t("calculator.noteText")}
                </p>
                <p className="text-gray-900 font-bold">{t("calculator.phone")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #004526;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #004526;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
