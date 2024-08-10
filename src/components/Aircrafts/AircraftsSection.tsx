import React, { ReactElement } from "react";
import { Aircraft } from "../../types";
import { AircraftItem } from "./AircraftItem";

type AircraftsSectionProps = {
  aircrafts?: Aircraft[];
  flightUsage: Record<Aircraft["ident"], number>;
  selectedAircraft?: Aircraft;
};

export const AircraftsSection = ({
  aircrafts,
  flightUsage,
  selectedAircraft,
}: AircraftsSectionProps): ReactElement => {
  return (
    <section id="aircrafts" className="flex-grow-2 ml-60 max-w-15">
      <h2>Aircrafts</h2>
      <div className="column">
        {aircrafts ? (
          <ul>
            {aircrafts.map((aircraft) => (
              <AircraftItem
                aircraft={aircraft}
                flightUsage={flightUsage}
                selectedAircraft={selectedAircraft}
                key={aircraft.ident}
              />
            ))}
          </ul>
        ) : (
          <div>Loading . . .</div>
        )}
      </div>
    </section>
  );
};
