var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require("mongoose");

//mongoose collection
mongoose.connect("mongodb://localhost/todo");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

//var todoList=[
//    "wash the car and change oil",
//    "buy Groceries and make dinner"
//]

//mongoose schema

var todoSchema=new mongoose.Schema({
    name:String
});

var Todo=mongoose.model("Todo",todoSchema);

// ************Express Route here***************//
//default route
app.get("/",function(req,res){
    Todo.find({},function(err,todoList){
        if(err) console.log(err);
        else{
            res.render("index.ejs",{todoList:todoList}); 
        }
    })
    
});

//submit button route
app.post("/newtodo",function(req,res){
    console.log("Item submitted");
    var newItem=new Todo({
        name:req.body.item
    });
    //todoList.push(item);
    Todo.create(newItem,function(err,Todo){
        if(err) console.log(err);
        else{
            console.log("Inserted Item: "+newItem);
        }
    })
    res.redirect("/");
});

//cath all the route
app.get("*",function(req,res){
    res.send("<h1>Invalid page</h1>");
});

//server listening on port 3000
app.listen(3000,function(){
    console.log("server started on port 3000");
});