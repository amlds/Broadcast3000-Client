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
  const { eventIdUpdate, toggleUpdate, isUpdate } = React.useContext(EventContext);
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
  const [name, setName] = React.useState(event.name);
  const [start_time, setstart_time] = React.useState(event.start_time);
  const [end_time, setend_time] = React.useState(event.end_time);
  const [description, setDescription] = React.useState(event.description);
  const [event_type_id, setevent_type_id] = React.useState(event.event_type_id);
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
    if(event.name && event.start_time && event.end_time && event.event_type_id && event.description && event.event_type_id){
      updateEvent({
        ...event,
      }).then(res => {
        messageRef.current!.innerHTML = '✅ Event added ✅';
      }).catch(err => {
        messageRef.current!.innerHTML = '🚨 Erreur 🚨';
      });
    } else {
      messageRef.current!.innerHTML = '🚨 Veuillez remplir tous les champs 🚨';
    }
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleUpdate();
    console.log(isUpdate);
    console.log('cancel');
  }


  return (
    <form >
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
        <select className='input--txt' name="type" id="type" value={event.event_type_id}>
          <option value="1">Party</option>
          <option value="2">Conference</option>
          <option value="3">Workshop</option>
          <option value="4">Other</option>
        </select>
      </label>
      <input className='input--file' type="file" accept='.jpg,.png' name="image" id="image"/>
      <div className='twoButtonSet'>
        <button className='button--secondary--red' onClick={handleCancel}>Cancel</button>
        <button onSubmit={handleSubmit} type="submit" className='button--primary'>Update event</button>
      </div>
      <p ref={messageRef} className="messageAlerte"></p>
    </form>
  );
};

export default UpdateEventForm;
