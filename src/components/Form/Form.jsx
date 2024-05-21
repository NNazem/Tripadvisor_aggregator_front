import Button from "../Button/Button";
import styles from "./Form.module.css";
import { publishTrip } from "../../apis/apiPublish";
import { useState } from "react";

function Form() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const latitude = e.target.elements.latitude.value;
    const longitude = e.target.elements.longitude.value;
    publishTrip(latitude, longitude);
    handleReset();
  }

  function handleReset() {
    setLatitude("");
    setLongitude("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          id="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          id="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="primary">Submit</Button>
        <Button type="secondary" onClick={handleReset}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default Form;
