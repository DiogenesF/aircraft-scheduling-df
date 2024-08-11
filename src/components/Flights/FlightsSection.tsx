import React, { ReactElement } from "react";
import { FlightItem } from "./FlightItem";
import { useAppContext } from "../../context";

export const FlightsSection = (): ReactElement => {
  const { filteredFlights } = useAppContext();

  return (
    <section id="flights" className="flex-grow-3 mr-60 max-w-20">
      <h2>Flights</h2>
      <div className="column">
        {filteredFlights ? (
          <ul>
            {filteredFlights.map((flight) => (
              <FlightItem key={flight.ident} flight={flight} />
            ))}
            {filteredFlights.length === 0 && (
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
