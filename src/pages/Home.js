import React, { useEffect } from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import { useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [data, setData] = useState([]);
  const handleDataReceived = (data) => {
    setData(data);
  };
  return (
    <div>
      <Header />
      <Form onDataReceived={handleDataReceived} />
      <div className="result">
        {data.length === 0 ? (
          <h1>Il n'y a pas de film</h1>
        ) : (
          data.map((movie) => <Card movie={movie} key={movie.id} />)
        )}
      </div>
    </div>
  );
};

export default Home;
