export function getAppointmentsForDay(state, day) {
  // return an empty array when the days data is empty
  if (state.days.length === 0) return [];
  const dayObject = state.days.find((dayItem) => dayItem.name === day);
  // return an empty array when the day is not found
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
