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
      <LocationBox locations={locations} setPage={setPage} page={page} />
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

function LocationBox({ locations, setPage, page }) {
  const [sort, setSort] = useState("name");

  let sortedLocations;

  if (sort === "name")
    sortedLocations = locations
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));

  if (sort === "address")
    sortedLocations = locations
      .slice()
      .sort((a, b) =>
        a.address_obj.address_string.localeCompare(b.address_obj.address_string)
      );

  function handlePrevious() {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  }

  function handleNext() {
    setPage((prev) => prev + 1);
  }

  function handleSort(e) {
    setSort(e.target.value);
  }

  return (
    <>
      <select onChange={handleSort} className="sortSelect">
        <option value="name">Name</option>
        <option value="address">Address</option>
      </select>
      <LocationTable locations={sortedLocations} />
      <div className="pageButtons">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}

function LocationTable({ locations }) {
  return (
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
