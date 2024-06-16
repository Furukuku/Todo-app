import express from "express";
import {
  register,
  login,
  guest,
  auth
} from "../controllers/userController.js";
import { checkIfGuest, checkIfAuthenticated } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.get('/auth', checkIfAuthenticated, auth);
router.post('/register', register);
router.post('/login', login);
router.get('/guest', checkIfGuest, guest);

export default router;