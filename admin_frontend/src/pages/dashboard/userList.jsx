import React, { useEffect, useState } from "react";
import axios from "axios";

export function UserList () {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
        try {
          console.log("Sending request to fetch users...");  // Logging before the request
          const response = await axios.get("http://localhost:3000/api/users");
  
          // Log the response to see if the API is working fine
          console.log("API Response: ", response);
  
          // Check if the API response is successful
          if (response.status === 200) {
            setUsers(response.data);  // Set the users state with the data received from the API
            console.log("Users data: ", response.data); // Log the actual users data
          } else {
            console.error("Error: ", response.status);  // Handle non-200 status codes
            setError("Failed to fetch users. Status code: " + response.status);
          }
        } catch (err) {
          // Log any errors that occur during the API call
          console.error("Error fetching users:", err);
          setError("Error fetching users: " + err.message);  // Show the error message
        }
      };
  

    fetchUsers(); // Call the function when component mounts
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
