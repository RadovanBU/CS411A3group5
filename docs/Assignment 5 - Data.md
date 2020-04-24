# Team Assignment 4: Data

## Cache

```
let db_return = mongo.collection(“games”).find({“redditName”: currentGame}).each(function(err, result) {

	let redditJSONsteam = result;
	
	if (redditJSONsteam) {
		redditAPIresults.push(result.reddits);
  }

	else {
		fetch(“http://www.reddit.com/subreddits/search.json?q=” + currentGame + “&sort=new”)

			.then(response => {
        return response.json();
			})

			.then(json => {
				lenvar = json.data.children.length;
				for (let i = 0; i < lenvar; i++) {
          redditAPIresults.push(json.data.children[i].data.display_name_prefixed);
				}
			})

			.catch(err => {
				res.render(“index”, {title: “error”});
			})
	}
});
```

## Data Documentation

Games: {redditName : Game Name, reddits: list of reddits associated with that game}

Games Collection Example
{
	"_id" : ObjectId("5e9a3928b9f3ae79defda627"),
	"redditName" : "Citizen Kane",
	"reddits" : [
		"r/CitizenKane"
	]
}

Users: {‘steamId’ : steamId found from the steam API}

Users Collection Example:
{
	“_id” : ObjectId(“5e9a3928b9f3ae79defda627”),
	“steamId” : 76561199048589492
}


## Sequence Diagram
