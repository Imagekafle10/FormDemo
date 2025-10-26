import express from "express";

import {
  loginController,
  registerController,
} from "../Controller/authController.js";

const router = express.Router();

router.post("/post", registerController);
router.post("/login", loginController);

export default router;
