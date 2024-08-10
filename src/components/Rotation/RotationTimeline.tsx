import React, { ReactElement } from "react";
import { ColorsMeaning } from "./Timeline/ColorsMeaning";
import { TimeIntervalValues } from "./Timeline/TimeIntervalValues";
import { TimelineDetails } from "./Timeline/TimelineDetails";

type RotationTimelineProps = {
  aircraftTimeline: number[];
};

export const RotationTimeline = ({
  aircraftTimeline,
}: RotationTimelineProps): ReactElement => {
  return (
    <>
      <TimeIntervalValues />

      <TimelineDetails aircraftTimeline={aircraftTimeline} />

      <ColorsMeaning />
    </>
  );
};
