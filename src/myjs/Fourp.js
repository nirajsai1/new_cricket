import React, { useState, useEffect } from 'react';
import '../mycss/Fourp.css';
import batsman from '../myjson/batsman.json';
import bowler from '../myjson/bowlers.json';
import allrounder from '../myjson/allrounders.json';
import wicketKeeper from '../myjson/wicketkeepers.json';

const Fourp = () => {
    const categories = ['batsman', 'bowler', 'allrounder', 'wicket keeper'];
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [options, setOptions] = useState([]);
    const [round, setRound] = useState(1);
    const [playerScores, setPlayerScores] = useState([0, 0, 0, 0]);
    const [playerTeams, setPlayerTeams] = useState([[], [], [], []]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [win, setWin] = useState('');
    const [leadingPlayer, setLeadingPlayer] = useState('');
    const [num,setNum]=useState(0);
    const playerNames = [
        localStorage.getItem('name1') || 'Player 1',
        localStorage.getItem('name2') || 'Player 2',
        localStorage.getItem('name3') || 'Player 3',
        localStorage.getItem('name4') || 'Player 4',
    ];

    const playerData = {
        batsman: batsman,
        bowler: bowler,
        allrounder: allrounder,
        'wicket keeper': wicketKeeper,
    };

    const getOptions = () => {
        const currentCategory = categories[currentCategoryIndex];
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
    }, [currentCategoryIndex]);

    const getCurrentPlayerIndex = () => {
        const baseOrder = [0, 1, 2, 3];
        const shift = Math.floor((round - 1) / 4) % 4;
        return baseOrder.map(index => (index + shift) % 4);
    };

    const rating = (item) => {
        const player = [...batsman, ...bowler, ...allrounder, ...wicketKeeper].find(h => h.name === item);
        setNum(player.rating);
        return player ? player.rating : 0;
    };

    const opt = (item) => {
        const playerOrder = getCurrentPlayerIndex();
        const currentPlayerIndex = playerOrder[(round - 1) % 4];
        const playerRating = rating(item);

        setSelectedOptions(prev => [...prev, item]);

        const updatedTeams = [...playerTeams];
        updatedTeams[currentPlayerIndex].push(`${item}:${playerRating}`);
        setPlayerTeams(updatedTeams);

        setPlayerScores(prevScores => {
            const updatedScores = [...prevScores];
            updatedScores[currentPlayerIndex] += playerRating;
            return updatedScores;
        });

        next();
    };

    const next = () => {
        if (round < 16) {
            setRound(prev => {
                const newRound = prev + 1;
                if (newRound % 4 === 1 && newRound <= 16) {
                    setCurrentCategoryIndex(prevIndex => (prevIndex + 1) % categories.length);
                    getOptions();
                }
                return newRound;
            });
        } else if (round === 16) {
            setTimeout(result, 0); // Calculate the result after the final move
        }
        updateLeadingPlayer();
    };

    const result = () => {
        playerScores[2]=playerScores[2]+num;
        const maxScore = Math.max(...playerScores);
        let winners = [];
        for (let i = 0; i < playerScores.length; i++) {
            if (playerScores[i] === maxScore) {
                winners.push(playerNames[i]);
            }
        }

        if (winners.length === 1) {
            setWin(`${winners[0]} wins`);
        } else {
            setWin(`It's a draw: ${winners.join(', ')}`);
        }
    };

    const updateLeadingPlayer = () => {
        const maxScore = Math.max(...playerScores);
        let leader = null;
        for (let i = 0; i < playerScores.length; i++) {
            if (playerScores[i] === maxScore) {
                leader = playerNames[i];
                break;
            }
        }
        setLeadingPlayer(leader || 'No Leader');
    };

    const resetGame = () => {
        setCurrentCategoryIndex(0);
        setRound(1);
        setPlayerScores([0, 0, 0, 0]);
        setPlayerTeams([[], [], [], []]);
        setWin('');
        setSelectedOptions([]);
        setLeadingPlayer('');
        getOptions();
    };

    const playerOrder = getCurrentPlayerIndex();
    const currentPlayer = playerNames[playerOrder[(round - 1) % 4]];

    return (
        <div className="container">
            <h2>{`${currentPlayer}'s Turn`}</h2>
            <p>Current Category: {categories[currentCategoryIndex].toUpperCase()}</p>
            <ul>
                {options.map((item, index) => (
                    <li 
                        key={index} 
                        onClick={() => !selectedOptions.includes(item) && opt(item)} 
                        className={selectedOptions.includes(item) ? 'selected' : ''}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <div className="team-list">
                {playerNames.map((playerName, playerIndex) => (
                    <div className="player-info" key={playerIndex}>
                        <p>{`${playerName}:`}</p>
                        <div className="player-details">
                            <ul>
                                {playerTeams[playerIndex].map((item, ind) => (
                                    <li key={ind}>{item}</li>
                                ))}
                            </ul>
                            <span>Score: {playerScores[playerIndex]}</span>
                        </div>
                    </div>
                ))}
            </div>
            <p className="win-message">{win}</p>
            <p className="leading-player">{leadingPlayer && `Leading Player: ${leadingPlayer}`}</p>
            <button onClick={resetGame}>Restart Game</button>
        </div>
    );
};

export default Fourp;
