"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Header() {
  const [currentMessage, setCurrentMessage] = useState(1)
  const [isVisible, setIsVisible] = useState(true)

  const messages = [
    {
      id: 1,
      content: (
        <a target="_blank" href="https://twitter.com/search?q=%23PalestineLivesMatter" rel="noopener noreferrer" className="group">
          <strong className="font-semibold text-white group-hover:text-green-300 transition-colors duration-300">Free Palestine 🇵🇸</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx="1" cy="1" r="1"></circle>
          </svg>
          <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
            Stand for humanity! Palestine has a right to defend itself. Together, we can put an end to the Gaza
            genocide. Let&apos;s unite to #SAVEGAZA and ensure that every life in this region has access to the most
            basic necessities.
          </span>
        </a>
      ),
      gradient: "from-[#149954] via-[#2d7a2d] to-[#E4312b]"
    },
    {
      id: 2,
      content: (
        <div className="text-center space-y-2">
          <div className="text-lg font-bold text-amber-200 tracking-wide">
            حديث الرسول ﷺ
          </div>
          <div className="text-xl font-extrabold text-white leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
            إن الله يحب إذا عمل أحدكم عملاً أن يتقنه
          </div>
          <div className="text-sm text-gray-300 italic">
            &quot;Indeed, Allah loves when one of you does a job, that he does it with excellence&quot;
          </div>
        </div>
      ),
      gradient: "from-[#8B5A3C] via-[#D4AF37] to-[#4A4A4A]"
    }
  ]
  // eslint-disable-next-line
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length)
        setIsVisible(true)
      }, 500)
    }, 4000) // Switch every 6 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Add Google Fonts for Arabic */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
      `}</style>
      
      <header className="relative z-40 bg-transparent pb-5 md:pb-10">
        <div className="my-2">
          <div className="isolate z-50 flex items-center overflow-hidden sm:sticky sm:rounded bg-gray-900/80 px-3.5 py-4 backdrop-blur-lg border border-gray-700/50 shadow-2xl md:px-6">
            <div className="relative flex w-full items-center justify-center">
              {/* Animated Background Gradients */}
              <div
                className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl animate-pulse"
                aria-hidden="true"
              >
                <div
                  className={`aspect-[577/310] w-[36.0625rem] bg-gradient-to-r ${messages[currentMessage].gradient} transition-all duration-1000 opacity-70 md:opacity-40`}
                  style={{
                    clipPath:
                      "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                  }}
                ></div>
              </div>
              <div
                className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl animate-pulse"
                aria-hidden="true"
                style={{ animationDelay: '1s' }}
              >
                <div
                  className={`aspect-[577/310] w-[36.0625rem] bg-gradient-to-r ${messages[currentMessage].gradient} transition-all duration-1000 opacity-70 md:opacity-40`}
                  style={{
                    clipPath:
                      "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                  }}
                ></div>
              </div>

              {/* Message Content with Smooth Transitions */}
              <div 
                className={`mx-auto text-sm leading-6 text-gray-300 transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } min-h-[4rem] flex items-center justify-center px-4`}
              >
                {messages[currentMessage].content}
              </div>

              {/* Progress Indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {messages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentMessage 
                        ? 'bg-white shadow-lg' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 flex max-w-5xl items-center justify-between px-4">
          <div>
            <Link href="/" className="flex items-center justify-between group">
              <div className="hidden text-xl font-extrabold text-pink-600 sm:block group-hover:text-pink-500 transition-colors duration-300">
                {"<"}zakyberhab{"/>"}
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}