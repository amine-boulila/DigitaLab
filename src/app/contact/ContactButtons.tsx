"use client";

import { openWhatsApp, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function ContactButton() {
  return (
    <button 
      onClick={() => openWhatsApp(undefined, "Hello, I have a question regarding your services.")}
      className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 group"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366]/20 transition-colors">
         <MessageCircle className="h-8 w-8 text-[#25D366]" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">WhatsApp Support</h3>
      <p className="text-sm text-gray-400">Instant response (+{WHATSAPP_NUMBER})</p>
    </button>
  );
}
