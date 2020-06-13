import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {defaults} from './defaultValues';
import {nextYear, reset, save} from './game';

const electron = window.require('electron');
const {ipcRenderer} = electron;

let handleReset;

function App() {
    const [values, setValues] = useState(localStorage.hasOwnProperty('values') ? JSON.parse(localStorage.getItem('values')) : defaults);

    let handleNextYear = () => {
        setValues(nextYear(values));
    }

    handleReset = () => {
        reset(setValues)
    }

    useEffect(() => {
        save(values);
    }, [values]);

    ipcRenderer.on('reset', (e, args) => {
        handleReset();
    })

    return (
        <div className="App">
            <div>Population: {Math.round(values.population)}</div>
            <div>Gold: {Math.round(values.gold)}</div>
            <button onClick={handleNextYear}>Next year</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}

export default App;
