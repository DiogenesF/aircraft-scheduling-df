import { twentyMinsInSecs } from "../constants";
import { Flight } from "../types";
import { sortFlightsByDepartureTime } from "./sortFlights";

export const listNextAvailableFlights = (
  flightAdded: Flight,
  allFlights?: Flight[]
) => {
  return sortFlightsByDepartureTime(
    allFlights?.filter(
      (f) =>
        f.origin === flightAdded.destination &&
        flightAdded.arrivaltime + twentyMinsInSecs < f.departuretime
    ) || []
  );
};
