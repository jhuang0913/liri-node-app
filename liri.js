var app = (function(){

    //importing keys
    var client = require("./keys.js"),
        song = require('spotify'),
        rp = require("request-promise"),
        fs = require("fs");

    var readFile = fs.readFileSync("random.txt", "utf8");

    fs.appendFile("log.txt", "\n" + "Command: " + process.argv[2] + "\n" + "Search: " + process.argv[3] + "\n" + "--------------------", function(err){
           if (err) return console.log(err);
    });


    //LiriBot
    var liriBot = function(){
        console.log(readFile);

        var songTitle = readFile.split(",");
        console.log(songTitle[1]);

        var params = {
            type: "track",
            query: songTitle[1]
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
    var spotify = function (songsong) {
        var defualtSong =function(){
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
    }


    //lookup movies
    var movie = function(){

       var search =  process.argv[3];

       if (!search){
           search = "Mr. Nobody";
       }
       var promise = rp ("http://www.omdbapi.com/?t=" + search);
       promise.then(function (data){
           var data = JSON.parse(data);

           try{
               if(!data.Title){
                   throw console.log("Movie title not found!");
               }
           }
           catch(error){
            console.log(err.message);
           }

          console.log("Movie title: " + data.Title);
          console.log("Movie released: " + data.Year);
          console.log("IMDB rating: " + data.imdbRating);
                    data.Ratings.map(function (el, index, arr){
              if(el.Source == "Rotten Tomatoes"){
                  console.log("Rotten Tomatoes Rating: " + el.Value);
              } else if (!el.Source){
                  console.log("Rotten Tomatoes Rating: N/A");
              }
          });
          console.log("Movie plot: " + data.Plot);
          console.log("Movie Country: " + data.Country);
          console.log("Movie language: " + data.Language);
          console.log("Actors: "+ data.Actors);
       })

       .catch(function(err){
           console.log(err.message);
       })

    }






    //returning functionalities
    return {
        tweet: tweet,
        spotify: spotify,
        post: post, 
        search: search,
        movie: movie,
        liriBot: liriBot
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

    case "do-what-it-says":
    app.liriBot();
    break;


    default:
    console.log('No tweets found');
}
