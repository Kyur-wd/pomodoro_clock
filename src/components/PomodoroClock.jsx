import React, { Component } from 'react';
import { existsTypeAnnotation } from '@babel/types';

class PomodoroClock extends Component {
    constructor() {
        super();
        this.resetClock = this.resetClock.bind(this);
        this.updateTimerSetting = this.updateTimerSetting.bind(this);
        this.startOrStopTimer = this.startOrStopTimer.bind(this);
        this.countDownOneSecond = this.countDownOneSecond.bind(this);
    }

    state = {
        breakLength: 5,
        breakLengthLeft: 5,
        sessionLength: 25,
        sessionLengthLeft: 25,
        timerIsRunning: false,
        seconds: 0,
        intervalHandle: 0
    }

    startOrStopTimer() {
        this.setState({ timerIsRunning: !this.state.timerIsRunning });
        if (this.state.timerIsRunning) clearInterval(this.state.intervalHandle);
        else {
            let handle = setInterval(this.countDownOneSecond, 1000);
            this.setState({ intervalHandle: handle });
        }
    }

    resetClock() {
        this.setState({ breakLength: 5, breakLengthLeft: 5, sessionLength: 25, sessionLengthLeft: 25, seconds: 0, timerIsRunning: false });
        clearInterval(this.state.intervalHandle);
    }

    // Increases or decreases the specified timer (sessionTimer or breakTimer) by 1 minute if no timer is currently running
    updateTimerSetting(timerName, timeAmount) {
        if (this.state.timerIsRunning) return;

        if (this.state[timerName] + timeAmount >= 1 && this.state[timerName] + timeAmount <= 60) {
            const timerNameLeft = timerName + "Left";
            this.setState(prevState => ({
                [timerName]: prevState[timerName] + timeAmount,
                [timerNameLeft]: prevState[timerName] + timeAmount,
                seconds: 0
            }));
        }
    }

    countDownOneSecond() {
        if (this.state.seconds <= 0) {
            if (this.state.sessionLengthLeft > 0) this.setState(prevState => ({ sessionLengthLeft: prevState.sessionLengthLeft - 1 }));
            else if (this.state.breakLengthLeft > 0) this.setState(prevState => ({ sessionLengthLeft: -1, breakLengthLeft: prevState.breakLengthLeft - 1 }));
            else this.setState({ sessionLengthLeft: this.state.sessionLength - 1, breakLengthLeft: this.state.breakLength });

            this.state.seconds = 60;
        }
        this.setState(prevState => ({ seconds: prevState.seconds - 1 }));
    }

    render() {
        // Gets last two digits (eg. 020 becomes 20, 07 becomes 7)
        const formattedSeconds = ("0" + this.state.seconds).slice(-2);
        const currentActiveTimerLeft = this.state.sessionLengthLeft >= 0 ? this.state.sessionLengthLeft : this.state.breakLengthLeft;
        const formattedMinutes = ("0" + currentActiveTimerLeft).slice(-2);
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
                <p id="time-left">{formattedMinutes}:{formattedSeconds}</p>
                <button id="start_stop" onClick={this.startOrStopTimer}>Start/Stop</button>
                <button id="reset" onClick={this.resetClock}>Reset</button>
            </main>
        );
    }
}

export default PomodoroClock;