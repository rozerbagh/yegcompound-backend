const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const settingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    markup: {
      type: Number,
      required: true,
      default: 0,
    },
    rebate: {
      type: Number,
      required: true,
      default: 0,
    },
    labour_hour_rate: {
      type: Number,
      required: true,
      default: 0,
    },
    container_cost: {
      type: Number,
      required: true,
      default: 0,
    },
    delivery_fee: {
      type: Number,
      required: true,
      default: 0,
    },
    setting_name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("settings", settingSchema);
