import React, { useState, useEffect } from 'react';
import '../mycss/Threep.css';
import batsman from '../myjson/batsman.json';
import bowler from '../myjson/bowlers.json';
import allrounder from '../myjson/allrounders.json';
const Threep = () => {
    const categories = ['batsman', 'bowler', 'allrounder'];
    const [ci, setCi] = useState(0);
    const [options, setOptions] = useState([]);
    
    const player1 = localStorage.getItem('name1') || 'Player1';
    const player2 = localStorage.getItem('name2') || 'Player2';
    const player3 = localStorage.getItem('name3') || 'Player3';
    
    const chances = [player1, player2, player3, player2, player3, player1, player3, player1, player2];
    
    const [l1, setL1] = useState([]);
    const [l2, setL2] = useState([]);
    const [l3, setL3] = useState([]);
    const [c, setC] = useState(1);
    const [aob, setAob] = useState(0);  
    const [bob, setBob] = useState(0);  
    const [cob, setCob] = useState(0);  
    const [win, setWin] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const playerData = {
        batsman: batsman,
        bowler: bowler,
        allrounder: allrounder
    };

    const getOptions = () => {
        const currentCategory = categories[ci];
        let newOptions = [];
        while (newOptions.length < 5) {
            const randomIndex = Math.floor(Math.random() * playerData[currentCategory].length);
            const player = playerData[currentCategory][randomIndex];
            if (player && !newOptions.includes(player.name)) {
                newOptions.push(player.name);
            }
        }
        setOptions(newOptions); 
    };

    useEffect(() => {
        getOptions();
    }, [ci]);

    const rating = (item) => {
        const player = batsman.find(h => h.name === item) || bowler.find(h => h.name === item) || allrounder.find(h => h.name === item);
        return player ? player.rating : 0;
    };

    const opt = (item) => {
        if (win) return; 

        const playerTurn = chances[c - 1];
        const playerRating = rating(item);
        if (c <= 9) {
            setSelectedOptions(prev => [...prev, item]);
            if (playerTurn === player1) {
                setL1(prev => [...prev, `${item}:${playerRating}`]);
                setAob(prev => prev + playerRating);
            } else if (playerTurn === player2) {
                setL2(prev => [...prev, `${item}:${playerRating}`]);
                setBob(prev => prev + playerRating);
            } else {
                setL3(prev => [...prev, `${item}:${playerRating}`]);
                setCob(prev => prev + playerRating);
            }
            next();
        }
    };

    const result = () => {
        if (aob > bob && aob > cob) {
            setWin(player1);
        } else if (bob > aob && bob > cob) {
            setWin(player2);
        } else if (cob > aob && cob > bob) {
            setWin(player3);
        } else {
            setWin('Tie');
        }
    };

    const next = () => {
        if (c < 9) {
            setC(prev => prev + 1);
            if (c % 3 === 0) {
                setCi(prevCi => (prevCi + 1) % categories.length);
                getOptions();
            }
        } else {
            setOptions([]);
            result();
        }
    };

    const resetGame = () => {
        setCi(0);
        setC(1);
        setAob(0);
        setBob(0);
        setCob(0);
        setWin('');
        setL1([]);
        setL2([]);
        setL3([]);
        setSelectedOptions([]);
        getOptions();
    };

    return (
        <div className="container">
            <h2>{win ? `${win} wins!` : `${chances[c - 1]}'s Turn`}</h2>
            <p>Three Player Game...</p>
            <p>Current Category: {categories[ci].toUpperCase()}</p>
            <ul>
                {options.map((item, index) => (
                    <li 
                        key={index} 
                        onClick={() => !selectedOptions.includes(item) && opt(item)} 
                        className={selectedOptions.includes(item) ? 'selected' : ''}>
                        {item}
                    </li>
                ))}
            </ul>
            <div className="player-blocks">
                <div className="team-list">
                    <p>{player1}'s team: <span className="player-score">{aob}</span></p> 
                    <ul>
                        {l1.map((item, ind) => (
                            <li key={ind}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="team-list">
                    <p>{player2}'s team: <span className="player-score">{bob}</span></p>
                    <ul>
                        {l2.map((item, ind) => (
                            <li key={ind}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="team-list">
                    <p>{player3}'s team: <span className="player-score">{cob}</span></p>
                    <ul>
                        {l3.map((item, ind) => (
                            <li key={ind}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className="win-message">{win && `${win} wins!`}</p>
            <button onClick={resetGame}>Restart Game</button>
        </div>
    );
};

export default Threep;