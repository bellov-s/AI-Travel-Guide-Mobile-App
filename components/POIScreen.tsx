"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Volume2, Mic } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface POIScreenProps {
  poiId: number;
  onBack: () => void;
}

const poiData = {
  1: {
    name: "Notre Dame Cathedral",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop",
    facts: "This Gothic masterpiece took nearly 200 years to complete. The cathedral's flying buttresses were revolutionary for their time, allowing for massive windows that flood the interior with colored light. Victor Hugo's novel helped save it from demolition in the 19th century.",
  },
  2: {
    name: "Louvre Museum",
    image: "https://images.unsplash.com/photo-1566139992631-52040cf7eadf?w=600&h=400&fit=crop",
    facts: "Originally a royal palace, the Louvre became a museum during the French Revolution. Home to over 35,000 works including the Mona Lisa, it's the world's most visited museum. The famous glass pyramid entrance was added in 1989 by architect I.M. Pei.",
  },
  3: {
    name: "Arc de Triomphe",
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c23a?w=600&h=400&fit=crop",
    facts: "Napoleon commissioned this arch to honor his Grande Armée. Standing 50 meters tall, it offers panoramic views of Paris. The Tomb of the Unknown Soldier lies beneath, with an eternal flame rekindled every evening at 6:30 PM.",
  },
  4: {
    name: "Eiffel Tower",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&h=400&fit=crop",
    facts: "Built for the 1889 World's Fair, this iron lattice tower was initially criticized by Parisians. At 330 meters tall, it was the world's tallest structure until 1930. It sways up to 6 centimeters in strong wind and grows 15 centimeters taller in summer heat.",
  }
};

export function POIScreen({ poiId, onBack }: POIScreenProps) {
  const [isListening, setIsListening] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const poi = poiData[poiId as keyof typeof poiData];

  const handleListen = () => {
    setIsListening(true);
    // Simulate audio playback
    setTimeout(() => setIsListening(false), 3000);
  };

  const handleAskQuestion = () => {
    setShowQuestionModal(true);
    setQuestion("Tell me about the architecture");
    // Simulate AI response
    setTimeout(() => {
      setAnswer("The architecture represents a perfect example of Gothic style, featuring pointed arches, ribbed vaults, and flying buttresses that distribute weight efficiently while allowing for large windows.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background ai-fade-in">
      {/* Header */}
      <div className="relative">
        <Button
          variant="ghost"
          onClick={onBack}
          className="absolute top-4 left-4 z-10 bg-white/90 hover:bg-white rounded-full p-2"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </Button>
        
        <div className="ai-poi-card m-0 rounded-none">
          <ImageWithFallback
            src={poi.image}
            alt={poi.name}
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h1 className="mb-4">{poi.name}</h1>
        
        <div className="ai-poi-card p-4 mb-6">
          <p className="leading-relaxed">{poi.facts}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleListen}
            disabled={isListening}
            className={`w-full h-14 ai-primary-button flex items-center justify-center gap-3 ${
              isListening ? 'opacity-75' : ''
            }`}
          >
            <Volume2 className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
            {isListening ? 'Playing...' : 'Listen'}
          </Button>

          <Dialog open={showQuestionModal} onOpenChange={setShowQuestionModal}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAskQuestion}
                className="w-full h-14 ai-secondary-button flex items-center justify-center gap-3"
              >
                <Mic className="w-5 h-5" />
                Ask a Question
              </Button>
            </DialogTrigger>
            <DialogContent className="ai-modal ai-slide-up mx-4">
              <DialogHeader>
                <DialogTitle className="text-center">Your Question</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <div className="mb-4">
                  <div className="bg-secondary/20 rounded-lg p-3 mb-4">
                    <p className="text-sm">"{question}"</p>
                  </div>
                  {answer && (
                    <div className="bg-primary/5 rounded-lg p-3">
                      <p className="text-sm leading-relaxed">{answer}</p>
                    </div>
                  )}
                  {!answer && (
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground italic">Thinking...</p>
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => setShowQuestionModal(false)}
                  className="w-full ai-primary-button"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={onBack}
            variant="outline"
            className="w-full h-12 ai-secondary-button"
          >
            Back to Route
          </Button>
        </div>
      </div>
    </div>
  );
}