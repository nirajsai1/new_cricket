import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../mycss/Input.css'
const Input2 = () => {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validate = () => {
    if (!p1 || !p2 || !p3) {
      setError('Please fill in all player names.');
    } else if (p1 === p2 || p1 === p3 || p2 === p3) {
      setError('Player names must be unique.');
    } else {
      setError('');
      localStorage.setItem('name1', p1);
      localStorage.setItem('name2', p2);
      localStorage.setItem('name3', p3);
      navigate('/three');
    }
  };

  return (
    <div className="input-container">
      <h2>Enter Player Names</h2>
      <input
        value={p1}
        onChange={handleChange(setP1)}
        placeholder='Enter player 1 name:'
        className="input-field"
      />
      <input
        value={p2}
        onChange={handleChange(setP2)}
        placeholder='Enter player 2 name:'
        className="input-field"
      />
      <input
        value={p3}
        onChange={handleChange(setP3)}
        placeholder='Enter player 3 name:'
        className="input-field"
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={validate} className="start-button">Start Game</button>
    </div>
  );
}

export default Input2;
