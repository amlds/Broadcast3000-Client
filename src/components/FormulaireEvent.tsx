import React from 'react';

import EventService from '../services/EventService';

const FromulaireEvent: React.FC = () => {
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
      EventService.createEvent({
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
      <label htmlFor="startEvent">Start date
        <input className='input--txt' type="date" name="startEvent" id="startEvent" value={event.startEvent} onChange={handleChange} />
      </label>
      <label htmlFor="endEvent">End date
        <input className='input--txt' type="date" name="endEvent" id="endEvent" value={event.endEvent} onChange={handleChange} />
      </label>
      <label htmlFor="description">Description
        <textarea className='input--txt' name="description" id="description" placeholder="Description" value={event.description} />
      </label>
      <label htmlFor="location">Location
        <input className='input--txt' type="text" name="location" id="location" placeholder="Location" value={event.location} onChange={handleChange} />
      </label>
      <button className='button--primary' type="submit">Submit</button>
      <p ref={messageRef}></p>
    </form>
  );
};

export default FromulaireEvent;
