const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
// const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});
const wikiSchema=mongoose.Schema({
  title:String,
  content:String
});
const article = mongoose.model("article",wikiSchema);

const newArticle = new article({
  title:"Godan",
  content:"This is Munshi Premchand's novel."
});
newArticle.save();
