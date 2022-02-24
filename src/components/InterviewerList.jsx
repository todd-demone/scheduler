import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

function InterviewerList(props) {
  // While completing "Controlled Lists", I had to add this line to make the stories work:
  const onChange = props.onChange;
  const value = props.value;
  const arrayOfInterviewers = props.interviewers.map((interviewer => {
    return (<InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      // selected={props.interviewer === interviewer.id}
      selected={interviewer.id === value}
      // setInterviewer={() => props.setInterviewer(interviewer.id)}
      setInterviewer={() => onChange(interviewer.id)}
    />);
  }));
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {arrayOfInterviewers}
      </ul>
    </section>
  );
}

export default InterviewerList;