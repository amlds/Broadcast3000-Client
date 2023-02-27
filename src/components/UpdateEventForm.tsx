import React from 'react';

import { EventContext } from '../context/EventContext';
import EventService from '../services/EventService';
import Event from '../types/Event'


const updateEvent = async (event: Event) => {
  await EventService.updateEvent(event.schoolId, event);
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
    startEvent: '',
    endEvent: '',
    description: '',
    id: 0,
    eventTypeId: 0,
    schoolId: 0,
    image: '',
  });
  const [name, setName] = React.useState(event.name);
  const [startEvent, setStartEvent] = React.useState(event.startEvent);
  const [endEvent, setEndEvent] = React.useState(event.endEvent);
  const [description, setDescription] = React.useState(event.description);
  const [eventTypeId, setEventTypeId] = React.useState(event.eventTypeId);
  const messageRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    getEventById(1, eventIdUpdate).then((event) => {
      setEvent(event);
      setName(event.name);
      setStartEvent(event.startEvent);
      setEndEvent(event.endEvent);
      setDescription(event.description);
      setEventTypeId(event.eventTypeId);
    });
  }, [eventIdUpdate]);

  const handleSubmit = (e: React.FormEvent) => {
    if(event.name && event.startEvent && event.endEvent && event.eventTypeId && event.description && event.eventTypeId){
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
    e.preventDefault();
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
        <label htmlFor="startEvent">Start
          <input className='input--txt' type="datetime-local" name="startEvent" id="startEvent" value={startEvent} onChange={(e) => setStartEvent(e.target.value)}/>
        </label>
        <label htmlFor="endEvent">End
          <input className='input--txt' type="datetime-local" name="endEvent" id="endEvent"  value={endEvent} onChange={(e) => setEndEvent(e.target.value)}/>
        </label>
      </div>
      <label htmlFor="description">Description
        <textarea className='input--txt' name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </label>
      <label htmlFor="type">type
        <select className='input--txt' name="type" id="type" value={event.eventTypeId}>
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
