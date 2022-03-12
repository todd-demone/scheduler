import { useReducer, useEffect } from "react";
import axios from "axios";

function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";

  function reducer(state, action) {

    if (action.type === SET_DAY) {
      const { day } = action;
      return { ...state, day };
    }

    if (action.type === SET_INTERVIEW) {
      const { id, interview } = action;
      const appointment = {
        ...state.appointments[id],
        interview
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const newState = {
        ...state,
        appointments
      };
      const days = state.days.map((day) => ({
        ...day,
        spots: updateSpotsRemaining(newState, day)
      }));
      return { ...newState, days };
    }

    if (action.type === SET_APPLICATION_DATA) {
      const { days, appointments, interviewers } = action;
      return { ...state, days, appointments, interviewers };
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function setDay(day) {
    return dispatch({
      type: SET_DAY,
      day,
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) =>
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
  }, []);

  function updateSpotsRemaining(state, day) {
    const initialSpots = 5;
    return day.appointments.reduce(
      (previousSpotsTotal, appointmentId) => {
        if (state.appointments[appointmentId].interview) {
          return previousSpotsTotal - 1;
        } else {
          return previousSpotsTotal;
        }
      }
      , initialSpots
    );
  }

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({
        type: SET_INTERVIEW,
        id,
        interview,
      }));
  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null,
      }));
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;