import { Flight } from "../types";

export const sortFlightsByDepartureTime = (allFlights?: Flight[]): Flight[] => {
  return allFlights?.sort((a, b) => a.departuretime - b.departuretime) ?? [];
};
