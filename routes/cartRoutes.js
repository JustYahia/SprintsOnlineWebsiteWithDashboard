import express from "express";
import { getAllCarts, addToCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getAllCarts);
router.post("/", addToCart);
// router.patch("/:userId", cartController.decreaseQuantity);
// router.delete("/:userId", cartController.removeItem);

export { router };
