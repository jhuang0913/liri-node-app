var app = (function(){

    //importing keys
    var client = require("./keys.js"),
        song = require('spotify');
        movie = require("request");


    //grabbing tweets
    var tweet = function(){
        var params = { 
            screen_name: 'jh80230920',
            count: 10
        };
        client.key.get('statuses/user_timeline', params, function (error, tweets, response) {
            
            // console.log(error);
            // console.log(tweets);

            for (var i = 0; i <tweets.length; i++){
                console.log((i + 1) +": " + tweets[i].text);
                console.log("------------------------------------------------------");
                console.log("------------------------------------------------------");
            }
        })
    }
        
    
    var search = function(){
        var params = {
        query: process.arg[3],
        count: 10
        };
        client.key.get("search/tweets", params, function(error, search, response){
        console.log(search);
        for (var i = 0; i < search.length; i++){
            console.log((i + 1) + ": " + search[i].text);
            console.log("------------------------------------------------------");
            console.log("------------------------------------------------------");
        }
        })
    }

    //positng to twitter account
    var post = function(){
        var params = {
            status: process.argv[3]
        }
    var promise =  client.key.post("statuses/update", params)
        promise.then(function(data){
            //console.log(data)
            console.log("Your tweet has been posted. ")
        })
        .catch(function(err){
            console.log(err.message);
        });
    }

    //searching songs
    var spotify = function () {
        var params = {
            type: "track",
            query: process.argv[3]
        }

        if(!params.query){
            params.query = "The Sign"
        }
        song.search(params, function(error, data){
            // console.log(data);

            for (var i = 0; i < data.tracks.items.length; i++){

                var need = data.tracks.items[i];
                console.log("Artist: " + need.album.artists[0].name);
                console.log("Album: " + need.album.name);
                console.log("Song's name: " + need.name);
                console.log("Preview song: " + need.preview_url);
                console.log("------------------------------------------------------");
                console.log("------------------------------------------------------");

            }
        });
    }


    //lookup movies
    var movie = function(){
        console.log("Hello!")

    }













    //returning functionalities
    return {
        tweet: tweet,
        spotify: spotify,
        post: post, 
        search: search,
        movie: movie
    }


})();



//process
switch(process.argv[2]){
    case 'my-tweets':
    app.tweet();
    break;

    case 'spotify-this-song':
    app.spotify();
    break;

    case "post":
    app.post();
    break;

    case "search":
    app.search();
    break;

    case "movie-this":
    app.movie();
    break;


    default:
    console.log('No tweets found');
}
