import { async } from "regenerator-runtime";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import Cart from "../models/cartModel.js";
import { getAllCarts } from "./cartController.js";

export const getMain = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).render("main", {
    title: "| Home",
    products,
  });
});

export const getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "| Log In",
  });
};

export const getSignupForm = (req, res) => {
  res.status(200).render("signup", {
    title: "| Sign Up",
  });
};

export const getShop = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).render("shop", {
    title: "| Shop",
    products,
  });
});

export const getDetails = catchAsync(async (req, res) => {
  const cartData = await Cart.find()
  .populate({
    path: "productId.product",
    select: "name price image",
    model: "Product",
  })
  .populate({
    path: "userId",
    select: "name email",
    model: "User",
  });
  console.log(cartData)
  res.status(200).render("cart", {
    title: "| Cart",
    cartData: cartData || [],
  });
});

// export const getDetails = catchAsync(async (req, res) => {
//     const products = await Product.findById(req.params.id);

//     res.status(200).render("details", {
//         title: "| Details",
//         // products,
//     });
// });

export const getCheckout = (req, res) => {
  res.status(200).render("checkout", {
    title: "| Checkout",
  });
};

export const getDashboard = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).render("dashboard", {
    title: "| Dashboard",
    users,
  });
});

export const getCart = (req, res) => {
  res.status(200).render("cart", {
    title: "| Cart",
  });
};

// export const getCart = catchAsync(async (req, res, next) => {
//     const cart = await User.find();
//     res.status(200).render("dashboard", {
//         title: "| Dashboard",
//         users,
//     });
// });
