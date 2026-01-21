import { Metadata } from "next";
import { Search, MessageCircle, CreditCard, Gift } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | DigitaLab",
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
    <div className="container mx-auto min-h-screen px-4 py-12">
      <h1 className="mb-4 text-center text-4xl font-bold text-white">How It Works</h1>
      <p className="mx-auto mb-16 max-w-2xl text-center text-gray-400">
        Simple, fast, and secure. follow these 4 steps to get started.
      </p>
      
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
              <step.icon className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
            <p className="text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
