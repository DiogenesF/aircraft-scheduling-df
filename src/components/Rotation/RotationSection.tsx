import React, { ReactElement } from "react";
import { RotationItem } from "./RotationItem";
import { RotationTimeline } from "./RotationTimeline";
import { useAppContext } from "../../context";

export const RotationSection = (): ReactElement => {
  const { selectedAircraft, rotation } = useAppContext();

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
            />
          ))}
          {rotation.length === 0 && (
            <p className="mt-32">
              No flights added to the rotation yet! Click on a flight to add
            </p>
          )}
        </ul>
      </div>

      <RotationTimeline />
    </section>
  );
};
