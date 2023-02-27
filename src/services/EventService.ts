import Event from '../types/Event';

//Connect with the backend RUBY ON RAILS API
// /api/v1/schools/:school_id/events

const EventService = {
  getEvents: async (schoolId: number): Promise<Event[]> => {
    const response = await fetch(`http://localhost:3000/api/v1/schools/1/events`, {
      mode: 'no-cors',
    });
    const events = await response.json();
    return events;
  },

  getEvent: async (schoolId: number, eventId: number): Promise<Event> => {
    const response = await fetch(`http://localhost:3000/api/v1/schools/${schoolId}/events/${eventId}`, {
      mode: 'no-cors',
    });
    const event = await response.json();
    return event;
  },

  createEvent: async (schoolId: number, event: Event): Promise<Event> => {
    console.log('event', event);
    const response = await fetch(`http://localhost:3000/api/v1/schools/${schoolId}/events`, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const newEvent = await response.json();
    return newEvent;
  },

  updateEvent: async (schoolId: number, event: Event): Promise<Event> => {
    const response = await fetch(`http://localhost:3000/api/v1/schools/${schoolId}/events/${event.id}`, {
      mode: 'no-cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const updatedEvent = await response.json();
    return updatedEvent;
  },

  deleteEvent: async (schoolId: number, eventId: number): Promise<Event> => {
    const response = await fetch(`http://localhost:3000/api/v1/schools/${schoolId}/events/${eventId}`, {
      mode: 'no-cors',
      method: 'DELETE',
    });
    const deletedEvent = await response.json();
    return deletedEvent;
  },
};

export default EventService;
