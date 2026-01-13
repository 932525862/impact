"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../public/logo2.png";
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
            remaining:
              Math.round((principal - (principal / n) * i) * 100) / 100,
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
    if (!paymentSchedule) return;

    try {
      // Create PDF container with proper styling for text preservation
      const element = document.createElement("div");
      element.style.width = "210mm";
      element.style.padding = "15mm";
      element.style.fontFamily = "Calibri, sans-serif";
      element.style.backgroundColor = "white";
      element.style.color = "#000";
      element.style.lineHeight = "1.4";

      const logoDiv = document.createElement("div");
      logoDiv.style.marginBottom = "10pt";

      const logoImg = document.createElement("img");
      logoImg.src = "/logo2.png";
      logoImg.style.height = "15mm";
      logoImg.style.width = "auto";

      // MARKAZGA OLISH
      // logoImg.style.display = "block";
      // logoImg.style.marginLeft = "auto";
      // logoImg.style.marginRight = "auto";

      logoDiv.appendChild(logoImg);
      element.appendChild(logoDiv);

      // Title
      const title = document.createElement("h1");
      title.textContent = t("calculator.pdfTitle");
      title.style.fontSize = "16pt";
      title.style.textAlign = "center";
      title.style.marginBottom = "12pt";
      title.style.color = "#004526";
      title.style.fontWeight = "bold";
      element.appendChild(title);

      // Info section
      const infoDiv = document.createElement("div");
      infoDiv.style.fontSize = "10pt";
      infoDiv.style.marginBottom = "10pt";
      const infos = [
        `${t("calculator.creditAmountPdf")}: ${Number(
          creditAmount
        ).toLocaleString()} UZS`,
        `${t("calculator.creditTermPdf")}: ${creditTerm} ${t(
          "calculator.table.month"
        )}`,
        `${t("calculator.interestRatePdf")}: ${interestRate}%`,
        `${t("calculator.monthlyPaymentPdf")}: ${Math.round(
          monthlyPayment
        ).toLocaleString()} UZS`,
      ];
      infos.forEach((info) => {
        const p = document.createElement("p");
        p.textContent = info;
        p.style.margin = "3pt 0";
        infoDiv.appendChild(p);
      });
      element.appendChild(infoDiv);

      // Table
      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.style.marginTop = "10pt";
      table.style.fontSize = "9pt";

      // Headers
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      headerRow.style.borderBottom = "2px solid #004526";
      const headers = [
        t("calculator.table.month"),
        t("calculator.table.principal"),
        t("calculator.table.interest"),
        t("calculator.table.payment"),
        t("calculator.table.remaining"),
      ];
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        th.style.padding = "8pt 6pt";
        th.style.textAlign = "center";
        th.style.verticalAlign = "middle";
        th.style.fontWeight = "bold";
        th.style.borderBottom = "1px solid #004526";
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Data rows
      const tbody = document.createElement("tbody");
      for (let i = 0; i < paymentSchedule.length; i++) {
        const r = paymentSchedule[i];
        const row = document.createElement("tr");
        row.style.borderBottom = "1px solid #e0e0e0";
        if (i % 2 === 0) {
          row.style.backgroundColor = "#f5f5f5";
        }

        const vals = [
          r.month.toString(),
          Math.round(r.principal).toLocaleString(),
          Math.round(r.interest).toLocaleString(),
          Math.round(r.payment).toLocaleString(),
          Math.round(r.remaining).toLocaleString(),
        ];

        vals.forEach((val) => {
          const td = document.createElement("td");
          td.textContent = val;
          td.style.padding = "8pt 6pt";
          td.style.textAlign = "center";
          td.style.verticalAlign = "middle";
          td.style.border = "1px solid #ddd";
          row.appendChild(td);
        });

        tbody.appendChild(row);
      }
      table.appendChild(tbody);

      // Totals row
      const totalRow = document.createElement("tr");
      totalRow.style.backgroundColor = "#f0f0f0";
      totalRow.style.fontWeight = "bold";
      totalRow.style.borderTop = "2px solid #004526";

      const totalInt = Math.round(
        paymentSchedule.reduce((s, r) => s + r.interest, 0)
      );
      const totalPay = Math.round(
        paymentSchedule.reduce((s, r) => s + r.payment, 0)
      );
      const totals = [
        t("calculator.total"),
        Number(creditAmount).toLocaleString(),
        totalInt.toLocaleString(),
        totalPay.toLocaleString(),
        "0",
      ];

      totals.forEach((val) => {
        const td = document.createElement("td");
        td.textContent = val;
        td.style.padding = "8pt 6pt";
        td.style.textAlign = "center";
        td.style.verticalAlign = "middle";
        td.style.border = "1px solid #ddd";
        totalRow.appendChild(td);
      });

      tbody.appendChild(totalRow);
      element.appendChild(table);

      // Summary
      const summary = document.createElement("p");
      summary.textContent = `${t(
        "calculator.totalAmount"
      )}: ${totalPay.toLocaleString()} UZS`;
      summary.style.marginTop = "12pt";
      summary.style.fontSize = "10pt";
      summary.style.fontWeight = "bold";
      element.appendChild(summary);

      // Generate PDF with options to preserve text as text (not image)
      const options = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `kredit-jadavali-${new Date()
          .toISOString()
          .slice(0, 10)}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
      };

      // Dynamic import to avoid SSR issues with html2pdf
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf().set(options).from(element).save();
    } catch (err) {
      console.error("PDF error:", err);
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
                <p className="text-gray-600 mb-2">
                  {t("calculator.monthlyPayment")}
                </p>
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
                <p className="text-gray-900 font-bold">
                  {t("calculator.phone")}
                </p>
              </div>
            </div>
          </div>

          {/* To'lovlar jadvalini ko'rsatish */}
          {paymentSchedule && paymentSchedule.length > 0 && (
            <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {t("calculator.paymentSchedule")}
                </h3>
                <button
                  onClick={() => downloadPDF()}
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
                  {t("calculator.downloadButton")}
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
                        {t("calculator.table.month")}
                      </th>
                      <th className="px-4 py-3 text-right font-bold text-gray-900">
                        {t("calculator.table.principal")}
                      </th>
                      <th className="px-4 py-3 text-right font-bold text-gray-900">
                        {t("calculator.table.interest")}
                      </th>
                      <th className="px-4 py-3 text-right font-bold text-gray-900">
                        {t("calculator.table.payment")}
                      </th>
                      <th className="px-4 py-3 text-right font-bold text-gray-900">
                        {t("calculator.table.remaining")}
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
                        {t("calculator.total")}
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
                <strong>{t("calculator.totalAmount")}:</strong>{" "}
                {formatNumber(
                  Math.round(
                    paymentSchedule.reduce((sum, row) => sum + row.payment, 0)
                  )
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
