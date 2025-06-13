import Link from "next/link"

export default function TechStack() {
  return (
    <div className="prose max-w-none pb-8 text-justify text-sm dark:prose-invert md:text-lg xl:col-span-2">
      <h2 id="tech-stack" className="text-2xl font-bold font-poppins">
        Tech Stack:
      </h2>
      <ul>
        <li>
          <Link
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            React.js
          </Link>{" "}
          /{" "}
          <Link
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Next.js
          </Link>{" "}
          /{" "}
          <Link
            href="https://vuejs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Django
          </Link>
        </li>
        <li>
          <Link
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Flutter
          </Link>{" "}
          /{" "}
          <Link
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Android Native
          </Link>
        </li>
        <li>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            HTML5 / CSS3  
          </Link>
        </li>
        <li>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Python
          </Link>{" "}
          and{" "}
          <Link
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Typescript
          </Link>
        </li>
        <li>
          <Link
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Shadcn-UI
          </Link>
          ,{" "}
          <Link
            href="https://mui.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Material UI
          </Link>
          ,{" "}
          <Link
            href="https://ant.design/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Ant Design
          </Link>
          ,{" "}
          <Link
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Tailwindcss
          </Link>
          .
        </li>
        {/* <li>Jest / RTL / Cypress.io, vitest</li> */}
        {/* <li>Docker, CI/CD, Versioning, Shell, Git</li> */}
        {/* <li>Graphql, Express, Node.js, Nest.js</li> */}
        <li>Python, Django, (Machine Learning soon...)</li>
        {/* <li>Figma / AdobeXD / Sketch</li> */}
      </ul>

      <h2 id="currently-learning" className="text-2xl font-bold font-poppins">
        Currently Learning
      </h2>
      <ul>
        <li>
          <Link
            href="https://nuxt.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Docker
          </Link>{" "}
          and{" "}
          <Link
            href="https://vuejs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            AI
          </Link>
        </li>
      </ul>

      <h2 id="currently-working-on font-poppins" className="text-2xl font-bold">
        Currently working on
      </h2>
      <ul>
        <li>
          My personal site{" "}
          <Link href="/" className="text-pink-500 font-poppins hover:text-pink-400 transition-colors">
            berhabzakarya.tech
          </Link>
          : enhance UI
        </li>
        <li>
          <Link
            href="https://github.com/dr1tch/chakra-ui-mantine-react-table"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            Algecom
          </Link>
          : A modern, responsive e-commerce platform
          <Link
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors" 
            />
         

        </li>
   
      </ul>
    </div>
  )
}
