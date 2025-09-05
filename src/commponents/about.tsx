"use client"

import React from "react"
import { useTranslation } from "react-i18next"

export default function AboutUs() {
  const { t } = useTranslation()

  return (
    <section className="bg-white text-black py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#578f27]">
          {t("about.heading")}
        </h2>

        {/* Intro */}
        <p
          className="text-lg leading-relaxed mb-8"
          dangerouslySetInnerHTML={{ __html: t("about.intro1") }}
        />
        <p
          className="text-lg leading-relaxed mb-10"
          dangerouslySetInnerHTML={{ __html: t("about.intro2") }}
        />

        {/* Values */}
        <h3 className="text-2xl font-semibold mb-4 text-[#578f27]">
          {t("about.valuesHeading")}
        </h3>
        <ul className="space-y-3 mb-10">
          {["trust", "transparency", "sustainability", "collaboration"].map((key) => (
            <li key={key} className="flex items-start">
              <span className="text-[#578f27] font-bold mr-2">•</span>
              <span dangerouslySetInnerHTML={{ __html: t(`about.values.${key}`) }} />
            </li>
          ))}
        </ul>

        {/* Closing */}
        <p
          className="text-lg italic font-medium text-gray-800"
          dangerouslySetInnerHTML={{ __html: t("about.closing") }}
        />
      </div>
    </section>
  )
}
