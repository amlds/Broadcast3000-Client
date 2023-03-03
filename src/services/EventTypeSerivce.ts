import EventType from '../types/EventType';
//Connect with the backend RUBY ON RAILS API
// localhost:3000/api/v1/event_types/:id
// récupérer la variable NODE_ENV dans le fichier .env

const urlDev = 'http://localhost:3000/api/v1';
const urlProd = 'https://school-calendar-api.herokuapp.com/api/v1';

const EventTypeService = {
  async getEventTypes(): Promise<EventType[]> {
    if(process.env.NODE_ENV === 'production') {
      const response = await fetch(`${urlProd}/event_types`);
      const eventTypes = await response.json();
      return eventTypes;
    } else {
      const response = await fetch(`${urlDev}/event_types`);
      const eventTypes = await response.json();
      return eventTypes;
    }
  },
  async getEventType(id: number): Promise<EventType> {
    if(process.env.NODE_ENV === 'production') {
      const response = await fetch(`${urlProd}/event_types/${id}`);
      const eventType = await response.json();
      return eventType;
    } else {
      const response = await fetch(`${urlDev}/event_types/${id}`);
      const eventType = await response.json();
      return eventType;
    }
  }
};


export default EventTypeService;
