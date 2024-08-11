import React, { ReactElement } from "react";
import { Aircraft } from "../../types";
import { calculateAircraftUsage } from "../../helpers/calculateAircraftUsage";
import { useAppContext } from "../../context";

type AircraftItemProps = {
  aircraft: Aircraft;
};

export const AircraftItem = ({ aircraft }: AircraftItemProps): ReactElement => {
  const { selectedAircraft, flightUsage } = useAppContext();

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
