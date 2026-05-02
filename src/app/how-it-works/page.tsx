import { Metadata } from "next";
import { Search, MessageCircle, CreditCard, Gift } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";

export const metadata: Metadata = {
  title: "How It Works | Forjaw",
  description: "Learn how to purchase and use our digital products.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "1. Browse Products",
      description: "Explore our catalog of IPTV subscriptions and gift cards. Choose the package that suits your needs."
    },
    {
      icon: MessageCircle,
      title: "2. Order via WhatsApp",
      description: "Click the order button to open a chat with us. The message will be pre-filled with your order details."
    },
    {
      icon: CreditCard,
      title: "3. Make Payment",
      description: "Pay securely using your preferred method. We will guide you through the process in the chat."
    },
    {
      icon: Gift,
      title: "4. Receive Instantly",
      description: "Get your subscription details or gift card code instantly in the WhatsApp chat."
    }
  ];

  return (
    <div className="page-section min-h-screen">
      <SectionHeading
        align="center"
        description="The journey is still fast, but the page now explains each step with more confidence and better visual rhythm."
        eyebrow="Process"
        title="Four simple steps from browsing to delivery."
      />

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <Surface key={index} className="flex h-full flex-col p-7">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <step.icon className="h-8 w-8" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              Step {index + 1}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950">
              {step.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">{step.description}</p>
          </Surface>
        ))}
      </div>
    </div>
  );
}
