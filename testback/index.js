const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  return res.send("Home page");
});

const admin = (req, res) => {
  return res.send("Admin dashboard ");
};
const isAdmin = (req, res, next) => {
  console.log("Hii ia ma here");
  next();
};
const isLoggedin = (req, res, next) => {
  console.log("hello i am loggedin");
  next();
};

app.get("/admin", isLoggedin, isAdmin, admin);

app.get("/login", (req, res) => {
  return res.send("You are visiting login route");
});

app.get("/signup", (req, res) => {
  return res.send("You are visiting signup route");
});

app.listen(port, () => {
  console.log("Server is up and running...");
});

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
