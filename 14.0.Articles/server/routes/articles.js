const express = require("express");
const router = express.Router();
const { Article } = require("../models/article");
const { User } = require("../models/users");

router.get("/add-article", ensureAuthenticated, async (req, res) => {
  res.render("add-article", {
    title: "Add Article",
  });
});

router.post("/add-article", async (req, res) => {
    const article = await Article.create({
      title: req.body.title,
      author: req.user._id,
      body: req.body.body,
    });
    article
      .save(article)
      .then((data) => {
        console.log(data);
        res.redirect("/");
      })
      .catch((error) => {
       return res.redirect("/");
    });
  });

  router.get("/edit/:id", ensureAuthenticated, async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (article.author != req.user._id) {
        return res.redirect("/");
      }
      res.render("edit-article", {
        article: article,
      });
    } catch (error) {
      res.send(error);
    }
  });
 
router.post("/edit/:id", async (req, res) => {
    const article = { _id: req.params.id };
    await Article.findByIdAndUpdate(article, {
      $set: {
        title: req.body.title,
        author: req.body.name,
        body: req.body.body,
      },
    })
      .then((data) => {
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
        res.redirect("/");
      });
  });

  router.delete("/:id", async (req, res) => {
    const article = { _id: req.params.id };
    Article.findByIdAndDelete(article)
      .then((art) => {
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
        res.redirect("/");
      });
  });

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  const user = await User.findById(article.author);

  if (user) {
    res.render("article", {
      article: article,
      author: user.name,
    });
  }
});

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/users/login");
  }
}

module.exports = router;
