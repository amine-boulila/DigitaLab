import { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { ProductDescription } from "@/components/ProductDescription";

import { ContactButton } from "./ContactButtons";

export const metadata: Metadata = {
  title: "Contact Us | Forjaw",
  description: "Get in touch with us related to sales or support.",
};

export default function ContactPage() {
  return (
    <div className="page-section min-h-screen">
      <SectionHeading
        align="center"
        description="Need help before or after your order? Reach out and our team will guide you quickly."
        eyebrow="Contact"
        title="Support channels with less friction."
      />

      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        <ContactButton />

        <a href="mailto:support@forjaw.com" className="block h-full">
          <Surface className="flex h-full cursor-pointer flex-col items-start justify-between p-8 transition hover:-translate-y-1">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Mail className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-950">
                Email support
              </h3>
              <ProductDescription
                description="Available for business inquiries and requests that need a written follow-up."
                limit={70}
              />
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              Email us now
              <MessageCircle className="h-4 w-4" />
            </div>
          </Surface>
        </a>
      </div>
    </div>
  );
}
