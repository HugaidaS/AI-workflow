"use client";

import { Vortex } from "@/components/ui/vortex";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const redirectToDashboard = () => {
    router.push("/dashboard/chat");
  };
  return (
    <div className=" mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={300}
        baseHue={220}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Welcome to the Midnight AI Bar
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been
          burned and you&apos;ll have a scar.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button
            onClick={redirectToDashboard}
            className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-xl p-px font-semibold leading-6 text-white inline-block h-full"
          >
            <span className="absolute inset-0 overflow-hidden rounded-xl">
              <span className="absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative flex space-x-3 items-center z-10 rounded-xl bg-zinc-950 py-4 px-12 ring-1 ring-white/10">
              <span className="text-xl text-white">{`Discover`}</span>
            </div>
            <span className="absolute -bottom-0 left-[1.375rem] h-px w-[calc(100%-2.75rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </button>
        </div>
      </Vortex>
    </div>
  );
}
