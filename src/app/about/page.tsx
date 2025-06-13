import { Avatar } from "@/components/ui/avatar"
import Image from "next/image"
import Header from "../components/about/Header"
import WorkExperience from "../components/about/WorkExperience"
import TechStack from "../components/about/TechStack"
import Footer from "../components/about/footer"


export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-sm text-center md:w-1/2 md:text-left lg:max-w-full">
            <h1 className="mb-4 font-sans text-xl font-medium md:text-2xl lg:text-3xl">
            Hey, I&apos;m Berhab Zakarya — Developer & Founder of  <span className="font-semibold text-pink-600"> StudXPTM - @studxptm </span> 
            <br />


             
            </h1>
            <h1 className="mb-4 font-sans text-xl font-medium md:text-2xl lg:text-3xl">
                I build clean, modern SaaS platforms, websites, and mobile apps that actually work (and look good too).
Big fan of smooth UIs, solid code, and turning ideas into products.

            </h1>
            <h1 className="font-sans text-xl font-medium text-gray-400 md:text-2xl lg:text-3xl">
              Building beautiful and easy to use UIs for web and mobile applications, UI libraries, UI/UX Designs.
            </h1>
          </div>
          <div className="flex w-1/2 items-center justify-center align-middle">
            <Avatar className="h-[300px] w-[300px] rounded-full  grayscale  hover:grayscale-0 transition-transform duration-1000 ease-in-out">
              <Image
                src="/user2.png"
                alt="Berhab Zakarya"
                width={300}
                height={300}
                className="rounded-full object-scale-down "
              />
            </Avatar>
          </div>
        </div>

        <div className="prose max-w-none pb-8 text-justify text-sm dark:prose-invert md:text-lg xl:col-span-2">
         <section className="mt-16 prose max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold font-poppins">Who am I?</h2>
          <p className="text-justify font-poppins">
            Hey! I&apos;m Berhab Zakarya — a 23-year-old developer from Tlemcen, Algeria.
            I&apos;ve been building stuff since 2018, when I started freelancing
            out of pure curiosity and love for tech. What began as small
            projects quickly turned into a passion for creating smooth,
            user-friendly digital experiences.
          </p>
          <p className="text-justify font-poppins">
            Over the years, I&apos;ve worked on everything from e-commerce
            websites to full-blown mobile apps. I&apos;m now the founder of{" "}
            <strong>StudX PTM</strong>, where I lead a team of awesome creatives
            to turn ideas into real products. Currently, I&apos;m also working
            as a <strong>Flutter Developer at Datamaster</strong>, helping bring
            mobile ideas to life.
          </p>
          <p className="text-justify font-poppins">
            My main tools are <strong>Next.js</strong>, <strong>Django</strong>,{" "}
            <strong>Flutter</strong>, and a bit of <strong>Android Native</strong> — and I&apos;m always hungry to learn more,
            build better, and keep growing.
          </p>
          <p className="text-justify font-poppins">
            Oh, and I&apos;m an open source enthusiast — giving back to the dev world that gave me so much.
          </p>
          <p className="text-justify font-semibold font-poppins">
            Still learning. Still building. Just getting started 🚀
          </p>
        </section>
        </div>

        <WorkExperience />
        <TechStack />
      </main>
      <Footer />
    </div>
  )
}
