import React, { ReactElement } from "react";
import { twentyFourHrsInSecs } from "../../../constants";
import { calculatePercentage } from "../../../helpers/calculatePercentage";
import { useAppContext } from "../../../context";

export const TimelineDetails = (): ReactElement => {
  const { aircraftTimeline } = useAppContext();

  const className = (index: number): string => {
    if (index === 0) return "timeline-item bg-gray";
    return index % 2 === 0
      ? "timeline-item bg-purple"
      : "timeline-item bg-green";
  };

  return (
    <div className="timeline">
      {aircraftTimeline.map((time, index) => (
        <div
          className={className(index)}
          key={time}
          style={{
            zIndex: aircraftTimeline.length - index,
            width: `${calculatePercentage(time, twentyFourHrsInSecs)}%`,
          }}
        />
      ))}
    </div>
  );
};
