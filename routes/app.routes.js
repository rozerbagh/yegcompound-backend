const express = require("express");
const router = express.Router();
const dataController = require("../controllers/data.controller");
const funcController = require("../controllers/function.controller");
const { checkToken } = require("../middlewares/auth.middleware");
const Orders = require("../models/orders.schema");

const status = ['ordered', 'dispatched', 'shipped', 'delivered'];
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

module.exports = router;
