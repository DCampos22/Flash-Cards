import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Flashcards data: array of objects with question and answer pairs
  const flashcards = [
    { question: "Who's that Pokémon?", answer: "Pikachu" },
    { question: "Who's that Pokémon?", answer: "Charmander" },
    { question: "Who's that Pokémon?", answer: "Bulbasaur" },
  ];

  // State to track which flashcard is shown and whether to show the question or answer
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Update to show the next flashcard and reset to show the question
  const updateNext = () => {
    setCurrentIndex((currentIndex + 1) % flashcards.length); // Loop through the array
    setShowAnswer(false); // Reset to show the question when moving to the next card
  };

  // Toggle between question and answer (flip card)
  const toggleCard = () => setShowAnswer(!showAnswer);

  return (
    <div className="App">
      <h1>Guess That Pokémon!</h1>
      <h3>Think you know your Pokédex? Let's see if you can identify these Pokémon!</h3>
      <h5>Number of Pokémon: {flashcards.length}</h5>

      {/* Flashcard display */}
      <div className="flip-card" onClick={toggleCard}>
        <div className={`flip-card-inner ${showAnswer ? 'flipped' : ''}`}>
          <div className="flip-card-front">
            <h1>{flashcards[currentIndex].question}</h1>
          </div>
          <div className="flip-card-back">
            <h1>{flashcards[currentIndex].answer}</h1>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button onClick={updateNext}>Next</button>
    </div>
  );
};

export default App;
