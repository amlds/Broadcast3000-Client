import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import EventService, { UpdateEvent } from '../services/EventService';
import { EventContext } from '../context/EventContext';
import Event from '../types/Event';

interface Props {
  events: Event[];
  schoolId: number;
}

const deleteEvent = async (token: string, eventId: number) => {
  await EventService.deleteEvent(token, eventId);
};

const UpdateEventForm: React.FC<Props> = ({ schoolId, events }) => {
  const [token] = useState<string>(Cookies.get('token') || '');
  const { toggleUpdate ,eventIdUpdate } = React.useContext(EventContext);
  const [event, setEvent] = useState<UpdateEvent>({
    event: {
      id: 0,
      name: '',
      description: '',
      start_time: '',
      end_time: '',
      photo: null as any,
      event_type_id: 0,
    },
  });
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const event = events.find((event) => event.id === eventIdUpdate);
    if (event) {
      setEvent({
        event: {
          id: event.id,
          name: event.name,
          description: event.description,
          start_time: event.start_time,
          end_time: event.end_time,
          photo: null as any,
          event_type_id: event.event_type.id,
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventIdUpdate]);

  const cancelUpdate = () => {
    toggleUpdate();
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // comparer les events pour voir si il y a des changements
    if (!event.event.photo) {
      console.log('Pas de photo');
      delete event.event.photo;
    } else if (event.event.photo) {
      console.log('Photo');
    }

    console.log(event)

    try {
      const updatedEvent = await EventService.updateEvent(token, eventIdUpdate, event);
      console.log(`Événement avec l'ID ${eventIdUpdate} mis à jour :`, updatedEvent);
      setMessage(`Événement avec le nom ${event.event.name} mis à jour avec succès`);
      setTimeout(() => {
        toggleUpdate();
      }, 3000);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'événement avec l'ID ${eventIdUpdate} :`, error);
      setMessage(`Erreur lors de la mise à jour de l'événement avec le nom ${event.event.name}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'start_time' || name === 'end_time') {
      // Convert the date value to ISO format
      const date = new Date(value);
      newValue = date.toISOString().slice(0, 16);
    }
    setEvent({
      event: {
        ...event.event,
        [name]: newValue,
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setEvent({
        event: {
          ...event.event,
          photo: files[0],
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nom de l'événement :
      <input
        type="text"
        name="name"
        id="name"
        className="input--txt"
        value={event.event.name}
        onChange={handleChange}
        required
      /></label>
      <div className="align-row">
        <label htmlFor="start_time">Date et heure de début :
        <input
          type="datetime-local"
          name="start_time"
          id="start_time"
          className="input--txt"
          value={event.event.start_time}
          onChange={handleChange}
          required
        /></label>
        <label htmlFor="end_time">Date et heure de fin :
        <input
          type="datetime-local"
          name="end_time"
          id="end_time"
          className="input--txt"
          value={event.event.end_time}
          onChange={handleChange}
          required
        /></label>
      </div>
      <label htmlFor="description">Description :
      <textarea
        name="description"
        id="description"
        className="input--txt"
        value={event.event.description}
        onChange={handleChange}
        required
      /></label>

      <label htmlFor="event_type_id">Type d'événement :
      <select
        name="event_type_id"
        id="event_type_id"
        className="input--txt"
        value={event.event.event_type_id}
        onChange={handleChange}
      >
        <option value="1">Private</option>
        <option value="2">Public</option>
        <option value="3">Formation</option>
        <option value="4">Externe</option>
      </select></label>
      <label htmlFor="photo">Photo :
      <input type="file" name="photo" id="photo" onChange={handleFileChange}/></label>
      <div className='align-row'>
        <button type="submit" className="button--primary">Update event</button>
        <button type="button" className="button--secondary--red" onClick={() => deleteEvent(token, eventIdUpdate)}>Delete Event</button>
        <button type="button" className="button--secondary" onClick={cancelUpdate}>Cancel</button>
      </div>{message && <p>{message}</p>}
    </form>
  );
};

export default UpdateEventForm;
