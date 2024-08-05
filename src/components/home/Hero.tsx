import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import Trial from "./trial";


const words = ['LinkedIn Post', 'Twitter/X Thread', 'Blog Post'];
export const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            Translate Your {" "}
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Thoughts
            </span>{" "}
            into Powerful
          </h1>{" "}

          <h2 className="">
            <span className=" bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">

              {words[currentWord]}

              {/* Content */}
            </span>{" "}
            with ScribblePad AI
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Are you bursting with brilliant ideas but struggle to organize them into compelling posts? ScribblePad AI is here to revolutionize your content creation process.
        </p>

        <div className="flex gap-4 flex-wrap items-stretch">
          <Link href={"/register"} >
            <Button size={"lg"}>
              Get Started
            </Button>
          </Link>
          <Trial />


        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
