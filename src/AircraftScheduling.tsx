import React from "react";
import "./AircraftScheduling.css";
import { AircraftsSection } from "./components/Aircrafts/AircraftsSection";
import { RotationSection } from "./components/Rotation/RotationSection";
import { FlightsSection } from "./components/Flights/FlightsSection";

export const AircraftScheduling = () => {
  return (
    <div className="text-center">
      <h1>Tomorrow's schedule</h1>

      <div className="flex-space-around gap-60">
        <AircraftsSection />

        <RotationSection />

        <FlightsSection />
      </div>
    </div>
  );
};
