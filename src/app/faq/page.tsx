import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | DigitalFun",
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
    <div className="container mx-auto min-h-screen px-4 py-12">
      <h1 className="mb-12 text-center text-4xl font-bold text-white">Frequently Asked Questions</h1>
      
      <div className="mx-auto max-w-3xl space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-3 text-xl font-bold text-white">{faq.question}</h3>
            <p className="text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
