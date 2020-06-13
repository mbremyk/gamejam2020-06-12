import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {defaults} from './defaultValues';
import {nextYear} from './game';


class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return(
            <button
                className="square"
                onClick={() => this.setState({value: 'X'})}
            >
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i){
        return <Square />;
    }

    render() {
        return(
        <div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                {this.renderSquare(9)}
            </div>
            <div className="board-row">
                {this.renderSquare(10)}
                {this.renderSquare(11)}
                {this.renderSquare(12)}
                {this.renderSquare(13)}
                {this.renderSquare(14)}
                {this.renderSquare(15)}
                {this.renderSquare(16)}
                {this.renderSquare(17)}
                {this.renderSquare(18)}
                {this.renderSquare(19)}
            </div>
            <div className="board-row">
                {this.renderSquare(20)}
                {this.renderSquare(21)}
                {this.renderSquare(22)}
                {this.renderSquare(23)}
                {this.renderSquare(24)}
                {this.renderSquare(25)}
                {this.renderSquare(26)}
                {this.renderSquare(27)}
                {this.renderSquare(28)}
                {this.renderSquare(29)}
            </div>
        </div>);

    }
}

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

            <div className="game-board">
                <Board/>
            </div>
        </div>
    );
}

export default App;
