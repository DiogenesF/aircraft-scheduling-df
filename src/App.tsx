import React from "react";
import { AircraftScheduling } from "./AircraftScheduling";
import { AppProvider } from "./context";

function App() {
  return (
    <AppProvider>
      <AircraftScheduling />
    </AppProvider>
  );
}

export default App;
