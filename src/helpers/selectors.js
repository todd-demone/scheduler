export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return [];
  const dayObject = state.days.find((dayItem) => dayItem.name === day);
  if (!dayObject) return [];
  return Object.values(state.appointments).filter((appointment) => dayObject.appointments.includes(appointment.id));
};

export function getInterview(state, interview) {
  if (!interview) return null;
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
};

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) return [];
  const dayObject = state.days.find((dayItem) => dayItem.name === day);
  if (!dayObject) return [];
  return Object.values(state.interviewers).filter((interviewer) => dayObject.interviewers.includes(interviewer.id));
};
