import React, { ReactElement } from "react";
import { AircraftItem } from "./AircraftItem";
import { useAppContext } from "../../context";

export const AircraftsSection = (): ReactElement => {
  const { aircrafts } = useAppContext();

  return (
    <section id="aircrafts" className="flex-grow-2 ml-60 max-w-15">
      <h2>Aircrafts</h2>
      <div className="column">
        {aircrafts ? (
          <ul>
            {aircrafts.map((aircraft) => (
              <AircraftItem aircraft={aircraft} key={aircraft.ident} />
            ))}
          </ul>
        ) : (
          <div>Loading . . .</div>
        )}
      </div>
    </section>
  );
};
