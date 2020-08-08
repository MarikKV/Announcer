import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Menu from "./componets/Menu";
import Landing from "./componets/Landing";
import AllAnnounces from "./componets/AllAnnounces";
import MyAnnounces from "./componets/MyAnnounces";
import SignIn from "./componets/SignIn";
import Home from "./componets/Home";
import About from "./componets/About";
import SearchAnnounce from "./componets/SearchAnnounce";

function App() {
  return (
    <HashRouter basename='/'>
        <Route path='/' component={Menu}/>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/Home' component={Home}/>
        <Route exact path='/AllAnnounces' component={AllAnnounces}/>
        <Route exact path='/MyAnnounces' component={MyAnnounces}/>
        <Route exact path='/Search' component={SearchAnnounce}/>
        <Route exact path='/SignIn' component={SignIn}/>
        <Route exact path='/About' component={About}/>
    </HashRouter>        
  );
}

export default App;
 