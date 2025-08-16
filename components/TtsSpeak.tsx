// components/TtsSpeak.tsx
"use client";

import { useRef, useState } from "react";

export default function TtsSpeak({ text }: { text: string }) {
  const [speaking, setSpeaking] = useState(false);
  const uRef = useRef<SpeechSynthesisUtterance | null>(null);

  const toggle = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-Speech is not supported in this browser.");
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.0;
    u.pitch = 1.0;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    uRef.current = u;
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="px-3 py-1.5 rounded-md border bg-primary text-primary-foreground text-xs"
    >
      {speaking ? "Stop" : "Speak"}
    </button>
  );
}
