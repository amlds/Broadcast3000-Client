import React from 'react';

import EventType from '../types/EventType';
import EventTypeService from '../services/EventTypeSerivce';

interface Props {
  event_type_id: number;
}

const getEventType = async (id: number) => {
  const eventType = await EventTypeService.getEventType(id);
  return eventType;
};


const EventTypeStyle: React.FC<Props> = ({ event_type_id }) => {
  const [eventTypeState, setEventTypeState] = React.useState<EventType>({
    id: 0,
    name: '',
    color: '',
  });

  React.useEffect(() => {
    getEventType(event_type_id).then((eventType) => {
      setEventTypeState(eventType);
    });
  }, [event_type_id]);

  const style = {
    backgroundColor: eventTypeState.color,
  };

  return (
    <div className="event-type" style={style}>
      <p className="event-type__name">{eventTypeState.name}</p>
    </div>
  );
};

export default EventTypeStyle;
