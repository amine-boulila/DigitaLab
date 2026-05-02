import { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";

export const metadata: Metadata = {
  title: "FAQ | Forjaw",
  description: "Frequently asked questions about our services.",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I receive my product?",
      answer: "After placing your order via WhatsApp, our team will instantly verify your payment and send you the credentials or codes directly in the chat."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including local bank transfers and international options. Discuss the best option for you with our agent on WhatsApp."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, if the service does not work as described within the first 24 hours, we offer a full refund or a replacement."
    },
    {
      question: "Do I need a VPN for IPTV?",
      answer: "Generally, no. Our servers are accessible worldwide. However, if your ISP blocks IPTV traffic, a VPN might be recommended."
    }
  ];

  return (
    <div className="page-section min-h-screen">
      <SectionHeading
        align="center"
        description="Find quick answers about ordering, delivery, payment, and support."
        eyebrow="FAQ"
        title="Frequently asked questions."
      />

      <div className="mx-auto mt-10 max-w-4xl space-y-4">
        {faqs.map((faq, index) => (
          <Surface key={index} className="p-6 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              Question {index + 1}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950">
              {faq.question}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
          </Surface>
        ))}
      </div>
    </div>
  );
}
