"use client"

import { useState } from "react"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import Image from "next/image"
import Logo from "../../public/75094793.svg"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("UZ")

  const toggleMenu = () => setIsOpen(!isOpen)

  const changeLanguage = (lang: string) => {
    setCurrentLang(lang)
    setLangOpen(false)
  }

  // 🔥 Scroll function
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsOpen(false) // mobil menyu yopilsin
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src={Logo} alt="Company Logo" width={190} height={40} priority />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-1">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-[#578f27] px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg hover:bg-gray-50"
              >
                Bosh sahifa
              </button>

              <button
                onClick={() => scrollToSection("afzalliklarimiz")}
                className="text-gray-700 hover:text-[#578f27] px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg hover:bg-gray-50"
              >
                Afzalliklarimiz
              </button>

              <button
                onClick={() => scrollToSection("xizmatlar")}
                className="text-gray-700 hover:text-[#578f27] px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg hover:bg-gray-50"
              >
                Xizmatlar
              </button>

              <button
                onClick={() => scrollToSection("kalkulyator")}
                className="text-gray-700 hover:text-[#578f27] px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg hover:bg-gray-50"
              >
                Kalkulyator
              </button>

              <button
                onClick={() => scrollToSection("kontaktlar")}
                className="text-gray-700 hover:text-[#578f27] px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg hover:bg-gray-50"
              >
                Kontaktlar
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">+998 (55) 520-50-00</div>
                <div className="text-sm text-gray-600">+998 (55) 516-50-00</div>
              </div>
              <div className="w-10 h-10 bg-[#578f27]/10 rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-[#578f27]" />
              </div>
            </div>

            <div className="h-8 w-px bg-gray-300" />

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-1 text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
              >
                <span>{currentLang}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {["UZ", "EN", "RU"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#578f27] transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-6 space-y-1 bg-white border-t border-gray-200">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left text-gray-700 hover:text-[#578f27] hover:bg-gray-50 px-4 py-3 text-base font-semibold rounded-lg transition-colors"
              >
                Bosh sahifa
              </button>
              <button
                onClick={() => scrollToSection("afzalliklarimiz")}
                className="block w-full text-left text-gray-700 hover:text-[#578f27] hover:bg-gray-50 px-4 py-3 text-base font-semibold rounded-lg transition-colors"
              >
                Afzalliklarimiz
              </button>
              <button
                onClick={() => scrollToSection("xizmatlar")}
                className="block w-full text-left text-gray-700 hover:text-[#578f27] hover:bg-gray-50 px-4 py-3 text-base font-semibold rounded-lg transition-colors"
              >
                Xizmatlar
              </button>
              <button
                onClick={() => scrollToSection("kalkulyator")}
                className="block w-full text-left text-gray-700 hover:text-[#578f27] hover:bg-gray-50 px-4 py-3 text-base font-semibold rounded-lg transition-colors"
              >
                Kalkulyator
              </button>
              <button
                onClick={() => scrollToSection("kontaktlar")}
                className="block w-full text-left text-gray-700 hover:text-[#578f27] hover:bg-gray-50 px-4 py-3 text-base font-semibold rounded-lg transition-colors"
              >
                Kontaktlar
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
