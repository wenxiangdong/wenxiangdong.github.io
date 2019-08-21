import React from 'react';
import logo from './logo.jpg';
import './App.css';
import useTypingEffect from "use-typing-effect";
import {outlineButtonStyles, whiteSpaceStyles} from "./styles";
import BreathingButton from "./components/common/BreathingButton";

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
        {/*<button style={{...outlineButtonStyles({borderColor: "white"}), width: "15vmin", marginTop: "2em"}}>进入</button>*/}
        <BreathingButton />
      </header>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Welcome />
  );
};

export default App;
