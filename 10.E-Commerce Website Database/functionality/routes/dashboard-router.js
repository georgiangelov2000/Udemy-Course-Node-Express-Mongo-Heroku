const express = require("express");
const router = express.Router();
const Product = require("../models/productmodel");
const multer=require('multer')

//Set Image storage
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
//Check File
function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
  if (extName) {
    return cb(null, true);
  } else {
    cb("Error:Please images only.");
  };
};

// Checks if user is authenticated
function isAuthenticatedUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Please Login first to access this page.");
  res.redirect("/login");
}

//Get Routes

//Rendering Products
router.get("/product/instock", isAuthenticatedUser, (req, res) => {
  Product.find({})
    .then((products) => {
      res.render("admin-dashboard/instock", { products: products });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR:" + err);
      res.redirect("/dashboard");
    });
});

//Router to Update Form
router.get("/product/update/:id", isAuthenticatedUser, (req, res) => {
  const searchQuery = { _id: req.params.id };
  Product.findOne(searchQuery)
    .then((product) => {
      res.render("admin-dashboard/update", { product: product });
    })
    .catch((error) => {
      req.flash("error_msg", "ERROR:" + error);
      res.redirect("/dashboard");
    });
});

router.get("/product/new", isAuthenticatedUser, (req, res) => {
  res.render("admin-dashboard/newproduct");
});
router.get("/product/update", isAuthenticatedUser, (req, res) => {
  res.render("admin-dashboard/update");
});
router.get("/product/instock", isAuthenticatedUser, (req, res) => {
  res.render("admin-dashboard/instock");
});
router.get("/products/myproducts", (req, res) => {
  res.render("admin-dashboard/admin-products/myproducts");
});

//Post Routes

router.post("/product/new",upload.single('imageUrl'),(req, res,next) => {
  const file = req.file;
  let url = file.path.replace("public", "");
  const newProduct = {
    imageUrl:url,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };
  Product.create(newProduct)
    .then((product) => {
      req.flash("success_msg", "Product data added to database successfully.");
      res.redirect("/dashboard");
    })
    .catch((error) => {
      req.flash("error_msg", "Error:" + error);
      res.redirect("/product/new");
    });
});

router.put("/product/update/:id", (req, res) => {
  const searchQuery = { _id: req.params.id };

  Product.updateOne(searchQuery, {
    $set: {
      imageUrl: req.body.imageUrl,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    },
  })
    .then((product) => {
      req.flash("success_msg", "Product data updated successfully");
      res.redirect("/dashboard");
    })
    .catch((error) => {
      req.flash("error_msg", "ERROR:" + error);
      res.redirect("/dashboard");
    });
});

router.delete("/product/delete/:id", (req, res) => {
  const id = { _id: req.params.id };
  Product.findByIdAndDelete(id)
    .then((product) => {
      req.flash("success_msg", "Product deleted succesfully.");
      res.redirect("/dashboard");
    })
    .catch((error) => {
      req.flash("error_msg", "ERROR:" + error);
      res.redirect("/dashboard");
    });
});

module.exports = router;

