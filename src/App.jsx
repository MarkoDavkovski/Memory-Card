import { useState, useEffect } from "react";

import "./App.css";
import Card from "./components/Card";
import Footer from "./components/Footer";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [scoreArr, setScoreArr] = useState([]);
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [message, setMessage] = useState("Loading cards...");

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "5g2nTxUic4kwgJu5Um62Pqt2H5z3IHlf";
      const randomTag = "nature";
      const numberOfCards = 10;
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${randomTag}&limit=${numberOfCards}`;

      try {
        const responses = await Promise.all(
          Array.from({ length: numberOfCards }, async () => {
            const response = await fetch(url, { mode: "cors" });
            return response.json();
          })
        );

        const randomCards = responses.map((data, index) => ({
          id: index,
          imgUrl: data.data.images.original.url,
          title: data.data.title,
        }));

        setCards(randomCards);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setCards([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const shuffleCards = () => {
    setCards((prevCards) => {
      const shuffledCards = prevCards.slice();
      for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [
          shuffledCards[j],
          shuffledCards[i],
        ];
      }
      return shuffledCards;
    });
  };

  const trackScore = (id) => {
    if (scoreArr.length === 0) {
      setScoreArr([id]);
      setCurrScore(1);
      if (bestScore === 0) {
        setBestScore(1);
      }
    } else if (!scoreArr.includes(id)) {
      const newScoreArr = [...scoreArr, id];
      setScoreArr(newScoreArr);
      setCurrScore(newScoreArr.length);

      if (bestScore < newScoreArr.length) {
        setBestScore(newScoreArr.length);
      }
    } else {
      setCurrScore(0);
      setScoreArr([]);
    }
  };

  const handleCardClick = (id) => {
    if (loading) return;

    setLoading(true);
    setMessage("Shuffling cards...");

    setTimeout(() => {
      setLoading(false);
      trackScore(id);
      shuffleCards();
    }, 500);
  };

  return (
    <>
      <ScoreBoard currScore={currScore} bestScore={bestScore} />
      <main className="cards-container">
        {loading ? (
          <h1>{message}</h1>
        ) : (
          cards.map((card) => (
            <Card
              key={card.id}
              imgUrl={card.imgUrl}
              title={card.title}
              onClick={() => handleCardClick(card.id)}
            />
          ))
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
