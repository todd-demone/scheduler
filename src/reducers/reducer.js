/**
 * Returns the number of appointment spots available for a given day.
 * Helper function for {@link reducer}.
 * @param {object} state - the local application data
 * @param {object} day - the day of the week
 * @returns number of appointment spots remaining
 */
function updateSpotsRemaining(state, day) {
  // const initialSpots = 5;

  return day.appointments.reduce((previousSpotsTotal, appointmentId) => {
    return state.appointments[appointmentId].interview
      ? previousSpotsTotal
      : previousSpotsTotal + 1;
    // if (state.appointments[appointmentId].interview) {
    //   return previousSpotsTotal - 1;
    // } else {
    //   return previousSpotsTotal;
    // }
  }, 0);
}

/**
 * Returns the new application state
 * @param {object} state - the current local application state
 * @param {object} action - includes (1) an action (string) and (2) values used to update state
 * @returns object containing new application state
 */
function reducer(state, action) {
  if (action.type === "SET_DAY") {
    const { day } = action;
    return { ...state, day };
  }

  if (action.type === "SET_INTERVIEW") {
    const { id, interview } = action;
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = {
      ...state,
      appointments,
    };
    const days = state.days.map((day) => ({
      ...day,
      spots: updateSpotsRemaining(newState, day),
    }));

    return { ...newState, days };
  }

  if (action.type === "SET_APPLICATION_DATA") {
    const { days, appointments, interviewers } = action;
    return { ...state, days, appointments, interviewers };
  }

  return state;
}

export default reducer;
