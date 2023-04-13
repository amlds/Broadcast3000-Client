import Event from '../types/Event';

//Connect with the backend RUBY ON RAILS API
// /api/v1/schools/:school_id/events
const url = 'http://localhost:3001/api/v1/';

export interface NewEvent {
  event: {
    id?: number;
    name: string;
    description: string;
    start_time: string;
    end_time: string;
    photo: File;
    event_type_id: number;
  }
}

const EventService = {
  async createEvent(token: string, schoolId: number, event: NewEvent): Promise<Event> {
    const formData = new FormData();
    formData.append('event[name]', event.event.name);
    formData.append('event[description]', event.event.description);
    formData.append('event[start_time]', event.event.start_time);
    formData.append('event[end_time]', event.event.end_time);
    formData.append('event[photo]', event.event.photo);
    formData.append('event[event_type_id]', String(event.event.event_type_id));

    const response = await fetch(`${url}schools/${schoolId}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `${token}`
      },
      body: formData,
    });
    const newEvent = await response.json();
    return newEvent;
  },

  async updateEvent(token: string, eventId: number, event: NewEvent): Promise<Event> {
    const formData = new FormData();
    formData.append('event[name]', event.event.name);
    formData.append('event[description]', event.event.description);
    formData.append('event[start_time]', event.event.start_time);
    formData.append('event[end_time]', event.event.end_time);
    if (!event.event.photo){
      console.log('no photo')
    } else {
      formData.append('event[photo]', event.event.photo);
    }
    formData.append('event[event_type_id]', String(event.event.event_type_id));

    console.log(event);
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
  },

  async deleteEvent(token: string, eventId: number): Promise<Event> {
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
