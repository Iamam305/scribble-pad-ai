import { Button } from "@/components/ui/button";
import Link from "next/link";
import Trial from "./trial";

export const Cta = () => {
  return (
    <section
      id="cta"
      className="bg-muted/50 py-16 my-14"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Ready to Amplify Your Voice?
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            Don&apos;t let great ideas get lost in translation. With ScribblePad AI, your thoughts become impactful content at the speed of speech.
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/register">
            <Button className="w-full " size={"lg"}>Sign Up</Button>
          </Link>
          <Trial/>
        </div>
      </div>
    </section>
  );
};
