import React from "react";

export const ColorsMeaning = () => {
  return (
    <div className="flex-space-evenly mt-10">
      <div>
        <span className="color-box bg-gray" />
        idle
      </div>
      <div>
        <span className="color-box bg-green" />
        scheduled service
      </div>
      <div>
        <span className="color-box bg-purple" />
        turnaround
      </div>
    </div>
  );
};
