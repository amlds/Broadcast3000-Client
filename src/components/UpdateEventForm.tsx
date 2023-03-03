import React from 'react';

import { EventContext } from '../context/EventContext';
import EventService from '../services/EventService';
import Event from '../types/Event'


const updateEvent = async (event: Event) => {
  await EventService.updateEvent(event.school_id, event);
  window.location.reload();
}

const getEventById = async (schoolId: number, eventId: number) => {
  const event = await EventService.getEvent(schoolId, eventId);
  return event;
}

const UpdateEventForm: React.FC = () => {
  const { eventIdUpdate, toggleUpdate, setId } = React.useContext(EventContext);
  const [event, setEvent] = React.useState<Event>({
    name: '',
    start_time: '',
    end_time: '',
    description: '',
    id: 0,
    event_type_id: 0,
    school_id: 0,
    image: '',
  });
  const [name, setName] = React.useState("");
  const [start_time, setstart_time] = React.useState("");
  const [end_time, setend_time] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [event_type_id, setevent_type_id] = React.useState(0);
  const messageRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    getEventById(1, eventIdUpdate).then((event) => {
      setEvent(event);
      setName(event.name);
      setstart_time(event.start_time);
      setend_time(event.end_time);
      setDescription(event.description);
      setevent_type_id(event.event_type_id);
    });
  }, [eventIdUpdate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventToUpdate = {
      name,
      start_time,
      end_time,
      description,
      event_type_id,
      id: event.id,
      school_id: event.school_id,
      image: event.image,
    };
    updateEvent(eventToUpdate);
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleUpdate();
    setId(0);
  }

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.eventPhase;
    console.log(e);
    setEvent({
      ...event,
      [event_type_id]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name
      <input className='input--txt' type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <div className='align-row'>
        <label htmlFor="start_time">Start
          <input className='input--txt' type="datetime-local" name="start_time" id="start_time" value={start_time} onChange={(e) => setstart_time(e.target.value)}/>
        </label>
        <label htmlFor="end_time">End
          <input className='input--txt' type="datetime-local" name="end_time" id="end_time"  value={end_time} onChange={(e) => setend_time(e.target.value)}/>
        </label>
      </div>
      <label htmlFor="description">Description
        <textarea className='input--txt' name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </label>
      <label htmlFor="type">type
        <select className='input--txt' name="type" id="type" onChange={(e) => {
          console.log(e.eventPhase)
          handleChangeSelect(e)
        }}>
          <option value="1">Party</option>
          <option value="2">Conference</option>
          <option value="3">Workshop</option>
          <option value="4">Other</option>
        </select>
      </label>
      <input className='input--file' type="file" accept='.jpg,.png' name="image" id="image"/>
      <div className='twoButtonSet'>
        <button className='button--secondary--red' onClick={handleCancel}>Cancel</button>
        <button type="submit" className='button--primary'>Update event</button>
      </div>
      <p ref={messageRef} className="messageAlerte"></p>
    </form>
  );
};

export default UpdateEventForm;
