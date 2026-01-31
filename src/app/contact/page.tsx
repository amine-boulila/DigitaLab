import { openWhatsApp, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { Metadata } from "next";
import { MessageCircle, Mail } from "lucide-react";
import Link from "next/link"; // Ensure Link is imported if used (not strictly used here but good practice)

import { ContactButton } from "./ContactButtons";

export const metadata: Metadata = {
  title: "Contact Us | DigitalFun",
  description: "Get in touch with us related to sales or support.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">Contact Us</h1>
        <p className="mb-12 text-gray-400">
          Have questions or need support? We are here to help you 24/7.
        </p>
        
        <div className="grid gap-6 sm:grid-cols-2">
            <ContactButton />
            
            <a href="mailto:support@DigitalFun.com" className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10">
              <Mail className="mb-4 h-10 w-10 text-indigo-400" />
              <h3 className="mb-2 text-xl font-bold text-white">Email Us</h3>
              <p className="text-sm text-gray-400">support@DigitalFun.com</p>
            </a>
        </div>
      </div>
    </div>
  );
}
