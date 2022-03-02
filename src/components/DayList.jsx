import React from 'react';
import DayListItem from 'components/DayListItem';

function DayList(props) {

  // create an array of DayListItems
  // take props.days (object) and turn into array of values
  // create a new array of DayListItem components, passing name, spots, selected and setDay to each component
  const arrayOfDayListItems = props.days.map((day) =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={() => props.onChange(day.name)}
    />)
  return (
    <ul>
      {arrayOfDayListItems}
    </ul>
  );
}

export default DayList;