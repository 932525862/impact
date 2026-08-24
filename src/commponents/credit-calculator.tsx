"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Check, ArrowRight, Info, Download, Calculator, PieChart } from "lucide-react";

export default function CreditCalculator() {
  const { t } = useTranslation();
  const tableRef = useRef<HTMLDivElement>(null);

  const loanProducts = [
    { key: "biznes", name: "Mikrokredit Biznes (42%)", rate: 42, defaultAmount: 32500000, defaultTerm: 9 },
    { key: "biznesPlus", name: "Mikrokredit Biznes+ (46%)", rate: 46, defaultAmount: 30000000, defaultTerm: 12 },
    { key: "oson", name: "Mikrokredit Oson (49%)", rate: 49, defaultAmount: 15000000, defaultTerm: 12 },
    { key: "ishonch", name: "Mikrozaym Ishonch (59%)", rate: 59, defaultAmount: 10000000, defaultTerm: 6 },
  ];

  const [selectedProduct, setSelectedProduct] = useState<string>("biznes");
  const [creditAmount, setCreditAmount] = useState<string>("32500000");
  const [creditTerm, setCreditTerm] = useState<string>("9");
  const [interestRate, setInterestRate] = useState<string>("42");

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showSchedule, setShowSchedule] = useState(false);

  const [paymentSchedule, setPaymentSchedule] = useState<Array<{
    month: number;
    principal: number;
    interest: number;
    payment: number;
    remaining: number;
  }> | null>(null);

  const handleProductChange = (prodKey: string) => {
    setSelectedProduct(prodKey);
    const prod = loanProducts.find((p) => p.key === prodKey);
    if (prod) {
      setInterestRate(prod.rate.toString());
    }
  };

  useEffect(() => {
    if (
      interestRate &&
      !isNaN(Number(interestRate)) &&
      creditAmount &&
      creditTerm &&
      Number(creditAmount) > 0 &&
      Number(creditTerm) > 0
    ) {
      const principal = Number(creditAmount);
      const annualRate = Number(interestRate) / 100;
      const monthlyRate = annualRate / 12;
      const n = Number(creditTerm);

      if (monthlyRate > 0) {
        const annuity = principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -n)));
        setMonthlyPayment(annuity);

        const schedule = [];
        let remainingBalance = principal;
        let accumulatedInterest = 0;

        for (let i = 1; i <= n; i++) {
          const interestPayment = remainingBalance * monthlyRate;
          const principalPayment = annuity - interestPayment;
          remainingBalance -= principalPayment;
          accumulatedInterest += interestPayment;

          schedule.push({
            month: i,
            principal: Math.round(principalPayment),
            interest: Math.round(interestPayment),
            payment: Math.round(annuity),
            remaining: Math.max(0, Math.round(remainingBalance)),
          });
        }

        setPaymentSchedule(schedule);
        setTotalInterest(accumulatedInterest);
        setTotalAmount(principal + accumulatedInterest);
      } else {
        const monthlyPay = principal / n;
        setMonthlyPayment(monthlyPay);

        const schedule = [];
        for (let i = 1; i <= n; i++) {
          schedule.push({
            month: i,
            principal: Math.round(principal / n),
            interest: 0,
            payment: Math.round(monthlyPay),
            remaining: Math.max(0, Math.round(principal - (principal / n) * i)),
          });
        }

        setPaymentSchedule(schedule);
        setTotalInterest(0);
        setTotalAmount(principal);
      }
    } else {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalAmount(0);
      setPaymentSchedule(null);
    }
  }, [creditAmount, creditTerm, interestRate]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("uz-UZ").format(Math.round(num));
  };

  const formatWithSpaces = (value: string) => {
    if (!value) return "";
    const digits = value.replace(/^0+(?=\d)/, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const downloadPDF = async () => {
    if (!paymentSchedule) return;

    try {
      const element = document.createElement("div");
      element.style.width = "210mm";
      element.style.padding = "15mm";
      element.style.fontFamily = "Calibri, Arial, sans-serif";
      element.style.backgroundColor = "white";
      element.style.color = "#000";
      element.style.lineHeight = "1.4";

      const logoDiv = document.createElement("div");
      logoDiv.style.marginBottom = "10pt";

      const logoImg = document.createElement("img");
      logoImg.src = "/logo2.png";
      logoImg.style.height = "15mm";
      logoImg.style.width = "auto";

      logoDiv.appendChild(logoImg);
      element.appendChild(logoDiv);

      const title = document.createElement("h1");
      title.textContent = t("calculator.pdfTitle");
      title.style.fontSize = "16pt";
      title.style.textAlign = "center";
      title.style.marginBottom = "12pt";
      title.style.color = "#004526";
      title.style.fontWeight = "bold";
      element.appendChild(title);

      const infoDiv = document.createElement("div");
      infoDiv.style.fontSize = "10pt";
      infoDiv.style.marginBottom = "10pt";
      const infos = [
        `Kredit summasi: ${Number(creditAmount).toLocaleString()} UZS`,
        `Kredit muddati: ${creditTerm} oy`,
        `Foiz stavkasi: ${interestRate}%`,
        `Oylik to'lov: ${Math.round(monthlyPayment).toLocaleString()} UZS`,
      ];
      infos.forEach((info) => {
        const p = document.createElement("p");
        p.textContent = info;
        p.style.margin = "3pt 0";
        infoDiv.appendChild(p);
      });
      element.appendChild(infoDiv);

      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.style.marginTop = "10pt";
      table.style.fontSize = "9pt";

      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      headerRow.style.borderBottom = "2px solid #004526";
      const headers = ["Oy", "Asosiy qarz", "Foiz", "Oylik to'lov", "Qoldiq"];
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        th.style.padding = "8pt 6pt";
        th.style.textAlign = "center";
        th.style.fontWeight = "bold";
        th.style.borderBottom = "1px solid #004526";
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      for (let i = 0; i < paymentSchedule.length; i++) {
        const r = paymentSchedule[i];
        const row = document.createElement("tr");
        row.style.borderBottom = "1px solid #e0e0e0";
        if (i % 2 === 0) {
          row.style.backgroundColor = "#f9f9f9";
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
          td.style.border = "1px solid #ddd";
          row.appendChild(td);
        });

        tbody.appendChild(row);
      }
      table.appendChild(tbody);

      element.appendChild(table);

      const options = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `impact-kredit-jadvali-${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
      };

      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf().set(options).from(element).save();
    } catch (err) {
      console.error("PDF error:", err);
      alert("PDF yaratishda xatolik yuz berdi");
    }
  };

  const scrollToContact = () => {
    const section = document.getElementById("kontaktlar");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculate percentage ratio for progress bar
  const principalVal = Number(creditAmount) || 1;
  const totalVal = totalAmount || 1;
  const principalPercent = Math.min(100, Math.round((principalVal / totalVal) * 100));
  const interestPercent = 100 - principalPercent;

  return (
    <section id="kalkulyator" className="bg-[#f4f7f5] py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Main White Container matching Screenshot 2 */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200/80 space-y-8">
          {/* Top Selector Label */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t("calculator.selectProductLabel")}
            </label>

            {/* 4 Loan Type Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {loanProducts.map((p) => {
                const isActive = selectedProduct === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => handleProductChange(p.key)}
                    className={`py-3.5 px-4 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center space-x-2 border ${
                      isActive
                        ? "bg-[#00381f] text-white border-[#00381f] shadow-md"
                        : "bg-[#f4f7f5] text-slate-800 border-slate-200/80 hover:bg-slate-100"
                    }`}
                  >
                    {isActive && (
                      <span className="w-4 h-4 rounded-full bg-[#558b2f] text-white flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calculator Controls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sliders Column */}
            <div className="lg:col-span-7 space-y-7">
              {/* Credit Amount Control */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-extrabold text-slate-800">
                    {t("calculator.creditAmount.label")}
                  </label>

                  {/* Value Badge matching Screenshot 2 */}
                  <div className="bg-emerald-50 border border-emerald-200/80 text-[#004526] font-black text-base px-4 py-1.5 rounded-xl flex items-center space-x-1">
                    <span>{formatWithSpaces(creditAmount)}</span>
                    <span className="text-xs font-bold text-emerald-800">so'm</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="1000000"
                  max="100000000"
                  step="1000000"
                  value={creditAmount || "1000000"}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004526]"
                />

                {/* Preset Amount Buttons */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {[10000000, 30000000, 50000000, 100000000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setCreditAmount(amt.toString())}
                      className={`py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                        Number(creditAmount) === amt
                          ? "bg-[#004526] text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {amt / 1000000} mln
                    </button>
                  ))}
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 font-semibold pt-1">
                  <span>1 000 000 so'm</span>
                  <span>50 000 000 so'm</span>
                  <span>100 000 000 so'm</span>
                </div>
              </div>

              {/* Credit Term Control */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-extrabold text-slate-800">
                    {t("calculator.creditTerm.label")}
                  </label>

                  {/* Value Badge matching Screenshot 2 */}
                  <div className="bg-emerald-50 border border-emerald-200/80 text-[#004526] font-black text-base px-4 py-1.5 rounded-xl flex items-center space-x-1">
                    <span>{creditTerm}</span>
                    <span className="text-xs font-bold text-emerald-800">oy</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="3"
                  max="36"
                  step="1"
                  value={creditTerm || "3"}
                  onChange={(e) => setCreditTerm(e.target.value)}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004526]"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>3 oy</span>
                  <span>18 oy</span>
                  <span>36 oy</span>
                </div>
              </div>

              {/* Interest Rate Control */}
              <div className="flex justify-between items-center pt-2">
                <label className="text-sm font-extrabold text-slate-800">
                  {t("calculator.interestRate.label")}
                </label>

                <div className="bg-[#f4f7f5] border border-slate-200 text-slate-800 font-black text-base px-5 py-1.5 rounded-xl flex items-center space-x-1">
                  <span>{interestRate}</span>
                  <span className="text-xs font-bold text-slate-500">%</span>
                </div>
              </div>
            </div>

            {/* Right Summary Card (Dark Green Box matching Screenshot 2) */}
            <div className="lg:col-span-5 bg-[#00381f] rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black tracking-wider text-[#76ff03]">
                    {t("calculator.offer")}
                  </span>
                  <span className="bg-[#004526] text-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-600/40">
                    {t("calculator.annuity")}
                  </span>
                </div>

                {/* Monthly Payment Main Display */}
                <div className="space-y-1">
                  <div className="text-xs text-emerald-200 font-medium">
                    {t("calculator.monthlyPayment")}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {monthlyPayment > 0 ? formatNumber(monthlyPayment) : "0"}{" "}
                    <span className="text-sm font-bold text-emerald-300">so'm</span>
                  </div>
                </div>

                {/* Metrics Breakdown List matching Screenshot 2 */}
                <div className="space-y-2.5 pt-2 text-xs border-t border-emerald-800/60">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200/90">{t("calculator.totalRepayment")}</span>
                    <span className="font-extrabold text-white">{formatNumber(totalAmount)} so'm</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200/90">{t("calculator.totalInterest")}</span>
                    <span className="font-extrabold text-[#76ff03]">+{formatNumber(totalInterest)} so'm</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200/90">{t("calculator.annualRate")}</span>
                    <span className="font-extrabold text-white">{interestRate}%</span>
                  </div>
                </div>

                {/* Progress Ratio Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-emerald-200/80 font-bold">
                    <span>Asosiy qarz: {principalPercent}%</span>
                    <span>Foiz: {interestPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-amber-400 rounded-full overflow-hidden flex">
                    <div style={{ width: `${principalPercent}%` }} className="h-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Action Button matching Screenshot 2 */}
              <div className="space-y-4 pt-2">
                <button
                  onClick={scrollToContact}
                  className="w-full bg-[#4d8628] hover:bg-[#3f701f] text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>{t("calculator.button")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Info Note matching Screenshot 2 */}
                <div className="flex items-start space-x-2 text-[10px] text-emerald-200/80 leading-relaxed pt-1">
                  <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{t("calculator.noteText")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Table Toggle & Download */}
          {paymentSchedule && paymentSchedule.length > 0 && (
            <div className="pt-4 border-t border-slate-200/60">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="text-xs font-extrabold text-[#004526] hover:underline flex items-center space-x-1"
                >
                  <Calculator className="w-4 h-4" />
                  <span>
                    {showSchedule ? "To'lovlar jadvalini yashirish" : "To'lovlar jadvalini ko'rish"}
                  </span>
                </button>

                <button
                  onClick={downloadPDF}
                  className="bg-[#004526] hover:bg-[#00381f] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("calculator.downloadButton")}</span>
                </button>
              </div>

              {showSchedule && (
                <div ref={tableRef} className="mt-4 overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700 border-collapse">
                    <thead className="text-[11px] text-slate-700 uppercase bg-slate-100 font-black border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5">Oy</th>
                        <th className="px-3 py-2.5 text-right">Asosiy qarz</th>
                        <th className="px-3 py-2.5 text-right">Foiz</th>
                        <th className="px-3 py-2.5 text-right">Oylik to'lov</th>
                        <th className="px-3 py-2.5 text-right">Qoldiq</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {paymentSchedule.map((row) => (
                        <tr key={row.month} className="hover:bg-slate-50">
                          <td className="px-3 py-2.5 font-extrabold text-slate-900">{row.month}</td>
                          <td className="px-3 py-2.5 text-right">{formatNumber(row.principal)}</td>
                          <td className="px-3 py-2.5 text-right text-emerald-800">{formatNumber(row.interest)}</td>
                          <td className="px-3 py-2.5 text-right font-extrabold text-[#004526]">
                            {formatNumber(row.payment)}
                          </td>
                          <td className="px-3 py-2.5 text-right text-slate-500">{formatNumber(row.remaining)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
