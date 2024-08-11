import React, { ReactElement } from "react";
import { ColorsMeaning } from "./Timeline/ColorsMeaning";
import { TimeIntervalValues } from "./Timeline/TimeIntervalValues";
import { TimelineDetails } from "./Timeline/TimelineDetails";

export const RotationTimeline = (): ReactElement => {
  return (
    <>
      <TimeIntervalValues />

      <TimelineDetails />

      <ColorsMeaning />
    </>
  );
};
