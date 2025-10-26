import express from "express";
import {
  deleteUserController,
  getFullOuterJoinController,
  getInnereJoinController,
  getLeftJoinController,
  getMeController,
  getRightJoinController,
  getUserController,
  updateUserController,
} from "../Controller/userController.js";
import validateToken from "../Middleware/validateToken.js";

const router = express.Router();
router.get("/getme", validateToken, getMeController);
router.get("/getuser", getUserController);
router.put("/updateuser/:id", updateUserController);
router.delete("/deleteuser/:id", deleteUserController);

router.get("/innerjoin", getInnereJoinController);
router.get("/leftjoin", getLeftJoinController);
router.get("/rightjoin", getRightJoinController);
router.get("/fullouter", getFullOuterJoinController);

export default router;
