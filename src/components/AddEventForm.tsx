import React from 'react';

import EventService from '../services/EventService';
import Event from '../types/Event'

const createEvent = async (event: Event) => {
  const res = await EventService.createEvent(1, event);
  return res;
}

const AddEventForm: React.FC = () => {
/*   const messageRef = React.useRef<HTMLParagraphElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [event, setEvent] = React.useState<Event>({
    name: '',
    start_time: '',
    end_time: '',
    description: '',
    id: 0,
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
        setTimeout(() => {
          messageRef.current!.innerHTML = '';
          formRef.current!.reset();
        }, 5000);
      }).catch(err => {
        messageRef.current!.innerHTML = '🚨 Erreur 🚨';
      });
    }
    else {
      messageRef.current!.innerHTML = '🚨 Veuillez remplir tous les champs 🚨';
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <label htmlFor="name">Name
      <input type="text"
        name='name'
        id='name'
        className="input--txt"
        placeholder="Nom de l'événement"
        required
        onChange={handleChange}
      />
      </label>
      <div className='align-row'>
        <label htmlFor="start_time">Start
        <input type="datetime-local"
          name='start_time'
          id='start_time'
          className="input--txt"
          placeholder="Date de début"
          required
          onChange={handleChange}
          />
        </label>
        <label htmlFor="end_time">End
        <input type="datetime-local"
          name='end_time'
          id='end_time'
          className="input--txt"
          placeholder="Date de fin"
          required
          onChange={handleChange}
          />
        </label>
      </div>
      <label htmlFor="description">Description
      <textarea name="description"
        id="description"
        className="input--txt"
        placeholder="Description"
        required
        onChange={handleChangeTextArea}
        ></textarea>
      </label>
      <label htmlFor="event_type_id">Type
        <select name="event_type_id"
          id="event_type_id"
          className="input--txt"
          required
          onChange={handleChangeSelect}
          >
          <option value="1">Private</option>
          <option value="2">Public</option>
          <option value="3">Formation</option>
          <option value="4">Extern</option>
        </select>
      </label>
      <label htmlFor="image">Image</label>
      <input type="file"
        name='image'
        id='image'
        placeholder="Image"
        required
        onChange={handleChange}
      />
      <div className="align-row">
        <button type="submit" className="button button--primary">Add a new event</button>
        <p ref={messageRef} className='messageRef'></p>
      </div>
    </form>
  ); */
  return (
    <div>
      <p>🚧 Work in progress 🚧</p>
    </div>
  );
};

export default AddEventForm;
