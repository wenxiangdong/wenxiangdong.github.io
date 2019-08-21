import React from 'react';
import logo from './logo.jpg';
import './App.css';
import useTypingEffect from "use-typing-effect";
import {whiteSpaceStyles} from "./styles";
import BreathingButton from "./components/BreathingButton";
import {HashRouter, Switch, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Dev from "./pages/Dev";

const Welcome: React.FC = () => {
  const typing = useTypingEffect(["我 有 痛 苦 和 渴 望"], {
    loop: true
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Home__motto">
          {typing}
        </p>
        <div style={{...whiteSpaceStyles({height: 48})}} />
          <Link to={"/home"}>
              <BreathingButton />
          </Link>
      </header>
    </div>
  );
};

const App: React.FC = () => {
  return (
      <HashRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/dev" component={Dev} />
          <Route component={Welcome}/>
        </Switch>
      </HashRouter>
  );
};

export default App;
