import React, { useEffect } from "react";
import axios from "axios";

const Card = ({ movie }) => {
  const url = "https://image.tmdb.org/t/p/original/";
  const date = new Date(movie.release_date).toLocaleDateString("fr-FR");
  const [genresData, setGenresData] = React.useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
          process.env.REACT_APP_API_KEY +
          "&language=fr"
      )
      .then((res) => {
        setGenresData(res.data.genres);
      });
  }, []);

  const setLocalStorage = () => {
    const favMovies = [];
    const favMoviesFromLocalStorage = JSON.parse(
      localStorage.getItem("favMovies")
    );
    if (favMoviesFromLocalStorage) {
      favMovies.push(...favMoviesFromLocalStorage);
      if (favMovies.includes(movie.id)) {
        return;
      }
      favMovies.push(movie.id);
    } else {
      if (favMovies.includes(movie.id)) {
        return;
      } else {
        favMovies.push(movie.id);
      }
    }
    localStorage.setItem("favMovies", JSON.stringify(favMovies));
  };
  const genresMovie = (movie.genres ? movie.genres : movie.genre_ids).map(
    (id) => {
      if (!genresData) {
        return;
      } else {
        const genreMovie = genresData.find((genre) => genre.id === id);
        return genreMovie ? genreMovie.name : null;
      }
    }
  );
  return (
    <div className="card">
      <img
        src={movie.poster_path ? url + movie.poster_path : "./img/poster.jpg"}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <h5>Sortie le : {date}</h5>
      <h4>
        {parseFloat(movie.vote_average).toFixed(1)}/10 <span>&#11088;</span>
      </h4>
      <ul>
        {movie.genres
          ? movie.genres.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))
          : genresMovie.map((genre, index) => <li key={index}>{genre}</li>)}
      </ul>
      <h3>Synopsis</h3>
      <p>{movie.overview}</p>
      <a className="btn" onClick={setLocalStorage}>
        ajouter aux favori
      </a>
    </div>
  );
};

export default Card;
