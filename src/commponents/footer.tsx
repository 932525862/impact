"use client";

import { useState } from "react";
import { Send, Phone, Mail, MapPin, Clock, ShieldCheck, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [toast, setToast] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const botToken = "7802443916:AAGH1E-yusLQvkMmfHhqA9po0ibMp8Xvssg";
    const chatId = "-1003050519990";
    const text = `📩 Yangi online murojaat:\n\n👤 Ism: ${form.name}\n📞 Tel: +998${form.phone}\n💬 Izoh: ${form.message}`;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      });

      setForm({ name: "", phone: "", message: "" });
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (error) {
      console.error("Xabar yuborilmadi:", error);
    }
  };

  const faqs = [
    {
      q: "Kredit olish uchun qanday hujjatlar talab qilinadi?",
      a: "Shaxsni tasdiqlovchi hujjat (Pasport/ID karta), biznes egalari uchun tadbirkorlik guvohnomasi hamda daromadni tasdiqlovchi hujjatlar talab etiladi.",
    },
    {
      q: "Ariza qancha vaqt ichida ko'rib chiqiladi?",
      a: "Hujjatlar to'liq topshirilgandan so'ng ariza 15 daqiqadan 24 soatgacha bo'lgan muddatda ko'rib chiqiladi.",
    },
    {
      q: "Kreditni muddatidan oldin yopish mumkinmi?",
      a: "Ha, kreditni istalgan vaqtda muddatidan oldin hech qanday qo'shimcha jadrimasiz yopishingiz mumkin.",
    },
  ];

  return (
    <footer id="kontaktlar" className="bg-[#00381f] text-white font-sans relative overflow-hidden">
      {/* FAQ Accordion Bar */}
      <div className="bg-[#002c19] border-b border-emerald-800/60 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 bg-emerald-900/80 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>SAVOL VA JAVOBLAR</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Ko'p beriladigan savollar
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#00381f] border border-emerald-800/60 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-white flex justify-between items-center hover:text-emerald-300"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-emerald-100/90 leading-relaxed border-t border-emerald-900/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold text-white">{t("contact.title")}</h2>
              <p className="text-emerald-200/90 text-sm leading-relaxed">
                {t("contact.subtitle")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-900/80 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-emerald-300 font-bold block">{t("contact.phone_label")}</span>
                  <a
                    href="tel:+998555150111"
                    className="text-2xl font-black text-white hover:text-emerald-300 transition-colors"
                  >
                    +998 (55) 515-01-11
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-900/80 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-emerald-300 font-bold block">Bosh Ofis Manzili:</span>
                  <p className="text-sm font-semibold text-emerald-100">{t("contact.address")}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-900/80 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-emerald-300 font-bold block">Ish vaqti & Email:</span>
                  <p className="text-sm font-semibold text-emerald-100">Dushanba - Shanba: 09:00 - 18:00</p>
                  <p className="text-xs text-emerald-300">{t("contact.email")}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <span className="text-xs text-emerald-200 font-bold">Telegram bot / kanal:</span>
              <a
                href="https://t.me/impactfinance_uz"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-[#00381f] flex items-center justify-center transition-all shadow-md"
              >
                <FaTelegramPlane className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-[#002c19] border border-emerald-800/80 rounded-3xl p-8 shadow-2xl space-y-6">
            <h3 className="text-xl font-extrabold text-white">{t("contact.form.title")}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder={t("contact.form.name_placeholder")}
                  className="w-full bg-[#00381f] border border-emerald-700/60 rounded-2xl px-4 py-3 text-white placeholder-emerald-400/60 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center bg-[#00381f] border border-emerald-700/60 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-400">
                <span className="text-sm font-bold text-emerald-300 mr-2">+998</span>
                <input
                  type="tel"
                  placeholder={t("contact.form.phone_placeholder")}
                  className="w-full bg-transparent text-white placeholder-emerald-400/60 text-sm focus:outline-none"
                  value={form.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 9) {
                      setForm({ ...form, phone: val });
                    }
                  }}
                  required
                />
              </div>

              <div>
                <textarea
                  placeholder={t("contact.form.message_placeholder")}
                  rows={3}
                  className="w-full bg-[#00381f] border border-emerald-700/60 rounded-2xl px-4 py-3 text-white placeholder-emerald-400/60 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#00381f] font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{t("contact.form.button")}</span>
              </button>

              <p className="text-[11px] text-emerald-300/80 text-center">
                {t("contact.form.consent")}
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-emerald-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Markaziy Bank Litsenziyasi b-n xizmat ko'rsatiladi</span>
          </div>

          <p>© {new Date().getFullYear()} IMPACT FINANCE. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 bg-emerald-500 text-[#00381f] font-bold px-6 py-3.5 rounded-2xl shadow-2xl z-50 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5" />
          <span>{t("contact.toast")}</span>
        </div>
      )}
    </footer>
  );
}
