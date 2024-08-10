import React, { ReactElement } from "react";
import { Aircraft } from "../../types";
import { calculateAircraftUsage } from "../../helpers/calculateAircraftUsage";

type AircraftItemProps = {
  aircraft: Aircraft;
  flightUsage: Record<Aircraft["ident"], number>;
  selectedAircraft?: Aircraft;
};

export const AircraftItem = ({
  aircraft,
  flightUsage,
  selectedAircraft,
}: AircraftItemProps): ReactElement => {
  const className = `card py-10 px-40 ${
    selectedAircraft?.ident === aircraft.ident ? "" : "disabled"
  }`;

  return (
    <li className={className}>
      <p>{aircraft.ident}</p>
      <p>{`(${calculateAircraftUsage(flightUsage[aircraft.ident] || 0)}%)`}</p>
    </li>
  );
};
