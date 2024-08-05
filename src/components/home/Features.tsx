import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../../assets/growth.png";
import image3 from "../../assets/reflecting.png";
import image4 from "../../assets/looking-ahead.png";
import Image from "next/image";

interface FeatureProps {
  title: string;
  description: string;
  image: any;
}

const features: FeatureProps[] = [
  {
    title: "Efficiency",
    description:
      "Save time and effort by letting our AI handle the structuring of your content.",
    image: image4,
  },
  {
    title: "Creativity",
    description:
      "Capture your ideas in the moment, ensuring no great thought is ever lost.",
    image: image3,
  },
  {
    title: "Versatility",
    description:
      "Perfect for professionals, bloggers, and social media enthusiasts.",
    image: image,
  },
];

const featureList: string[] = [
  "Dark/Light theme",
  "Reviews",
  "Features",
  "Pricing",
  "Contact form",
  "Our team",
  "Responsive design",
  "Newsletter",
  "Minimalist",
];

export const Features = () => {
  return (
    <section
      id=""
      className="container py-14 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Why Choose ScribblePad AI?
        </span>
      </h2>



      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <Image
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
