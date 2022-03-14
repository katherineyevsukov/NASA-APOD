import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL, API_KEY } from "./../config/index";
import { StyledApodDiv } from "./ApodDisplay";

export default function PastApod(props) {
  const { date } = props;
  const [pastApod, setPastApod] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}?api_key=${API_KEY}&date=${date}`)
      .then((res) => {
        console.log("data", res.data);
        setPastApod(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  return (
    <StyledApodDiv>
      <div className="description-container">
        {<h3>{pastApod.date}</h3>}
        <h2>"{pastApod.title}"</h2>
        <p className="description">{pastApod.explanation}</p>
        {
          <p className="copyright">
            {pastApod.copyright && `Copyright: ${pastApod.copyright}`}
          </p>
        }
      </div>
      <div className="image-container">
        {pastApod.media_type === "video" ? <iframe title ="apod video" src={pastApod.url}></iframe> :
        <img src={pastApod.url} alt="Apod"></img>}
      </div>
    </StyledApodDiv>
  );
}
