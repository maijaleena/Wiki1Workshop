const express = require('express');
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");
const { title } = require('process');


function generateSlug(title){

  return title.replace(/\s+/g, '_').replace(/\W/g, '');

}


router.get('/', function (req,res,next){
  res.send('got to GET WIKI');
})

router.post('/', async (req,res,next) => {
  //add defs for titel and content
try{
  const page = await Page.create({
    title: "the title",
    content: "the content"
  });

  res.redirect('/');
} catch (error) {next (error)}
});



router.get('/', function (req,res,next){
  res.redirect('/wiki');
})

router.get('/add', function (req,res,next){
  res.send(addPage());
});

router.post('/add/', function (req,res,next){
  res.json(req.body);
  console.log("it got to router.post");
})

module.exports = router;

