const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const Note = require("../models/notes.js");
const {isLoggedIn}=require("../middleware/auth.js")
const notesController=require("../controllers/notesController.js")
const {validateNote}=require("../middleware/validate.js")



router.get("/showNotes",isLoggedIn,wrapAsync(notesController.showNotes))

router.get("/",isLoggedIn,(notesController.renderAddNoteForm));

router.post("/addNote",isLoggedIn,validateNote,wrapAsync(notesController.addNote));

router.get("/:id",isLoggedIn,wrapAsync(notesController.ViewNote));

router.route("/edit/:id")
.get(isLoggedIn,wrapAsync(notesController.renderEditForm))
.post(isLoggedIn,validateNote,wrapAsync(notesController.EditNote));

router.delete("/delete/:id",isLoggedIn,wrapAsync(notesController.DeleteNote));

module.exports=router;