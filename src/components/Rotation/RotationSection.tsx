import React, { ReactElement } from "react";
import { Aircraft, Flight } from "../../types";
import { RotationItem } from "./RotationItem";
import { RotationTimeline } from "./RotationTimeline";

type RotationSectionProps = {
  selectedAircraft?: Aircraft;
  rotation: Flight[];
  aircraftTimeline: number[];
  handleRemoveFlight: () => void;
};

export const RotationSection = ({
  selectedAircraft,
  rotation,
  aircraftTimeline,
  handleRemoveFlight,
}: RotationSectionProps): ReactElement => {
  return (
    <section id="rotation" className="flex-grow-5">
      <h2>Rotation {selectedAircraft?.ident ?? ""}</h2>

      <div className="column h-66">
        <ul>
          {rotation.map((rotationItem, index) => (
            <RotationItem
              key={rotationItem.ident}
              index={index}
              rotationItem={rotationItem}
              rotationLength={rotation.length}
              handleRemoveFlight={handleRemoveFlight}
            />
          ))}
          {rotation.length === 0 && (
            <p className="mt-32">
              No flights added to the rotation yet! Click on a flight to add
            </p>
          )}
        </ul>
      </div>

      <RotationTimeline aircraftTimeline={aircraftTimeline} />
    </section>
  );
};
