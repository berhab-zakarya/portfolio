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

interface HeroProps {
  data: HeroContent | null
}

const Hero = ({ data }: HeroProps) => {
  const { loading } = useHero()
  
  if (loading || !data) {
    return (
      <div className="text-center">
        <div role="status">
          <LoadingComponent />
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20 pt-36">
      {/* Spotlight Effects */}
      <div>
        {/* Main white spotlight - top left */}
        <Spotlight
          className="absolute -top-40 -left-20 md:-top-24 md:-left-40 h-[120vh] w-[80vw] opacity-30"
          fill="white"
        />
        
        {/* Purple spotlight - top right */}
        <Spotlight 
          className="absolute -top-10 left-[75%] h-[100vh] w-[65vw] opacity-25" 
          fill="#8B5CF6" 
        />
        
        {/* Blue spotlight - center right */}
        <Spotlight 
          className="absolute top-32 left-[45%] h-[100vh] w-[60vw] opacity-20" 
          fill="#3B82F6" 
        />
        
        {/* Additional accent spotlight - bottom left */}
        <Spotlight
          className="absolute top-64 left-[10%] h-[80vh] w-[50vw] opacity-15"
          fill="#10B981"
        />
      </div>

      {/* Grid Background */}
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-black-100 absolute top-0 left-0">
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

      {/* Content */}
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            {data.title}
          </h2>
          
          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Building the Future, One Line of Code at a Time"
          />
          
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            {data.subtitle}
          </p>
          
          <Link href={"#about"}>
            <MagicButton title="My Work" icon={<FaLocationArrow />} position={"right"} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero