import React from 'react';
import DayListItem from 'components/DayListItem';

function DayList(props) {

  const arrayOfDayListItems = props.days.map((day) => 
    <DayListItem 
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} 
    />)
  return (
    <ul>
      {arrayOfDayListItems}
    </ul>
  );
}

export default DayList;