import { async } from "regenerator-runtime";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import { createTransport } from "nodemailer";

export const addToCart = catchAsync(async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cartItems = await Cart.findOne({
      userId: userId,
    });
    // let productDetails = await Product.findById(productId);
    let productDetails = await Product.find({ _id: productId });
    if (!productDetails) {
      return res.status(500).json({
        type: "Product Not Found",
        msg: "Invalid request",
      });
    } else if (!cartItems) {
      //no cart for user, create new cart
      let addProdutToCart = {};
      for (let item of productDetails) {
        item.stock -= 1;
        await item.save();
        addProdutToCart = await Cart.create({
          userId: userId,
          productId: [{ product: item, quantity: 1, total: 1  }],
        });
      }
      // console.log(addProdutToCart);
      return res.status(201).json({
        message: "You create new cart & The product added succesfully",
        data: addProdutToCart,
      });
    } else {
      productDetails.forEach(async (item) => {
        item.stock -= 1;
        await item.save();
        console.log(
          cartItems.productId.some((ele) => ele.product.equals(item._id))
        );
        if (!cartItems.productId.some((ele) => ele.product.equals(item._id))) {
          await Cart.updateOne(
            { userId: userId },
            { $push: { productId: { product: item, quantity: 1, total: 1 } } }
          );
        } else {
          const productIndex = cartItems.productId.findIndex((ele) =>
            ele.product.equals(item._id)
          );
          const key = `items.${productIndex}.quantity`;
          const newItem = await createTransport.findOneAndUpdate(
            { user: userId, "items.product": item._id },
            {
              $set: {
                [`items.${productIndex}.quantity`]:
                  cartItems.productId[productIndex].quantity + 1,
              },
            }
          );
        }
      });
      cartItems.quantity += 1;
      await cartItems.save();
      return res.status(201).send({
        message: "You add quantity to the products already exists",
        data: cartItems,
      });

      //   await Cart.updateOne({userId: userId},{$push:{ items: { product: item, quantity: 1, total: 1 } }})
      //   cartItems.push({ productDetails });
      //   cartItems = await cartItems.save();
      //   return res
      //     .status(201)
      //     .json({ message: "You added new product succesfully", data: newCart });
      //
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});


export const getAllCarts = async (req, res) => {
  try {
    const data = await Cart.find()
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
    // .exec();
    return res.json({data});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "There is no product added to cart", error: error });
  }
};

// export const getAllCarts = catchAsync(async (req, res, next) => {
//   const queryObj = { ...req.query };
//   const excludedFields = ["page", "sort", "limit", "fields"];
//   excludedFields.forEach((el) => delete queryObj[el]);

//   let queryStr = JSON.stringify(queryObj);
//   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//   const query = Cart.find(JSON.parse(queryStr));

//   const products = await query;

//   res.status(200).json({
//       status: "success",
//       results: products.length,
//       data: {
//           products,
//       },
//   });
// });
