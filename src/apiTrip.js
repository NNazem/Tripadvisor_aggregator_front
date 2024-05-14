export async function publishLocation(latitude, longitude) {
  const url = `http://localhost:8080/locations/publish?latitude=${latitude}&longitude=${longitude}`;

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      console.log("Request succeeded");
    } else {
      console.log("Request failed with status:", response.status);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getLocations(page) {
  const url = `http://localhost:8080/locations?page=${page}`;

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.log("Request failed with status:", response.status);
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
