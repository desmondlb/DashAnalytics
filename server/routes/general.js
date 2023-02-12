import express, { Router } from "express";
import { getUser } from "../controllers/general.js";

const router = express.Router();
router.get("/user/:id", getUser);
// getuser will be a function coming from the controllers

export default router;