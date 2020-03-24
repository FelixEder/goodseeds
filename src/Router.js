import React from 'react';
import NavBar from './components/NavBar';
import StartPage from './components/StartPage';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import PlantDetails from './components/PlantDetails';
import SearchResults from './components/SearchResults';
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
            <Login />
          </Route>
          <Route path="/userProfile">
            <UserProfile />
          </Route>
          <Route path="/plantDetails">
            <PlantDetails />
          </Route>
          <Route path="/SearchResults">
            <SearchResults />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
