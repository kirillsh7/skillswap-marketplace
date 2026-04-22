'use client'
import { HeroSection, TopPerformersSection, FeaturesSection } from '@/features'
// import { useTRPC } from '@/lib/trpc/client'
// import { useSuspenseQuery } from '@tanstack/react-query'
export default function Home() {
  // const trpc = useTRPC()
  // const { data, isLoading } = useSuspenseQuery(trpc.hello.queryOptions({ text: 'world' }))
  // if (isLoading) return <div>Loading...</div>
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TopPerformersSection />
    </>
    // <div>{data.greeting}</div>
  )
}
