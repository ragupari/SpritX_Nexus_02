import pool from "../configs/mysql.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

class AdminService {
    constructor() {
        this.pool = pool;
        this.tableName = "admins";
    }


async checkHost(email, password) {
    try {
        console.log("Checking host status...");
        console.log("Email:", email);

        // Fetch admin user by email and role
        const [rows] = await this.pool.query(
            `SELECT * FROM ${this.tableName} WHERE email = ?`,
            [email]
        );

        // Check if an admin user exists
        if (rows.length === 0) {
            return { success: false, message: "Admin not found" };
        }

        const admin = rows[0];
        console.log("Admin found:", admin);

        // Ensure password is present in the database
        if (!admin.password) {
            return { success: false, message: "Password not set for this admin" };
        }

        console.log("Stored password hash:", admin.password);

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return { success: false, message: "Incorrect password" };
        }

        // Generate JWT token upon successful authentication
        const token = jwt.sign(
            { email: admin.email, role: admin.role },
            jwtSecret,
            { expiresIn: "1h" }
        );

        return { success: true, message: "Login successful", token };

    } catch (error) {
        console.error("Error checking host status:", error);
        return { success: false, message: "Error checking admin credentials", error };
    }
}
}

export default new AdminService();