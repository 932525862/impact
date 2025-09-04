import { Navbar } from "../commponents/navbar"
import { HeroCarousel } from "../commponents/hero-carousel"
import { ServiceCards } from "../commponents/service-cards"
import CreditCalculator from "../commponents/credit-calculator"
import ActivityDirections from "../commponents/activity-directions"
import Footer from "../commponents/footer"
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroCarousel />
      <ServiceCards />
      <CreditCalculator />
      <ActivityDirections />
      <Footer/>
    </main>
  )
}
