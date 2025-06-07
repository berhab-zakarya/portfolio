import React from "react";
import { Spotlight } from "../components/ui/Spotlight";
import { TextGenerateEffect } from "../components/ui/TextGenerateEffect";
import { LoginComponent } from "../components/login/LoginComponent";

const Login = () => {
  return (
    <div className="min-h-dvh overflow-hidden">
      <div className="relative">
        <Spotlight
          className="absolute -top-[100px]   rotate-180 h-[180vh] w-[80vw] opacity-100"
          fill="#feae67"
        />
        <Spotlight
          className="absolute -top-10 left-[80%] h-[180vh] w-[60vw] opacity-25"
          fill="#8e2de2"
        />
        <Spotlight
          className="absolute top-32 left-[50%] h-[80vh] w-[50vw] opacity-20"
          fill="#4a00e0"
        />
      </div>

      <div className="flex flex-col gap-4 h-screen justify-center items-center">

        <div className="flex px-8 rounded-lg bg-slate-900/10 backdrop-blur-md shadow-lg">
            <TextGenerateEffect words={"Berhab Zakarya | Full Stack Developer"}            
            className="text-center text-3xl"
            />
        </div>
        <LoginComponent/>
      </div>
    </div>
  );
};

export default Login;
