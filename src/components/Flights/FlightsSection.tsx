import React, { ReactElement } from "react";
import { Flight } from "../../types";
import { FlightItem } from "./FlightItem";

type FlightsSectionProps = {
  flights?: Flight[];
  handleAddNewFlight: (flight: Flight) => void;
};

export const FlightsSection = ({
  flights,
  handleAddNewFlight,
}: FlightsSectionProps): ReactElement => {
  return (
    <section id="flights" className="flex-grow-3 mr-60 max-w-20">
      <h2>Flights</h2>
      <div className="column">
        {flights ? (
          <ul>
            {flights.map((flight) => (
              <FlightItem
                key={flight.ident}
                flight={flight}
                handleAddNewFlight={handleAddNewFlight}
              />
            ))}
            {flights.length === 0 && (
              <p>No more flights available for tomorrow!</p>
            )}
          </ul>
        ) : (
          <div>Loading . . .</div>
        )}
      </div>
    </section>
  );
};
