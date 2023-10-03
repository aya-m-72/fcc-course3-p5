import { ACTIONS, initialState } from "./App"

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.RESET:
      return initialState
    case ACTIONS.INC_DEC_LENGTH:
      if (state.play) {
        return state
      }
      switch (payload.id) {
        case "break-decrement":
          if (state.breakLength === 1) {
            return state
          }
          let newTime1 =
            state.theType === "Break"
              ? { min: state.breakLength - 1, sec: 0 }
              : state.time
          return {
            ...state,
            time: newTime1,
            breakLength: state.breakLength - 1,
          }
        case "break-increment":
          if (state.breakLength === 60) {
            return state
          }
          let newTime2 =
            state.theType === "Break"
              ? { min: state.breakLength + 1, sec: 0 }
              : state.time
          return {
            ...state,
            time: newTime2,
            breakLength: state.breakLength + 1,
          }
        case "session-decrement":
          if (state.sessionLength === 1) {
            return state
          }
          let newTime3 =
            state.theType === "Session"
              ? { min: state.sessionLength - 1, sec: 0 }
              : state.time

          return {
            ...state,
            time: newTime3,
            sessionLength: state.sessionLength - 1,
          }
        case "session-increment":
          if (state.sessionLength === 60) {
            return state
          }
          let newTime4 =
            state.theType === "Session"
              ? { min: state.sessionLength + 1, sec: 0 }
              : state.time

          return {
            ...state,
            time: newTime4,
            sessionLength: state.sessionLength + 1,
          }
      }
    case ACTIONS.CHANGE_TIME:
      if (state.time.min === 0 && state.time.sec === 0) {
        document.getElementById("beep").play()
        return {
          ...state,
          time: {
            min:
              state.theType === "Session"
                ? state.breakLength
                : state.sessionLength,
            sec: 0,
          },
          theType: state.theType === "Session" ? "Break" : "Session",
        }
      }
      if (state.time.sec === 0) {
        return {
          ...state,
          time: { min: state.time.min - 1, sec: 59 },
        }
      }
      return {
        ...state,
        time: { min: state.time.min, sec: state.time.sec - 1 },
      }
    case ACTIONS.PLAY_PAUSE:
      return {
        ...state,
        play: !state.play,
      }
  }
}
export default reducer;