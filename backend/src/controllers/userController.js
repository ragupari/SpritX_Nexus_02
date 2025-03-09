// controllers/userController.js
import UserService from "../services/user.service.js"; // Import the service
import AdminService from "../services/admin.service.js";

const userController = {
  getAllUsers: async (req, res) => {
    console.log("getAllUsers controller called"); // Check if this log is printed'
    try {
      console.log("getAllUsers controller....."); 
      const users = await UserService.getAll();
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      res.json(users);
    } catch (error) {
      console.error("Error fetching users xxxx:", error);
      console.log("Error fetching users xxxx:", error);
      res.status(500).json({ message: "Error fetching users xxx", error });
    }
  },

  getUserById: async (req, res) => {
    console.log("getUserById controller called"); // Check if this log is printed
    try {
      const user = await UserService.getById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ message: "Error fetching user", error });
    }
  },
  createUser: async (req, res) => {
    console.log("createUser controller called"); // Check if this log is printed
    try {
      const createQuery = await UserService.create(req.body);
      
      if (createQuery.success) {
        // If success, send response
        return res.status(201).json({ success: true, message: "User created successfully",});
      }

      // If failure, send response
      return res.status(400).json({ success: false, message: createQuery.message });

    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ success: false, message: "Error in creating user" });
    }
  },

  tokenAuth: async (req, res) => {
    try {
      const tokenAuthentify = await UserService.tokenAuth(req);
      
      if (tokenAuthentify.success) {
        // If success, send response
        return res.status(200).json({ id: tokenAuthentify.id });
      }
  
      // If failure, send response
      return res.status(400).json({ message: tokenAuthentify.message });
  
    } catch (error) {
      console.error("Error authenticating token:", error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },


  login: async (req, res) => {
    console.log("login controller called"); // Check if this log is printed
    try {
      const { email, password, role } = req.body;
      const result = role === "admin" 
        ? await AdminService.checkHost(email, password) 
        : await UserService.checkUser(email, password);

      if (result.success) {
        res.json(result);
      } else {
        res.status(401).json(result);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Error logging in", error });
    }
  },

  deleteUser: async (req, res) => {
    console.log("deleteUser controller called"); // Check if this log is printed
    try {
      await UserService.delete(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user", error });
    }
  },
};

export default userController;
