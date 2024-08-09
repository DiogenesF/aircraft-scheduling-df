import React, { useState } from "react";
import "./App.css";
import aircrafts from "./aircrafts.json";
import allFlights from "./flights.json";

type Flight = {
  ident: string;
  origin: string;
  destination: string;
  departuretime: number;
  arrivaltime: number;
  readable_departure: string;
  readable_arrival: string;
};

// MODULARIZE IT, GET DATA FROM THE API, IMPROVE CSS

const twentyMin = 20 * 60;
const twentyFourHours = 24 * 60 * 60;

function App() {
  const [rotation, setRotation] = useState<Flight[]>([]);
  const [flights, setFlights] = useState<Flight[]>(
    allFlights
      .filter((f) => f.origin === "LFSB")
      .sort((a, b) => a.departuretime - b.departuretime)
  );
  const [flightUsage, setFlightUsage] = useState({ [aircrafts[0].ident]: 0 });
  const [aicraftTimeline, setAircraftTimeline] = useState<number[]>([]);

  const handleRemoveFlightFromRotation = () => {
    const lastFlightIndex = rotation.length - 1;
    const newLastFlight = rotation[lastFlightIndex - 1] || {};

    setRotation((prevState) => prevState.slice(0, lastFlightIndex));

    if (lastFlightIndex === 0) {
      setFlights(
        allFlights
          .filter((f) => f.origin === "LFSB")
          .sort((a, b) => a.departuretime - b.departuretime)
      );
      setFlightUsage({ [aircrafts[0].ident]: 0 });
      setAircraftTimeline([]);
      return;
    }

    setFlights(
      allFlights
        .filter(
          (f) =>
            f.origin === newLastFlight.destination &&
            newLastFlight.arrivaltime + twentyMin < f.departuretime
        )
        .sort((a, b) => a.departuretime - b.departuretime)
    );

    setFlightUsage((prevState) => {
      return {
        ...prevState,
        [aircrafts[0].ident]:
          prevState[aircrafts[0].ident] -
          (rotation[lastFlightIndex].arrivaltime -
            rotation[lastFlightIndex].departuretime),
      };
    });

    setAircraftTimeline((prevState) => {
      return [...prevState.slice(0, prevState.length - 2)];
    });
  };

  const handleClickFlight = (flightAdded: Flight) => {
    setRotation([...rotation, { ...flightAdded }]);

    setFlights(
      allFlights
        .filter(
          (f) =>
            f.origin === flightAdded.destination &&
            flightAdded.arrivaltime + twentyMin < f.departuretime
        )
        .sort((a, b) => a.departuretime - b.departuretime)
    );

    setAircraftTimeline((prevState) => [
      ...prevState,
      flightAdded.departuretime,
      flightAdded.arrivaltime,
    ]);

    setFlightUsage((prevState) => {
      return {
        ...prevState,
        [aircrafts[0].ident]:
          prevState[aircrafts[0].ident] +
          flightAdded.arrivaltime -
          flightAdded.departuretime,
      };
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Tomorrow's schedule</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "60px",
        }}
      >
        <div
          id="aircrafts"
          style={{ flexGrow: 2, marginLeft: "60px", maxWidth: "15vw" }}
        >
          <h2>Aircrafts</h2>
          <div className="column">
            <ul>
              {aircrafts.map((aircraft, index) => (
                <li
                  key={aircraft.ident}
                  className={`card ${index !== 0 ? "disabled" : ""}`}
                  style={{
                    padding: "10px 40px",
                    borderRadius: "8px",
                    border: "2px solid gray",
                    marginBottom: "8px",
                  }}
                >
                  <p>{aircraft.ident}</p>
                  <p>
                    {`(${(
                      ((flightUsage[aircraft.ident] || 0) / twentyFourHours) *
                      100
                    ).toPrecision(2)}%)`}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="rotation" style={{ flexGrow: 5 }}>
          <h2>Rotation {aircrafts[0].ident}</h2>
          <div style={{ height: "66vh" }} className="column">
            <ul>
              {rotation.map((v, index) => (
                <li
                  key={v.ident}
                  className="card"
                  style={{
                    cursor: "auto",
                    padding: "20px",
                    borderRadius: "8px",
                    border: "2px solid gray",
                    marginBottom: "8px",
                  }}
                >
                  <p style={{ marginBottom: "16px" }}>Rotation {v.ident}</p>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Origin: {v.origin}</span>
                      <span>→</span>
                      <span>Destination: {v.destination}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Departure: {v.readable_departure}</span>
                      <span>Arrival: {v.readable_arrival}</span>
                    </div>
                  </div>
                  {index === rotation.length - 1 && (
                    <button
                      style={{
                        color: "red",
                        padding: "10px",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                      onClick={handleRemoveFlightFromRotation}
                    >
                      Remove flight
                    </button>
                  )}
                </li>
              ))}
              {rotation.length === 0 && (
                <p style={{ marginTop: "32px" }}>
                  No flights added to the rotation yet! Click on a flight to add
                </p>
              )}
            </ul>
          </div>
          <div
            style={{
              marginTop: "20px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p style={{ margin: 0 }}>00:00</p>
            <p style={{ margin: 0 }}>12:00</p>
            <p style={{ margin: 0 }}>23:59</p>
          </div>
          <div
            style={{
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "8px",
              backgroundColor: "#888686",
              height: "48px",
              borderRadius: "2px",
              display: "flex",
              position: "relative",
            }}
          >
            {aicraftTimeline.map((time, index) => (
              <div
                key={index}
                style={{
                  zIndex: aicraftTimeline.length - index,
                  position: "absolute",
                  width: `${(time / twentyFourHours) * 100}%`,
                  backgroundColor:
                    index === 0
                      ? "#888686"
                      : index % 2 === 0
                      ? "purple"
                      : "green",
                  height: "100%",
                }}
              />
            ))}
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  height: "15px",
                  width: "15px",
                  backgroundColor: "#888686",
                  marginRight: "8px",
                }}
              />
              idle
            </div>
            <div>
              <span
                style={{
                  display: "inline-block",
                  height: "15px",
                  width: "15px",
                  backgroundColor: "green",
                  marginRight: "8px",
                }}
              />
              scheduled service
            </div>
            <div>
              <span
                style={{
                  display: "inline-block",
                  height: "15px",
                  width: "15px",
                  backgroundColor: "purple",
                  marginRight: "8px",
                }}
              />
              <span>turnaround</span>
            </div>
          </div>
        </div>

        <div
          id="flights"
          style={{
            flexGrow: 3,
            marginRight: "60px",
            maxWidth: "20vw",
          }}
        >
          <h2>Flights</h2>
          <div className="column">
            <ul>
              {flights.map((flight) => (
                <li
                  onClick={() => handleClickFlight(flight)}
                  className="card"
                  key={flight.ident}
                  style={{
                    padding: "20px 40px",
                    borderRadius: "8px",
                    border: "2px solid gray",
                    marginBottom: "8px",
                  }}
                >
                  <p style={{ marginBottom: "12px" }}>{flight.ident}</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <span>{flight.origin}</span>
                      <span>{flight.destination}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <span>{flight.readable_departure}</span>
                      <span>{flight.readable_arrival}</span>
                    </div>
                  </div>
                </li>
              ))}
              {flights.length === 0 && (
                <p>No more flights available for tomorrow!</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
