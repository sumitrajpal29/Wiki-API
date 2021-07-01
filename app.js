const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({
  extended:true
}));

app.listen(3000,function(){
  console.log("App is running on port 3000.");
})

app.route("/articles")

.get(function(req,res){
  Article.find({},function(err,found){
    if(!err) res.send(found);
    else console.log(err);
  });
})

.post(function(req,res){
  newItem = new Article({
    title:req.body.title,
    content:req.body.content
  });
  newItem.save(function(err){
    if(!err)res.send("Saved successfully.");
    else res.send(err)
  })
})

.delete(function(req,res){
  Article.deleteMany({},function(err){
    if(!err) res.send("Deleted all articles successfully.");
    else res.send(err);
  })
});


app.route("/articles/:parameter")

.get(function(req,res){
  Article.findOne({title:req.params.parameter},function(err,found){
    if(found) res.send(found);
    else res.send("Not found article named : "+req.params.parameter)
  })
})

.put(function(req,res){
  Article.update(
    {title:req.params.parameter},
    {title:req.body.title,content:req.body.content},
    {overwrite:true},
    function(err){
      if(!err) res.send("Updated successfully.")
      else res.send(err)
  })
})

.patch(function(req,res){
  Article.update({title:req.params.parameter},{$set:req.body},function(err){
    if(!err) res.send("Updated successfully.");
    else res.send(err)
  })
})

.delete(function(req,res){
  Article.deleteOne({title:req.params.parameter},function(err){
    if(!err) res.send("Deleted article successfully.");
    else res.send(err)
  })
});


mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});
const wikiSchema=mongoose.Schema({
  title:String,
  content:String
});
const Article = mongoose.model("Article",wikiSchema);

const newArticle = new Article({
  title:"Godan",
  content:"This is Munshi Premchand's novel."
});
Article.find({},function(err,found){
  if(found.length===0) newArticle.save()
});
