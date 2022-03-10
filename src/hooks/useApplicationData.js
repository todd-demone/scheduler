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
    const days = calculateSpots(id);
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
    const days = calculateSpots(id, true);
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }));
  };

  // Add or remove a spot from a given day
  function calculateSpots(id, cancel=false) {
    const dayWithAppointment = state.days.find((day) => day.appointments.includes(id))
    const spots = cancel ? dayWithAppointment.spots - 1 : dayWithAppointment.spots + 1;
    const newDay = {
      ...dayWithAppointment,
      spots,
    };
    const newDays = [
      ...state.days,
      newDay,
    ];
    return newDays;
  };

    // for (const d of state.days) {
    //   let spots = 0;
    //   for (const appointment of d.appointments) {
    //     if (state.appointments[appointment].interview === null) {
    //       spots++;
    //     }
    //   }
    //   const newDay = {
    //     ...state.days[d.id],
    //     spots,
    //   };
    //   const newDays = {
    //     ...state.days,
    //     [d.id]: newDay,
    //   };
    // }
    // // update database to reflect spots remaining
    // // setState({ ...state, newDays})

  return { state, setDay, bookInterview, cancelInterview };
};