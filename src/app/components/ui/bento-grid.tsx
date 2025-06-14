"use client";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import MagicButton from "./MagicButton";
import { BackgroundGradientAnimation } from "./GradientBg";
import animationData   from "@/data/confetti.json";
import Lottie from "lottie-react";
import Image from "next/image";
import CommitGraph from "@/components/animata/graphs/commit-graph";
import { MYTechStack } from "@/components/custom/TechStack";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  // const leftLists = [
  //   "ReactJS",
  //   "JavaFX",
  //   "Android Native",
  //   "Flutter",
  //   "NextJS",
  //     "Django",
  // ];
  // const rightLists = [
  //   "HTML",
  //   "CSS",
  //   "Android",
  //   "ReactJS",
  //   "C",
  //   "Java",
  //   "C",
  //   "C#",
  //   "Kotlin",
  // ];

  const [copied, setCopied] = useState(false);

  function handleCopy() {
    console.log("qsdqsdqsdqsd")
    const text = "berhabzakarya@studxptm.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  

  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
            {img && (
            <Image
              src={`${img}`}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
              fill
              priority
            />
            )}
        </div>

        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          }`}
        >
            {spareImg && (
            <Image
              src={`${spareImg}`}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
              fill
              sizes="100vw"
              priority
            />
            )}
        </div>

        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}
        

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          {(id !== 3) && typeof description === "string" && description.length > 1 && (
              <div className="font-sans  md:max-w-32 md:text-xs lg:text-base text-sm text-[#a7c0eb] z-10 font-semibold ">
            {description}
          </div>
          )}
        

          {(id !== 3) && (
            <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
          >
            {title}
          </div>
          )
          }
          {(id == 3) && (
            <div
            className={`font-sans text-lg lg:text-3xl max-w-16 font-bold z-10`}
          >
            {title}
          </div>
          )
          }

          {id===2 && <div className="-mb-8">
            <CommitGraph />
            </div>}

        
          {id === 3 && (
              <div className="absolute z-50 inset-0 flex items-center justify-center">
              <MYTechStack/>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              >
             <Lottie
      animationData={animationData}
      loop={copied}
      autoplay={true}
    />
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={()=>{
                    handleCopy();
                }}
                classes="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
