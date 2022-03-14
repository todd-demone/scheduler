import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer from '../reducers/reducer';

function useApplicationData() {

  /**
   * Hook initializes application state and creates dispatch method.
   */
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  /**
   * Hook retrieves application data from API and triggers setting of
   * application state.
   */
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) =>
      dispatch({
        type: "SET_APPLICATION_DATA",
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
  }, []);


  /**
   * Triggers update of state.day. An event handler called when DayListItem
   * is clicked in navbar.
   * @param {string} day - a weekday
   */
  function setDay(day) {
    dispatch({
      type: "SET_DAY",
      day,
    });
  };


  /**
   * Pushes new/edited interview to API and triggers update of local state
   * (i.e., appointments and days). A helper function for {@link save}
   * event handler.
   * @param {number} id - An appointment id
   * @param {object} interview - An object containing a student
   * name (string) and interviewer id (number)
   * @returns A Promise object
   */
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({
        type: "SET_INTERVIEW",
        id,
        interview,
      }));
  };


  /**
   * Instructs API to delete interview and triggers update of local state
   * (i.e., appointments and days). A helper function for {@link destroy}
   * event handler.
   * @param {number} id - An appointment id
   * @returns A Promise object
   */
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({
        type: "SET_INTERVIEW",
        id,
        interview: null,
      }));
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;