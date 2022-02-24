import React from 'react';
import 'components/Appointment/styles.scss';

export default function Appointment(props) {
  let message = "No appointments";
  if (props.time) message = `Appointment at ${props.time}`;
  return (
    <article className="appointment">{message}</article>
  );
}