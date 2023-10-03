import { useEffect, useReducer } from "react"
import reducer from "./reducer"


export const ACTIONS = {
  INC_DEC_LENGTH: "INC_DEC_LENGTH",
  PLAY_PAUSE: "PLAY_PAUSE",
  RESET: "RESET",
  CHANGE_TIME:"CHANGE_TIME",
}


export const initialState = {
  breakLength: 5,
  sessionLength:25,
  play:false,
  theType:"Session",
  time:{min:25, sec:0}
}


function App() {
  const [{breakLength,sessionLength,play,theType,time},dispatch] = useReducer(reducer,initialState)
  useEffect(()=>{
    let myInterval;
    if (play){
      myInterval = setInterval(()=>{
        dispatch({ type: ACTIONS.CHANGE_TIME })
      },1000)
    }
    return () => clearInterval(myInterval)
  },[play])


  return (
    <main className="container">
      <h1 className="heading">25 + 5 Clock</h1>
      <div className="length-control">
        <div className="break-length">
          <h3 className="span-three" id="break-label">
            Break Length
          </h3>
          <button
            id="break-decrement"
            onClick={() =>
              dispatch({
                type: ACTIONS.INC_DEC_LENGTH,
                payload: { id: "break-decrement" },
              })
            }
          >
            <i className="fa-solid fa-arrow-down"></i>
          </button>
          <h2 id="break-length">{breakLength}</h2>
          <button
            className="up"
            id="break-increment"
            onClick={() =>
              dispatch({
                type: ACTIONS.INC_DEC_LENGTH,
                payload: { id: "break-increment" },
              })
            }
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
        <div className="session-length">
          <h3 className="span-three" id="session-label">
            Session Length
          </h3>
          <button
            id="session-decrement"
            onClick={() =>
              dispatch({
                type: ACTIONS.INC_DEC_LENGTH,
                payload: { id: "session-decrement" },
              })
            }
          >
            <i className="fa-solid fa-arrow-down"></i>
          </button>
          <h2 id="session-length">{sessionLength}</h2>
          <button
            className="up"
            id="session-increment"
            onClick={() =>
              dispatch({
                type: ACTIONS.INC_DEC_LENGTH,
                payload: { id: "session-increment" },
              })
            }
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
      <div className="clock">
        <h2 className="type" id="timer-label">
          {theType}
        </h2>
        <h1
          className="time"
          id="time-left"
          style={{ color: time.min === 0 ? "rgb(255, 24, 62)" : "white" }}
        >
          {time.min < 10 ? "0" + time.min : time.min}:
          {time.sec < 10 ? "0" + time.sec : time.sec}
        </h1>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
      <div className="clock-control">
        <button
          id="start_stop"
          onClick={() => dispatch({ type: ACTIONS.PLAY_PAUSE })}
        >
          {play ? (
            <i className="fa-solid fa-pause" />
          ) : (
            <i className="fa-solid fa-play" />
          )}
        </button>
        <button id="reset" onClick={() => {
          document.getElementById("beep").pause()
          document.getElementById("beep").currentTime = 0;
          return dispatch({ type: ACTIONS.RESET })}}>
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </main>
  )
}

export default App