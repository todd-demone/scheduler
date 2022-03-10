import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
    
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateDaysSpotsRemaining(id);
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => setState({...state, appointments, days}));
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateDaysSpotsRemaining(id, true);
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }));
  };

  /**
   * Adds or subtracts a spot from the spots property in a day object in the days array.
   * @param {Number} id The appointment id
   * @param {Boolean} cancel default = false; If an appointment is being cancelled, use true; if an appointment is being added, use false. 
   * @returns an Array of day objects (a revised copy of state.days)
   */
  function updateDaysSpotsRemaining(id, cancel=false) {
    const wasInterviewNull = state.appointments[id].interview ? false : true;
    const dayIndex = state.days.findIndex((day) => day.appointments.includes(id));
    const newDay = { ...state.days[dayIndex] };
    newDay.spots = cancel 
                   ? newDay.spots + 1 
                   : (wasInterviewNull ? newDay.spots - 1 : newDay.spots);
    const newDays = [ ...state.days ];
    newDays[dayIndex] = newDay;
    return newDays;
  };

  return { state, setDay, bookInterview, cancelInterview };
};