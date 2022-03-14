import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from 'components/DayList';
import InterviewerListItem from 'components/InterviewerListItem';
import InterviewerList from 'components/InterviewerList';
import Appointment from 'components/Appointment/index.js';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Confirm from 'components/Appointment/Confirm';
import Status from 'components/Appointment/Status';
import Error from 'components/Appointment/Error';
import Form from 'components/Appointment/Form';

import "index.scss";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} value={"Monday"} onChange={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
  ))
  .add("Wednesday", () => (
      <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
  ));

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={action("setInterviewer")}
    />
  ));

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      value={null}
    />
  ))
  .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={interviewers[0]}
    />
  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
      value={null}
    />
  ));

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => (
    <Appointment />
  ))
  .add("Appointment with time", () => (
    <Appointment time="12pm" />
  ))
  .add("Header", () => (
    <Header time="12pm" />
  ))
  .add("Empty", () => (
    <Empty onAdd={action("onAdd")} />
  ))
  .add("Show", () => (
    <Show
      student="Lydia Miller-Jones"
      interviewer={interviewer}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  ))
  .add("Confirm", () => (
    <Confirm
      message="Delete the appointment?"
      onCancel={action("onCancel")}
      onConfirm={action("onConfirm")}
    />
  ))
  .add("Status", () => (
    <Status
      message="Deleting"
    />
  ))
  .add("Error", () => (
    <Error
      message="Could not delete appointment"
      onClose={action("onClose")}
    />
  ))
  .add("Edit", () => (
    <Form
      student="Todd Demone"
      interviewer={3}
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Create", () => (
    <Form
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="4pm" onAdd={action("onAdd")} />
      <Appointment time="5pm" />
    </Fragment>
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
        onEdit={action("onEdit")}
        onDelete={action("onDelete")}
      />
      <Appointment time="5pm" />
    </Fragment>
  ));
