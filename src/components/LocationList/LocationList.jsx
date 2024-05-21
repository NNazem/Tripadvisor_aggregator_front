import { useEffect, useState } from "react";
import Location from "../Location/Location";
import styles from "./LocationList.module.css";
import Button from "../Button/Button";
import { fetchTrip, getNumberOfPages } from "../../apis/apiFetch";

const Locations = [
  {
    id: 1,
    name: "Test Location 1",
    distance: "1.234",
    bearing: "southwest",
    address_obj: {
      street1: "123 Test Street",
      city: "Test City",
      state: "Test State",
      country: "Test Country",
      postalcode: "12345",
      address_string:
        "123 Test Street, Test City, Test State, Test Country, 12345",
    },
    address_short:
      "123 Test Street, Test City, Test State, Test Country, 12345",
  },
  {
    id: 2,
    name: "Test Location 2",
    distance: "5.678",
    bearing: "north",
    address_obj: {
      street1: "456 Test Street",
      city: "Test City",
      state: "Test State",
      country: "Test Country",
      postalcode: "54321",
      address_string:
        "456 Test Street, Test City, Test State, Test Country, 54321",
    },
    address_short:
      "456 Test Street, Test City, Test State, Test Country, 54321",
  },
  {
    id: 3,
    name: "Test Location 2",
    distance: "5.678",
    bearing: "north",
    address_obj: {
      street1: "456 Test Street",
      city: "Test City",
      state: "Test State",
      country: "Test Country",
      postalcode: "54321",
      address_string:
        "456 Test Street, Test City, Test State, Test Country, 54321",
    },
    address_short:
      "456 Test Street, Test City, Test State, Test Country, 54321",
  },
];

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxePage] = useState("");

  useEffect(() => {
    fetchTrip(page).then((data) => setLocations(data));
  }, [page]);

  useEffect(() => {
    getNumberOfPages().then((data) => setMaxePage(Math.round(data / 10)));
  }, []);

  function handlePrevious() {
    setPage((page) => page - 1);
  }

  function handleNext() {
    setPage((page) => page + 1);
    console.log(page);
    console.log(maxPage);
  }

  return (
    <div className={styles.container}>
      <table className={styles.locationList}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Distanza</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <Location key={location.id} location={location} />
          ))}
        </tbody>
      </table>
      <div className={styles.buttons}>
        <Button
          type="third"
          onClick={handlePrevious}
          disabled={page === 0 ? true : false}
        >
          {" "}
          Previous
        </Button>
        <Button
          type="third"
          onClick={handleNext}
          disabled={page === maxPage ? true : false}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default LocationList;
