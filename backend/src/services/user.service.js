import bcrypt from "bcrypt";
import pool from "../configs/mysql.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables
const jwtSecret = process.env.JWT_SECRET;

class UserService {
  constructor() {
    this.pool = pool;
    this.tableName = "users";
  }

  async getAll() {
    console.log("Executing getAll");
    try {
      console.log("Executing getAll method...");
      // Log the query being executed (for debugging purposes)
      console.log(`Executing query: SELECT * FROM ${this.tableName}`);
      
      // Execute the query to fetch all rows from the table
      const [rows] = await this.pool.query(`SELECT * FROM ??`, [this.tableName]);
  
      // Return the fetched rows
      return rows;
    } catch (error) {
      // Log error message if something goes wrong
      console.error("Error fetching users:", error);
  
      // Rethrow the error for higher-level handling
      throw error;
    }
  }
  

  async getAllSorted() {
    try {
      const [rows] = await this.pool.query(
        `SELECT * FROM ${this.tableName} ORDER BY createdAt DESC`
      );
      return rows;
    } catch (error) {
      console.error("Error fetching sorted users:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const [rows] = await this.pool.query(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      const [rows] = await this.pool.query(
        `SELECT * FROM ${this.tableName} WHERE email = ?`,
        [email]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Error getting user by email:", error);
      throw error;
    }
  }


// async checkHost(email, password) {
//     try {
//         console.log("Checking host status...");
//         console.log("Email:", email);

//         // Fetch admin user by email and role
//         const [rows] = await this.pool.query(
//             `SELECT * FROM ${this.tableName} WHERE email = ? AND role = 'admin'`,
//             [email]
//         );

//         // Check if an admin user exists
//         if (rows.length === 0) {
//             return { success: false, message: "Admin not found" };
//         }

//         const admin = rows[0];
//         console.log("Admin found:", admin);

//         // Ensure password is present in the database
//         if (!admin.password_hash) {
//             return { success: false, message: "Password not set for this admin" };
//         }

//         console.log("Stored password hash:", admin.password_hash);

//         // Compare the entered password with the stored hashed password
//         const isMatch = await bcrypt.compare(password, admin.password_hash);
//         if (!isMatch) {
//             return { success: false, message: "Incorrect password" };
//         }

//         // Generate JWT token upon successful authentication
//         const token = jwt.sign(
//             { email: admin.email, role: admin.role },
//             jwtSecret,
//             { expiresIn: "1h" }
//         );

//         return { success: true, message: "Login successful", token };

//     } catch (error) {
//         console.error("Error checking host status:", error);
//         return { success: false, message: "Error checking admin credentials", error };
//     }
// }
  

  async create(user) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const [result] = await this.pool.query(
        `INSERT INTO ${this.tableName} (email, password, role, createdAt) VALUES (?, ?, ?, NOW())`,
        [user.email, hashedPassword, user.role]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async update(id, user) {
    try {
      const { email, role } = user;
      const [result] = await this.pool.query(
        `UPDATE ${this.tableName} SET email = ?, role = ? WHERE id = ?`,
        [email, role, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      await this.pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  async getHosts() {
    try {
      const [rows] = await this.pool.query(
        `SELECT * FROM ${this.tableName} WHERE host = 1`
      );
      return rows;
    } catch (error) {
      console.error("Error fetching hosts:", error);
      throw error;
    }
  }

  async checkUser(email, password) {
    try {
        console.log("Checking user status...");
        console.log("Email:", email);

        // Fetch user by email and role
        const [rows] = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE email = ?`,
            [email]
        );

        // Check if a user exists
        if (rows.length === 0) {
            return { success: false, message: "❌ Invalid user credentials!" };
        }

        const user = rows[0];
        console.log("User found:", user);

        // Ensure password is present in the database
        if (!user.password) {
            return { success: false, message: "❌ Password not set for this user!" };
        }

        console.log("Stored password hash:", user.password);

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: "❌ Invalid user credentials!" };
        }

        // Generate JWT token upon successful authentication
        const token = jwt.sign(
            { email: user.email, role: user.role },
            jwtSecret,  // Make sure jwtSecret is properly defined
            { expiresIn: "1h" }
        );

        return { success: true, message: "✅ Login successful!", user, token };

    } catch (error) {
        console.error("Error in checkUser:", error);
        return { success: false, message: "❌ Server error while checking user!", error };
    }
}

}

export default new UserService();