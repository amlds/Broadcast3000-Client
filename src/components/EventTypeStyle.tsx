import React from 'react';

import EventType from '../types/EventType';

interface Props {
  event_type: EventType;
}


const EventTypeStyle: React.FC<Props> = (Props) => {
  const style = {
    backgroundColor: `${Props.event_type.color}1A`,
    color: Props.event_type.color,
  };

  return (
    <div className="event-type" style={style}>
      <p className="event-type__name">{Props.event_type.name}</p>
    </div>
  );
};

export default EventTypeStyle;
