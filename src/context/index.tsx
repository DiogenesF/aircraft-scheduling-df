import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Aircraft, Flight } from "../types";
import { useGetAllFlights } from "../hooks/useGetAllFlights";
import { useGetAllAircrafts } from "../hooks/useGetAllAircrafts";
import { sortFlightsByDepartureTime } from "../helpers/sortFlights";
import { flightsFromOrigin } from "../helpers/flightsFromOrigin";

const AppContext = createContext({} as AppProviderData);

type AppProviderData = {
  rotation: Flight[];
  allFlights?: Flight[];
  filteredFlights?: Flight[];
  aircrafts?: Aircraft[];
  selectedAircraft?: Aircraft;
  aircraftTimeline: number[];
  flightUsage: Record<Aircraft["ident"], number>;
  setRotation: Dispatch<SetStateAction<Flight[]>>;
  setAircraftTimeline: Dispatch<SetStateAction<number[]>>;
  setFlightUsage: Dispatch<SetStateAction<Record<Aircraft["ident"], number>>>;
  setFilteredFlights: Dispatch<SetStateAction<Flight[] | undefined>>;
};

type AppProviderProps = {
  children: ReactElement;
};

export const AppProvider = ({ children }: AppProviderProps): ReactElement => {
  const [rotation, setRotation] = useState<Flight[]>([]);
  const [allFlights, setAllFlights] = useState<Flight[]>();
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>();
  const [aircrafts, setAircrafts] = useState<Aircraft[]>();
  const [selectedAircraft, setSelectedAircraft] = useState(aircrafts?.[0]);
  const [aircraftTimeline, setAircraftTimeline] = useState<number[]>([]);
  const [flightUsage, setFlightUsage] = useState<
    Record<Aircraft["ident"], number>
  >({});

  const { getAllFlights } = useGetAllFlights();
  const { getAllAircrafts } = useGetAllAircrafts();

  useEffect(() => {
    getAllFlights().then((flightsData) => {
      setFilteredFlights(
        sortFlightsByDepartureTime(flightsFromOrigin("LFSB", flightsData))
      );
      setAllFlights(flightsData);
    });
    getAllAircrafts().then((aircraftsData) => {
      setSelectedAircraft(aircraftsData[0]);
      setAircrafts(aircraftsData);
    });
  }, []);

  const appProviderValue = useMemo(
    () => ({
      rotation,
      allFlights,
      filteredFlights,
      aircrafts,
      selectedAircraft,
      aircraftTimeline,
      flightUsage,
      setRotation,
      setAircraftTimeline,
      setFlightUsage,
      setFilteredFlights,
    }),
    [
      rotation,
      allFlights,
      filteredFlights,
      aircrafts,
      selectedAircraft,
      aircraftTimeline,
      flightUsage,
    ]
  );

  return (
    <AppContext.Provider value={appProviderValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppProviderData => useContext(AppContext);
