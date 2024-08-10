export type Aircraft = {
  ident: string;
  type: string;
  economySeats: number;
  base: string;
};

export type Flight = {
  ident: string;
  origin: string;
  destination: string;
  departuretime: number;
  arrivaltime: number;
  readable_departure: string;
  readable_arrival: string;
};
