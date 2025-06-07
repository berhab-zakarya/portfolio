import React from "react";

type MagicButtonProps = {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  classes?: string;
};

function MagicButton({ title, icon, position, handleClick, classes }: MagicButtonProps) {
  return (
    <button
      className="bg-slate-800 w-full no-underline group cursor-pointer relative mt-8 shadow-2xl shadow-zinc-900 rounded-lg p-px text-xs font-semibold leading-6  text-white inline-block"
      onClick={handleClick}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className={`relative flex space-x-2 items-center z-10 rounded-lg  bg-zinc-950 py-4 px-8 ring-1 ring-white/10 ${classes}`}>
        <span className="text-xl flex gap-3 items-center">
          {position === "left" && icon}
          {title}
          {position === "right" && icon}
        </span>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </button>
  );
}

export default MagicButton;
