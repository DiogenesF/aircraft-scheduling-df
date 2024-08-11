import React, { ReactElement } from "react";
import { Flight } from "../../types";
import { useAppContext } from "../../context";
import { listNextAvailableFlights } from "../../helpers/listLextAvailableFlights";

type FlightItemProps = {
  flight: Flight;
};

export const FlightItem = ({ flight }: FlightItemProps): ReactElement => {
  const {
    rotation,
    allFlights,
    selectedAircraft,
    setFlightUsage,
    setRotation,
    setFilteredFlights,
    setAircraftTimeline,
  } = useAppContext();

  const handleAddNewFlight = (flightAdded: Flight) => {
    setRotation([...rotation, { ...flightAdded }]);

    setFilteredFlights(listNextAvailableFlights(flightAdded, allFlights));

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
    <li onClick={() => handleAddNewFlight(flight)} className="card py-20 px-40">
      <p className="mb-12">{flight.ident}</p>
      <div className="flex-column">
        <div className="flex-space-between flex-wrap">
          <span>{flight.origin}</span>
          <span>{flight.destination}</span>
        </div>
        <div className="flex-space-between flex-wrap">
          <span>{flight.readable_departure}</span>
          <span>{flight.readable_arrival}</span>
        </div>
      </div>
    </li>
  );
};
