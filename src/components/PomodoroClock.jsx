import React, { Component } from 'react';

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
        intervalHandle: 0,
        breakOngoing: false,
        displayTextBetweenSessions: ""
    }

    startOrStopTimer() {
        this.setState({ timerIsRunning: !this.state.timerIsRunning });
        if (this.state.timerIsRunning) clearInterval(this.state.intervalHandle);
        else {
            let handle = setInterval(this.countDownOneSecond, 100);
            this.setState({ intervalHandle: handle });
        }
    }

    resetClock() {
        this.setState({ breakLength: 5, breakLengthLeft: 5, sessionLength: 25, sessionLengthLeft: 25, seconds: 0, timerIsRunning: false, breakOngoing: false });
        clearInterval(this.state.intervalHandle);
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;
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
        if (this.state.seconds - 1 < 0) {
            // The block below manages the minute-timer when a break is going on
            if (this.state.breakOngoing) {
                if (this.state.breakLengthLeft - 1 < 0) {
                    this.setState({ breakLengthLeft: this.state.breakLength, breakOngoing: false, displayTextBetweenSessions: "SESSION" });
                    setTimeout(() => { this.setState({ displayTextBetweenSessions: "" }) }, 1000);
                    document.getElementById("beep").play();
                }
                else
                    this.setState(prevState => ({ breakLengthLeft: prevState.breakLengthLeft - 1, seconds: 59 }));
            }
            // The block below manages the minute-timer when a session (no break) is going on
            else {
                if (this.state.sessionLengthLeft - 1 < 0) {
                    this.setState({ sessionLengthLeft: this.state.sessionLength, breakOngoing: true, displayTextBetweenSessions: "BREAK" });
                    setTimeout(() => { this.setState({ displayTextBetweenSessions: "" }) }, 1000);
                    document.getElementById("beep").play();
                }
                else
                    this.setState(prevState => ({ sessionLengthLeft: prevState.sessionLengthLeft - 1, seconds: 59 }));
            }
        }
        // Seconds decrease independently of break or session status
        else
            this.setState(prevState => ({ seconds: prevState.seconds - 1 }));
    }

    render() {
        // Gets last two digits (eg. 020 becomes 20, 07 becomes 7)
        const formattedSeconds = ("0" + this.state.seconds).slice(-2);
        const currentActiveTimerLeft = this.state.breakOngoing ? this.state.breakLengthLeft : this.state.sessionLengthLeft;
        const formattedMinutes = ("0" + currentActiveTimerLeft).slice(-2);
        let displayText = formattedMinutes + ":" + formattedSeconds;

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
                <p id="timer-label">{this.state.breakOngoing ? "BREAK" : "SESSION"}</p>
                <p id="time-left">{displayText}</p>
                <button id="start_stop" onClick={this.startOrStopTimer}>Start/Stop</button>
                <button id="reset" onClick={this.resetClock}>Reset</button>
                <audio id="beep" preload="auto" src="https://goo.gl/65cBl1"></audio>
            </main>
        );
    }
}

export default PomodoroClock;