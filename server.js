const express = require('express')
const Twitter = require('twitter')
const path = require('path')
var R = require("request");

const app = express();

const client = new Twitter({
    consumer_key: 'YcYQnzR3zO7LWi5xGEMnXvnTP',
    consumer_secret: 'eymlaABvLrgGgBuPYZmtvmUk68nbUrHoRs8EG7c4rm4POqTU3F',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAABFc4QAAAAAAl8Vllwy1pb3IqMUdjykn640rNuU%3D6kVYN4hrF6oQmSWwGDa1UMkMSiX37zwuKZezYO8rQ1QHZ9ZSyI'
});



var key = 'YcYQnzR3zO7LWi5xGEMnXvnTP';
var secret = 'eymlaABvLrgGgBuPYZmtvmUk68nbUrHoRs8EG7c4rm4POqTU3F';

var cat = key +":"+secret;
var credentials = new Buffer(cat).toString('base64');

var url = 'https://api.twitter.com/oauth2/token';

R({
    url: url,
    method: 'POST',
    headers: {
        "Authorization": "Basic " + credentials,
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: "grant_type=client_credentials"
},function(err, resp, body) {
    console.log(body);
});


app.set("port", process.env.PORT || 3001);

app.get("/api/search", (req, res) => {
    const param = req.query.q;

    const options = {
        q: param,
        result_type: 'recent',
        count: 20
    }

    client.get('search/tweets', options, function (error, tweets, response) {
        res.json(tweets);
    });
});


// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    const staticFiles = express.static("client/build")
    app.use(staticFiles)
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
}

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});