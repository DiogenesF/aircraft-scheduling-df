import React, { ReactElement } from "react";
import { Flight } from "../../types";
import { useAppContext } from "../../context";
import { sortFlightsByDepartureTime } from "../../helpers/sortFlights";
import { flightsFromOrigin } from "../../helpers/flightsFromOrigin";
import { listNextAvailableFlights } from "../../helpers/listLextAvailableFlights";

type RotationItemProps = {
  rotationItem: Flight;
  index: number;
};

export const RotationItem = ({
  rotationItem,
  index,
}: RotationItemProps): ReactElement => {
  const {
    rotation,
    allFlights,
    selectedAircraft,
    setRotation,
    setFlightUsage,
    setFilteredFlights,
    setAircraftTimeline,
  } = useAppContext();

  const rotationLength = rotation.length;

  const handleRemoveFlight = () => {
    const lastFlightIndex = rotation.length - 1;
    const newLastFlight = rotation[lastFlightIndex - 1];

    setRotation((prevState) => prevState.slice(0, lastFlightIndex));

    if (lastFlightIndex === 0) {
      setFilteredFlights(
        sortFlightsByDepartureTime(flightsFromOrigin("LFSB", allFlights))
      );
      setFlightUsage({ [selectedAircraft?.ident ?? ""]: 0 });
      setAircraftTimeline([]);
      return;
    }

    setFilteredFlights(listNextAvailableFlights(newLastFlight, allFlights));

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

  return (
    <li className="card p-20 cursor-auto">
      <p className="mb-16">Rotation {rotationItem.ident}</p>
      <div className="flex-column">
        <div className="flex-space-between">
          <span>Origin: {rotationItem.origin}</span>
          <span>→</span>
          <span>Destination: {rotationItem.destination}</span>
        </div>
        <div className="flex-space-between">
          <span>Departure: {rotationItem.readable_departure}</span>
          <span>Arrival: {rotationItem.readable_arrival}</span>
        </div>
      </div>
      {index === rotationLength - 1 && (
        <button className="remove-btn" onClick={handleRemoveFlight}>
          Remove flight
        </button>
      )}
    </li>
  );
};
