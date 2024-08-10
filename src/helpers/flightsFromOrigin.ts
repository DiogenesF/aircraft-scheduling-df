import { Flight } from "../types";

export const flightsFromOrigin = (
  origin: Flight["origin"],
  allFlights?: Flight[]
): Flight[] => {
  return allFlights?.filter((f) => f.origin === origin) ?? [];
};
