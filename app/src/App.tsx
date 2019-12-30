import React, {lazy, Suspense} from 'react';
import logo from './logo.jpg';
import './App.css';
import useTypingEffect from "use-typing-effect";
import {whiteSpaceStyles} from "./styles";
import BreathingButton from "./components/BreathingButton";
import {HashRouter, Switch, Route, Link} from "react-router-dom";
import useHtmlTitle from './hooks/use-html-title';
import {ApolloProvider} from "@apollo/react-hooks";
import { graphClient } from './graphql/inex';

const Home = lazy(() => import("./pages/Home"));
const Dev = lazy(() => import("./pages/Dev"));

const Welcome: React.FC = () => {
  const typing = useTypingEffect(["我 有 痛 苦 和 渴 望"], {
    loop: true
  });
  useHtmlTitle("欢迎来到文向东的主页");
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
      <ApolloProvider client={graphClient}>
        <Suspense fallback={<div>loading...</div>}>
          <HashRouter>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/dev" component={Dev} />
              <Route component={Welcome}/>
            </Switch>
          </HashRouter>
        </Suspense>
      </ApolloProvider>
  );
};

export default App;
