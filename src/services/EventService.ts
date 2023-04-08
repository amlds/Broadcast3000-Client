import Event from '../types/Event';

//Connect with the backend RUBY ON RAILS API
// /api/v1/schools/:school_id/events
const url = 'http://localhost:3001/api/v1/';

interface NewEvent {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  photo: string;
  event_type_id: number;
}

/*  POST   /api/v1/schools/:school_id/events(.:format) api/v1/events#create */

class EventService {
  static async createEvent(token: string, schoolId: number, event: NewEvent): Promise<Event> {
    console.log(token);
    const response = await fetch(`${url}schools/${schoolId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(event),
    });
    const newEvent = await response.json();
    return newEvent;
  }

  static async updateEvent(token: string, eventId: number, event: Event): Promise<Event> {
    const response = await fetch(`${url}events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(event),
    });
    const updatedEvent = await response.json();
    return updatedEvent;
  }

  static async deleteEvent(token: string, eventId: number): Promise<Event> {
    const response = await fetch(`${url}events/${eventId}`, {
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
