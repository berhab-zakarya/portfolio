import { Github, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer>
      <div className="mb-0 flex flex-col justify-start space-y-1.5 space-x-0 py-10 text-gray-500 dark:text-gray-400 container mx-auto px-4">
      
        <div className="flex flex-col items-center space-y-2 text-sm sm:flex-row sm:justify-between sm:text-base">
          <ul className="flex space-x-2">
            <li>© 2025</li>
            <li> • </li>
            <li>
              <Link href="/">Berhab Zakarya 🇵🇸</Link>
            </li>
          </ul>
          <ul className="flex cursor-pointer items-center space-x-5">
            <li>
              <a href="https://www.linkedin.com/in/berhab-zakarya/" target="_blank" rel="noreferrer" aria-label="linkedin">
                <Linkedin className="sm:text-lg" />
              </a>
            </li>
            <li>
              <a href="https://github.com/berhab-zakarya" target="_blank" rel="noreferrer" aria-label="github">
                <Github className="sm:text-lg" />
              </a>
            </li>
          
         
          </ul>
        </div>
      </div>
    </footer>
  )
}
