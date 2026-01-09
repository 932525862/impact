"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";

export default function CreditCalculator() {
  const { t } = useTranslation();
  const tableRef = useRef<HTMLDivElement>(null);

  const [creditAmount, setCreditAmount] = useState<string>("1000000");
  const [creditTerm, setCreditTerm] = useState<string>("3");
  const [interestRate, setInterestRate] = useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [paymentSchedule, setPaymentSchedule] = useState<Array<{
    month: number;
    principal: number;
    interest: number;
    payment: number;
    remaining: number;
  }> | null>(null);

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
        
        // To'lovlar jadvalini hisoblash
        const schedule = [];
        let remainingBalance = principal;
        
        for (let i = 1; i <= n; i++) {
          const interestPayment = remainingBalance * monthlyRate;
          const principalPayment = annuity - interestPayment;
          remainingBalance -= principalPayment;
          
          schedule.push({
            month: i,
            principal: Math.round(principalPayment * 100) / 100,
            interest: Math.round(interestPayment * 100) / 100,
            payment: Math.round(annuity * 100) / 100,
            remaining: Math.max(0, Math.round(remainingBalance * 100) / 100),
          });
        }
        
        setPaymentSchedule(schedule);
      } else {
        const monthlyPay = principal / n;
        setMonthlyPayment(monthlyPay);
        
        // To'lovlar jadvalini hisoblash (faiz yo'q)
        const schedule = [];
        for (let i = 1; i <= n; i++) {
          schedule.push({
            month: i,
            principal: Math.round((principal / n) * 100) / 100,
            interest: 0,
            payment: Math.round(monthlyPay * 100) / 100,
            remaining: Math.round((principal - (principal / n) * i) * 100) / 100,
          });
        }
        
        setPaymentSchedule(schedule);
      }
    } else {
      setMonthlyPayment(0);
      setPaymentSchedule(null);
    }
  }, [creditAmount, creditTerm, interestRate]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("uz-UZ").format(num);
  };

  // Format a numeric string with spaces for thousands: "1000000" -> "1 000 000"
  const formatWithSpaces = (value: string) => {
    if (!value) return "";
    // remove leading zeros
    const digits = value.replace(/^0+(?=\d)/, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleCreditAmountChange = (input: string) => {
    // allow only digits
    const digits = input.replace(/\D/g, "");
    setCreditAmount(digits);
  };

  const downloadPDF = async () => {
    if (!tableRef.current || !paymentSchedule) return;

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      let yPosition = 15;
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Sarlavha
      pdf.setFontSize(16);
      pdf.setTextColor(0, 69, 38);
      pdf.text("Kredit to'lovlari jadavali", margin, yPosition);
      yPosition += 10;

      // Kredit ma'lumotlari
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Kredit miqdori: ${formatNumber(Number(creditAmount))} UZS`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Kredit muddati: ${creditTerm} oy`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Foiz stavkasi: ${interestRate}%`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Oylik to'lov: ${formatNumber(Math.round(monthlyPayment))} UZS`, margin, yPosition);
      yPosition += 12;

      // Jadvol sarlavha
      const columns = ["Oy", "Asosiy qarz", "Foiz", "Oylik to'lov", "Qolgan qarz"];
      const columnWidths = [15, 35, 35, 35, 35];
      const rowHeight = 6;
      const headerHeight = 8;

      // Sarlavha chiziqlar
      pdf.setFontSize(9);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.setFillColor(0, 69, 38);

      let xPosition = margin;
      columns.forEach((col, index) => {
        pdf.rect(xPosition, yPosition, columnWidths[index], headerHeight, "F");
        pdf.text(col, xPosition + 1, yPosition + headerHeight - 1);
        xPosition += columnWidths[index];
      });

      yPosition += headerHeight;

      // Jadval qatoralari
      pdf.setFont(undefined, "normal");
      pdf.setTextColor(0, 0, 0);

      paymentSchedule.forEach((row, index) => {
        // Sahifa o'zgartirilsa yangi sahifa qo'shish
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }

        const rowData = [
          row.month.toString(),
          formatNumber(Math.round(row.principal)),
          formatNumber(Math.round(row.interest)),
          formatNumber(Math.round(row.payment)),
          formatNumber(row.remaining),
        ];

        // Fon rangi
        if (index % 2 === 0) {
          xPosition = margin;
          columns.forEach((_, idx) => {
            pdf.setFillColor(249, 250, 251);
            pdf.rect(xPosition, yPosition, columnWidths[idx], rowHeight, "F");
            xPosition += columnWidths[idx];
          });
        }

        // Matn
        xPosition = margin;
        rowData.forEach((data, idx) => {
          const alignment = idx === 0 ? "left" : "right";
          const startX = alignment === "left" ? xPosition + 1 : xPosition + columnWidths[idx] - 1;
          pdf.text(data, startX, yPosition + rowHeight - 1, { align: alignment });
          xPosition += columnWidths[idx];
        });

        // Chiziq
        pdf.setDrawColor(229, 231, 235);
        pdf.line(margin, yPosition + rowHeight, pageWidth - margin, yPosition + rowHeight);
        yPosition += rowHeight;
      });

      // Jami qatorasi
      yPosition += 2;
      pdf.setFont(undefined, "bold");
      pdf.setFillColor(243, 244, 246);

      const totalRow = [
        "Jami",
        formatNumber(Number(creditAmount)),
        formatNumber(
          Math.round(
            paymentSchedule.reduce((sum, row) => sum + row.interest, 0)
          )
        ),
        formatNumber(
          Math.round(
            paymentSchedule.reduce((sum, row) => sum + row.payment, 0)
          )
        ),
        "0",
      ];

      xPosition = margin;
      columns.forEach((_, idx) => {
        pdf.rect(xPosition, yPosition, columnWidths[idx], rowHeight, "F");
        xPosition += columnWidths[idx];
      });

      xPosition = margin;
      totalRow.forEach((data, idx) => {
        const alignment = idx === 0 ? "left" : "right";
        const startX = alignment === "left" ? xPosition + 1 : xPosition + columnWidths[idx] - 1;
        pdf.text(data, startX, yPosition + rowHeight - 1, { align: alignment });
        xPosition += columnWidths[idx];
      });

      // PDF ni yuklash
      pdf.save(
        `kredit-jadavali-${new Date().toISOString().slice(0, 10)}.pdf`
      );
    } catch (error) {
      console.error("PDF yaratishda xato:", error);
      alert("PDF yaratishda xato yuz berdi");
    }
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
                className="w-full text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200 mb-3"
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

              {/* <button
                onClick={downloadPDF}
                disabled={!paymentSchedule}
                className="w-full text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: paymentSchedule ? "#004526" : "#cccccc",
                }}
                onMouseEnter={(e) => {
                  if (paymentSchedule) {
                    e.currentTarget.style.backgroundColor = "#4a7a22";
                  }
                }}
                onMouseLeave={(e) => {
                  if (paymentSchedule) {
                    e.currentTarget.style.backgroundColor = "#004526";
                  }
                }}
              >
                To'lovlar jadvalini yuklash
              </button> */}

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
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder={t("calculator.creditAmount.placeholder")!}
                  value={formatWithSpaces(creditAmount)}
                  onChange={(e) => handleCreditAmountChange(e.target.value)}
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

          {/* To'lovlar jadvalini ko'rsatish */}
          {paymentSchedule && paymentSchedule.length > 0 && (
            <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {t("calculator.paymentSchedule") || "To'lovlar jadvalini"}
                </h3>
                <button
                  onClick={downloadPDF}
                  className="text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors duration-200 whitespace-nowrap ml-4"
                  style={{
                    backgroundColor: "#004526",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#4a7a22")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#004526")
                  }
                >
                  Jadvalini yuklash
                </button>
              </div>
              <div
                ref={tableRef}
                className="overflow-x-auto bg-white p-4 rounded-lg"
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr
                      style={{
                        borderBottom: "3px solid #004526",
                      }}
                    >
                      <th className="px-4 py-3 text-left font-bold text-gray-900">
                        Oy
                      </th>
                      <th className="px-4 py-3 text-right font-bold text-gray-900">
                        Asosiy qarz
                      </th>
                      <th className="px-4 py-3 text-right font-bold text-gray-900">
                        Foiz
                      </th>
                      <th className="px-4 py-3 text-right font-bold text-gray-900">
                        Oylik to'lov
                      </th>
                      <th className="px-4 py-3 text-right font-bold text-gray-900">
                        Qolgan qarz
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentSchedule.map((row) => (
                      <tr
                        key={row.month}
                        style={{
                          borderBottom: "1px solid #e5e7eb",
                          backgroundColor:
                            row.month % 2 === 0 ? "#f9fafb" : "white",
                        }}
                      >
                        <td className="px-4 py-3 text-gray-900 font-semibold">
                          {row.month}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-900">
                          {formatNumber(Math.round(row.principal))}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-900">
                          {formatNumber(Math.round(row.interest))}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-900 font-semibold">
                          {formatNumber(Math.round(row.payment))}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-900">
                          {formatNumber(row.remaining)}
                        </td>
                      </tr>
                    ))}
                    <tr
                      style={{
                        borderTop: "3px solid #004526",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                      <td className="px-4 py-3 font-bold text-gray-900">
                        Jami
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">
                        {formatNumber(Number(creditAmount))}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">
                        {formatNumber(
                          Math.round(
                            paymentSchedule.reduce(
                              (sum, row) => sum + row.interest,
                              0
                            )
                          )
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">
                        {formatNumber(
                          Math.round(
                            paymentSchedule.reduce(
                              (sum, row) => sum + row.payment,
                              0
                            )
                          )
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">
                        0
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                <strong>Jami summasi:</strong>{" "}
                {formatNumber(
                  Math.round(paymentSchedule.reduce((sum, row) => sum + row.payment, 0))
                )}{" "}
                UZS
              </p>
            </div>
          )}
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
