import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Game from './Games';

const Twop = () => {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [detail, setDetails] = useState(false);
  const navigate = useNavigate();

  const player1 = (event) => {
    setP1(event.target.value);
  }

  const player2 = (event) => {
    setP2(event.target.value);
  }

  const validate = () => {
    if (p1 !== p2 && p1 !== '' && p2 !== '') {
      setDetails(true);
      localStorage.setItem('name1', p1);
      localStorage.setItem('name2', p2);
      navigate('/game');
    }
  }

  return (
    <div>
      <input
        value={p1}
        onChange={player1}
        placeholder='Enter player 1 name:'
      />
      <input
        value={p2}
        onChange={player2}
        placeholder='Enter player 2 name:'
      />
      <button onClick={validate}>Start Game</button>
    </div>
  );
}

export default Twop;

