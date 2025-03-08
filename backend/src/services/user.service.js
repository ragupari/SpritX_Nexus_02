import bcrypt from "bcrypt";
import pool from "../configs/mysql.js";

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

  async checkHost(email) {
    try {
      const [rows] = await this.pool.query(
        `SELECT * FROM ${this.tableName} WHERE email = ? AND admin = 1`,
        [email]
      );
      return rows.length > 0;
    } catch (error) {
      console.error("Error checking host status:", error);
      throw error;
    }
  }

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

  async checkAdmin(email, password) {
    try {
      const [rows] = await this.pool.query(
        `SELECT * FROM ${this.tableName} WHERE email = ? AND role = 'admin'`,
        [email]
      );

      if (rows.length === 0) {
        return { success: false, message: "❌ Invalid admin credentials!" };
      }

      const match = await bcrypt.compare(password, rows[0].password);
      if (match) return { success: true, user: rows[0] };

      return { success: false, message: "❌ Invalid admin credentials!" };
    } catch (error) {
      console.error("Error in checkAdmin:", error);
      return { success: false, message: "❌ Server error while checking admin!" };
    }
  }

  async checkUser(email, password) {
    try {
      const [rows] = await this.pool.query(
        `SELECT * FROM ${this.tableName} WHERE email = ? AND role = 'user'`,
        [email]
      );

      if (rows.length === 0) {
        return { success: false, message: "❌ Invalid user credentials!" };
      }

      const match = await bcrypt.compare(password, rows[0].password);
      if (match) return { success: true, user: rows[0] };

      return { success: false, message: "❌ Invalid user credentials!" };
    } catch (error) {
      console.error("Error in checkUser:", error);
      return { success: false, message: "❌ Server error while checking user!" };
    }
  }
}

export default new UserService();
