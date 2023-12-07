const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ingredientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pack_size: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: "gm",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ingredients", ingredientsSchema);
