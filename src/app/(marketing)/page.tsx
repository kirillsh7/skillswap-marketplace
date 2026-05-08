import { HeroSection, TopPerformersSection, FeaturesSection } from '@/features'
import { Metadata } from 'next'
import { SITE_NAME } from '@/shared'
export const metadata: Metadata = {
  title: `${SITE_NAME} - Как это работает `,
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
