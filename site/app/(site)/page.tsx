import { Button } from "@/components/ui/button";
import { Check, Download, X } from "lucide-react";
import Image from "next/image";
import { PiPencilLineLight, PiWaveSineLight } from "react-icons/pi";

import { IoIosCheckmark, IoIosClock, IoIosClose } from "react-icons/io";
export default async function Home() {
  return (
    <>
      <section className="pt-[5rem] overflow-hidden relative border-b border-color">
        <div className="pattern absolute inset-0 opacity-[0.05] scale-125" />
        <span className="absolute inset-0 bg-gradient-to-t -z-10 from-primary/25 to-transparent" />
        <section className="flex flex-col md:flex-row mx-auto w-fit pt-10 gap-20 md:gap-8">
          <div className="flex flex-col items-center md:items-end gap-4 my-auto">
            <h1 className="h1 text-center md:text-end clipped-text max-w-[10ch]">
              Simple <span className="highlight">Quiz </span>
              Application
            </h1>
            <p className="body text-center md:text-end max-w-[38ch]">
              Simplify you development process by using pre-made react layouts,
              they are eazy to use, make changes and manage the code
            </p>
            <Button
              className="w-fit text-lg font-semibold rounded-xl"
              size={"lg"}
            >
              Download app <Download className="size-5 inline ml-2" />
            </Button>
          </div>
          <div className="relative h-[20rem] md:h-[26rem] -z-20">
            <Image
              src={"/hero.png"}
              alt="hero png"
              width={800}
              height={800}
              className="w-80"
            />
          </div>
        </section>
      </section>
      <section className="wrapper flex md:pl-56 relative max-w-md md:max-w-screen-md mt-48 md:mt-0 pt-32 pb-10">
        <div className="w-full absolute inset-x-0 md:-bottom-0 -top-40 md:top-auto flex justify-center md:justify-start">
          <Image
            src={"/hero.png"}
            alt="hero png"
            width={800}
            height={800}
            className="w-56 md:w-64 z-50 glow"
          />
        </div>
        <div className="flex flex-col gap-2 w-full border border-color bg-white pb-10 px-14 md:pr-40 rounded-xl h-fit my-auto text-center md:text-start pt-48 md:pt-10 overflow-hidden relative">
          <h2 className="h2 clipped-text md:max-w-[6ch]">
            Full <span className="highlight">Quiz</span> taking system
          </h2>
          <p className="body max-w-[32ch]">
            Simplify you development process by using pre-made react layouts,
            they are eazy to use, make changes and manage the code
          </p>
          <div className="size-[110%] absolute flex items-end justify-start -top-1/2 -right-1/2 rounded-full bg-primary/5" />
          <IoIosCheckmark className="bg-emerald-500 text-white rounded-full size-20 glow-green absolute -right-6 top-[25%] opacity-25 saturate-0 -translate-y-1/2" />
          <IoIosClose className="bg-red-500 text-white rounded-full size-20 glow-red absolute -right-6 top-[50%] opacity-25 saturate-0 -translate-y-1/2" />
          <IoIosClock className="bg-gray-700 text-white rounded-full size-20 glow absolute -right-6 top-[75%] opacity-25 saturate-0 -translate-y-1/2" />
        </div>
      </section>
      <section className="flex wrapper w-fit relative gap-20 py-20 flex-col md:flex-row items-center">
        <div className="flex flex-col gap-2 max-w-md my-auto text-center md:text-start">
          <h2 className="h2 clipped-text">
            Statistics and Ranking <span className="highlight">system</span>
          </h2>
          <p className="body">
            Simplify you development process by using pre-made react layouts,
            they are eazy to use, make changes and manage the code
          </p>
        </div>
        <div className="flex gap-4 w-fit h-fit rotate-6 relative">
          <span className="size-[calc(100vw-4rem)] max-w-80 max-h-80 bg-primary shadow-2xl shadow-primary opacity-20 rounded-full" />
          <PiWaveSineLight className="size-20 rotate-12 text-emerald-700 absolute top-0 -left-4" />
          <PiWaveSineLight className="size-16  text-emerald-700 absolute top-12 -left-4" />
          <PiPencilLineLight className="size-20  text-rose-700 absolute bottom-0 -right-4" />
          <Image
            src={"/feature-2.png"}
            alt="hero png"
            width={800}
            height={800}
            className="w-44 glow border border-color rounded-[24px] mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </section>
      <section className="wrapper flex flex-col items-center justify-between text-center gap-8 py-28">
        <h1 className={"h2 clipped-text text-center"}>
          <span className="relative">
            Start
            <Image
              src={"/spark.svg"}
              alt="spark_icon"
              width={100}
              height={100}
              className="w-10 md:w-16 absolute -top-4 -left-6 md:-top-8 md:-left-10 drop-shadow-lg"
            />
          </span>{" "}
          using <span className="highlight">HighQ</span> now
        </h1>
        <span className="body">
          Gain knowledge using our interactive questioning system.
        </span>
        <Button
          size={"lg"}
          className="border border-color rounded-xl text-base font-semibold"
        >
          Download now
        </Button>
      </section>
    </>
  );
}
