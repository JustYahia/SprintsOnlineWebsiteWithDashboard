import mongoose from "mongoose";
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: {
      type: Number,
      required: true,
      default:1,
      min: [1, "Quantity can not be less then 1."],
    },
  //   price: {
  //     type: Number,
  //     required: true
  // },
    total: { type: Number },
  },
  { timestamps: true }
);
export const ItemModel = mongoose.model("Item", itemSchema);

const cartSchema = new Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    productId:[itemSchema],
    // productId: [{type: mongoose.Types.ObjectId,ref: "Product"}],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
