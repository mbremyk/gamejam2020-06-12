import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {defaults} from './defaultValues';
import {nextYear, reset, save} from './game';
import {cloneDeep} from 'lodash';
import dragon from './dragonsmol.png';
const electron = window.require('electron');
const {ipcRenderer} = electron;


let Square = (props) => {
    const [state, setState] = useState({value: props.value});

    const [squareId, updateSingleState] = [props.squareId, props.updateSingleState]

    return (
        <button
            className="square"
            onClick={() => {
                updateSingleState(squareId, 'X');
                setState({...state, value: 'X'})
            }}
        >
            {state.value}
        </button>
    );
}

const Board = (props) => {
    let renderSquare = (i, value) => {
        return <Square squareId={i} updateSingleState={updateSingleState} value={value}/>;
    }

    let updateSingleState = (id, value) => {
        let arr = cloneDeep(props.values.boardState);
        console.log(arr)
        arr[Math.floor(id/10)][id%10] = value;
        props.setValues({...props.values, boardState:arr})
    }

    console.log(props.values);

    return (
        <div>
            {props.values.boardState.map((row, rowIndex) => {
                return (<div className={'board-row'}>
                    {row.map((bit, colIndex) => renderSquare(rowIndex * 10 + colIndex, bit))}
                </div>)
            })}

            {/*<div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
                {renderSquare(9)}
            </div>
            <div className="board-row">
                {renderSquare(10)}
                {renderSquare(11)}
                {renderSquare(12)}
                {renderSquare(13)}
                {renderSquare(14)}
                {renderSquare(15)}
                {renderSquare(16)}
                {renderSquare(17)}
                {renderSquare(18)}
                {renderSquare(19)}
            </div>
            <div className="board-row">
                {renderSquare(20)}
                {renderSquare(21)}
                {renderSquare(22)}
                {renderSquare(23)}
                {renderSquare(24)}
                {renderSquare(25)}
                {renderSquare(26)}
                {renderSquare(27)}
                {renderSquare(28)}
                {renderSquare(29)}
            </div>*/}
        </div>);
}

let handleReset;

function App() {
    const [values, setValues] = useState(localStorage.hasOwnProperty('values') ? JSON.parse(localStorage.getItem('values')) : defaults);

    let handleNextYear = () => {
        setValues(nextYear(values));
    }

    let handleReset = () => {


        setValues(defaults);
        save();
        window.location.reload();
    }

    let save = () => {
        localStorage.setItem('values', JSON.stringify(values));
    }

    useEffect(() => {
        save();
    }, [values]);

    ipcRenderer.on('reset', (e, args) => {
        handleReset();
    })

    return (
        <div className="App">
            <div><img src={dragon} alt={'dragon'} style={{maxWidth:'50%'}}/></div>
            <div>Population: {Math.round(values.population)}</div>
            <div>Gold: {Math.round(values.gold)}</div>
            <button onClick={handleNextYear}>Next year</button>
            <button onClick={handleReset}>Reset</button>

            <div className="game-board">
                <Board className='board' values={values} setValues={setValues}/>
            </div>
        </div>
    );
}

export default App;
