export function getAppointmentsForDay(state, day) {
  // return an empty array when the days data is empty
  if (state.days.length === 0) return [];
  const dayObject = state.days.find((dayItem) => dayItem.name === day);
  // return an empty array when the day is not found
  if (!dayObject) return [];
  const appointmentsArray = Object.values(state.appointments)
  return appointmentsArray.filter((appointment) => dayObject.appointments.includes(appointment.id));
}
