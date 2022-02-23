import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

function InterviewerListItem(props) {
  const interviewerClasses = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected,
  });
  return (
    <li onClick={props.setInterviewer} className={interviewerClasses}>
      <img 
        src={props.avatar}
        alt={props.name}
        className="interviewers__item-image"
      />
      {props.selected && `${props.name}`}
    </li>
  );
}

export default InterviewerListItem;