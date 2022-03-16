import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

function InterviewerList(props) {
  const interviewersArray = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      // Note: props.value is an interviewer (object), not an interviewer id (number), hence the reference to 'props.value.id' below
      selected={
        props.value === null ? false : interviewer.id === props.value.id
      }
      setInterviewer={() => props.onChange(interviewer)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersArray}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
