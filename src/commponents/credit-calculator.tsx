"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import logo from "../../public/logo2.png"
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
      // helper for CSV-like formatting in PDF (commas thousands)
      const fmt = (n: number | string) => {
        const num = typeof n === "number" ? n : Number(n) || 0;
        return new Intl.NumberFormat("en-US").format(Math.round(num));
      };

      // logo fetch helper
      const fetchDataUrl = async (url: string) => {
        try {
          const r = await fetch(url);
          const b = await r.blob();
          return await new Promise<string>((res, rej) => {
            const fr = new FileReader();
            fr.onloadend = () => res(fr.result as string);
            fr.onerror = rej;
            fr.readAsDataURL(b);
          });
        } catch (e) {
          return null;
        }
      };

      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 18;
      let y = margin;

      // centered logo
      const logoPath = "/logo2.png";
      const logoData = await fetchDataUrl(logoPath);
      if (logoData) {
        const logoW = 40; // mm
        const logoX = (pageW - logoW) / 2;
        pdf.addImage(logoData, "PNG", logoX, y, logoW, 0);
        y += 20;
      }

      // Title
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 69, 38);
      pdf.text("Kredit to'lovlari jadavali", pageW / 2, y, { align: "center" });
      y += 10;

      // Info block left aligned
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Kredit miqdori: ${fmt(Number(creditAmount))} UZS`, margin, y);
      y += 6;
      pdf.text(`Kredit muddati: ${creditTerm} oy`, margin, y);
      y += 6;
      pdf.text(`Foiz stavkasi: ${interestRate}%`, margin, y);
      y += 6;
      pdf.text(`Oylik to'lov: ${fmt(Math.round(monthlyPayment))} UZS`, margin, y);
      y += 10;

      // (Removed top green rule to match requested design)

      // table columns (precise proportional widths)
      const usable = pageW - margin * 2;
      const colPerc = [0.08, 0.36, 0.16, 0.2, 0.2];
      const colW = colPerc.map((p) => usable * p);
      const rowH = 12; // increased for better spacing

      // headers
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      let x = margin;
      const headers = ["Oy", "Asosiy qarz", "Foiz", "Oylik to'lov", "Qolgan qarz"];
      const headerTextY = y + rowH / 2 + 2;
      for (let i = 0; i < headers.length; i++) {
        // center headers above their columns
        const hx = margin + colW.slice(0, i).reduce((s, v) => s + v, 0) + colW[i] / 2;
        pdf.text(headers[i], hx, headerTextY, { align: "center" });
      }
      y += rowH;

      // thin green line under header (reduced thickness)
      pdf.setDrawColor(0, 69, 38);
      pdf.setLineWidth(0.8);
      pdf.line(margin, y - 2, pageW - margin, y - 2);

      // rows
      pdf.setFont("helvetica", "normal");
      // helpers for formatting with decimals
      const fmtDecimal = (value: number, digits = 0) => {
        return new Intl.NumberFormat("en-US", {
          minimumFractionDigits: digits,
          maximumFractionDigits: digits,
        }).format(value);
      };

      for (let i = 0; i < paymentSchedule.length; i++) {
        const r = paymentSchedule[i];
        if (y + rowH + 30 > pageH) {
          pdf.addPage();
          y = margin;
        }

        // alternating background
        if (i % 2 === 1) {
          x = margin;
          pdf.setFillColor(249, 250, 251);
          for (let c = 0; c < colW.length; c++) {
            pdf.rect(x, y, colW[c], rowH, "F");
            x += colW[c];
          }
        }

        // values
        x = margin;
        const vals = [
          r.month.toString(),
          fmtDecimal(r.principal, 0),
          fmtDecimal(r.interest, 0),
          fmtDecimal(r.payment, 0),
          // remaining keep two decimals if fractional
          fmtDecimal(r.remaining, r.remaining % 1 === 0 ? 0 : 2),
        ];
        const textY = y + rowH / 2 + 3; // adjusted vertical centering

        for (let c = 0; c < vals.length; c++) {
          const isLeft = c === 0;
          // make monthly payment column bold
          if (c === 3) pdf.setFont("helvetica", "bold"); else pdf.setFont("helvetica", "normal");
          if (isLeft) {
            const tx = x + 6; // small left padding
            pdf.text(vals[c], tx, textY, { align: "left" });
          } else {
            // center numeric columns under header
            const tx = x + colW[c] / 2;
            pdf.text(vals[c], tx, textY, { align: "center" });
          }
          x += colW[c];
        }

        // separator
        pdf.setDrawColor(229, 231, 235);
        pdf.setLineWidth(0.4);
        pdf.line(margin, y + rowH, pageW - margin, y + rowH);
        y += rowH;
      }

      // totals row with background and top green border
      if (y + rowH + 24 > pageH) {
        pdf.addPage();
        y = margin;
      }

      pdf.setDrawColor(0, 69, 38);
      pdf.setLineWidth(1.6);
      pdf.line(margin, y + 2, pageW - margin, y + 2);

      pdf.setFillColor(243, 244, 246);
      x = margin;
      for (let i = 0; i < colW.length; i++) {
        pdf.rect(x, y, colW[i], rowH, "F");
        x += colW[i];
      }

      pdf.setFont("helvetica", "bold");
      const totalInt = Math.round(paymentSchedule.reduce((s, rr) => s + rr.interest, 0));
      const totalPay = Math.round(paymentSchedule.reduce((s, rr) => s + rr.payment, 0));
      const totals = ["Jami", fmt(Number(creditAmount)), fmt(totalInt), fmt(totalPay), "0"];
      x = margin;
      for (let c = 0; c < totals.length; c++) {
        const isLeft = c === 0;
        if (isLeft) {
          const tx = x + 6;
          pdf.text(totals[c], tx, y + rowH - 3, { align: "left" });
        } else {
          const tx = x + colW[c] / 2;
          pdf.text(totals[c], tx, y + rowH - 3, { align: "center" });
        }
        x += colW[c];
      }

      y += rowH + 8;
      // bottom small summary
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(`Jami summasi: ${fmt(totalPay)} UZS`, margin, y);

      pdf.save(`kredit-jadavali-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error("PDF yaratishda xato:", err);
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
                  {/* {t("calculator.paymentSchedule") || "To'lovlar jadvalini"}
                   */}
                   Kredit to'lovlari jadavali
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
