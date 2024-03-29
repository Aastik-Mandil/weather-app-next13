import { SunIcon } from "@heroicons/react/solid";
import React from "react";

function Loading() {
  return (
    <div className="bg-gradient-to-br from-[#394f68] to-[#183b7e] min-h-screen flex flex-col items-center justify-center text-slate-500">
      <SunIcon
        className="h-24 w-24 animate-bounce text-yellow-500"
        color="yellow"
      />

      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse">
        Loading City Weather Information
      </h1>

      <h2 className="text-xl font-bold text-center mb-10 animate-pulse">
        Hold on, we are crunching the numbers & generating on AI summary of the
        Weather!
      </h2>
    </div>
  );
}

export default Loading;
