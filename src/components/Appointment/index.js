import React from 'react';
import Header from 'components/Appointment/Header'
import Show from './Show';
import Empty from './Empty';

import 'components/Appointment/styles.scss';

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      { // check if an interview object was passed
        (props.interview) 
          ? <Show 
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              onEdit={props.onEdit}
              onDelete={props.onDelete}
            /> 
          : <Empty onAdd={props.onAdd} />
      }
    </article>
  );
}