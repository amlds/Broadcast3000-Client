import React, { useEffect, useState, useContext } from 'react';
import  Cookies from 'js-cookie';
import Event from '../types/Event';
import EventService from '../services/EventService';
import { EventContext } from '../context/EventContext';

interface Props {
  events: Event[];
  schoolId: number;
}

const deleteEvent = async (token: string, eventId: number) => {
  await EventService.deleteEvent(token, eventId);
};

const UpdateEventForm: React.FC<Props> = ({ events, schoolId }) => {
  const { toggleUpdate, eventIdUpdate } = useContext(EventContext);
  const [token] = useState<string>(Cookies.get('token') || '');
  const [eventUpdate, setEventUpdate] = useState<Event>({ name: '', description: '', start_time: '', end_time: '', event_type: { id: 0, name: '' }, photo: '' });
  const [eventTypes] = useState<string[]>(['Private', 'Public', 'Formation', 'Extern']);
/*   const [file, setFile] = useState<File | null>(null);
 */
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

 /*  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventUpdate((prevState) => ({ ...prevState, [name]: { id: 0, name: value } }));
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setEventUpdate((prevState) => ({ ...prevState, [name]: files[0] }));
    }
  }; */

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="event-name">Event Name
        <input
          type="text"
          className="input--txt"
          id="event-name"
          name="name"
          placeholder="Event Name"
          value={eventUpdate.name}
          onChange={handleChange}/>
        </label>
        <div className='align-row'>
          <label htmlFor="event-start-time">Event Start Time
            <input
              type="datetime-local"
              className="input--txt"
              id="event-start-time"
              name="start_time"
              placeholder="Event Start Time"
              value={eventUpdate.start_time}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="event-end-time">Event End Time
            <input
              type="datetime-local"
              className="input--txt"
              id="event-end-time"
              name="end_time"
              placeholder="Event End Time"
              value={eventUpdate.end_time}
              onChange={handleChange}
            />
          </label>
        </div>
        <label htmlFor="description">Description
          <textarea
            name="description"
            className="input--txt"
            id="description"
            placeholder="Description"
            value={eventUpdate.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Event Type
          <select
            name="event_type.name"
            value={eventUpdate.event_type.name}
            onChange={handleChange}
            className="input--txt">
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="image">Image</label>
          <input type="file"
            name='image'
            id='image'
            placeholder="Image"
            onChange={handleChange}
          />
        <div className="align-row">
          <input type="submit" value="Update Event" className="button--primary" />
          <button type="button" className="button--secondary--red" onClick={() => deleteEvent(token, eventIdUpdate)}>Delete Event</button>
          <button type="button" className="button--secondary" onClick={cancelUpdate}>Cancel</button>
        </div>
    </form>
  );
};

export default UpdateEventForm;
