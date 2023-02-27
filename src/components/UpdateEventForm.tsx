import React from 'react';

import { EventContext } from '../context/EventContext';
import EventService from '../services/EventService';
import Event from '../types/Event'


const updateEvent = async (event: Event) => {
  await EventService.updateEvent(event);
  window.location.reload();
}

const getEventById = async (id: number) => {
  const stringId = id.toString();
  const event = await EventService.getEventById(stringId);
  return event;
}

const UpdateEventForm: React.FC = () => {
  const { eventIdUpdate, toggleUpdate, isUpdate } = React.useContext(EventContext);

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
  const messageRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    getEventById(eventIdUpdate).then((event) => {
      setEvent(event);
      setName(event.name);
      setStartEvent(event.startEvent);
      setEndEvent(event.endEvent);
      setDescription(event.description);
      setLocation(event.location);
    });
  }, [eventIdUpdate]);

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
      <label htmlFor="location">Location
        <input className='input--txt' type="text" name="location" id="location" placeholder="Le Wagon Lyon #TheBest" value={location} onChange={(e) => setLocation(e.target.value)}/>
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
