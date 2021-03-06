//Modules
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const methodOverride = require("method-override");
const fs=require('fs');

//Connect to database
mongoose.connect("mongodb://localhost:27017/images", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Create  Schema
let imageScheme = mongoose.Schema({
  imageUrl: String,
  description:String,
});

//Create model
let Picture = mongoose.model("Picture", imageScheme);

//Setup path and static files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

//routing to upload
app.get("/upload", (req, res) => {
  res.render("upload");
});

//routing to main page
app.get("/", (req, res) => {
  Picture.find({})
    .then(images => {
      res.render("index", { images: images });
    });
});

//Set Image Storage
let storage = multer.diskStorage({
  destination: "./public/uploads/images/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

//check File
function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
  if (extName) {
    return cb(null, true);
  } else {
    cb("Error:Please images only.");
  };
};

//Create Collection and Save to DB
app.post("/uploadsingle", upload.single("singleImage"), (req, res, next) => {
  const file = req.file;
  const description=req.body.description
  if (!file) {
    return console.log("Please select an Image.");
  }
  
  let url = file.path.replace("public", "");

  Picture.findOne({ imageUrl: url, description:description })
    .then(img => {
      if (img) {
        console.log("Duplicate Image. Try Again!");
        return res.redirect("/upload");
      }

      Picture.create({ imageUrl: url , description:description })
      .then(img => {
        console.log('Image save to DB.')
        res.redirect("/");
      })
    })
    .catch((err) => {
      console.log('ERROR:'+err)
    });
});

//POST Multiple Images
app.post("/uploadmultiple",upload.array("multipleImages"),(req, res, next) => {
    const files = req.files;
    if (!files) {
      return console.log("Please select images.");
    }

    files.forEach(file => {
      const url = file.path.replace("public", "");

      Picture.findOne({ imageUrl: url })
        .then(async img => {
          if (img) {
            return console.log("Duplicate Image.");
          }
          await Picture.create({ imageUrl: url });
        })
        .catch((err) => {
          console.log('ERROR:'+err)
        });
    });
    res.redirect("/");
  }
);

//Delete Picture from Database
app.delete('/delete/:id',(req,res)=>{
  const serachQuery={_id : req.params.id};

  Picture.findOne(serachQuery)
  .then(image=>{
    fs.unlink(__dirname+'/public/'+image.imageUrl,(err)=>{
      if(err) return console.log(err);
      Picture.deleteOne(serachQuery)
      .then(img=>{
        res.redirect('/');
      })
    })
    .catch(err=>{
      console.log('ERROR:'+err)
    });
  });
});

app.listen(3000, () => {
  console.log("Server is started on port 3000.");
});
