// npm
const express = require('express')


const path = require ('path')

const hbs = require('hbs');

let fs = require('fs');


// App setup
const app = express ()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// port
const port = process.env.PORT || 80;

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


app.get("/", async (req, res) =>{


    try {
        res.render("index")
    } catch (error) {
        console.log(error);
    }
})
app.get("/helpDesk", async (req, res) =>{


    try {
        res.render("helpDesk")
    } catch (error) {
        console.log(error);
    }
})
app.get("/loginSignup", async (req, res) =>{


    try {
        res.render("loginSignup")
    } catch (error) {
        console.log(error);
    }
})
app.get("/myProfile", async (req, res) =>{


    try {
        res.render("myProfile")
    } catch (error) {
        console.log(error);
    }
})
app.get("/carpoolform", async (req, res) =>{


    try {
        res.render("carpoolform")
    } catch (error) {
        console.log(error);
    }
})
app.get("/filter", async (req, res) =>{


    try {
        res.render("filter")
    } catch (error) {
        console.log(error);
    }
})


// running on port
app.listen(port, () => {
    console.log(`at port ${port}`);
  });
  