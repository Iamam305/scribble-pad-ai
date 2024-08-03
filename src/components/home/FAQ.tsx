import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [{
  "question": "What is ScribblePad AI?",
  "answer": "ScribblePad AI is an innovative tool that converts your spoken thoughts into structured content for LinkedIn posts, blog posts, and Twitter threads. It uses advanced AI to transform raw audio recordings into polished, organized written content.",
  "value": "item-1"
},
{
  "question": "How does ScribblePad AI work?",
  "answer": "1. You record your thoughts as an audio file. 2. You upload this audio file to our platform. 3. Our AI processes the audio and converts it into structured text. 4. You receive well-organized content ready for posting on your chosen platform.",
  "value": "item-2"
},
{
  "question": "What types of content can ScribblePad AI create?",
  "answer": "Currently, ScribblePad AI can create LinkedIn posts, blog posts, and Twitter threads.",
  "value": "item-3"
},
{
  "question": "Is ScribblePad AI suitable for non-native English speakers?",
  "answer": "Yes! ScribblePad AI can process various accents and speaking styles. It focuses on the content of your ideas rather than perfect pronunciation.",
  "value": "item-4"
},
{
  "question": "What audio formats does ScribblePad AI accept?",
  "answer": "We accept most common audio formats, including MP3, WAV, and M4A. For best results, ensure your recording is clear and has minimal background noise.",
  "value": "item-5"
},
{
  "question": "Is there a limit to the length of audio I can upload?",
  "answer": "The current limit is [X] minutes per audio file. For longer content, we recommend breaking it into multiple recordings.",
  "value": "item-6"
},
{
  "question": "How long does it take to process my audio?",
  "answer": "Processing time depends on the length of your audio, but typically ranges from 2-5 minutes for most uploads.",
  "value": "item-7"
},
{
  "question": "Can I edit the content after it's been processed?",
  "answer": "Absolutely! While ScribblePad AI provides a structured draft, you always have the option to refine and personalize the content before posting.",
  "value": "item-8"
},
{
  "question": "Is my audio data secure?",
  "answer": "We take your privacy seriously. All audio uploads are encrypted and securely stored. We do not share or sell your data to third parties.",
  "value": "item-9"
},
{
  "question": "How long do you keep my audio files?",
  "answer": "Audio files are automatically deleted from our servers 30 days after processing, unless you request earlier deletion.",
  "value": "item-10"
},
{
  "question": "Is there a free trial available?",
  "answer": "Yes, we offer a 7-day free trial that allows you to process up to [X] minutes of audio.",
  "value": "item-11"
},
{
  "question": "What are your pricing plans?",
  "answer": "We offer several plans to suit different needs: Basic: $X/month for up to [Y] minutes of audio, Pro: $Y/month for up to [Z] minutes of audio, Enterprise: Custom pricing for high-volume users.",
  "value": "item-12"
},
{
  "question": "Can I cancel my subscription at any time?",
  "answer": "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing cycle.",
  "value": "item-13"
},
{
  "question": "How can I get help if I'm having issues?",
  "answer": "Our support team is available via email at support@scribblepad-ai.com. For Pro and Enterprise users, we also offer priority chat support.",
  "value": "item-14"
},
{
  "question": "Do you offer tutorials or guides?",
  "answer": "Yes, we have a comprehensive knowledge base with tutorials, best practices, and tips for getting the most out of ScribblePad AI. You can find these resources in our Help Center.",
  "value": "item-15"
},
{
  "question": "Can I request new features?",
  "answer": "We love hearing from our users! You can submit feature requests through our feedback form in the app or by emailing suggestions@scribblepad-ai.com.",
  "value": "item-16"
}
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
