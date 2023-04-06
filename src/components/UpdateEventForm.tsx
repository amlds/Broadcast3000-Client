import React, { useEffect, useState, useContext } from 'react';
import Event from '../types/Event';
import { EventContext } from '../context/EventContext';
import EventService from '../services/EventService';
import { TokenContext } from '../context/TokenContext';

interface Props {
  events: Event[];
  schoolId: number;
}

const deleteEvent = async (token: string, eventId: number) => {
  await EventService.deleteEvent(token, eventId);
};

const UpdateEventForm: React.FC<Props> = ({ events, schoolId }) => {
  const { toggleUpdate, eventIdUpdate } = useContext(EventContext);
  const { token } = useContext(TokenContext);
  const [eventUpdate, setEventUpdate] = useState<Event>({ name: '', description: '', start_time: '', end_time: '', event_type: { id: 0, name: '' }, photo: '' });
  const [eventTypes] = useState<string[]>(['Private', 'Public', 'Formation', 'Extern']);

  useEffect(() => {
    const eventToUpdate = events.find((event) => event.id === eventIdUpdate);
    if (eventToUpdate) {
      setEventUpdate(eventToUpdate);
      setEventUpdate(
        (prevState) => ({
          ...prevState,
          start_time: eventToUpdate.start_time.replace(' ', 'T'),
          end_time: eventToUpdate.end_time.replace(' ', 'T'),
        })
      )
    }
  }, [eventIdUpdate, events]);

  const cancelUpdate = () => {
    toggleUpdate();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await EventService.updateEvent(token, eventIdUpdate, eventUpdate);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventUpdate((prevState) => ({ ...prevState, [name]: value }));
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="event-name">Event Name</label>
        <input
          type="text"
          className="input--txt"
          id="event-name"
          name="name"
          placeholder="Event Name"
          value={eventUpdate.name}
          onChange={handleChange}
        />
        <label>
          Event Type
          <select name="event_type.name" value={eventUpdate.event_type.name} onChange={handleChange}>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="event-description">Event Description</label>
        <textarea
          className="input--txt"
          id="event-description"
          name="description"
          placeholder="Event Description"
          value={eventUpdate.description}
          onChange={handleChange}
        />
        <label htmlFor="event-start-time">Event Start Time</label>
        <input
          type="datetime-local"
          className="input--txt"
          id="event-start-time"
          name="start_time"
          placeholder="Event Start Time"
          value={eventUpdate.start_time}
          onChange={handleChange}
        />
        <label htmlFor="event-end-time">Event End Time</label>
        <input
          type="datetime-local"
          className="input--txt"
          id="event-end-time"
          name="end_time"
          placeholder="Event End Time"
          value={eventUpdate.end_time}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Update Event" className="btn btn-primary" />
      <button type="button" className="btn btn-secondary" onClick={cancelUpdate}>Cancel</button>
    </form>
  );
};

export default UpdateEventForm;
