import React from 'react';

import EventService from '../services/EventService';
import Event from '../types/Event'
import { TokenContext } from '../context/TokenContext';

const createEvent = async (token: string, event: Event) => {
  const res = await EventService.createEvent(token, 1, event);
  return res;
}

const AddEventForm: React.FC = () => {
  const messageRef = React.useRef<HTMLParagraphElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const { token } = React.useContext(TokenContext);
  const [event, setEvent] = React.useState<Event>({
    name: '',
    start_time: '',
    end_time: '',
    description: '',
    event_type: {
      name: '',
      color: '',
    }
  });
  const [eventTypes, setEventTypes] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    // fetch event types from API or set locally
    const types = ['Private', 'Public', 'Formation', 'Extern'];
    setEventTypes(types);
  }, []);

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
      event_type: {
        ...event.event_type,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    const { name, start_time, end_time, description, event_type } = event;
    const eventToCreate = {
      name,
      start_time,
      end_time,
      description,
      event_type: {
        name: event_type.name,
        color: event_type.color,
      }
    };
    const formData = new FormData();
    formData.append('event', JSON.stringify(eventToCreate));
    e.preventDefault();
    if (name && start_time && end_time && description && event_type.name) {
      createEvent(token, eventToCreate);
      messageRef.current!.innerHTML = '🎉 Evénement créé 🎉';
      formRef.current!.reset();
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
      <label>
        Type
        <select name="name"
          id="event_type_name"
          className="input--txt"
          required
          onChange={handleChangeSelect}
          >
          {eventTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
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
  );
};

export default AddEventForm;
