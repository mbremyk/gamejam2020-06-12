import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {defaults} from './defaultValues';
import {nextYear} from './game';

function App() {
    const [values, setValues] = useState(localStorage.hasOwnProperty('values') ? JSON.parse(localStorage.getItem('values')) : defaults);

    let handleNextYear = () => {
        setValues(nextYear(values));
    }

    useEffect(() => {
        localStorage.setItem('values', JSON.stringify(values));
    }, [values]);

    return (
        <div className="App">
            <div>Population: {Math.round(values.population)}</div>
            <div>Gold: {Math.round(values.gold)}</div>
            <button onClick={handleNextYear}>Next year</button>
        </div>
    );
}

export default App;
