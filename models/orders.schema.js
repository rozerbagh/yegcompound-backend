const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    compound_name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity_unit: {
      type: String,
      required: true,
      default: "gm",
    },
    ingredients: new Array({
      name: String,
      pack_size: Number,
      price: Number,
      percent: Number,
    }),
    total_price: {
      type: Number,
      required: true,
      default: 0,
    },
    need_to_pay: {
      type: Number,
      required: true,
      default: 0,
    },
    markup: {
      type: Number,
      required: true,
      default: 0,
    },
    franchiseFee: {
      type: Number,
      required: true,
      default: 0,
    },
    costToBuyer: {
      type: Number,
      required: true,
      default: 0,
    },
    rebaate: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    comments: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
