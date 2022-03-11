import React from 'react';

function Show(props) {
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img onClick={props.onEdit} src="images/edit.png" alt="Edit" className="appointment__actions-button" />
          <img onClick={props.onDelete} src="images/trash.png" alt="Delete" className="appointment__actions-button" />
        </section>
      </section>
    </main>
  );
};

export default Show;