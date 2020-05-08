# goodseeds

### About
Goodseeds is a website where you can search for different kinds of plants, create your own garden in your profile page and check what the top rated plants are. You can also read details about and review plants, and water the plants in your garden. The site is meant to allow you to keep track of the plants you have in your home.

### How to set up
First, clone this repo to your local machine. In order to make the project work locally with npm, checkout the branch *runLocally*. This branch is set up to use a token for the trefle api configured for localhost:3000, otherwise this branch is an exact copy of master. After checking out the branch, run the command *npm install* followed by *npm start* and a web page should automatically open up in your browser. If not, manually go to *localhost:3000* in your favorite browser to see the web page run locally.
* You need to have a config file /config/FirebaseConfig.js in order to run this application. Contact us if you need them.

### What we have done
We have created our website in React Redux. You start on the start page and you can access the different views by using the corresponding buttons on the nav bar. You can also search for different plants in the search bar. After you get the results from a search, you can click on them in order to find out more details about them. On the details page you can also read reviews about the plant from other users as well as the average rating for the plant. 

We have also added a way to create an account and log into the web site. If you log in you get access to more features, like adding plants to your garden as well as the other things.

We have made a cloud function in firebase that calls the API we are using (trefle.io) to get a JWT-token so that we can make client-side requests to the API. Our website then calls this firebase function when it needs a fresh token. We have set up hosting on firebase (goodseeds.web.app) and we can easily deploy new builds to it from the CLI.

A number of actions and reducers have been done for plants and reviews, such as addPlant, waterPlant, addReview and deletePlant.

We have also created the necessary collections in Firestore that we will use. The structure in those collections may be updated as we discover new problems.

We have managed to create a skeleton for connecting our reducers with the collections in Firestore. This means that when dispatching an action from our reducer, we can simultaneously call our database and add our data to the database. Furthermore, we can also retrieve the data from Firestore, with a special reducer.

### Grading criteria
#### Architecture/code
* Entire project made with react-redux
* All components generated with higher order function `glue`
* We use Materials UI as a third party component
* Glue function acts as container, the rest of the file acts as the presentational view

#### Usability
* Intended users are those who wish to maintain an overview of their plants
* About page to explain how to use the application
* Feedback sent to user through "snackbar"-notifications, mouse-hover text, pop-ups, button animations
* 2 user consultations were made (see Canvas)

#### Web API
* Data fetched from https://trefle.io/ API
* Application data shared with all users
* Spinner when waiting for API fetch

#### Group cooperation
* Worked mostly in groups of two, at first with frontend/backend then later more agile
* Continuously pushed work to github to let group peer review work

### Project file structure

* functions/
  - index.js: contains cloud functions to get JWT token from the Trefle API.
* public/
  - index.html: the start location of the application
* src/
  - api/
    - trefleApiCalls.js: contains multiple API call functions to the Trefle API.
    - trefleAuth.js: contains functions for getting JWT token from Firebase
  - components/
    - about.js: page explaaining the websites purpose and different functions
    - NavBar.js: handles navigation of the website
    - PlantDetails.js: what will show when you click a plant in searchresults or your profile garden
    - SearchBar.js: part of the navbar, has a field to type in searches
    - signIn.js: sign in view
    - signUp.js: sign up view
    - SearchResults.js: shows the result of the search
    - StartPage.js: startpage with relevant info like, popular plants, recent reviews and reminders to water plants
    - UserProfile.js: profilepage with userinformation and you garden
  - config/
    - FirebaseConfig.js: config file for firebase
  - store/
    - actions/
      - plantActions.js: redux actions regarding plants.
      - reviewActions.js: redux actions regarding reviews.
    - reducers/
      - plantReducer.js: reducer for plantActions.
      - reviewReducer.js reducer for reviewActions.
      - rootReducer.js: combines all the reducers.
      - searchResultsReducer: reducer for searchResultActions.
  - index.js: Main file, renders the app to the DOM, makes all the imports, creates the redux-store
  - Router.js: routerfile which handles routing.
* .firebaserc: config file for firebase
* firebase.json: config file for firebase
