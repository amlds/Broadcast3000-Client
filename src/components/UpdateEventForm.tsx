import React from 'react';
import Event from '../types/Event';
import { EventContext } from '../context/EventContext';

import EventService from '../services/EventService';

interface Props {
  events: Event[];
  schoolId: number;
}

const updateEventService = async (token: string, schoolId: number, eventId: number, event: Event) => {
  const res = await EventService.updateEvent(token,schoolId , eventId, event);
  return res;
};

const UpdateEventForm: React.FC<Props> = ( Props ) => {
  const { events, schoolId } = Props;
  const [eventUpdate, setEventUpdate] = React.useState<Event>();
  const { toggleUpdate, eventIdUpdate } = React.useContext(EventContext);
  const [event, setEvent] = React.useState<Event>({
    name: '',
    description: '',
    event_type: {
      name: '',
    },
    start_time: '',
    end_time: '',
  });

  React.useEffect(() => {
    events.forEach((event) => {
      if (event.id === eventIdUpdate) {
        setEventUpdate(event);
        console.log(eventUpdate);
      }
    });
  }, [eventUpdate, events, eventIdUpdate]);

  const cancelUpdate = () => {
    toggleUpdate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventUpdate) {
      updateEventService('token', schoolId, eventIdUpdate, eventUpdate);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEventUpdate(prevState => Object.assign({}, prevState, { name: value }));
  };



  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="event-name">Event Name</label>
        <input
          type="text"
          className="input--txt"
          id="event-name"
          placeholder="Event Name"
          value={eventUpdate?.name}
        />
        <label>
          Event Type
          <select
            name="name"
            value={eventUpdate?.event_type.name}
          >
            <option value="sport">Sport</option>
            <option value="culture">Culture</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label htmlFor="event-description">Event Description</label>
        <textarea
          className="input--txt"
          id="event-description"
          placeholder="Event Description"
          value={eventUpdate?.description}
        />
        <label htmlFor="event-start-time">Event Start Time</label>
        <input
          type="datetime-local"
          className="input--txt"
          id="event-start-time"
          placeholder="Event Start Time"
          value={eventUpdate?.start_time.split('T');}
        />
        <label htmlFor="event-end-time">Event End Time</label>
        <input
          type="datetime-local"
          className="input--txt"
          id="event-end-time"
          placeholder="Event End Time"
          value={eventUpdate?.end_time}
        />
        </div>
      <button type="submit" className="btn btn-primary">
        Update Event
      </button>
      <button type="button" className="btn btn-secondary" onClick={cancelUpdate}>
        Cancel
      </button>
    </form>
  );
};

export default UpdateEventForm;
