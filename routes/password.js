const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const {isLoggedIn}=require("../middleware/auth.js");
const passwordsController=require("../controllers/passwordsController.js")
const {validatePassword}=require("../middleware/validate.js");

router.get("/showPasswords",isLoggedIn,wrapAsync(passwordsController.showPasswords))

router.get("/",isLoggedIn,(passwordsController.renderAddPasswordFrom));

router.post("/addPassword",isLoggedIn,validatePassword,wrapAsync(passwordsController.addPassword));

router.get("/:id",isLoggedIn,wrapAsync(passwordsController.viewPassword));

router.get("/edit/:id",isLoggedIn,wrapAsync(passwordsController.rendereditPasswordForm))
    
router.post("/edit/:id",isLoggedIn,validatePassword,wrapAsync(passwordsController.editPassword));
    
router.delete("/delete/:id",isLoggedIn,wrapAsync(passwordsController.deletePassword));

module.exports=router;