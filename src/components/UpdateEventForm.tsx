import React from 'react';
import Event from '../types/Event';
import { EventContext } from '../context/EventContext';

interface Props {
  events: Event[];
  schoolId: number;
}

const UpdateEventForm: React.FC<Props> = ( Props ) => {
  const { events, schoolId } = Props;
  const [eventUpdate, setEventUpdate] = React.useState<Event>();
  const { toggleUpdate, eventIdUpdate } = React.useContext(EventContext);

  React.useEffect(() => {
    events.forEach((event) => {
      if (event.id === eventIdUpdate) {
        setEventUpdate(event);
      }
    });
  }, [eventUpdate, events, eventIdUpdate]);

  const cancelUpdate = () => {
    toggleUpdate();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eventUpdate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="event-name">Event Name</label>
        <input
          type="text"
          className="form-control"
          id="event-name"
          placeholder="Event Name"
          value={eventUpdate?.name}
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
