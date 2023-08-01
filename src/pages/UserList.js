import React, { useEffect } from "react";
import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const UserList = () => {
  const [favMoviesData, setFavMoviesData] = useState([]);
  useEffect(() => {
    const favMoviesFromLocalStorage = JSON.parse(
      localStorage.getItem("favMovies")
    );

    Promise.all(
      favMoviesFromLocalStorage.map((id) =>
        axios.get(
          "https://api.themoviedb.org/3/movie/" +
            id +
            "?api_key=" +
            process.env.REACT_APP_API_KEY +
            "&language=fr"
        )
      )
    )
      .then((responses) => {
        // Récupérer les données des films à partir des réponses
        const data = responses.map((res) => res.data);
        setFavMoviesData(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails des films",
          error
        );
      });
  }, []);
  return (
    <div>
      <Header />
      <div className="result">
        {favMoviesData
          ? favMoviesData.map((movie) => <Card movie={movie} key={movie.id} />)
          : null}
      </div>
    </div>
  );
};

export default UserList;
