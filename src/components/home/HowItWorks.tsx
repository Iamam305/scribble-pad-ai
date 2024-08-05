import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons";
import { Mic, Sparkles, Upload } from "lucide-react";



interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <Mic />,
    title: "Record Your Thoughts",
    description:
      " Speak freely about your ideas, thoughts, and concepts. No need to worry about structure or coherence at this stage—just let your thoughts flow.",
  },
  {
    icon: <Upload />,
    title: "Upload Your Audio",
    description:
      "Visit ScribblePad-AI.com and upload your recorded audio. Our intuitive platform makes the process quick and easy.",
  },
  {
    icon: <Sparkles />,
    title: "Receive Structured Content:",
    description:
      "Sit back and relax while ScribblePad AI converts your raw audio into a well-structured LinkedIn post, blog post, or Twitter thread. It's that simple!",
  },

];

export const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="container text-center py-14"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-10">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
