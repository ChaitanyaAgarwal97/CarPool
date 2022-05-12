// npm
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require('cookie-parser');

// Routers to all the routes
const basicRouter = require("./src/router/basicRoutes");
const logInSignUpRouter = require("./src/router/logInSignUpRoutes");
const dashboardRouter = require("./src/router/dashboardRoutes");
const helpDeskRouter = require("./src/router/helpDeskRoutes");

// App setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 

// Routes added to the app
app.use(basicRouter);
app.use(logInSignUpRouter);
app.use(dashboardRouter);
app.use(helpDeskRouter);

// port
const port = process.env.PORT  || 3000 || 80;

// path
const static_path = path.join(__dirname, "/public");
app.use(express.static(static_path));
const template_path = path.join(__dirname, "/templates/views");
app.set("views", template_path);
const partials_path = path.join(__dirname, "/templates/partials");
hbs.registerPartials(partials_path);

// view engine
app.set("view engine", "hbs");

// path for imgs
app.use(express.static("./templates/views/images"));

// running on port
app.listen(port, () => {
  console.log(`at port ${port}`);
});
