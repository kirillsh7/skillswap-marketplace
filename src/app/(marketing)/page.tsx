import { HeroSection, TopPerformersSection, FeaturesSection } from '@/features'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Импульс рынка - Главная ',
}
export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TopPerformersSection />
    </>
  )
}
