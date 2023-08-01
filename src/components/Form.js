import React, { useEffect } from "react";
import { useRef, useState } from "react";
import axios from "axios";

const Form = ({ onDataReceived }) => {
  const form = useRef();
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
          process.env.REACT_APP_API_KEY +
          "&language=fr&page=1"
      )
      .then((res) => {
        onDataReceived(res.data.results);
        setData(res.data.results);
      });
  }, []);
  const getData = async (e) => {
    e.preventDefault();
    const query = form.current[0].value;
    const url =
      "https://api.themoviedb.org/3/search/movie?api_key=" +
      process.env.REACT_APP_API_KEY +
      "&language=fr&query=" +
      query +
      "&page=1&include_adult=false";
    await axios.get(url).then((res) => {
      setData(res.data.results);
      onDataReceived(res.data.results);
    });
  };

  const sortGoodToBad = () => {
    const sortedData = [...data].sort((a, b) => {
      return b.vote_average - a.vote_average;
    });
    setData(sortedData);
    onDataReceived(sortedData);
  };
  const sortBadToGood = () => {
    const sortedData = [...data].sort((a, b) => {
      return a.vote_average - b.vote_average;
    });
    setData(sortedData);
    onDataReceived(sortedData);
  };

  return (
    <div className="form-component">
      <div className="form-container">
        <form ref={form} onSubmit={getData}>
          <input type="text" placeholder="Saisir un mot" />
          <input type="submit" value="Rechercher" />
        </form>
      </div>
      <div className="btn-sort-container">
        <div id="goodToBad" onClick={sortGoodToBad}>
          Top
          <span>&rarr;</span>
        </div>
        <div id="badToGood" onClick={sortBadToGood}>
          Flop
          <span>&rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default Form;
