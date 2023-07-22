//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { TIMEOUT } = require("dns");
let projectboard = [];

mongoose.connect("mongodb://localhost:27017/Devolutions", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
app.use(express.static("projects"));

const DevoultionsReq = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  section: Array,
  whatinfo: String,
  whyinfo: String,
});
const devRequest = mongoose.model("devRequest", DevoultionsReq);

const Newsfeed = new mongoose.Schema({
  email: String,
});

const newsFeed = mongoose.model("newsFeed", Newsfeed);

// !Sample Projects

const projectSchema = new mongoose.Schema({
  image: String,
  projectName: String,
  projectTitle: String,
});

const projectslist = mongoose.model("projectslist", projectSchema);

const project1 = new projectslist({
  image: "/application/app-1.svg",
  projectName: "۱رهرو",
  projectTitle: "اپلیکیشن",
});
project1.save();
const project2 = new projectslist({
  image: "/application/app-2.svg",
  projectName: "۲رهرو",
  projectTitle: "اپلیکیشن",
});
project2.save();
const project3 = new projectslist({
  image: "/application/app-3.svg",
  projectName: "دولوشن",
  projectTitle: "طراحی سایت",
});
project3.save();
const project4 = new projectslist({
  image: "/application/app-4.svg",
  projectName: "مارک۱",
  projectTitle: "دیجیتال مارکتینگ",
});
project4.save();

const project5 = new projectslist({
  image: "/application/app-4.svg",
  projectName: "مارک۲",
  projectTitle: "دیجیتال مارکتینگ",
});
project5.save();

const project6 = new projectslist({
  image: "/application/app-4.svg",
  projectName: "برند۱",
  projectTitle: "برندینگ",
});
project6.save();

const project7 = new projectslist({
  image: "/application/app-4.svg",
  projectName: "مارک۴",
  projectTitle: "دیجیتال مارکتینگ",
});
project7.save();

//?route section

app
  .route("/")
  .get(function (req, res) {
    res.render("index");
  })
  .post(function (req, res) {
    const newsFeedcollection = new newsFeed({
      email: req.body.emailnewsfeed,
    });
    newsFeedcollection.save(function (err) {
      res.redirect("/");
    });
  });

app
  .route("/about")
  .get(function (req, res) {
    res.render("aboutUs");
  })
  .post(function (req, res) {
    const newsFeedcollection = new newsFeed({
      email: req.body.emailnewsfeed,
    });
    newsFeedcollection.save(function (err) {
      res.redirect("/aboutUs");
    });
  });

app
  .route("/contactUs")
  .get(function (req, res) {
    res.render("contactUs");
  })
  .post(function (req, res) {
    const contact = new devRequest({
      firstname: req.body.name,
      lastname: req.body.fname,
      email: req.body.email,
      section: req.body.checkboxcontactus,
      whatinfo: req.body.more,
      whyinfo: req.body.info,
    });
    contact.save(function (err) {
      if (!err) {
        res.redirect("/contactUs-success");
      } else {
        console.error(err);
      }
    });
  });

app.route("/newsFeed").post(function (req, res) {
  const newsFeedcollection = new newsFeed({
    email: req.body.emailnewsfeed,
  });

  newsFeedcollection.save(function (err) {
    res.redirect("/contactUs");
  });
});

app
  .route("/blogs")
  .get(function (req, res) {
    res.render("blogs");
  })
  .post(function (req, res) {
    const newsFeedcollection = new newsFeed({
      email: req.body.emailnewsfeed,
    });
    newsFeedcollection.save(function (err) {
      res.redirect("/blogs");
    });
  });

app
  .route("/contactUs-success")
  .get(function (req, res) {
    res.render("contactUs-success");
  })
  .post(function (req, res) {
    const newsFeedcollection = new newsFeed({
      email: req.body.emailnewsfeed,
    });
    newsFeedcollection.save(function (err) {
      res.redirect("/contactUs-success");
    });
  });

app
  .route("/projects")
  .get(function (req, res) {
    projectslist.find({}, function (err, projects) {
      res.render("projects", {
        projectss: projects,
        class1: "",
        route: "",
      });
    });
  })
  .post(function (req, res) {
    const newsFeedcollection = new newsFeed({
      email: req.body.emailnewsfeed,
    });
    newsFeedcollection.save(function (err) {
      res.redirect("/projects");
    });
  });

app.route("/projects/:pageID").get(function (req, res) {
  let requestedPage = req.params.pageID;
  projectslist.find({}, function (err, projects) {
    let x;
    projects.forEach(function (result) {
      if (requestedPage == "application" && result.projectTitle == "اپلیکیشن") {
        projectboard.push(result);
        x = "app";
      }
      if (requestedPage == "webdev" && result.projectTitle == "طراحی سایت") {
        projectboard.push(result);
        x = "webdev";
      }
      if (requestedPage == "branding" && result.projectTitle == "برندینگ") {
        projectboard.push(result);
        x = "brand";
      }
      if (
        requestedPage == "digitallmarketing" &&
        result.projectTitle == "دیجیتال مارکتینگ"
      ) {
        projectboard.push(result);
        x = "dm";
      }
    });
    res.render("projects", {
      projectss: projectboard,
      class1: "prjTypeCard1",
      route: x,
    });
  });
  projectboard = [];
});

app
  .route("/support")
  .get(function (req, res) {
      res.render("signIn");
  })

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
