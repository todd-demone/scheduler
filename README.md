# Interview Scheduler

The Interview Scheduler application is a [React](https://reactjs.org/) application that allows a student to create, edit and delete interview appointments.

## Purpose

I created the Interview Scheduler application while completing the [Lighthouse Labs](https://github.com/lighthouse-labs) [Web Development Flex Program](https://www.lighthouselabs.ca/en/web-development-flex-program).

Data is retrieved from an [API](https://github.com/todd-demone/scheduler-api) provided by Lighthouse Labs. Testing was performed using the [Jest](https://jestjs.io/) testing framework and the [Storybook](https://storybook.js.org/) visual test bed.

## Learning Outcomes
This project has given me the opportunity to:

- Analyze and understand how to break up a UI into sections of appropriate components.
- Use the React library to build components using JSX.
- Understand common techniques when composing a UI with React such as rendering lists of components and conditional rendering.
- Understand fundamental concepts of how data is stored and passed between components, including state and props.
- Understand how events are handled in React.
- Understand controlled components, and how React is used to manage the state of data in form inputs.
- Manage the visual state of the application including create, edit and delete capabilities.
- Implement advanced React patterns to manage the state and add live updates.
- Learn to build custom Hooks to organize and share logic.
- Retrieve data from an API using Axios.
- Understand how client requests work in React and how to employ the useEffect hook.
- Test the appearance and behavior of components in isolation using Storybook.
- Test helper functions using Jest.
- Learn to use a reducer pattern for complex state management.

## Screenshots
#### Using sidebar to switch calendar view
![Switch calendar view](https://raw.githubusercontent.com/todd-demone/scheduler/main/docs/scheduler-5-large-file.gif)

#### Adding an interview
![Add interview](https://raw.githubusercontent.com/todd-demone/scheduler/main/docs/scheduler-6-large.gif)

#### Editing an interview
![Edit interview](https://raw.githubusercontent.com/todd-demone/scheduler/main/docs/scheduler-7-large.gif)

#### Deleting an interview
![Delete interview](https://raw.githubusercontent.com/todd-demone/scheduler/main/docs/scheduler-8-large.gif)

## Getting Started

The following instructions assume you have [git](https://git-scm.com/) and [Node.js](https://nodejs.org/) version 10.16.1 installed on your computer.

Clone the repository and run the app using the following commands in the terminal:

```
git clone git@github.com:todd-demone/scheduler.git
cd scheduler
npm install     // install all of the dependencies
npm start       // start the Webpack development server
```

To use the app, go to <http://localhost:8000> in your browser.

## Dependencies
* [Node.js](https://nodejs.org/) version 10.16.1
* [React](https://reactjs.org/)
* [Axios](https://axios-http.com/)
* [Classnames](https://www.npmjs.com/package/classnames)
* [Jest](https://jestjs.io/)
* [Storybook](https://storybook.js.org/)

## Author

[Todd Demone](https://github.com/todd-demone)