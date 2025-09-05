import { Navbar } from "../commponents/navbar"
import { HeroCarousel } from "../commponents/hero-carousel"
import { ServiceCards } from "../commponents/service-cards"
import CreditCalculator from "../commponents/credit-calculator"
import ActivityDirections from "../commponents/activity-directions"
import Footer from "../commponents/footer"
import About from "../commponents/about"
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroCarousel />
      <About />
      <ServiceCards />
      <CreditCalculator />
      <ActivityDirections />
      <Footer/>
    </main>
  )
}
