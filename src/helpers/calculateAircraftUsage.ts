import { twentyFourHrsInSecs } from "../constants";

export const calculateAircraftUsage = (flightUsage: number) => {
  return ((flightUsage / twentyFourHrsInSecs) * 100).toPrecision(2);
};
