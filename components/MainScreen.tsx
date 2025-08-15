import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

interface MainScreenProps {
  onStartRoute: (routeData: {
    city: string;
    theme: string;
    duration: string;
    persona: string;
  }) => void;
}

export function MainScreen({ onStartRoute }: MainScreenProps) {
  const [city, setCity] = useState("");
  const [theme, setTheme] = useState("");
  const [duration, setDuration] = useState("");
  const [persona, setPersona] = useState("");

  const handleStart = () => {
    if (city && theme && duration && persona) {
      onStartRoute({ city, theme, duration, persona });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 ai-fade-in">
      <div className="max-w-sm mx-auto pt-16">
        <h1 className="text-center mb-12">Choose Your Route</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger id="city" className="h-12 bg-white border-2 border-border rounded-lg">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="rome">Rome</SelectItem>
                <SelectItem value="tokyo">Tokyo</SelectItem>
                <SelectItem value="barcelona">Barcelona</SelectItem>
                <SelectItem value="london">London</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme" className="text-sm font-medium">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme" className="h-12 bg-white border-2 border-border rounded-lg">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="history">Historical Sites</SelectItem>
                <SelectItem value="culture">Cultural Experience</SelectItem>
                <SelectItem value="food">Culinary Journey</SelectItem>
                <SelectItem value="architecture">Architecture</SelectItem>
                <SelectItem value="nature">Nature & Parks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-medium">Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration" className="h-12 bg-white border-2 border-border rounded-lg">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2hours">2 Hours</SelectItem>
                <SelectItem value="halfday">Half Day</SelectItem>
                <SelectItem value="fullday">Full Day</SelectItem>
                <SelectItem value="weekend">Weekend</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="persona" className="text-sm font-medium">Guide Persona</Label>
            <Select value={persona} onValueChange={setPersona}>
              <SelectTrigger id="persona" className="h-12 bg-white border-2 border-border rounded-lg">
                <SelectValue placeholder="Select guide voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="historian">Historian</SelectItem>
                <SelectItem value="local">Local Friend</SelectItem>
                <SelectItem value="storyteller">Storyteller</SelectItem>
                <SelectItem value="expert">Expert Guide</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-12">
          <Button
            onClick={handleStart}
            disabled={!city || !theme || !duration || !persona}
            className="w-full h-14 ai-primary-button text-white"
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}