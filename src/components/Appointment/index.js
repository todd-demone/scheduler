import React from "react";
import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

function Appointment(props) {

  const CONFIRM = "CONFIRM";
  const EMPTY = "EMPTY";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  const CREATE = "CREATE";
  const EDIT="EDIT";
  const SHOW = "SHOW";
  const DELETING = "DELETING";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const {
    id,
    time,
    interview,
    interviewers,
    bookInterview,
    cancelInterview,
  } = props;

  /**
   * Triggers update of db and local application state with new interview
   * object, then updates visual mode state. An event handler called when
   * user clicks 'save' to add/edit appointment.
   * @param {string} name - the student name
   * @param {Object} [interviewer=null] - the interviewer
   */
  function save(name="", interviewer=null) {
    transition(SAVING);
    // Show error screen if name field is empty or no interview selected
    if (!name || !interviewer) {
      transition(ERROR_SAVE, true);
    } else {
      const interview = {
        student: name,
        interviewer: interviewer.id
      };
      bookInterview(id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true));
    }
  };

  /** An event handler that is called when a user confirms the deletion of
   * an appointment, 'destroy' sets into motion the updating of the database and
   * local application state as well as the update of visual mode state.
   * @param {number} id - the appointment id
   */
  function destroy(id) {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not book appointment."
          onClose={back}
        />
      )
      }
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment."
          onClose={back}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={() => destroy(id)}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
};

export default Appointment;