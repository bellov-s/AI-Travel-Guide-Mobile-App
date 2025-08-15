import { useState } from "react";
import { MainScreen } from "./components/MainScreen";
import { RouteScreen } from "./components/RouteScreen";
import { POIScreen } from "./components/POIScreen";

type Screen = "main" | "route" | "poi";

interface RouteData {
  city: string;
  theme: string;
  duration: string;
  persona: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("main");
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [currentPOI, setCurrentPOI] = useState<number | null>(null);

  const handleStartRoute = (data: RouteData) => {
    setRouteData(data);
    setCurrentScreen("route");
  };

  const handleApproachPOI = (poiId: number) => {
    setCurrentPOI(poiId);
    setCurrentScreen("poi");
  };

  const handleBackToRoute = () => {
    setCurrentScreen("route");
  };

  const handleMenu = () => {
    // In a real app, this would open a menu modal
    console.log("Menu opened");
  };

  const handleEndTour = () => {
    setCurrentScreen("main");
    setRouteData(null);
    setCurrentPOI(null);
  };

  return (
    <div className="size-full overflow-hidden">
      {currentScreen === "main" && (
        <MainScreen onStartRoute={handleStartRoute} />
      )}

      {currentScreen === "route" && routeData && (
        <RouteScreen
          routeData={routeData}
          onApproachPOI={handleApproachPOI}
          onMenu={handleMenu}
          onEndTour={handleEndTour}
        />
      )}

      {currentScreen === "poi" && currentPOI && (
        <POIScreen
          poiId={currentPOI}
          onBack={handleBackToRoute}
        />
      )}
    </div>
  );
}