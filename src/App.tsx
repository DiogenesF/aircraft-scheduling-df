import React, { useEffect, useState } from "react";
import "./App.css";
import { AircraftsSection } from "./components/Aircrafts/AircraftsSection";
import { RotationSection } from "./components/Rotation/RotationSection";
import { FlightsSection } from "./components/Flights/FlightsSection";
import { Aircraft, Flight } from "./types";
import { flightsFromOrigin } from "./helpers/flightsFromOrigin";
import { sortFlightsByDepartureTime } from "./helpers/sortFlights";
import { listNextAvailableFlights } from "./helpers/listLextAvailableFlights";
import { useGetAllFlights } from "./hooks/useGetAllFlights";
import { useGetAllAircrafts } from "./hooks/useGetAllAircrafts";

// Add these many states in a context, deal with loading

function App() {
  const [rotation, setRotation] = useState<Flight[]>([]);
  const [allFlights, setAllFlights] = useState<Flight[]>();
  const [flights, setFlights] = useState<Flight[]>();
  const [aircrafts, setAircrafts] = useState<Aircraft[]>();
  const [selectedAircraft, setSelectedAircraft] = useState(aircrafts?.[0]);
  const [flightUsage, setFlightUsage] = useState<
    Record<Aircraft["ident"], number>
  >({});
  const [aircraftTimeline, setAircraftTimeline] = useState<number[]>([]);

  const { getAllFlights } = useGetAllFlights();
  const { getAllAircrafts } = useGetAllAircrafts();

  useEffect(() => {
    getAllFlights().then((flightsData) => {
      setFlights(
        sortFlightsByDepartureTime(flightsFromOrigin("LFSB", flightsData))
      );
      setAllFlights(flightsData);
    });
    getAllAircrafts().then((aircraftsData) => {
      setSelectedAircraft(aircraftsData[0]);
      setAircrafts(aircraftsData);
    });
  }, []);

  const handleRemoveFlight = () => {
    const lastFlightIndex = rotation.length - 1;
    const newLastFlight = rotation[lastFlightIndex - 1];

    setRotation((prevState) => prevState.slice(0, lastFlightIndex));

    if (lastFlightIndex === 0) {
      setFlights(
        sortFlightsByDepartureTime(flightsFromOrigin("LFSB", allFlights))
      );
      setFlightUsage({ [selectedAircraft?.ident ?? ""]: 0 });
      setAircraftTimeline([]);
      return;
    }

    setFlights(listNextAvailableFlights(newLastFlight, allFlights));

    setFlightUsage((prevState) => {
      const ident = selectedAircraft?.ident ?? "";

      return {
        ...prevState,
        [ident]:
          prevState[ident] -
          (rotation[lastFlightIndex].arrivaltime -
            rotation[lastFlightIndex].departuretime),
      };
    });

    setAircraftTimeline((prevState) => {
      return [...prevState.slice(0, prevState.length - 2)];
    });
  };

  const handleAddNewFlight = (flightAdded: Flight) => {
    setRotation([...rotation, { ...flightAdded }]);

    setFlights(listNextAvailableFlights(flightAdded, allFlights));

    setAircraftTimeline((prevState) => [
      ...prevState,
      flightAdded.departuretime,
      flightAdded.arrivaltime,
    ]);

    setFlightUsage((prevState) => {
      const ident = selectedAircraft?.ident ?? "";

      return {
        ...prevState,
        [ident]:
          (prevState[ident] || 0) +
          (flightAdded.arrivaltime - flightAdded.departuretime),
      };
    });
  };

  return (
    <div className="text-center">
      <h1>Tomorrow's schedule</h1>

      <div className="flex-space-around gap-60">
        <AircraftsSection
          aircrafts={aircrafts}
          flightUsage={flightUsage}
          selectedAircraft={selectedAircraft}
        />

        <RotationSection
          aircraftTimeline={aircraftTimeline}
          rotation={rotation}
          selectedAircraft={selectedAircraft}
          handleRemoveFlight={handleRemoveFlight}
        />

        <FlightsSection
          flights={flights}
          handleAddNewFlight={handleAddNewFlight}
        />
      </div>
    </div>
  );
}

export default App;
