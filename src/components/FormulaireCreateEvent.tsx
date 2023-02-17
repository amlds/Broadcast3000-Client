import React from 'react';

import EventService from '../services/EventService';
import Event from '../types/Event'

const createEvent = async (event: Event) => {
  if (!event.name || !event.startEvent || !event.endEvent || !event.description || !event.location) {
    throw new Error('Missing fields');
  } else if (event.startEvent > event.endEvent) {
    throw new Error('Start date must be before end date');
  } else if (event.startEvent === event.endEvent) {
    throw new Error('Start date and end date must be different');
  }
  const newEvent = await EventService.createEvent(event);
  return newEvent;
}

const FormulaireCreateEvent: React.FC = () => {
  const messageRef = React.useRef<HTMLParagraphElement>(null);
  const [event, setEvent] = React.useState({
    name: '',
    startEvent: '',
    endEvent: '',
    description: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    const description = document.getElementById('description') as HTMLInputElement;
    if(event.name && event.startEvent && event.endEvent && event.location && description.value){
      createEvent({
        ...event,
        description: description.value,
        image: 'test',
        id: 0
      }).then(res => {
        messageRef.current!.innerHTML = '✅ Event added ✅';
      }).catch(err => {
        messageRef.current!.innerHTML = '🚨 Erreur 🚨';
      });
    } else {
      e.preventDefault();
      messageRef.current!.innerHTML = '🚨 Veuillez remplir tous les champs 🚨';
    }
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
      <label htmlFor="location">Location
        <input className='input--txt' type="text" name="location" id="location" placeholder="Le Wagon Lyon #TheBest" value={event.location} onChange={handleChange} />
      </label>
      <input className='input--file' type="file" accept='.jpg,.png' name="image" id="image" />
      <button className='button--primary' type="submit">Add event</button>
      <p ref={messageRef} className="messageAlerte"></p>
    </form>
  );
};

export default FormulaireCreateEvent;
