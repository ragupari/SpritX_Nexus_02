export const fetchId = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/users/tokenauth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({}), // Ensure the API requires a body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched Data:", data);
    return data.id;
  } catch (error) {
    console.error("Error fetching player data:", error);
    return null;
  }
};
