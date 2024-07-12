const Note = require("../models/notes.js");

module.exports.showNotes=async(req,res)=>{
    let notes=await Note.find({user:req.user});
    res.render("notes/showNotes.ejs",{notes});
}

module.exports.renderAddNoteForm=(req,res)=>{
    res.render("notes/notes.ejs");
};

module.exports.addNote=async(req,res)=>{
    let {title,content}=req.body;
    let user=req.user._id;
    const newNote= new Note({
        user,
        title,
        content
    })
    try {
        await newNote.save();
        req.flash("success","You have successfully added a note!");
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
        res.redirect("/");
    }
    };
module.exports.ViewNote=async(req,res)=>{
    let {id}=req.params;
    let note=await Note.findById(id);
    if(!note){
        req.flash("error","Note you requested for doesn't exist");
        res.redirect("/");
     }
     res.render("notes/viewNote.ejs",{note});
    
};

module.exports.renderEditForm=async(req,res)=>{
    let{id}=req.params;
    let note=await Note.findById(id);
    if(!note){
        req.flash("error","Note you requested for doesn't exist");
        res.redirect("/");
     }
     res.render("notes/editNote.ejs",{note});

};

module.exports.EditNote=async(req,res)=>{
    let {id}=req.params;
    let note=await Note.findByIdAndUpdate(id,{...req.body});
    if(!note)
    {
        req.flash("error","Note you requested for doesn't exist");
        res.redirect("/");
    }
    req.flash("success","Note Updated!");
    res.redirect(`/notes/${id}`);
};

module.exports.DeleteNote=async(req,res)=>{
    let {id}=req.params;
    let deleted=await Note.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","Note deleted!")
    res.redirect("/");
};