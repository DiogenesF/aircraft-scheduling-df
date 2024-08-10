import { Flight } from "../types";

export const useGetAllFlights = (): {
  getAllFlights: () => Promise<Flight[]>;
} => {
  const getAllFlights = () => {
    return fetch(
      "https://recruiting-assessment.alphasights.com/api/flights"
    ).then((response) => response.json());
  };

  return { getAllFlights };
};
