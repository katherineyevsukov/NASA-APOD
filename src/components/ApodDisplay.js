import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL, API_KEY } from "./../config";

import styled from "styled-components";

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5%;
  p {
    font-size: 3rem;
  }
  .spinner {
    border: 16px solid #675d73;
    border-top: 16px solid #4d4459;
    border-radius: 50%;
    width: 1vh;
    height: 1vh;
    animation: spin 2s linear infinite;
    margin-top: 2%;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

const StyledApodDiv = styled.div`
  display: flex;
  max-height: 60vh;
  margin: 2% 5%;
  border: 4px outset grey;
  border-radius: 10px;
  padding: 2% 2%;
  max-width: fit-content;

  .description-container {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    padding: 2% 2%;
  }

  .image-container {
    max-width: 55%;
    margin-left: 5%;
    display: flex;
    justify-content: center;
  }
  h2 {
    font-size: 2.5rem;
    padding: 3% 0;
    text-align: center;
  }

  img,
  iframe {
    object-fit: contain;
    margin: 0 auto;
    /* border-radius: 10px; */
  }

  .description {
    text-indent: 30px;
    margin-bottom: 1ch;
  }
  .copyright {
    text-align: center;
    font-style: oblique;
  }
  @media ${(props) => props.theme.breakpointMobile} {
    flex-direction: column-reverse;
    align-items: center;
    max-height: max-content;

    .image-container {
      max-width: fit-content;
      max-height: max-content;
    }

    img {
      max-height: 100%;
    }

    .description-container {
      width: 100%;
    }
  }
`;

export default function Apod() {
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}?api_key=${API_KEY}`)
      .then((res) => {
        setLoading(false);
        setNow(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <LoadingDiv>
          <p>Loading...</p>
          <div className="spinner"></div>
        </LoadingDiv>
      ) : (
        <StyledApodDiv>
          <div className="description-container">
            <h3>{now.date}</h3>
            <h2>"{now.title}"</h2>
            <p className="description">{now.explanation}</p>
            {now.copyright && (
              <p className="copyright">Copyright: {now.copyright}</p>
            )}
          </div>
          <div className="image-container">
            {now.media_type === "video" ? (
              <iframe title="apod video" src={now.url}></iframe>
            ) : (
              <img src={now.url} alt="Apod"></img>
            )}
          </div>
        </StyledApodDiv>
      )}
    </>
  );
}

export { StyledApodDiv, LoadingDiv };
