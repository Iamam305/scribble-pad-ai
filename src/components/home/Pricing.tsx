import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import PopupForm from "../ui/popup-form";
import Link from "next/link";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Casual Creator (Free)",
    popular: 0,
    price: 0,
    description:
      "Perfect for individuals just getting started with AI-assisted content creation.",
    buttonText: "Get Started Free",
    benefitList: [
      "2 post generations per day",
      "15 posts per month",
      "Basic email support",
      "Access to essential features",

    ],
  },
  {
    title: "Regular Influencer",
    popular: 1,
    price: 7,
    description:
      "Ideal for active content creators and budding influencers.",
    buttonText: "Get Early Access (comming soon)",
    benefitList: [
      "40 posts per month",
      "Priority email support",
      "Advanced content optimization",
      "Analytics dashboard",

    ],
  },
  {
    title: "Content Powerhouse",
    popular: 0,
    price: 20,
    description:
      "For serious content creators, marketers, and businesses.",
    buttonText: "Get Early Access (comming soon)",
    benefitList: [
      "Unlimited posts per month",
      "24/7 priority support",
      "Advanced AI customization",

    ],
  },
];

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="container py-14 sm:py-14"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center my-10">
        Pricing
      </h2>
      {/* <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
        reiciendis.
      </h3> */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-muted-foreground"> /month</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              {pricing.price !== 0 ? (
                <>
                  <PopupForm form_name={pricing.title} form_buttton_name={pricing.buttonText} form_description={pricing.description} />
                </>
              ) : <Link href={"/register"}><Button className="w-full">{pricing.buttonText}</Button></Link>}

            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
