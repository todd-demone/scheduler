import React from 'react';
import DayListItem from 'components/DayListItem';

function DayList(props) {
  const dayListItemsArray = props.days.map((day) =>
  (<DayListItem
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.value}
    setDay={() => props.onChange(day.name)}
  />)
  );

  return (
    <ul>
      {dayListItemsArray}
    </ul>
  );
};

export default DayList;