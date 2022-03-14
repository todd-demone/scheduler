/**
 * returns an array of appointment objects for a given weekday
 * @param {object} state - the application data - day, days, appointments and interviewers
 * @param {string} day - the day of the week
 * @returns - an array of appointment objects
 */
function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return [];
  // get the day object for the specified weekday
  const dayObject = state.days.find((dayItem) => dayItem.name === day);
  if (!dayObject) return [];
  // return an array of appointments that includes only those appointments that are referenced in the day object's appointments array
  return Object.values(state.appointments).filter((appointment) => dayObject.appointments.includes(appointment.id));
};

/**
 * returns an interview object
 * @param {object} state - the application data - day, days, appointments and interviewers
 * @param {object} interview - an object containing a student name and an interviewer's id
 * @returns an interview object containing a student name (string) and an interviewer (object)
 */
function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    return {student: interview.student, interviewer: state.interviewers[interview.interviewer] }
  };
};

/**
 * returns an array of interviewer objects for a given weekday
 * @param {object} state - the application data - day, days, appointments and interviewers
 * @param {string} day - the day of the week
 * @returns an array of interviewer objects
 */
function getInterviewersForDay(state, day) {
  if (state.days.length === 0) return [];
  const dayObject = state.days.find((dayItem) => dayItem.name === day);
  if (!dayObject) {
    return [];
  } else {
    // return an array of interviewer objects that includes only those interviewers that are referenced in the day object's interviewers array
    return Object.values(state.interviewers).filter((interviewer) => dayObject.interviewers.includes(interviewer.id));
  }
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };