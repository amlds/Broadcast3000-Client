import Event from '../types/Event';

export class EventController {
  static async getEvents(): Promise<Event[]> {
    return fetch('http://localhost:4000/events')
      .then((response) => response.json())
      .then((data) => {
        return data;
      }
      );
  }

  static async getEventById(id: string): Promise<Event> {
    const response = await fetch(`http://localhost:4000/events/${id}`);
    const event: Event = await response.json();
    return event;
  }

  static async createEvent(event: Event): Promise<Event> {
    const response =  await fetch('http://localhost:4000/events/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const createdEvent: Event = await response.json();
    return createdEvent;
  }

  static async updateEvent(event: Event): Promise<Event> {
    const response = await fetch(`http://localhost:4000/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const updatedEvent: Event = await response.json();
    return updatedEvent;
  }

  static async deleteEvent(id: number): Promise<Event> {
    const response = await fetch(`http://localhost:4000/events/delete/${id}`, {
      method: 'DELETE',
    });
    const deletedEvent: Event = await response.json();
    return deletedEvent;
  }

}

export default EventController;
