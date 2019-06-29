import React, { Component } from 'react';

class PomodoroClock extends Component {
    constructor() {
        super();
        this.resetClock = this.resetClock.bind(this);
        this.increaseBreakLength = this.increaseBreakLength.bind(this);
        this.decreaseBreakLength = this.decreaseBreakLength.bind(this);
    }

    state = {
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 25
    }

    resetClock() {
        this.setState({ breakLength: 5, sessionLength: 25, timeLeft: 25 });
    }

    increaseBreakLength() {
        this.setState(prevState => ({
            breakLength: prevState.breakLength + 1
        }));
    }

    decreaseBreakLength() {
        if (this.state.breakLength > 1) {
            this.setState(prevState => ({
                breakLength: prevState.breakLength - 1
            }));
        }
    }

    render() {
        return (
            <main>
                <p id="break-label">Break Length</p>
                <p id="break-length">{this.state.breakLength}</p>
                <button id="break-increment" onClick={this.increaseBreakLength}>+</button>
                <button id="break-decrement" onClick={this.decreaseBreakLength}>-</button>
                <p id="session-label">Session Length</p>
                <p id="session-length">{this.state.sessionLength}</p>
                <button id="session-decrement">+</button>
                <button id="session-increment">-</button>
                <p id="timer-label">Session</p>
                <p id="time-left">{this.state.timeLeft}</p>
                <button id="start_stop">Start/Stop</button>
                <button id="reset" onClick={this.resetClock}>Reset</button>
            </main>
        );
    }
}

export default PomodoroClock;