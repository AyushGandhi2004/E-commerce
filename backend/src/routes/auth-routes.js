const express = require("express");
const { registerUser, loginUser, logoutUser, checkLogin } = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me" , authMiddleware , checkLogin);

module.exports = router;