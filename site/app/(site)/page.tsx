import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <section className="pt-[5rem] relative">
        <span className="absolute inset-0 bg-gradient-to-t -z-10 from-zinc-200 to-transparent" />
        <section className="flex mx-auto w-fit pt-10 gap-6">
          <div className="flex flex-col items-end gap-4 my-auto">
            <h1 className="h1 text-end clipped-text max-w-[10ch]">
              Simple Quiz Application
            </h1>
            <p className="body text-end max-w-[38ch]">
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
          <div className="h-[30rem] -z-20 overflow-hidden">
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
      <section className="flex w-fit pl-56 mx-auto relative pt-32 pb-10">
        <Image
          src={"/hero.png"}
          alt="hero png"
          width={800}
          height={800}
          className="w-64 absolute -left-0 -bottom-0"
        />
        <div className="flex flex-col gap-2 max-w-xl w-full border border-color bg-gradient-to-b from-primary/10 to-zinc-100 py-10 pl-14 pr-40 rounded-xl h-fit my-auto">
          <h2 className="h2 clipped-text max-w-[6ch]">
            Full Quiz taking system
          </h2>
          <p className="body">
            Simplify you development process by using pre-made react layouts,
            they are eazy to use, make changes and manage the code
          </p>
        </div>
      </section>
      <section className="flex wrapper w-fit relative gap-20 py-20">
        <div className="flex flex-col gap-2 max-w-md my-auto">
          <h2 className="h2 clipped-text">Statistics and Ranking system</h2>
          <p className="body">
            Simplify you development process by using pre-made react layouts,
            they are eazy to use, make changes and manage the code
          </p>
        </div>
        <div className="flex gap-4 rotate-6">
          <Image
            src={"/feature-2.png"}
            alt="hero png"
            width={800}
            height={800}
            className="w-44 mt-20 -mb-20 glow border border-color rounded-[28px]"
          />
          <Image
            src={"/feature-2.png"}
            alt="hero png"
            width={800}
            height={800}
            className="w-44 glow border border-color rounded-[28px]"
          />
        </div>
      </section>
      <section className="wrapper flex flex-col items-center justify-between gap-5 py-28">
        <h1 className={"h2 clipped-text relative text-center"}>
          Build you emails now
          <Image
            src={"/spark.svg"}
            alt="spark_icon"
            width={100}
            height={100}
            className="w-16 absolute -top-8 -left-10 drop-shadow-lg  "
          />
        </h1>
        <span className="body">
          Improve your users experiance with professional emails.
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
