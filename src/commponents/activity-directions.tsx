"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function ActivityDirections() {
  const activities = [
    {
      title: "Mikrokredit Biznes",
      image: "/mikro1.jpeg",
      details: {
        mijoz: [
          "Yuridik shaxslar",
          "Yakka tartibdagi tadbirkorlar",
          "O‘zini o‘zi band qilganlar",
        ],
        foiz: "42 %",
        muddat: "3 oydan 36 oygacha",
        tolov: "Oylik, annuitet to‘lovlar orqali",
        garov: ["Avtotransport", "Ko‘chmas mulk"],
        talablar: [
          "O‘zbekiston rezidenti bo‘lishi",
          "Biznes egasining yoshi 20 dan 60 yoshgacha",
          "Biznesda kamida 6 oylik tajriba",
          "So‘nggi 1 yilda 30 kundan ortiq qarzdorlik bo‘lmasligi",
          "Foydali biznes ko‘rsatkichlari",
          "Biznes qonun hujjatlariga va/yoki IMPACT FINANCE LEADERS ichki qoidalariga zid bo‘lmasligi",
        ],
      },
    },
    {
      title: "Mikrokredit Biznes+",
      image: "/mikro2.jpeg",
      details: {
        mijoz: [
          "Yuridik shaxslar",
          "Yakka tartibdagi tadbirkorlar",
          "O‘zini o‘zi band qilganlar",
        ],
        foiz: "46 %",
        muddat: "3 oydan 36 oygacha",
        tolov: "Oylik, annuitet to‘lovlar orqali",
        garov: ["Kafillik"],
        talablar: [
          "O‘zbekiston rezidenti bo‘lishi",
          "Biznes egasining yoshi 20 dan 60 yoshgacha",
          "Biznesda kamida 6 oylik tajriba",
          "So‘nggi 1 yilda 30 kundan ortiq qarzdorlik bo‘lmasligi",
          "Foydali biznes ko‘rsatkichlari",
          "Biznes qonun hujjatlariga va/yoki IMPACT FINANCE LEADERS ichki qoidalariga zid bo‘lmasligi",
        ],
      },
    },
    {
      title: "Mikrokredit Oson",
      image: "/mikro3.jpeg",
      details: {
        mijoz: ["Jismoniy shaxslar"],
        foiz: "49 %",
        muddat: "3 oydan 36 oygacha",
        tolov: "Oylik, annuitet to‘lovlar orqali",
        garov: ["Avtotransport", "Ko‘chmas mulk"],
        talablar: [
          "O‘zbekiston rezidenti bo‘lishi",
          "Yoshi 20 dan 60 yoshgacha",
          "Kredit reytingi C va undan yuqori bo‘lishi",
          "Joriy qarzdorlik bo‘lmasligi",
          "Mijoz yoki kafili Toshkent shahri (viloyati bilan birga)da ro‘yxatdan o‘tgan bo‘lishi",
          "Daromad qonun hujjatlariga va/yoki IMPACT FINANCE LEADERS ichki qoidalariga zid bo‘lmasligi",
        ],
      },
    },
    {
      title: "Mikrozaym Ishonch",
      image: "/mikro4.jpeg",
      details: {
        mijoz: ["Jismoniy shaxslar", "O‘zini o‘zi band qilganlar"],
        foiz: "59 %",
        muddat: "3 oydan 18 oygacha",
        tolov: "Oylik, annuitet to‘lovlar orqali",
        garov: ["Kafillik"],
        talablar: [
          "O‘zbekiston rezidenti bo‘lishi",
          "Yoshi 20 dan 60 yoshgacha",
          "Mijozning yozma daromad arizasi",
          "Kredit byurosidagi reytingi C va undan yuqori bo‘lishi",
          "Joriy qarzdorlik bo‘lmasligi",
          "Mijoz yoki kafili Toshkent shahri (viloyati bilan birga)da ro‘yxatdan o‘tgan bo‘lishi",
          "Daromad qonun hujjatlariga va/yoki IMPACT FINANCE LEADERS ichki qoidalariga zid bo‘lmasligi",
        ],
      },
    },
  ];

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="xizmatlar" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Faoliyat <span style={{ color: "#578f27" }}>yo\nalishlari</span>
          </h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: "#578f27" }}
          ></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="relative group cursor-pointer rounded-2xl overflow-hidden h-80 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${activity.image})` }}
              ></div>

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(87,143,39,0.9) 30%, rgba(87,143,39,0.1) 100%)",
                }}
              ></div>

              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <h3 className="text-white font-bold text-xl leading-tight pb-2 border-b border-white/70 mb-4">
                  {activity.title}
                </h3>

                <button
                  onClick={() => setSelected(index)}
                  className="self-start bg-white text-[#578f27] font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
                >
                  Batafsil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected !== null && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setSelected(null)}
            >
              <X size={24} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#578f27] mb-4">
                {activities[selected].title}
              </h2>

              <p className="mb-2 text-gray-800">
                <span className="font-semibold text-black">Mijoz turi:</span>{" "}
                {activities[selected].details.mijoz.join(", ")}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold text-black">
                  Yillik foiz stavkasi:
                </span>{" "}
                {activities[selected].details.foiz}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold text-black">
                  Kreditning maksimal muddati:
                </span>{" "}
                {activities[selected].details.muddat}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold text-black">
                  To‘lash shartlari:
                </span>{" "}
                {activities[selected].details.tolov}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold text-black">
                  Garov ta’minoti:
                </span>{" "}
                {activities[selected].details.garov.join(", ")}
              </p>

              <h3 className="font-semibold text-lg mt-4 mb-2 text-[#578f27]">
                Asosiy talablar:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                {activities[selected].details.talablar.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
