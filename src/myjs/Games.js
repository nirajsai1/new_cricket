import React, { useState, useEffect } from 'react';
import batsman from '../myjson/batsman.json';
import bowler from '../myjson/bowlers.json';
import allrounder from '../myjson/allrounders.json';
import '../mycss/Two.css';
const Games = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [start, setStart] = useState('Player1');
    const [options, setOptions] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [p1Selection, setP1Selection] = useState('');
    const [p2Selection, setP2Selection] = useState('');
    const [list1, setList1] = useState([]);
    const [list2, setList2] = useState([]);
    const [aop, setAop] = useState(0);
    const [bop, setBop] = useState(0);
    const [turnCount, setTurnCount] = useState(0); // Track the number of total turns

    // Player categories in order
    const playerTypes = [batsman, allrounder, bowler];
    const [categoryIndex, setCategoryIndex] = useState(0); // Track the current category (0 for batsman, 1 for allrounder, 2 for bowler)

    // Function to get options for the current category
    const getOptions = () => {
        const currentType = playerTypes[categoryIndex];
        const newOptions = [];
        
        while (newOptions.length < 3) {
            const randomIndex = Math.floor(Math.random() * currentType.length);
            const data = currentType[randomIndex];
            if (data && !newOptions.includes(data.name)) {
                newOptions.push(data.name);
            }
        }
        setOptions(newOptions);
        setSelectedPlayers([]); // Reset selected players on new options
    };

    useEffect(() => {
        const savedName1 = localStorage.getItem('name1');
        const savedName2 = localStorage.getItem('name2');
        if (savedName1) setName1(savedName1);
        if (savedName2) setName2(savedName2);
        getOptions(); // Initialize the first set of options (batsmen)
    }, []);

    // Get the rating of a player
    const getRating = (playerName) => {
        const player =
            batsman.find(item => item.name === playerName) ||
            allrounder.find(item => item.name === playerName) ||
            bowler.find(item => item.name === playerName);

        return player ? player.rating : 0;
    };

    // Handle the next button click
    const next = () => {
        if (start === 'Player1' && p1Selection !== '') {
            const rating = getRating(p1Selection);
            setList1(prevList => [...prevList, `${p1Selection}: ${rating}`]);
            setAop(prevAop => prevAop + rating);
            setStart('Player2'); // Switch turn to Player2
            setP1Selection(''); // Clear Player1's selection

        } else if (start === 'Player2' && p2Selection !== '') {
            const rating = getRating(p2Selection);
            setList2(prevList => [...prevList, `${p2Selection}: ${rating}`]);
            setBop(prevBop => prevBop + rating);
            setStart('Player1'); // Switch turn to Player1
            setP2Selection(''); // Clear Player2's selection

            // After Player2's turn, check if it's time to refresh options
            setTurnCount(prevCount => {
                const newCount = prevCount + 1;

                if (newCount % 2 === 0) { // Every two turns (one turn for each player)
                    if (categoryIndex < 2) {
                        setCategoryIndex(prevIndex => prevIndex + 1); // Move to the next category
                        getOptions(); // Refresh options for the new category
                    }
                }
                
                return newCount;
            });
        }
    };

    // Handle player selection
    const addPlayer = (playerName) => {
        if (start === 'Player1') {
            setP1Selection(playerName);
        } else {
            setP2Selection(playerName);
        }
        setSelectedPlayers(prevSelected => [...prevSelected, playerName]); // Mark player as selected
    };

    return (
        <div className="game-container">
            <p className="start-text">{start}'s chance:</p>
            <ul className="options-list">
                {options.map((item, ind) => (
                    <li 
                        key={ind} 
                        className={`option-item ${selectedPlayers.includes(item) ? 'selected' : ''}`}
                        onClick={() => !selectedPlayers.includes(item) && addPlayer(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <button className="next-button" onClick={next}>Go</button>
            <div className="teams-container">
                <div className="team">
                    <h3>Player1's Team:</h3>
                    <ul>
                        {list1.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="team">
                    <h3>Player2's Team:</h3>
                    <ul>
                        {list2.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Games;
