import axios from "axios";

export async function fetchTrip(page = 0) {
  try {
    const response = await axios.get(
      "http://localhost:8080/locations?page=" + page
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getNumberOfPages() {
  try {
    const response = await axios.get(
      "http://localhost:8080/locations/getLocationsNumber"
    );
    return response.data;
  } catch (error) {
    return error;
  }
}
