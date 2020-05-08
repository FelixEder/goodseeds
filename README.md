# goodseeds

### About
Goodseeds is a website where you can search for different kinds of plants, create your own garden in your profile page and check what's the most popular plant at the moment. You can also read details about and review plants and set reminders to water the plants in your garden.

### What we have done
We have created our website in React Redux. You start on the start page and you can access the different views by using the corresponding buttons on the nav bar. You can also search for different plants in the search bar. After you get the results from a search, you can click on them in order to find out more details about them. On the details page you can also read reviews about the plant from other users as well as the average rating for the plant. 

We have made a cloud function in firebase that calls the API we are using (trefle.io) to get a JWT-token so that we can make client-side requests to the API. Our website then calls this firebase function when it needs a fresh token. We have set up hosting on firebase (goodseeds.web.app) and we can easily deploy new builds to it from the CLI.

A number of actions and reducers have been done for plants and reviews, such as addPlant, waterPlant and addReview. they have yet to be integrated into the whole app because some of the functionality have not been done yet. They are in production! as such they have not been merged in to the master at the momment.

We have also created the necessary collections in Firestore that we will use. The structure in those collections may be updated as we discover new problems.

We have managed to create a skeleton for connecting our reducers with the collections in Firestore. This means that when dispatching an action from our reducer, we can simultaneously call our database and add our data to the database. Furthermore, we can also retrieve the data from Firestore, with a special reducer.

We have also integrated our search bar with the Trefle API so that you can search for a specific plant and see the output as a simple list of strings.

### What we have yet to do
What needs to be done before the final submission is that we need to complete all the functionallity for the components. We need to figure out what kind of state we want to store in the app while its running.

At the moment we have only done wery basic styling. We will try to use bootstrap in order to create the styling for the app.

We will also set up user authentication.


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
    - NavBar.js: handles navigation of the website
    - PlantDetails.js: what will show when you click a plant in searchresults or your profile garden
    - SearchBar.js: part of the navbar, has a field to type in searches
    - SearchResults.js: shows the result of the search
    - StartPage.js: startpage with relevant info like, popular plants, recent reviews and reminders to water plants
    - UserProfile.js: profilepage with userinformation and you garden
  - config/
    - FirebaseConfig.js: config file for firebase
  - store/
    - actions/
      - plantActions.js: redux actions regarding plants.
      - reviewActions.js: redux actions regarding reviews.
      - arrayActions.js: testfiles
      - numberActions.js:Testfiles
    - reducers/
      - plantReducer.js: reducer for plantActions.
      - reviewReducer.js reducer for reviewActions.
      - arrayReducer.js: testfiles
      - numberReducer.js: testfiles
      - rootReducer.js: combines all the reducers.
      - searchResultsReducer: reducer for searchResultActions.
  - App.js: renders the router.
  - index.js: Main file, renders the app to the DOM, makes all the imports, creates the redux-store
  - Router.js: routerfile which handles routing.
* .firebaserc: config file for firebase
* firebase.json: config file for firebase
