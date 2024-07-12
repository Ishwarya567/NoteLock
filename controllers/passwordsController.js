const Password=require("../models/passwords")

module.exports.showPasswords=async(req,res)=>{
    let passwords=await Password.find({user:req.user});
    res.render("passwords/showPasswords.ejs",{passwords});
};

module.exports.renderAddPasswordFrom=(req,res)=>{
    res.render("passwords/password.ejs")
};

module.exports.addPassword=async(req,res)=>{
    let {title,site,username,password}=req.body;
    let user=req.user._id;
    const newpassword= new Password({
        user,
        title,
        site,
        username,
        password
    })
    try {
        await newpassword.save();
        req.flash("success","You have successfully added a password!");
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
        res.redirect("/");
    }
    };

module.exports.viewPassword=async(req,res)=>{
    let {id}=req.params;
    let password=await Password.findById(id);
    if(!password){
        req.flash("error","Password you requested for doesn't exist");
        res.redirect("/");
     }
     res.render("passwords/viewPassword.ejs",{password});
    
};

module.exports.rendereditPasswordForm=async(req,res)=>{
    let{id}=req.params;
    let password=await Password.findById(id);
    if(!password){
        req.flash("error","Password you requested for doesn't exist");
        res.redirect("/");
     }
     res.render("passwords/editPassword.ejs",{password});

};

module.exports.editPassword=async(req,res)=>{
    let {id}=req.params;
    let password=await Password.findByIdAndUpdate(id,{...req.body});
    if(!password)
    {
        req.flash("error","password you requested for doesn't exist");
        res.redirect("/");
    }
    req.flash("success","password Updated!");
    res.redirect(`/passwords/${id}`);
};

module.exports.deletePassword=async(req,res)=>{
    let {id}=req.params;
    let deleted=await Password.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","password deleted!")
    res.redirect("/");
};