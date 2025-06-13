import { OrbitingCircles } from "../magicui/orbiting-circles";
import {
  HTML5,
  Java,
  JavaScript,
  Dart,
  Flutter,
  CSS3,
  Android,
  Python,
  React,
  NextJs,
  Django,
} from "developer-icons";

export function MYTechStack() {
  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={20} radius={80} speed={2}>
        <HTML5 />
        <CSS3 />
        <JavaScript />
        <Java />
        <Dart/>
     
<Python/>
      </OrbitingCircles>
      <OrbitingCircles iconSize={20} radius={50} reverse speed={2}>
        <Flutter />
        <Android />
        <React />
        <NextJs />
       
        <Django/>
      
      </OrbitingCircles>
    </div>
  );
}
