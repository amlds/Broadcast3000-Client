import React from 'react';

import EventService from '../services/EventService';
import Event from '../types/Event'

const createEvent = async (event: Event) => {
  const res = await EventService.createEvent(1, event);
  return res;
}

const AddEventForm: React.FC = () => {
  const messageRef = React.useRef<HTMLParagraphElement>(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEvent({
      ...event,
      [e.target.name]: parseInt(e.target.value)
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if(form.checkValidity()){
      createEvent({
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
  };



  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name
        <input className='input--txt' type="text" name="name" id="name" placeholder="Alumni drink" value={event.name} onChange={handleChange} />
      </label>
      <div className='align-row'>
        <label htmlFor="startEvent">Start
          <input className='input--txt' type="datetime-local" name="startEvent" id="startEvent" value={event.startEvent} onChange={handleChange} max="2040-01-01"/>
        </label>
        <label htmlFor="endEvent">End
          <input className='input--txt' type="datetime-local" name="endEvent" id="endEvent" value={event.endEvent} onChange={handleChange} />
        </label>
      </div>
      <label htmlFor="description">Description
        <textarea className='input--txt' name="description" id="description" placeholder="Get an hangorver for free with your Le Wagon mates !"></textarea>
      </label>
      <label htmlFor="eventTypeId">Type
        <select className='input--txt' name="eventTypeId" id="eventTypeId" value={event.eventTypeId} onChange={handleChangeSelect}>
          <option value="0">Choose a type</option>
          <option value="1">Party</option>
          <option value="2">Conference</option>
          <option value="3">Meetup</option>
          <option value="4">Other</option>
        </select>
      </label>
      <input className='input--file' type="file" accept='.jpg,.png' name="image" id="image" />
      <button className='button--primary' type="submit">Add event</button>
      <p ref={messageRef} className="messageAlerte"></p>
    </form>
  );
};

export default AddEventForm;
