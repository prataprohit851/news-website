const express = require('express');
const NewsAPI = require('newsapi');
const bodyParser = require('body-parser');
const newsapi = new NewsAPI('4a6a974cc6d3453191ed916d7d2136d7');


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));


let topic = "";
app.post("/search", function(req, res){
    topic = req.body.topicName;
    res.redirect("/");
});

app.get("/", function(req, res){

    if(topic == ""){
        newsapi.v2.topHeadlines({
            language: 'en',
            country: 'in',
            apikey: "4a6a974cc6d3453191ed916d7d2136d7"
          }).then(response => {
            res.render(__dirname + "/index.ejs", {articlesJSON: response});
            })
            .catch(error =>{
                res.sendFile(__dirname + "/error.html");
            });
    }
    else{
        newsapi.v2.everything({
            q: topic,
            language: 'en',
            apikey: "4a6a974cc6d3453191ed916d7d2136d7"
          }).then(response => {
            topic = "";
            res.render(__dirname + "/index.ejs", {articlesJSON: response});
            })
            .catch(error =>{
                res.sendFile(__dirname + "/error.html");
            });
    }
    
});

app.listen(process.envy.PORT || 3000, function(){
    console.log("Server running on port 3000")
});