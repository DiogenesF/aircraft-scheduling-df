import React, { ReactElement } from "react";
import { Flight } from "../../types";

type RotationItemProps = {
  rotationItem: Flight;
  rotationLength: number;
  index: number;
  handleRemoveFlight: () => void;
};

export const RotationItem = ({
  rotationItem,
  rotationLength,
  index,
  handleRemoveFlight,
}: RotationItemProps): ReactElement => {
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
