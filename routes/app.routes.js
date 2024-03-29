const express = require("express");
const router = express.Router();
const dataController = require("../controllers/data.controller");
const funcController = require("../controllers/function.controller");
const { checkToken } = require("../middlewares/auth.middleware");
const Orders = require("../models/orders.schema");
const Ingredients = require("../models/ingredients.schema");
const Testimonials = require("../models/testimonials.schema");
const Setting = require("../models/setting.model");

const status = ["ordered", "dispatched", "shipped", "delivered"];
router.post("/order/add", checkToken, (req, res, next) => {
  dataController.create(req, res, next, Orders);
});
router.patch("/order/update/:id", checkToken, (req, res, next) =>
  dataController.update(req, res, next, Orders)
);
router.get("/order/all", checkToken, (req, res, next) =>
  dataController.index(req, res, next, Orders, { path: "user" })
);
router.get("/order/get/:id", checkToken, (req, res, next) =>
  dataController.show(req, res, next, Orders, { path: "user" })
);
router.get("/order/getUserOrder/:userid", checkToken, (req, res, next) =>
  funcController.fetchOrdersByUser(req, res, next, Orders, { path: "user" })
);
router.delete("/order/delete/:id", checkToken, (req, res, next) =>
  dataController.destroy(req, res, next, Orders)
);

// settings
router.post("/setting/add", checkToken, (req, res, next) => {
  dataController.create(req, res, next, Setting);
});
router.patch("/setting/update/:id", checkToken, (req, res, next) =>
  dataController.update(req, res, next, Setting)
);
router.get("/setting/all", checkToken, (req, res, next) =>
  funcController.fetchSettingByUser(req, res, next, Setting, { path: "user" })
);
router.get("/user-setting/:userid", checkToken, (req, res, next) =>
  funcController.fetchSettingByUser(req, res, next, Setting, { path: "user" })
);

router.delete("/setting/delete/:id", checkToken, (req, res, next) =>
  dataController.destroy(req, res, next, Setting)
);

// testimonaials
router.post("/testimonial/add", checkToken, (req, res, next) => {
  dataController.create(req, res, next, Testimonials);
});
router.get("/testimonial/all", checkToken, (req, res, next) => {
  dataController.index(req, res, next, Testimonials, { path: "" });
});
router.get("/testimonial/:id", checkToken, (req, res, next) => {
  dataController.show(req, res, next, Testimonials);
});
router.patch("/testimonial/update/:id", checkToken, (req, res, next) => {
  dataController.update(req, res, next, Testimonials);
});
router.delete("/testimonial/delete/:id", checkToken, (req, res, next) => {
  dataController.destroy(req, res, next, Testimonials);
});

router.post("/ingredients/add", checkToken, (req, res, next) => {
  dataController.create(req, res, next, Ingredients);
});
router.post("/ingredients/bulkAdd", checkToken, (req, res, next) => {
  dataController.bulkCreate(req, res, next, Ingredients);
});
router.patch("/ingredients/update/:id", checkToken, (req, res, next) =>
  dataController.update(req, res, next, Ingredients)
);
router.get("/ingredients/all", checkToken, (req, res, next) =>
  dataController.index(req, res, next, Ingredients, { path: "" })
);
router.get("/ingredients/get/:id", checkToken, (req, res, next) =>
  dataController.show(req, res, next, Ingredients)
);
router.delete("/ingredients/delete/:id", checkToken, (req, res, next) =>
  dataController.destroy(req, res, next, Ingredients)
);

router.get(
  "/fetch-pincode-address/:zipcode",
  funcController.fetchAddressAsPerPincode
);
module.exports = router;
