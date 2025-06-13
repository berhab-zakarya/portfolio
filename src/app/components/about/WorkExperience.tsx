export default function WorkExperience() {
  return (
    <div className="mb-16 flex flex-col justify-start gap-8 ">
      <h2 className="text-[1.5rem] font-bold">Work Experience</h2>
      <ol className="list-none border-l-2 border-pink-600 dark:border-pink-500">
        <li>
          <div className="flex-start flex items-center">
            <div className="-ml-[9px] -mt-2 mr-3 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 dark:bg-pink-500"></div>
            <h4 className="-mt-2 text-xl font-semibold">
              Founder & Developer at{" "}
              <span className="font-semibold text-pink-500">StudXPTM</span>
            </h4>
          </div>
          <div className="mb-6 ml-6 pb-6">
            <span className="text-lg text-pink-700 transition duration-150 ease-in-out focus:text-pink-700 hover:text-pink-700 active:text-pink-700 dark:text-pink-400 dark:focus:text-pink-500 dark:hover:text-pink-500 dark:active:text-pink-700">
              Tlemcen | Jan 2025 - Present
            </span>
            <ul>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Founded and led a development team to build the StudXPTM
                platform.
              </li>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Managed team workflow, project deadlines, and product strategy.
              </li>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Actively contributed to system architecture and core feature
                development.
              </li>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Focused on delivering a performant and scalable experience for
                student users.
              </li>
            </ul>
          </div>
        </li>

        <li>
          <div className="flex-start flex items-center">
            <div className="-ml-[9px] -mt-2 mr-3 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 dark:bg-pink-500"></div>
            <h4 className="-mt-2 text-xl font-semibold">
              Flutter Developer at{" "}
              <span className="font-semibold text-pink-500">Datamaster</span>
            </h4>
          </div>
          <div className="mb-6 ml-6 pb-6">
            <span className="text-lg text-pink-700 transition duration-150 ease-in-out focus:text-pink-700 hover:text-pink-700 active:text-pink-700 dark:text-pink-400 dark:focus:text-pink-500 dark:hover:text-pink-500 dark:active:text-pink-700">
              Tlemcen | July 2023 - Sep 2024
            </span>
            <ul>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Maintained and enhanced the Assistes Sales App, fixing bugs and
                refactoring code.
              </li>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Improved code quality and prepared the application for
                production deployment.
              </li>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Developed a task management app for internal and client-side
                use.
              </li>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Focused on scalable architecture and clean, maintainable Flutter
                code.
              </li>
            </ul>
          </div>
        </li>

        <li>
          <div className="flex-start flex items-center">
            <div className="-ml-[9px] -mt-2 mr-3 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 dark:bg-pink-500"></div>
            <h4 className="-mt-2 text-xl font-semibold">
              Freelancer at{" "}
              <span className="font-semibold text-pink-500">
                Mostaql / Upwork / Facebook / Networks
              </span>
            </h4>
          </div>
          <div className="mb-6 ml-6 pb-6">
            <span className="text-lg text-pink-700 transition duration-150 ease-in-out focus:text-pink-700 hover:text-pink-700 active:text-pink-700 dark:text-pink-400 dark:focus:text-pink-500 dark:hover:text-pink-500 dark:active:text-pink-700">
              Worldwide | July 2019 - Present
            </span>
            <ul>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Built and delivered websites and mobile apps for clients
                worldwide.
              </li>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Al-Qiyam Association for Culture and Education in Maghnia
                Collaborated with the Al-Qiyam Association in Maghnia and
                Datamaster as an external contractor.
              </li>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Projects ranged from e-commerce platforms to organizational
                tools.
              </li>
              <li className="font-poppins ml-6 mb-4 mt-2 list-disc text-base text-neutral-300 first:mt-4">
                Tech stack includes: Flutter, Django, Next.js, and Android
                Native.
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  );
}
