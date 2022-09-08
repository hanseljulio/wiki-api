const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);

// GET/POST/DELETE ALL Articles

// GET All Articles (READ in database)
// /articles - Fetches all alrticles
// /articles/test - Fetches the article on test

// POST a new article (CREATE in database)
// /articles - create one new article

// DELETE all articles
// /articles - delete all the articles

app.route("/articles").get(function(req, res) {
    Article.find(function(err, foundArticles) {
            if (!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        
        });
    })
    .post(function(req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save(function(err) {
            if (!err) {
                res.send("Success - added new article");
            } else {
                res.send(err);
            }
        });
    })
    .delete(function(req, res) {
        Article.deleteMany(function(err) {
            if (!err) {
                res.send("All articles deleted");
            } else {
                res.send(err);
            }
        });
    });

// GET/PUT/PATCH/DELETE specific articles

// GET specific article
// /articles/test - Fetches the article on test

// PUT/PATCH a specific article (UPDATE in database)
// /articles/test - updates the article on test

// DELETE specific article
// /articles/test - delete test article

app.route("/articles/:articleTitle").get(function(req, res) {
        Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("No articles found");
            }
        });
    })
    .put(function(req, res) {
        Article.replaceOne({title: req.params.articleTitle}, req.body, function(err) {
            if (!err) {
                res.send("Successfully updated article (PUT)");
            }
        }
        );
    })
    .patch(function(req, res) {
        Article.updateOne({title: req.params.articleTitle}, req.body, function(err) {
            if (!err) {
                res.send("Successfully updated article (PATCH)");
            }
        }
        );
    })
    .delete(function(req, res) {
        Article.deleteOne({title: req.params.articleTitle}, function(err) {
            if (!err) {
                res.send("Successfully deleted article");
            } else {
                res.send(err);
            }
        }
        );
    });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});