# Project Proposals
**Members:** Rachel Peng, Radovan Vitek, Jake Lee, Shunying Chen

## Pitch 1:
#### Description:
A web application where users can input the URL of their public steam profile and obtain links to other communities they may be interested in based on their game statistics.

#### Example Implementation:
I input my URL in a search bar. The software makes a call through the Steam API to find this profile and obtains the statistics from the profile. The software then determines which games are significant (to be defined by us later, whether over a certain threshold of hours or the top five games) and looks for keywords relevant for each game over the Reddit API to find related subreddits, Twitter API to find related users, and Facebook API to find related groups. The software then creates a dropdown list containing each link found.

#### Database Implementation:
MyPHP to store matches between games and subreddits. As some games are extremely common, we can "save" common pairings in the database to save on parsing time. For example, CS:GO has 750k average players a day, so we can save a link between that game and the main subreddit "r/globaloffensive" within a table.
Can also save returning users, as their primary interests are unlikely to change significantly. Obtain previous dataset and update from that instead of re-generating data.

#### APIs used:
* **Steam:** To obtain the dataset of a user from which to parse through to find relevant groups
* **Reddit:** One source of relevant groups, e.g., main subreddit of the group
* **Twitter:** Another source to find relevant groups, e.g., a developer of the game
* **Facebook:** Another source to find relevant groups, e.g., meme groups
* **NLP** (potentially)**:** Used to parse and interpret dataset
* **Spotify** (potentially)**:** Extension for an alternate dataset


## Pitch 2:
An application that allows its users to input a destination, a date range, and a selection of preferences. Based on those inputs, the application would return a tailored itinerary of things to do in that area based on online reviews, weather, and the user's preferences. Ideally, we would be able to pull tourist attractions, restaurants, and places to stay for the user. But for the scope of a semester project, it seems more feasible to focus on one of those aspects - tourist attractions. So, the APIs used for this would be a weather API and a tourism API. 
