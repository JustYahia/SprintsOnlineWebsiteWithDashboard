import express from "express";
import {
    getMain,
    getLoginForm,
    getSignupForm,
    getShop,
    getCheckout,
    getDashboard,
    getCart,
    getDetails
} from "../controllers/viewController.js";
import { isLoggedIn } from "../controllers/authController.js";

const router = express.Router();

router.use(isLoggedIn);

router.get("/", getMain);
router.get("/login", getLoginForm);
router.get("/signup", getSignupForm);
router.get("/shop", getShop);
router.get("/checkout", getCheckout);
router.get("/dashboard", getDashboard);
// router.get("/cart", getCart);
router.get("/cart", getDetails);

export { router };
