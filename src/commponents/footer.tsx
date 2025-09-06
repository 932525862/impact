"use client";

import { useState } from "react";
import { Send } from "lucide-react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const botToken = "7802443916:AAGH1E-yusLQvkMmfHhqA9po0ibMp8Xvssg";
    const chatId = "-1003050519990";
    const text = `📩 Yangi murojaat:\n\n👤 Ism: ${form.name}\n📞 Tel: +998${form.phone}\n💬 Xabar: ${form.message}`;

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

  return (
    <div
      id="kontaktlar"
      className="bg-[#578f27] text-white py-16 px-6 md:px-12 relative"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Chap qism */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{t("contact.title")}</h2>
          <p className="mb-6 text-lg text-white/90">
            {t("contact.subtitle")}
          </p>

          <div className="mb-6">
            <p className="text-lg font-semibold">{t("contact.phone_label")}</p>
            <p className="text-2xl font-bold mt-2">
              <a href="tel:+998555150111">+998 (55) 515-01-11</a>
            </p>
          </div>

          <div className="mb-6 space-y-2">
            <p>{t("contact.email")}</p>
            <p>{t("contact.address")}</p>
          </div>

          {/* Telegram */}
          <div className="mt-6">
            <a
              href="#"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#578f27] hover:scale-110 transition"
            >
              <FaTelegramPlane size={24} />
            </a>
          </div>
        </div>

        {/* Form */}
        <div>
          <h3 className="text-xl font-semibold mb-6">
            {t("contact.form.title")}
          </h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={t("contact.form.name_placeholder")}
              className="w-full bg-transparent border-b border-white placeholder-white text-white px-0 py-2 focus:outline-none focus:border-white"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

<div className="flex items-center gap-2 border-b border-white py-2">
  <span className="text-white">+998</span>
  <input
    type="tel"
    placeholder={t("contact.form.phone_placeholder")}
    className="w-full bg-transparent placeholder-white text-white focus:outline-none"
    value={form.phone}
    onChange={(e) => {
      // faqat raqamlarni qabul qilish va 9 ta bilan cheklash
      const value = e.target.value.replace(/\D/g, ""); // raqam bo'lmaganlarni o'chirish
      if (value.length <= 9) {
        setForm({ ...form, phone: value });
      }
    }}
    required
  />
</div>

            <textarea
              placeholder={t("contact.form.message_placeholder")}
              className="w-full bg-transparent border-b border-white placeholder-white text-white px-0 py-2 focus:outline-none focus:border-white"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-white text-[#578f27] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition w-full md:w-auto"
            >
              <Send size={18} /> {t("contact.form.button")}
            </button>

            <p className="text-sm text-white/80 mt-4">
              {t("contact.form.consent")}
            </p>
          </form>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-50">
          {t("contact.toast")}
        </div>
      )}
    </div>
  );
}
