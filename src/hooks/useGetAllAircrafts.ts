import { Aircraft } from "../types";

export const useGetAllAircrafts = (): {
  getAllAircrafts: () => Promise<Aircraft[]>;
} => {
  const getAllAircrafts = () => {
    return fetch(
      "https://recruiting-assessment.alphasights.com/api/aircrafts"
    ).then((response) => response.json());
  };

  return { getAllAircrafts };
};
