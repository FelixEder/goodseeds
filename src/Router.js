import React from 'react';
import NavBar from './components/NavBar';
import StartPage from './components/StartPage';
import SignIn from './components/SignIn';
import UserProfile from './components/UserProfile';
import PlantDetails from './components/PlantDetails';
import SearchResults from './components/SearchResults';
import SignUp from './components/SignUp';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

export default function Router() {
  return (
    <div className="router">
      <BrowserRouter>
        <NavBar />
        <Switch>
        <Route exact path="/">
            <StartPage />
          </Route>
          <Route exact path="/login">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="/userProfile">
            <UserProfile />
          </Route>
          <Route path="/plantDetails/:id" component={PlantDetails} />
          <Route path="/SearchResults/:searchString?completeData">
            <SearchResults />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
