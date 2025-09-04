"use client";

import { useState, useEffect } from "react";

export default function CreditCalculator() {
  const [creditAmount, setCreditAmount] = useState(1000000);
  const [creditTerm, setCreditTerm] = useState(3);
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    if (interestRate && !isNaN(Number(interestRate))) {
      const principal = creditAmount;
      const rate = Number(interestRate) / 100;
      const totalAmount = principal + principal * rate;
      const monthly = totalAmount / creditTerm;
      setMonthlyPayment(monthly);
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
              Kreditni{" "}
              <span style={{ color: "#578f27" }}>hisoblash kalkulyatori</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Saytdagi kalkulyatordan foydalanib, summani va muddatni tanlab,
              oylik to\lovning taxminiy miqdorini hisoblang chiqing
            </p>
          </div>
          <div className="hidden md:block">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#578f2720" }}
            >
              <svg
                className="w-8 h-8"
                style={{ color: "#578f27" }}
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
            {/* Left side - Controls */}
            <div className="space-y-8">
              {/* Credit Amount */}
              <div>
                <label className="block text-gray-600 text-sm mb-3">
                  Kredit summasi
                </label>
                <div className="mb-4">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "#578f27" }}
                  >
                    {formatNumber(creditAmount)} so\m
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="100000"
                    max="500000000"
                    step="1000000"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Credit Term */}
              <div>
                <label className="block text-gray-600 text-sm mb-3">
                  Kredit muddati
                </label>
                <div className="mb-4">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "#578f27" }}
                  >
                    {creditTerm} oy
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="3"
                    max="36"
                    step="3"
                    value={creditTerm}
                    onChange={(e) => setCreditTerm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>3 oy</span>
                    <span>12 oy</span>
                    <span>18 oy</span>
                    <span>24 oy</span>
                    <span>30 oy</span>
                    <span>36 oy</span>
                  </div>
                </div>
              </div>

              {/* Interest Rate Input */}
              <div>
                <label className="block text-gray-600 text-sm mb-3">
                  Foiz stavkasi (%)
                </label>
                <input
                  type="number"
                  placeholder="Foiz stavkasini kiriting"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#578f27] focus:border-transparent text-[#000000] text-lg"
                />
              </div>

              {/* Contact Info */}
              <div
                className="rounded-lg p-6"
                style={{ backgroundColor: "#578f2710" }}
              >
                <h3 className="font-bold mb-2" style={{ color: "#578f27" }}>
                  Hisob-kitob dastlabki
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Summalar, muddatlar va to\lovlar to\g\risida batafsil ma\lumot
                  olish uchun istalgan qulay bo\lmiga murojaat qilishingiz yoki
                  telefon raqami orqali bog\lanishingiz zarur
                </p>
                <p className="text-gray-900 font-bold"> +998 (55) 515-01-11</p>
              </div>
            </div>

            {/* Right side - Result */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Foydali taklif
              </h3>

              <div className="mb-8">
                <p className="text-gray-600 mb-2">Oylik to\lov:</p>
                <p className="text-4xl font-bold" style={{ color: "#578f27" }}>
                  {monthlyPayment > 0
                    ? formatNumber(Math.round(monthlyPayment))
                    : "0"}{" "}
                  <span className="text-xl">oy</span>
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
                style={{ backgroundColor: "#578f27" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4a7a22")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#578f27")
                }
              >
                Ariza qoldirish
              </button>

              <div className="text-xl text-gray-500 leading-relaxed">
                Biz tadbirkorlar va bizneslarga moliyaviy qo‘llab-quvvatlash
                orqali ularning orzularini ro‘yobga chiqarishga yordam beramiz.
                Kredit xizmatlarimiz bilan ishonchlilik, barqarorlik va yangi
                imkoniyatlar sari dadil qadam tashlashingiz mumkin.
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
          background: #578f27;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #578f27;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
