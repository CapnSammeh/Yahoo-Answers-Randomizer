const rp = require('request-promise');
const $ = require('cheerio');
const _ = require('lodash');
const randomWords = require('random-words');
const express = require('express');
const app = express();
app.set('view engine', 'ejs')

let searchResult = 'https://au.answers.yahoo.com/search/search_result?fr=uh3_answers_vert_gs&type=2button&p='
let answerURL = "https://au.answers.yahoo.com/question/index?qid=";
let result = '';

function generateRandomAnswer(){
  let randomWord = randomWords();
  rp(searchResult + randomWord)
  .then(function(html){
    let answers = [];
    let results = ($("#yan-questions",html).children());
    for (var i = 0; i < results.length; i++) {
      if(results[i].attribs.id.toString().includes("q-")){
        let answer = results[i].attribs.id.slice(2);
        //console.log(answer);
        answers.push(answer);
      };
    };
    var rand = answers[Math.floor(Math.random() * answers.length)];
    result = answerURL + _.sample(answers);
    console.log("Random Word: " + randomWord)
  });
};

app.get('/', function(req, res){
  generateRandomAnswer();
  res.render('index', {url: result});
})

app.post('/', function(req, res){
  generateRandomAnswer();
  res.render('index', {url: result});
})

app.listen(3000, function(){
  generateRandomAnswer();
  console.log("App Running on Port 3000!");
})
