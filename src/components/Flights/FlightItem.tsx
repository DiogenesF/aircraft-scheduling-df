import React, { ReactElement } from "react";
import { Flight } from "../../types";

type FlightItemProps = {
  flight: Flight;
  handleAddNewFlight: (flight: Flight) => void;
};

export const FlightItem = ({
  flight,
  handleAddNewFlight,
}: FlightItemProps): ReactElement => {
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
