const rp = require('request-promise');
const $ = require('cheerio');
const _ = require('lodash');
const randomWord = require('random-words');
const express = require('express');
const app = express();

let searchResult = 'https://au.answers.yahoo.com/search/search_result?fr=uh3_answers_vert_gs&type=2button&p=' + randomWord();
let answerURL = "https://au.answers.yahoo.com/question/index?qid=";
let result = '';

rp(searchResult)
  .then(function(html){
    var answers = [];
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
  });

const router = express.Router();
router.get('/', (req, res) =>{
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1 style="text-align: center">Yahoo Answers Randomizer</h1><div style="text-align: center; font-size: 20"><a href=<%= url %>>Yahoo Answers URL</a></div>');
  res.end();
})

router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use('/.netlify/functions/server', router);  // path must route to lambda

app.listen(3000, function(){
  console.log("App Running on Port 3000!");
})
