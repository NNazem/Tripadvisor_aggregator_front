import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export function publishTrip(latitude, longitude) {
  axios
    .get(
      "http://localhost:8080/locations/publish?latitude=" +
        latitude +
        "&longitude=" +
        longitude
    )
    .then((response) => {
      toast.success(response.data);
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred");
      }
    });
}
