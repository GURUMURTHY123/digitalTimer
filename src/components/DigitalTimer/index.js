// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    currentTimerValue: '25:00',
    isTimerInProgress: false,
    initialTimerValue: 25,
  }

  getMinutesAndSeconds = () => {
    const {currentTimerValue} = this.state
    const [minutes, seconds] = currentTimerValue.split(':')
    return {minutes: parseInt(minutes), seconds: parseInt(seconds)}
  }

  getTimeInterval = (min, sec) => {
    let newSec = sec
    let newMin = min
    if (sec < 10) {
      newSec = `0${sec}`
    }
    if (min < 10) {
      newMin = `0${min}`
    }
    return `${newMin}:${newSec}`
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      const {minutes, seconds} = this.getMinutesAndSeconds()
      let newSeconds = seconds
      let newMinutes = minutes
      if (minutes === 0 && seconds === 0) {
        this.stopTimer()
      } else {
        if (seconds !== 0) {
          newSeconds -= 1
        } else {
          newMinutes -= 1
          newSeconds = 59
        }
        const newTimeInterval = this.getTimeInterval(newMinutes, newSeconds)
        this.setState({
          currentTimerValue: newTimeInterval,
        })
      }
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.timerId)
    this.setState({isTimerInProgress: false})
  }

  changeTime = () => {
    const {isTimerInProgress} = this.state
    if (isTimerInProgress) {
      this.stopTimer()
    } else {
      this.setState({isTimerInProgress: true}, this.startTimer())
    }
  }

  resetTime = () => {
    this.setState({currentTimerValue: '25:00'})
    this.stopTimer()
  }

  onClickIncrease = () => {
    const {initialTimerValue, isTimerInProgress} = this.state
    if (!isTimerInProgress) {
      const updatedTimerValue = initialTimerValue + 1
      const updatedCurrentTimerValue = `${updatedTimerValue}:00`
      this.setState({
        initialTimerValue: updatedTimerValue,
        currentTimerValue: updatedCurrentTimerValue,
      })
    }
  }

  onClickDecrease = () => {
    const {initialTimerValue, isTimerInProgress} = this.state
    if (!isTimerInProgress && initialTimerValue > 1) {
      const updatedTimerValue = initialTimerValue - 1
      const updatedCurrentTimerValue = `${updatedTimerValue}:00`
      this.setState({
        initialTimerValue: updatedTimerValue,
        currentTimerValue: updatedCurrentTimerValue,
      })
    }
  }

  render() {
    const {currentTimerValue, isTimerInProgress, initialTimerValue} = this.state
    const timerStatus = isTimerInProgress ? 'Running' : 'Paused'
    const timerControlText = isTimerInProgress ? 'Pause' : 'Start'
    const timerControlImage = isTimerInProgress
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const timerControlImageAltText = isTimerInProgress
      ? 'pause icon'
      : 'play icon'
    return (
      <div className="app-container">
        <h1 className="app-heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-bg-container">
            <div className="timer-display-container">
              <h1 className="current-time">{currentTimerValue}</h1>
              <p className="timer-state">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-control-bg-container">
            <div className="timer-controls-container">
              <button
                type="button"
                className="start-stop-buttons timer-control-container"
                onClick={this.changeTime}
              >
                <img
                  src={timerControlImage}
                  alt={timerControlImageAltText}
                  className="timer-control-image"
                />
                <p className="timer-control-text">{timerControlText}</p>
              </button>
              <button
                type="button"
                className="reset-button timer-control-container"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="timer-control-image"
                  onClick={this.resetTime}
                />
                <p className="timer-control-text">Reset</p>
              </button>
            </div>
            <p className="text">Set Timer limit</p>
            <div className="timer-setting-container">
              <button
                type="button"
                className="timer-control-button"
                onClick={this.onClickDecrease}
              >
                -
              </button>
              <p className="timer-value">{initialTimerValue}</p>
              <button
                type="button"
                className="timer-control-button"
                onClick={this.onClickIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
