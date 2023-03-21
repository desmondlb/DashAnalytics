import express, { Router } from "express";
import { getProducts, getCustomers, getTransactions, getGeography} from "../controllers/client.js"


const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography); // All country values exist in the user
// so we don't need to create a new model for this

export default router;