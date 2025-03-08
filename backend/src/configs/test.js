import pool from "./mysql.js"; // Import the connection from your main DB file

const test = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database Connected!");
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error.message);
  }
};

test();
