import { WhatsAppPayload } from "@/types";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";

export const generateWhatsAppLink = (payload?: WhatsAppPayload, customMessage?: string) => {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  
  let message = "";

  if (customMessage) {
    message = customMessage;
  } else if (payload) {
    message = `Hello, I want ${payload.productName} – ${payload.duration} – ${payload.price} ${payload.currency}`;
  } else {
    message = "Hello, I am interested in your services.";
  }

  const encodedMessage = encodeURIComponent(message);
  return `${baseUrl}?text=${encodedMessage}`;
};

export const openWhatsApp = (payload?: WhatsAppPayload, customMessage?: string) => {
  const link = generateWhatsAppLink(payload, customMessage);
  window.open(link, "_blank");
};
