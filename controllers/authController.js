const User=require("../models/user.js") 


module.exports.renderSignupForm=(req,res)=>{
    res.render("auth/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{let{username,email,password}=req.body;
   const newUser=new User({email,username});
    const registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
     if(err)
     {
         next(err);
         res.redirect("/");
     }
     req.flash("success","Welcome to NoteLock!");
     res.redirect("/");
    });
 }
 catch(err){
     req.flash("error",err.message);
     res.redirect("auth/signup");
 }
 };

module.exports.renderLoginForm=(req,res)=>{
    res.render("auth/login.ejs");
};
module.exports.login=async(req,res)=>{
    req.flash("success","welcome back to NoteLock!");
    if(res.locals.redirectUrl)
    {
        redirecturl=res.locals.redirectUrl;
    }
    else{
        redirecturl="/";
    }
    res.redirect(redirecturl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
             next(err);
             res.redirect("/")
        }
        req.flash("success","You are logged out!");
        res.redirect("/");
    })
}