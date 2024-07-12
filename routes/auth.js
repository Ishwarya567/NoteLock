const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapasync.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware/auth.js");
const authController=require("../controllers/authController.js");
const {validateUser}=require("../middleware/validate.js");

//user signupform render route and signup

router.route("/signup")
.get(authController.renderSignupForm)
.post(validateUser,wrapAsync(authController.signup));




//user loginform render route and login

router.route("/login")
.get(authController.renderLoginForm)
.post(saveRedirectUrl,
passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
wrapAsync(authController.login))


//user logout
router.get("/logout",authController.logout)
module.exports=router;