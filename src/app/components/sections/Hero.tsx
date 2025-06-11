"use client"
import { Spotlight } from "../ui/Spotlight"
import { cn } from "@/lib/utils"
import { TextGenerateEffect } from "../ui/TextGenerateEffect"
import Link from "next/link"
import MagicButton from "../ui/MagicButton"
import { FaLocationArrow } from "react-icons/fa"
import { useHero } from "@/hooks/use-hero"
import type { HeroContent } from "@/types/portfolio"
import LoadingComponent from "@/components/LoadingComponent"
import TextExplodeIMessage from "@/components/animata/text/text-explode-imessage"
import { OrbitingCircles } from "@/components/magicui/orbiting-circles"
import AnimatedSection from "@/components/animations/AnimatedSection"
import { Code2, Palette, Smartphone, Database, Cpu, Globe, Zap, Shield } from "lucide-react"
import { useEffect, useState } from "react"

interface HeroProps {
  data: HeroContent | null
}

const Hero = ({ data }: HeroProps) => {
  const { loading } = useHero()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!loading && data) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 1000) // 1 second delay for smooth rendering

      return () => clearTimeout(timer)
    }
  }, [loading, data])

  if (loading || !data || !showContent) {
    return (
      <div className="pb-20 pt-36 relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div role="status">
            <LoadingComponent />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-40 relative overflow-hidden h-[90vh]">
      {/* Theater Footlights */}
      <div>
        {/* Center footlight - main white */}
        <Spotlight
          className="absolute bottom-[-20%] left-1/2 transform -translate-x-1/2 rotate-180 h-[120vh] w-[50vw] opacity-35"
          fill="white"
        />

        {/* Left footlight - amber */}
        <Spotlight
          className="absolute bottom-[-20%] left-[15%] rotate-180 h-[110vh] w-[40vw] opacity-30"
          fill="#FFB347"
        />

        {/* Right footlight - amber */}
        <Spotlight
          className="absolute bottom-[-20%] right-[15%] rotate-180 h-[110vh] w-[40vw] opacity-30"
          fill="#FFB347"
        />

        {/* Far left footlight - blue */}
        <Spotlight
          className="absolute bottom-[-15%] left-[2%] rotate-180 h-[100vh] w-[30vw] opacity-25"
          fill="#4169E1"
        />

        {/* Far right footlight - blue */}
        <Spotlight
          className="absolute bottom-[-15%] right-[2%] rotate-180 h-[100vh] w-[30vw] opacity-25"
          fill="#4169E1"
        />

        {/* Center-left footlight - lavender */}
        <Spotlight
          className="absolute bottom-[-18%] left-[30%] rotate-180 h-[105vh] w-[35vw] opacity-28"
          fill="#E6E6FA"
        />

        {/* Center-right footlight - lavender */}
        <Spotlight
          className="absolute bottom-[-18%] right-[30%] rotate-180 h-[105vh] w-[35vw] opacity-28"
          fill="#E6E6FA"
        />
      </div>

      {/* Footlight fixture visual elements */}
   

      {/* Grid Background */}
      <div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-black-100 absolute top-0 left-0">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100" />
      </div>

      {/* Orbiting Circles Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer orbit - slower, larger icons */}
        <OrbitingCircles className="size-[50px] border-none bg-transparent" duration={30} radius={280} iconSize={50}>
          <div className="flex items-center justify-center size-full rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
            <Code2 className="text-blue-400" size={24} />
          </div>
          <div className="flex items-center justify-center size-full rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10">
            <Palette className="text-purple-400" size={24} />
          </div>
          <div className="flex items-center justify-center size-full rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10">
            <Smartphone className="text-green-400" size={24} />
          </div>
          <div className="flex items-center justify-center size-full rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-white/10">
            <Database className="text-orange-400" size={24} />
          </div>
        </OrbitingCircles>

        {/* Middle orbit - medium speed */}
        <OrbitingCircles
          className="size-[40px] border-none bg-transparent"
          duration={25}
          radius={200}
          iconSize={40}
          reverse
        >
          <div className="flex items-center justify-center size-full rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10">
            <Cpu className="text-cyan-400" size={20} />
          </div>
          <div className="flex items-center justify-center size-full rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
            <Globe className="text-indigo-400" size={20} />
          </div>
          <div className="flex items-center justify-center size-full rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-white/10">
            <Zap className="text-yellow-400" size={20} />
          </div>
        </OrbitingCircles>

        {/* Inner orbit - faster, smaller icons */}
        <OrbitingCircles className="size-[30px] border-none bg-transparent" duration={15} radius={120} iconSize={30}>
          <div className="flex items-center justify-center size-full rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10">
            <Shield className="text-rose-400" size={16} />
          </div>
          <div className="flex items-center justify-center size-full rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-white/10">
            <Code2 className="text-emerald-400" size={16} />
          </div>
        </OrbitingCircles>
      </div>

      {/* Content - Animated */}
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <AnimatedSection animation="fadeIn" delay={0.2}>
            <TextExplodeIMessage className="text-blue-100 mb-4" text={data.title} />
          </AnimatedSection>

          <AnimatedSection animation="scaleIn" delay={0.4}>
            <TextGenerateEffect
              className="text-center text-[48px] md:text-6xl lg:text-7xl mb-6"
              words={data.description}
            />
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" delay={0.6}>
            <TextExplodeIMessage className="text-blue-100 mb-8" text={data.subtitle} />
          </AnimatedSection>

          <AnimatedSection animation="scaleIn" delay={0.8}>
            <Link href={"http://berhabzakarya.studxptm.com/media/berhab_zakarya_cv.pdf"} target="_blank">
              <MagicButton title="Download CV" icon={<FaLocationArrow />} position={"right"} />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}

export default Hero
