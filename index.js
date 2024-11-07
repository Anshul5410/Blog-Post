const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join((__dirname , "views")));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

let port = 8080;

let posts = [
    {
        id : uuidv4(),
       username : "anshulKuamrsharma",
       content : "hard work is important to achive success", 
    },
    {
        id : uuidv4(),
       username : "shradhskhapra",
       content : "i got selected for my 1st internship", 
    },
    {
        id : uuidv4(),
       username : "aman",
       content : "hard work is important", 
    },
];

app.get("/posts", (req,res) =>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

app.post("/posts",(req,res) => {
    let {username,content} = (req.body);
    let id = uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts");
});

app.patch("/posts/:id",(req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let idspost = posts.find((p) => {
        return id === p.id ;
    });
    idspost.content = newContent;
    console.log(post);
    res.redirect("/posts");
});


app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => {
       return id === p.id ;
    });
    res.render("edit.ejs", {post});
});

app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => {
        return id === p.id ;
    });
    res.render("show.ejs",{post});
});

app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => {
        return id === p.id ;
    });
    posts = posts.filter((p) => {
        return id!=p.id ;
    });
    res.redirect("/posts");
});


app.listen(port,() =>{
    console.log(`app is listening on port : ${port}`);
});