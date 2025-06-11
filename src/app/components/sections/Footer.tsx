import { FaLocationArrow } from "react-icons/fa6"
import MagicButton from "../ui/MagicButton"
import Link from "next/link"
import type { SocialMedia } from "@/types/portfolio"
import Image from "next/image"
import AnimatedSection from "@/components/animations/AnimatedSection"

interface FooterProps {
  data: SocialMedia[]
}

const Footer = ({ data }: FooterProps) => {
  return (
    <footer className="w-full mb-[100px] md:mb-5 pb-10 px-4 sm:px-6 lg:px-8" id="contact">
      <Image
        src="/footer-grid.svg"
        alt="grid"
        width={1920}
        height={40}
        className="w-full h-10 opacity-10 absolute -z-10"
      />

      <AnimatedSection animation="fadeIn">
        <div className="flex flex-col items-center z-10 text-center">
          <h1 className="heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl lg:max-w-[45vw] leading-tight">
            Ready to take <span className="text-purple">your</span> digital presence to the next level?
          </h1>
          <p className="text-white-200 md:mt-10 my-5 text-center text-sm sm:text-base lg:text-lg max-w-2xl px-4">
            Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
          </p>
          <a href="mailto:berhabzakarya@studxptm.com">
            <MagicButton title="Let's get in touch" icon={<FaLocationArrow />} position="right" />
          </a>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="slideLeft" delay={0.3}>
        <div className="flex mt-12 sm:mt-16 flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4">
          <p className="text-sm sm:text-base md:font-normal font-light text-center sm:text-left">
            Copyright © 2025 Berhab Zakarya
          </p>

          <div className="flex items-center gap-4 sm:gap-6">
            {data.map((info) => (
              <div
                key={info.id}
                className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:scale-110 transition-transform duration-300"
              >
                <Link href={info.link}>
                  <Image
                    src={info.img || "/placeholder.svg"}
                    alt="social media icon"
                    width={16}
                    height={16}
                    className="sm:w-5 sm:h-5"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </footer>
  )
}

export default Footer
