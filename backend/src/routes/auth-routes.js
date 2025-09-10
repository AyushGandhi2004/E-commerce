const express = require("express");
const { registerUser, loginUser, logoutUser, checkLogin } = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminCheck = require("../middlewares/adminCheck-middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me" , authMiddleware , checkLogin);
router.get("/admin/me" , authMiddleware , adminCheck , (req,res)=>{
    return res.status(200).json({
        message : "Yau are an admin",
        user : req.userInfo
    })
});

module.exports = router;