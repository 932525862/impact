// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  return (
    <div id="kontaktlar" className="bg-[#578f27] text-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Chap qism */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Kontaktlar</h2>
          <p className="mb-6 text-lg text-white/90">
            Agar sizda biron bir savol yoki istak paydo bo‘lsa, iltimos, biz
            bilan bog‘laning
          </p>

          <div className="mb-6">
            <p className="text-lg font-semibold">Telefon raqami:</p>
            <p className="text-2xl font-bold mt-2"><a href="tel:+998555150111"> +998 (55) 515-01-11</a></p>
            <p className="text-2xl font-bold"><a href="tel:+998555150111"> +998 (55) 515-01-11</a></p>
          </div>

          <div className="mb-6 space-y-2">
            <p>impactfinanceleaders@gmail.com</p>
            <p>
               Toshkent sh., Uchtepa tumani, Kichik halqa yo‘li ko‘chasi, 6a
            </p>
          </div>

          {/* Faqat Telegram */}
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
            Shikoyat va takliflar bilan bog‘liq izohlarni qoldirish shakli
          </h3>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Ismingiz"
              className="w-full bg-transparent border-b border-white placeholder-white text-white px-0 py-2 focus:outline-none focus:border-white"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <div className="flex items-center gap-2 border-b border-white py-2">
              <span className="text-white">+998</span>
              <input
                type="tel"
                placeholder="Telefoningiz"
                className="w-full bg-transparent placeholder-white text-white focus:outline-none"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <textarea
              placeholder="Izoh"
              className="w-full bg-transparent border-b border-white placeholder-white text-white px-0 py-2 focus:outline-none focus:border-white"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-white text-[#578f27] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition w-full md:w-auto"
            >
              <Send size={18} /> Yuborish
            </button>

            <p className="text-sm text-white/80 mt-4">
              Ushbu shaklni yuborish orqali siz shaxsiy ma’lumotlarni qayta
              ishlashga rozilik bildirasiz.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
