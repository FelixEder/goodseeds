# goodseeds

### About
Goodseeds is a website where you can search for different kinds of plants, create your own garden in your profile page and check what's the most popular plant at the moment. You can also read details about and review plants and set reminders to water the plants in your garden.

### What we have done
We have created a basic version of the website in React. You can access the different views by using the corresponding buttons on the nav bar. You can also search for different plants in the search bar.

We have made a cloud function in firebase that calls the API we are using (trefle.io) to get a JWT-token so that we can make client-side requests to the API. Our website then calls this firebase function when it needs a fresh token.

We have set up hosting on firebase (goodseeds.web.app) and we can easily deploy new builds to it from the CLI.

A number of actions and reducers have been done for plants and reviews, such as addPlant, waterPlant and addReview. they have yet to be integrated into the whole app because some of the functionality have not been done yet.
We have also created the necessary collections in Firestore that we will use. The structure in those collections may be updated as we discover new problems.

### What we have yet to do
What needs to be done before the final submission is that we need to complete all the functionallity for the components. We need to figure out what kind of state we want to store in the app while its running.

At the moment we have only done wery basic styling. We will try to use bootstrap in order to create the styling for the app.


### Project file structure

* functions/
  - index.js
* public/
  - index.html
* src/
  - components/
    - NavBar.js: handles navigation of the website
    - PlantDetails.js: what will show when you click a plant in searchresults or your profile garden
    - SearchBar.js
    - SearchResults.js: shows the result of the search
    - StartPage.js: startpage with relevant info like, popular plants, recent reviews and reminders to water plants
    - UserProfile.js: profilepage with userinformation and you garden
  - config/
    - FirebaseConfig.js:
  - store/
    - actions/
      - plantActions.js: redux actions regarding plants.
      - reviewActions.js: redux actions regarding reviews.
      - arrayActions.js: testfiles
      - numberActions.js:Testfiles
    - reducers/
      - plantReducer.js: reducer for plantactions.
      - reviewReducer.js reducer for reviewActions.
      - arrayReducer.js: testfiles
      - numberReducer.js: testfiles
      - rootReducer.js: combines all the reducers.
  - App.css
  - App.js: renders the router.
  - index.css
  - index.js: Main file, renders the app to the DOM, makes all the imports, creates the redux-store
  - Router.js: routerfile which handles routing.
* .firebaserc
* firebase.json
* README.md
