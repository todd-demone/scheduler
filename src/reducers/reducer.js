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
};

function reducer(state, action) {
  const SET_DAY = "SET_DAY";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";

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

export default reducer;