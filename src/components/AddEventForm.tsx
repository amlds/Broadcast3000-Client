import React, { useState } from 'react';
import Cookies from 'js-cookie';
import EventService, { NewEvent } from '../services/EventService';

interface Props {
  schoolId: number;
}

const AddEventForm: React.FC<Props> = ({ schoolId }) => {
  const [token] = useState<string>(Cookies.get('token') || '');
  const [event, setEvent] = useState<NewEvent>({
    event: {
      name: '',
      description: '',
      start_time: '',
      end_time: '',
      photo: null as any,
      event_type_id: 0,
    },
  });
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newEvent = await EventService.createEvent(token, schoolId, event);
      console.log('Nouvel événement créé :', newEvent);
      // Réinitialiser le formulaire
      setEvent({
        event: {
          name: '',
          description: '',
          start_time: '',
          end_time: '',
          photo: null as any,
          event_type_id: 0,
        },
      });
      setMessage('Nouvel événement créé avec succès');
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement :', error);
      setMessage('Erreur lors de la création de l\'événement');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEvent({
      event: {
        ...event.event,
        [name]: value,
      },
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setEvent({
      event: {
        ...event.event,
        description: value,
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setEvent({
        event: {
          ...event.event,
          photo: file,
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
        onChange={handleDescriptionChange}
        required
      /></label>
      <label htmlFor="event_type_id">Type d'événement :
      <select
        name="event_type_id"
        id="event_type_id"
        className="input--txt"
        value={event.event.event_type_id}
        onChange={handleChange}
        required
      >
        <option value="">-- Sélectionnez un type d'événement --</option>
        <option value="1">Private</option>
        <option value="2">Public</option>
        <option value="3">Formation</option>
        <option value="4">Externe</option>
      </select></label>
      <label htmlFor="photo">Photo :
      <input type="file" name="photo" id="photo" onChange={handleFileChange} />
      </label>
      <div>
        <button type="submit" className='button--primary'>Create event</button>
      </div>{message && <p>{message}</p>}
    </form>
  );
};

export default AddEventForm;
