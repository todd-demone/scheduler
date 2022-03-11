function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return [];
  const dayObject = state.days.find((dayItem) => dayItem.name === day);
  if (!dayObject) return [];
  return Object.values(state.appointments).filter((appointment) => dayObject.appointments.includes(appointment.id));
};

function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    return {student: interview.student, interviewer: state.interviewers[interview.interviewer] }
  };
};

function getInterviewersForDay(state, day) {
  if (state.days.length === 0) return [];
  const dayObject = state.days.find((dayItem) => dayItem.name === day);
  if (!dayObject) {
    return [];
  } else {
    return Object.values(state.interviewers).filter((interviewer) => dayObject.interviewers.includes(interviewer.id));
  }
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };