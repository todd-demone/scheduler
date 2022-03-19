import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  /**
   * resets Form's state to default values.
   */
  function reset() {
    setStudent("");
    setInterviewer(null);
  }

  /**
   * triggers resetting of Form's state then calls {@link back} to
   * set visual mode state to previous value, i.e., EMPTY or SHOW.
   */
  function cancel() {
    reset();
    props.onCancel();
  }

  /**
   * checks if student input field is blank; if it is, then set error message
   * @returns undefined
   */
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
