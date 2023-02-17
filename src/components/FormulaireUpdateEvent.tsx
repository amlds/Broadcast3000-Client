import React from 'react';
import { Link, useParams } from 'react-router-dom';

import EventService from '../services/EventService';
import Event from '../types/Event'


const updateEvent = async (event: Event) => {
  await EventService.updateEvent(event);
  window.location.reload();
}

const getEventById = async (id: string) => {
  const event = await EventService.getEventById(id);
  return event;
}

const FormulaireUpdateEvent: React.FC = () => {
  const [event, setEvent] = React.useState<Event>({
    name: '',
    startEvent: '',
    endEvent: '',
    description: '',
    location: '',
    image: '',
    id: 0
  });
  const [name, setName] = React.useState(event.name);
  const [startEvent, setStartEvent] = React.useState(event.startEvent);
  const [endEvent, setEndEvent] = React.useState(event.endEvent);
  const [description, setDescription] = React.useState(event.description);
  const [location, setLocation] = React.useState(event.location);
  let id = useParams().id as string;
  const messageRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    getEventById(id).then((event) => {
      setEvent(event);
      setName(event.name);
      setStartEvent(event.startEvent);
      setEndEvent(event.endEvent);
      setDescription(event.description);
      setLocation(event.location);
    });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    const description = document.getElementById('description') as HTMLInputElement;
    //si tout les champs sont remplis on envoie le formulaire
    if(name && startEvent && endEvent && location && description.value){
      updateEvent({
        ...event,
        name: name,
        startEvent: startEvent,
        endEvent: endEvent,
        description: description.value,
        location: location,
        id: event.id
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


  return (
    <form onSubmit={handleSubmit}>
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
      <label htmlFor="location">Location
        <input className='input--txt' type="text" name="location" id="location" placeholder="Le Wagon Lyon #TheBest" value={location} onChange={(e) => setLocation(e.target.value)}/>
      </label>
      <input className='input--file' type="file" accept='.jpg,.png' name="image" id="image"/>
      <div className='twoButtonSet'>
        <Link to='/dashboard' className='button'>Cancel</Link>
        <button type="submit">Update event</button>
      </div>
      <p ref={messageRef} className="messageAlerte"></p>
    </form>
  );
};

export default FormulaireUpdateEvent;
