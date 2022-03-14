import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

function InterviewerList(props) {
  const interviewersArray = props.interviewers.map((interviewer =>
   (<InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={!props.value ? false : interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer)}
    />)
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersArray}
      </ul>
    </section>
  );
};

export default InterviewerList;