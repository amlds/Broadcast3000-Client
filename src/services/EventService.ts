import Event from '../types/Event';

//Connect with the backend RUBY ON RAILS API
// /api/v1/schools/:school_id/events
const url = 'http://localhost:3000/api/v1';

class EventService {
  static async getEvents(schoolId: number): Promise<Event[]> {
    const response = await fetch(`${url}/schools/${schoolId}/events`);
    const events = await response.json();
    return events;
  }

  static async getEvent(schoolId: number, eventId: number): Promise<Event> {
    const response = await fetch(`${url}/schools/${schoolId}/events/${eventId}`);
    const event = await response.json();
    return event;
  }

  static async createEvent(schoolId: number, event: Event): Promise<Event> {
    const response = await fetch(`${url}/schools/${schoolId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const newEvent = await response.json();
    return newEvent;
  }

  static async updateEvent(schoolId: number, event: Event): Promise<Event> {
    const response = await fetch(`${url}/schools/${schoolId}/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const updatedEvent = await response.json();
    return updatedEvent;
  }

  static async deleteEvent(schoolId: number, eventId: number): Promise<Event> {
    const response = await fetch(`${url}/schools/${schoolId}/events/${eventId}`, {
      method: 'DELETE',
    });
    const deletedEvent = await response.json();
    return deletedEvent;
  }
}

export default EventService;
