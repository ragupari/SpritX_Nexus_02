import mysql from "mysql2/promise";

// ✅ Hardcoded MySQL credentials (directly in code for testing)
const pool = mysql.createPool({
  host: "mysql-player-auction-player-auction.d.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_rMKp7DzBMRusP_jzf9b",
  database: "defaultdb",
  port: 11621,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Test MySQL Connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database Connected!");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error.message);
  }
})();

export default pool;
