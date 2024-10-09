import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Flashcards data: array of objects with question and answer pairs
  const flashcards = [
    { question: "Who's that Pokémon?", img:'/src/assets/img/pikachu.jpeg', answer: "Pikachu", color: "green"},
    { question: "Who's that Pokémon?", img:'/src/assets/img/charmander.jpg', answer: "Charmander", color: "yellow"},
    { question: "Who's that Pokémon?", img:'/src/assets/img/bulbasaur.png', answer: "Bulbasaur", color: "red"},
  ];

  // State to track which flashcard is shown and whether to show the question or answer
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState(''); // Track user input
  const [feedback, setFeedback] = useState(''); // Feedback after user submits
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track if submission was made

  // Update to show the next flashcard and reset to show the question
  const updateNext = () => {
    setCurrentIndex((currentIndex + 1) % flashcards.length); // Loop through the array
    setShowAnswer(false); // Reset to show the question when moving to the next card
    resetFeedback(); // Reset user input and feedback
  };

  // Update to show the previous flashcard and reset to show the question
  const updatePrevious = () => {
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length); // Loop backward through the array
    setShowAnswer(false);
    resetFeedback();
  };

  // Toggle between question and answer (flip card)
  const toggleCard = () => setShowAnswer(!showAnswer);

  // Handle user submission
  const handleSubmit = () => {
    setHasSubmitted(true);
    const correctAnswer = flashcards[currentIndex].answer.toLowerCase();
    const userAnswer = userGuess.toLowerCase();
    
    // Check if at least the first 4 letters match
    if (userAnswer.length >= 4 && userAnswer.slice(0, 4) === correctAnswer.slice(0, 4)) {
      setFeedback('Correct! 🎉');
    } else {
      setFeedback('Incorrect! Try again.');
    }
  };

  // Reset the feedback when moving between cards
  const resetFeedback = () => {
    setUserGuess('');
    setFeedback('');
    setHasSubmitted(false);
  };

  return (
    <div className="App">
      <h1>Guess That Pokémon!</h1>
      <h3>Think you know your Pokédex? Let's see if you can identify these Pokémon!</h3>
      <h5>Number of Pokémon: {flashcards.length}</h5>

      {/* Flashcard display */}
      <div className={`flip-card ${flashcards[currentIndex].color}`} onClick={toggleCard}>
        <div className={`flip-card-inner ${showAnswer ? 'flipped' : ''}`}>
          <div className="flip-card-front">
            <h1>{flashcards[currentIndex].question}</h1>
            <img src={flashcards[currentIndex].img} alt="Pokemon" className="flashcard-img" />
          </div>
          <div className="flip-card-back">
            <h1>{flashcards[currentIndex].answer}</h1>
          </div>
        </div>
      </div>

      {/* User input for guess */}
      <div>
        <input
          type="text"
          placeholder="Enter your guess"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit Guess</button>
      </div>

      {/* Feedback */}
      {hasSubmitted && <p>{feedback}</p>}

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        <button onClick={updatePrevious}>Back</button>
        <button onClick={updateNext}>Next</button>
      </div>
    </div>
  );
};

export default App;
