import React, { Component } from 'react';
import { existsTypeAnnotation } from '@babel/types';

class PomodoroClock extends Component {
    constructor() {
        super();
        this.resetClock = this.resetClock.bind(this);
        this.updateTimerSetting = this.updateTimerSetting.bind(this);
        this.startOrStopTimer = this.startOrStopTimer.bind(this);
    }

    state = {
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 25,
        timerIsRunning: false,
        seconds: 60
    }

    startOrStopTimer() {
        if (this.state.timerIsRunning) clearInterval();
        else setInterval({}, 1000);

        this.setState({ timerIsRunning: !this.state.timerIsRunning });
    }

    resetClock() {
        this.setState({ breakLength: 5, sessionLength: 25, timeLeft: 25 });
    }

    updateTimerSetting(timerName, timeAmount) {
        if (this.state.timerIsRunning) return;

        if (this.state[timerName] + timeAmount >= 1 && this.state[timerName] + timeAmount <= 60) {
            this.setState(prevState => ({
                [timerName]: prevState[timerName] + timeAmount
            }));
        }
    }

    render() {
        return (
            <main>
                <p id="break-label">Break Length</p>
                <p id="break-length">{this.state.breakLength}</p>
                <button id="break-increment" onClick={() => { this.updateTimerSetting("breakLength", 1) }}>+</button>
                <button id="break-decrement" onClick={() => { this.updateTimerSetting("breakLength", -1) }}>-</button>
                <p id="session-label">Session Length</p>
                <p id="session-length">{this.state.sessionLength}</p>
                <button id="session-increment" onClick={() => { this.updateTimerSetting("sessionLength", 1) }}>+</button>
                <button id="session-decrement" onClick={() => { this.updateTimerSetting("sessionLength", -1) }}>-</button>
                <p id="timer-label">Session</p>
                <p id="time-left">Übrig: {this.state.timeLeft}</p>
                <button id="start_stop" onClick={this.startOrStopTimer}>Start/Stop</button>
                <button id="reset" onClick={this.resetClock}>Reset</button>
            </main>
        );
    }
}

export default PomodoroClock;