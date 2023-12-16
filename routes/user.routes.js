const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { checkToken } = require("../middlewares/auth.middleware");

router.post("/login", userController.userLogin);
router.post("/forgot-password", userController.sendOTP);
router.post("/verify-otp", userController.verifyOTP);
router.post("/reset-password", checkToken, userController.resetPassword);
router.post("/approved", userController.approvedUser);
router.post("/decline", userController.declinedUser);
router.post("/signup", userController.addUser);
router.post("/contact", userController.sendContactForm);
router.get("/users", userController.getallUser);
router.get("/get/:id", userController.getUserDetails);
router.patch("/update/:id", userController.updateUserDetails);
router.delete("/delete/:id", userController.deleteUser);
router.post("/admin/send-invoice/:id", userController.sendInvoice);

module.exports = router;
