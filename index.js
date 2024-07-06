require('dotenv').config(); 
const mongoose = require('mongoose')
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser"); // install the package npm i cookie-parser
const { connectToMongoDb } = require("./connect");
// const {restrictToLoggedInUserOnly} = require('./middlewares/auth')
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const router = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const signupRouter = require("./routes/user");

const URL = require("./models/url");


const app = express();

const PORT =process.env.PORT || 8001;

mongoose.connect(process.env.MONGODB).then(() =>
  console.log(" mongodb connected")
);

app.set("view engine", "ejs"); // the ejs stands for embedded javascript templating and is a templating engine used by Nodejs. it helps to create an html template with minimal code.

// or we could also have used handlebars and bugjs
app.set("views", path.resolve("./views")); // by this i am telling my express that all the files of ejs, that is views are present in the shown folder

app.use(express.json()); //it is a middleWare which will parse incoming bodies that contain json data
app.use(express.urlencoded({ extended: false })); //this middleware will parse incoming bodies that contain form data
app.use(cookieParser());

app.use(checkForAuthentication);  // ye middleware check krega ki user authenticated h ya nhi
app.use("/user", signupRouter);
// app.use("/url",restrictToLoggedInUserOnly, router);
app.use("/url", restrictTo(["NORMAL", 'ADMIN']), router);
//if i used app.use then -- app.use("/url/:shortId", router)



app.use("/", staticRouter);
// app.get("/test" , async(req,res) => {

//     const allURLs = await URL.find({});

//      return res.render('home',{

//         urls: allURLs,
//      });

// })

app.delete("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  await URL.findOneAndDelete({
    shortId,
  });

  res.json({
    status: "succeed",
  });
});
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  // const urlData = await URL.findOne(shortId);
  // if ( !urlData){
  //     return res.status(404).json({ error: 'urlData not found'})
  // }
  // return res.json(urlData );

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: [
          {
            timestamp: Date.now(),
          },
        ],
      },
    }
  );

  res.redirect(entry.redirectUrl); // this statement redirects the client to the original URL stored in 'entry.redirectUrl',

  // and the user's browser navigates to the original URL
});

app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));
