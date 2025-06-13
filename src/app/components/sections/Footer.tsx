import { FaLocationArrow } from "react-icons/fa6"
import MagicButton from "../ui/MagicButton"
import Link from "next/link"
import type { SocialMedia } from "@/types/portfolio"
import Image from "next/image";

interface FooterProps {
  data: SocialMedia[]
}

const Footer = ({ data }: FooterProps) => {
  return (
    <footer className="w-full mb-[100px] md:mb-5 pb-10 px-8" id="contact">
      <Image
        src="/footer-grid.svg"
        alt="grid"
        width={1920}
        height={40}
        className="w-full h-10 opacity-10 absolute -z-10"
      />

      <div className="flex flex-col items-center z-10">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
        </p>
        <a href="mailto:berhabzakarya@studxptm.com">
          <MagicButton title="Let's get in touch" icon={<FaLocationArrow />} position="right" />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">Copyright © 2025 Berhab Zakarya</p>

        <div className="flex items-center md:gap-3 gap-6">
          {data.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Link href={info.link}>
                <Image  src={info.img || "/placeholder.svg"} alt="icons" width={20} height={20} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
