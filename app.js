if(process.env.NODE_ENV !="production")
  {
require("dotenv").config();
  }
const express=require("express");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const session=require("express-session");
const ExpressError=require("./utils/Expresserror.js");
const LocalStrategy=require("passport-local");
const authRouter=require("./routes/auth.js");
const flash=require("connect-flash");
const passport=require("passport");
const User=require("./models/user.js");
const notesRouter=require("./routes/notes.js");
const passwordsRouter=require("./routes/password.js");
const Note=require("./models/notes.js");
const wrapAsync = require("./utils/wrapasync.js");
const Password=require("./models/passwords.js");
const mongoStore=require("connect-mongo");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true }));

main()
.then((res)=>
{
    console.log("connected to db");
}).catch((err)=>{
  console.log(err);
})

async function main(){
    await mongoose.connect(process.env.MONGODB_URL);
}
const store=mongoStore.create({
  mongoUrl:process.env.MONGODB_URL,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter:24*3600,
});
store.on("error",()=>{
  console.log("error on mongo session store");
})



const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      httpOnly: true
    }
  };

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user;
  next();
});


app.use("/auth",authRouter);
app.use("/notes",notesRouter);
app.use("/passwords",passwordsRouter);

app.get("/", wrapAsync(async(req,res)=>{
  const notes = await Note.find({user:req.user}).limit(5).populate("user");
  const passwords=await Password.find({user:req.user}).limit(5).populate("user");
  res.render("home.ejs",{notes,passwords});
}));

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
    });
    
    app.use((err,req,res,next)=>{
      let{statusCode=500,message="Something Went Wrong!"}=err;
      res.status(statusCode).render("error.ejs",{message});
    })
const port = process.env.PORT;

app.listen(port,()=>{
    console.log("sever is connected");
});

