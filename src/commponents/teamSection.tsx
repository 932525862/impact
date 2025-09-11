"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function WeAreLookingFor() {
  const items = [
    {
      img: "/bank.jpeg",
      title: "Avazbekov Maqsadbek",
      text: "Biz birgalikda ishlaymiz, bir-birimizi qo‘llab-quvvatlaymiz va umumiy maqsadlar sari intilamiz. Birgalikda kuchliroqmiz!",
    },
    {
      img: "/bank.jpeg",
      title: "Avazbekov Maqsadbek",
      text: "Biz dadil qarorlar va nostandart g‘oyalarni qadrlaymiz. Har bir xodim kompaniya rivojiga hissa qo‘shishi mumkin",
    },
    {
      img: "/bank.jpeg",
      title:"Avazbekov Maqsadbek",
      text: "Biz doimo rivojlanmoqdamiz va yangi narsalarni o‘rganamiz. O‘zimizga va imkoniyatlarimizga ishonamiz",
    },
    {
      img: "/bank.jpeg",
      title: "Avazbekov Maqsadbek",
      text: "Bevosita muloqot, halollik va ishonch jamoamizning asosidir. Biz har qanday g‘oyani tinglashga, eshitishga va muhokama qilishga tayyormiz.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl text-[#004526] font-bold text-center mb-12">
        Boshqaruv va direktorlar kengashi
        </h2>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="relative   w-full h-68">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 text-[#004526]">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="sm:hidden">
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {items.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="relative w-full h-48">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
