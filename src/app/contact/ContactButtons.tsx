"use client";

import { openWhatsApp } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function ContactButton() {
  return (
    <button 
      onClick={() => openWhatsApp(undefined, "Hello, I have a question regarding your services.")}
      className="group flex h-full flex-col items-start justify-between rounded-[28px] border border-white/70 bg-white/85 p-8 text-left shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl transition hover:-translate-y-1"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]/12 transition-colors group-hover:bg-[#25D366]/18">
         <MessageCircle className="h-8 w-8 text-[#25D366]" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-slate-950">WhatsApp support</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The fastest path for questions, order confirmation, and delivery details.
        </p>
      </div>
      <p className="mt-6 text-sm font-medium text-slate-500">
        Instant response
      </p>
    </button>
  );
}
