import Event from '../types/Event';

//Connect with the backend RUBY ON RAILS API
// /api/v1/schools/:school_id/events
const url = 'http://localhost:3001/api/v1/schools/';

class EventService {
  static async createEvent(token: string, schoolId: number, event: Event): Promise<Event> {
    const response = await fetch(`${url}${schoolId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(event),
    });
    const newEvent = await response.json();
    console.log('response', response);
    console.log(newEvent);
    return newEvent;
  }

  static async deleteEvent(token: string, schoolId: number, eventId: number): Promise<Event> {
    const response = await fetch(`${url}${schoolId}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
    });
    const deletedEvent = await response.json();
    return deletedEvent;
  }
}

export default EventService;
