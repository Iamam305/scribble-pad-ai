import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../../assets/cube-leg.png";
import Image from "next/image";
import { Layout, Linkedin } from "lucide-react";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "LinkedIn Posts",
    description:
      "Engage your professional network with well-crafted updates.",
    icon: <Linkedin className=" m-4" />,
  },
  {
    title: "Blog Posts",
    description:
      " Turn your ideas into insightful articles that resonate with your readers.",
    icon: <Layout className=" m-4" />,
  },
  {
    title: "Twitter Threads:",
    description:
      "Break down complex thoughts into digestible tweets.",
    icon: <TwitterLogoIcon className=" m-4" />,
  },
];

export const Services = () => {
  return (
    <section id="features" className="container py-14">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              One Tool,
            </span>
            Multiple Formats
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Whether you&apos;re a professional looking to enhance your LinkedIn presence, a blogger seeking inspiration, or a Twitter enthusiast aiming for the perfect thread, ScribblePad AI has you covered.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Image
          src={cubeLeg}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="About services"
        />
      </div>
    </section>
  );
};
