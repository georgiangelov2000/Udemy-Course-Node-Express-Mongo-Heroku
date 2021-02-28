//Modules
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const methodOverride = require("method-override");

//Connect to database
mongoose.connect("mongodb://localhost:27017/images", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Create  Schema
const imageScheme = mongoose.Schema({
  imageUrl: String,
});

//Create model
const Picture = mongoose.model("Picture", imageScheme);

//Setup path and static files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.get("/", (req, res) => {
  res.render("index");
});

//Set Image Storage
const storage = multer.diskStorage({
  destination: "./public/uploads/images/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

//check File
function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  } else {
    cb("Error:Please images only.");
  }
}

//Create Collection and Save to DB
app.post("/uploadsingle", upload.single("singleImage"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    return console.log("Please select an Image.");
  }
  const url=file.path.replace('public','');

  Picture.findOne({imageUrl:url})
  .then(img=>{
      if(img){
          console.log('Duplicate Images. Try Again!');
          return res.redirect('/upload');
      }
      Picture.create({imageUrl:url})
      .then(img=>{
          console.log('Image saved to DATABASE.');
          res.redirect('/')
      })
  })
});

app.listen(3000, () => {
  console.log("Server is started on port 3000.");
});
