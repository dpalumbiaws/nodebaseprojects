import { Router } from "express";
import userController from "../controllers/userController.js";
import { protect, admin } from "../middlewares/auth.js";

const router = Router();

// api/users
router
  .route("/")
  .get(protect, admin, userController.getUsers)
  .post(userController.registerUser);

// api/users/login
router.route("/login").post(userController.authUser);

// api/profile
router
  .route("/profile")
  .get(protect, userController.getUserProfile)
  .put(protect, userController.updateUserProfile)

// api/users/:id
router
  .route("/:id")
  .get(protect, admin, userController.getUserById)
  .delete(protect, admin,  userController.deleteUserById)
  .put(protect, admin, userController.updeateUserById);

export default router;
