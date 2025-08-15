import { useState } from "react";
import { Button } from "./ui/button";
import { MapPin, Menu, Square, Clock, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RouteData {
  city: string;
  theme: string;
  duration: string;
  persona: string;
}

interface RouteScreenProps {
  routeData: RouteData;
  onApproachPOI: (poiId: number) => void;
  onMenu: () => void;
  onEndTour: () => void;
}

const mockPOIs = [
  { id: 1, name: "Notre Dame Cathedral", x: 30, y: 40 },
  { id: 2, name: "Louvre Museum", x: 60, y: 30 },
  { id: 3, name: "Arc de Triomphe", x: 45, y: 70 },
  { id: 4, name: "Eiffel Tower", x: 25, y: 80 }
];

export function RouteScreen({ routeData, onApproachPOI, onMenu, onEndTour }: RouteScreenProps) {
  const [currentPOI, setCurrentPOI] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const handlePOIClick = (poiId: number) => {
    onApproachPOI(poiId);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col ai-fade-in">
      {/* Top Panel */}
      <div className="bg-white border-b border-border p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-primary">
            {routeData.city} - {routeData.theme}
          </h3>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-sm text-muted-foreground">
              {isActive ? 'Active' : 'Paused'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {routeData.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {routeData.persona}
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-secondary/20 to-secondary/10 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=400&fit=crop"
          alt="City map"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        {/* POI Markers */}
        {mockPOIs.map((poi, index) => (
          <button
            key={poi.id}
            onClick={() => handlePOIClick(poi.id)}
            className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              index === currentPOI 
                ? 'bg-primary text-white animate-pulse' 
                : 'bg-white text-primary hover:bg-primary hover:text-white'
            }`}
            style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
          >
            <MapPin className="w-4 h-4" />
          </button>
        ))}

        {/* Route Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d={`M ${mockPOIs[0].x * 4}% ${mockPOIs[0].y * 4}% Q ${mockPOIs[1].x * 4}% ${mockPOIs[1].y * 4}% ${mockPOIs[2].x * 4}% ${mockPOIs[2].y * 4}% T ${mockPOIs[3].x * 4}% ${mockPOIs[3].y * 4}%`}
            stroke="#D4A373"
            strokeWidth="3"
            strokeDasharray="8,4"
            fill="none"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Bottom Fact Panel */}
      <div className="ai-map-panel m-4">
        <h4 className="mb-2">Did you know?</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The {routeData.city} area you're exploring has over 2,000 years of history. 
          Each location on your route tells a unique story connecting past and present.
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="bg-white border-t border-border p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onMenu}
            className="ai-secondary-button flex items-center gap-2"
          >
            <Menu className="w-4 h-4" />
            Menu
          </Button>
          <Button
            onClick={onEndTour}
            className="ai-primary-button flex items-center gap-2"
          >
            <Square className="w-4 h-4" />
            End Tour
          </Button>
        </div>
      </div>
    </div>
  );
}