"use client";

import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

declare global {
  interface Window {
    __clarityInitialized?: boolean;
  }
}

export function MicrosoftClarity() {
  useEffect(() => {
    if (!CLARITY_PROJECT_ID || window.__clarityInitialized) {
      return;
    }

    Clarity.init(CLARITY_PROJECT_ID);
    window.__clarityInitialized = true;
  }, []);

  return null;
}
