"use client"
import React from "react"
import { CanvasRevealEffect } from "../ui/CanvasRevealEffect"
import { AnimatePresence, motion } from "framer-motion"
import { Montserrat_Alternates } from "next/font/google"
import AnimatedSection from "@/components/animations/AnimatedSection"
import StaggeredItem from "@/components/animations/StaggeredItem"

const montserrat = Montserrat_Alternates({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const Process = () => {
  return (
    <section className="w-full py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <AnimatedSection animation="slideRight">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            MY Development <span className="block text-purple-400 mt-2">Process</span>
          </h1>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>
      </AnimatedSection>

      <AnimatedSection
        animation="stagger"
        className="my-12 sm:my-16 lg:my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-6 sm:gap-8 lg:gap-4"
      >
        <StaggeredItem className="w-full max-w-sm">
          <Card
            title="Project Discovery & System Design"
            des="I start by understanding the project's purpose, user needs, and long-term vision. Based on that, I architect scalable, modular solutions using tools like Django, PostgreSQL, and Firebase — ensuring a solid technical foundation from day one."
            icon={<AceternityIcon order="Phase 1" />}
          >
            <CanvasRevealEffect animationSpeed={5.1} containerClassName="bg-emerald-900 rounded-3xl overflow-hidden" />
          </Card>
        </StaggeredItem>

        <StaggeredItem className="w-full max-w-sm">
          <Card
            title="Full Stack Development Workflow"
            des="Using technologies like React, Next.js, Flutter, and Node.js, I build responsive interfaces, powerful backends, and real-time APIs. My development process follows clean code practices, continuous delivery, and Git-based collaboration."
            icon={<AceternityIcon order="Phase 2" />}
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
              colors={[
                [255, 166, 158],
                [221, 255, 247],
              ]}
              dotSize={2}
            />
          </Card>
        </StaggeredItem>

        <StaggeredItem className="w-full max-w-sm">
          <Card
            title="Testing, Optimization & Deployment"
            des="I ensure reliability and performance through unit tests, integration tests, and CI/CD pipelines. Once validated, I deploy on platforms like Vercel, Railway, or Docker-based VPS — optimized for scalability and monitoring post-launch."
            icon={<AceternityIcon order="Phase 3" />}
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
              colors={[[125, 211, 252]]}
            />
          </Card>
        </StaggeredItem>
      </AnimatedSection>
    </section>
  )
}

export default Process

const Card = ({
  title,
  icon,
  children,
  des,
}: {
  title: string
  icon: React.ReactNode
  children?: React.ReactNode
  des: string
}) => {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${montserrat.variable} --font-montserrat border border-black/[0.2] group/canvas-card flex items-center justify-center
       dark:border-white/[0.2] w-full mx-auto p-4 relative h-[28rem] sm:h-[32rem] lg:h-[35rem] rounded-3xl`}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <Icon className="absolute h-8 w-8 sm:h-10 sm:w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-8 w-8 sm:h-10 sm:w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-8 w-8 sm:h-10 sm:w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-8 w-8 sm:h-10 sm:w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full absolute inset-0">
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-6 sm:px-8 lg:px-10">
        <div
          className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
        group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center"
        >
          {icon}
        </div>
        <h2
          className="dark:text-white text-center text-xl sm:text-2xl lg:text-3xl opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 text-black mt-4 font-bold group-hover/canvas-card:text-white 
         group-hover/canvas-card:-translate-y-2 transition duration-200"
        >
          {title}
        </h2>
        <p
          className={`text-xs sm:text-sm opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 mt-4 group-hover/canvas-card:text-white text-center
         group-hover/canvas-card:-translate-y-2 transition duration-200 --font-montserrat ${montserrat.variable} leading-relaxed`}
          style={{ color: "#E4ECFF" }}
        >
          {des}
        </p>
      </div>
    </div>
  )
}

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px]">
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
          className="inline-flex h-full w-full cursor-pointer items-center 
        justify-center rounded-full bg-slate-950 px-3 sm:px-4 lg:px-5 py-2 text-purple backdrop-blur-3xl font-bold text-lg sm:text-xl lg:text-2xl"
        >
          {order}
        </span>
      </button>
    </div>
  )
}

export const Icon = ({ className, ...rest }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  )
}
