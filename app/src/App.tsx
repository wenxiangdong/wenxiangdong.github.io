import React, { lazy, Suspense } from 'react';
import logo from './logo.jpg';
import './App.css';
import useTypingEffect from "use-typing-effect";
import { whiteSpaceStyles } from "./styles";
import BreathingButton from "./components/BreathingButton";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import useHtmlTitle from './hooks/use-html-title';
import { LogContainer } from "./hooks/use-logger";
import styled from 'styled-components';

const Home = lazy(() => import("./pages/Home"));
const Dev = lazy(() => import("./pages/Dev"));
const JsonToTypescript = lazy(() => import("./pages/Tools/JsonToTypescript"));
const LogProvider = LogContainer.Provider;

const Welcome: React.FC = () => {
  const typing = useTypingEffect(["我 有 痛 苦 和 渴 望"], {
    loop: true
  });
  useHtmlTitle("欢迎来到文向东的主页");
  return (
    <div className="box-border w-screen h-screen text-center bg-white bg-center bg-no-repeat bg-cover dark:bg-black">
      <header
        className="flex flex-col items-center justify-center min-h-screen text-3xl text-black dark:text-white">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Home__motto">
          {typing}
        </p>
        <div style={{ ...whiteSpaceStyles({ height: 48 }) }} />
        <Link to={"/home"}>
          <BreathingButton />
        </Link>
      </header>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <LogProvider initialState={process.env.NODE_ENV === "development"}>
      <Suspense fallback={<div>loading...</div>}>
        <HashRouter>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/tools/json-to-typescript" component={JsonToTypescript} />
            {process.env.NODE_ENV === "development" && <Route path="/dev" component={Dev} />}
            <Route component={Welcome} />
          </Switch>
        </HashRouter>
      </Suspense>
    </LogProvider>
  );
};

export default App;
