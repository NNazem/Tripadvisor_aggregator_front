import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { publishLocation, getLocations } from "./apiTrip";
import "./index.css";

function App() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocations(page);
      setLocations(data);
    };

    fetchLocations();
  }, [page]);

  return (
    <div className="container">
      <Header />
      <Form />
      <Description />
      <LocationList locations={locations} setPage={setPage} page={page} />
    </div>
  );
}

function Description() {
  return (
    <h3 className="description">
      This is a list of locations fetched from the TripAdvisor API.
    </h3>
  );
}

function Form() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    publishLocation(latitude, longitude);
    setLatitude("");
    setLongitude("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Publish new locations to the database: </h3>
      <input
        placeholder="Latitude..."
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        placeholder="Longitude..."
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>TripAdvisor Aggregator</h1>
    </header>
  );
}

function LocationList({ locations, setPage, page }) {
  function handlePrevious() {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  }

  function handleNext() {
    setPage((prev) => prev + 1);
  }
  return (
    <>
      <table className="locationList">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Address short</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <Location
              key={location._id}
              name={location.name}
              address={location.address_obj}
              addressShort={location.address_short}
            />
          ))}
        </tbody>
      </table>
      <div className="pageButtons">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}

function Location({ name, address, addressShort }) {
  return (
    <tr className="location">
      <td>{name}</td>
      <td>{address.address_string}</td>
      <td>{addressShort}</td>
    </tr>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
