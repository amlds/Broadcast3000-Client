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
    start_time: '',
    end_time: '',
    description: '',
    id: 0,
    event_type_id: 0,
    school_id: 0,
    image: 'test',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setEvent({
      ...event,
      [name]: parseInt(value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    const { name, start_time, end_time, description, event_type_id } = event;
    const eventToCreate = {
      name,
      start_time,
      end_time,
      description,
      event_type_id,
    };
    const formData = new FormData();
    formData.append('event', JSON.stringify(eventToCreate));
    e.preventDefault();
    if (name && start_time && end_time && event_type_id && description && event_type_id) {
      createEvent({
        ...event,
      }).then(res => {
        messageRef.current!.innerHTML = '✅ Event added ✅';
      }).catch(err => {
        messageRef.current!.innerHTML = '🚨 Erreur 🚨';
      });
    }
    else {
      messageRef.current!.innerHTML = '🚨 Veuillez remplir tous les champs 🚨';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__group">
        <label htmlFor="name">Nom de l'événement</label>
        <input type="text"
          name='name'
          id='name'
          className="form__input"
          placeholder="Nom de l'événement"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form__group">
        <label htmlFor="start_time">Date de début</label>
        <input type="datetime-local"
          name='start_time'
          id='start_time'
          className="form__input"
          placeholder="Date de début"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form__group">
        <label htmlFor="end_time">Date de fin</label>
        <input type="datetime-local"
          name='end_time'
          id='end_time'
          className="form__input"
          placeholder="Date de fin"
          required
          onChange={handleChange}
        />
      </div>
      <div className="form__group">
        <label htmlFor="description">Description</label>
        <textarea name="description"

          id="description"
          className="form__input"
          placeholder="Description"
          required
          onChange={handleChangeTextArea}
        ></textarea>
      </div>
      <div className="form__group">
        <label htmlFor="event_type_id">Type d'événement</label>
        <select name="event_type_id"
          id="event_type_id"
          className="form__input"
          required
          onChange={handleChangeSelect}
        >
          <option value="1">Sport</option>
          <option value="2">Culture</option>
          <option value="3">Autre</option>
        </select>
      </div>
      <div className="form__group">
        <label htmlFor="image">Image</label>
        <input type="file"
          name='image'
          id='image'
          className="form__input"
          placeholder="Image"
          required
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn--primary">Ajouter</button>
      <p ref={messageRef}></p>
    </form>
  );
};

export default AddEventForm;
