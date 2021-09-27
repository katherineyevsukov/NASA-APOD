import React, { useState } from "react";
import "./App.css";
import Apod from "./components/ApodDisplay";
import DateSelector from "./components/DateSelector";
import PastApod from "./components/PastApod";
import styled from "styled-components";
import logo from "./images/nasalogo.png";

const HeaderWrapper = styled.header`
  text-align: center;
  margin: 4% 20% 5% 20%;

  h1 {
    font-style: italic;
    font-size: 7rem;
    margin-bottom: 2%;
    /* text-shadow: 2px 2px #4f4f4f; */
    color: rgba(0, 0, 0, 0.6);
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  }

  img.logo {
    height: 100px;
    width: 100px;
  }
`;

function App() {
  const [today, setToday] = useState(true);
  const [date, setDate] = useState("");

  return (
    <div className="App">
      <HeaderWrapper>
        <h1>
          NASA{" "}
          <span>
            <img className="logo" src={logo} alt="logo"></img>
          </span>
          APOD
        </h1>
        <h2>
          Discover the cosmos! Each day a different image or photograph of our
          fascinating universe is featured, along with a brief explanation
          written by a professional astronomer.
        </h2>
      </HeaderWrapper>
      {today ? <Apod /> : <PastApod date={date} />}
      <DateSelector setDate={setDate} setToday={setToday} />
    </div>
  );
}

export default App;
