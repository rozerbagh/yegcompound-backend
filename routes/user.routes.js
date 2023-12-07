const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/login", userController.userLogin);
router.post("/approved", userController.approvedUser);
router.post("/decline", userController.declinedUser);
router.post("/signup", userController.addUser);
router.get("/users", userController.getallUser);
router.get("/get/:id", userController.getUserDetails);
router.patch("/update/:id", userController.updateUserDetails);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
