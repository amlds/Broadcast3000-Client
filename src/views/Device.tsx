import React from 'react';

import EventService from '../services/EventService';
import Event from '../types/Event';

/*import LectureDay from '../components/LectureDay';*/
import ListCard from '../components/ListCard';

import '../assets/views/device.scss'

const getEvents = async () => {
  const events = await EventService.getEvents(1);
  return events;
}

const Devices: React.FC = () => {
  const messageRef = React.useRef<HTMLParagraphElement>(null);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    getEvents().then((events) => {
      const sortedEvents = events.sort((a, b) => {
        return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
      });
      const filteredEvents = sortedEvents.filter((event) => {
        return new Date(event.start_time).getTime() > new Date().getTime();
      });
      setEvents(filteredEvents);
    });
  }, []);

  React.useEffect(() => {
    if(messageRef.current)
    if(messageRef.current.outerText === '') messageRef.current.innerHTML = date.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', weekday: 'long' });
    const interval = setInterval(() => {
      setDate(new Date());
      messageRef.current!.innerHTML = date.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', weekday: 'long' });
    }, 50000);
    return () => clearInterval(interval);
  }, [date]);

    return (
    <main className='device'>
      <section className='device__content'>
        <img className='logo' src='./images/Logo_wagon.png' alt='Wagon Logo'></img>
        <div className='device__content--text'>
          <h1>Hello wagoners !</h1>
          <p>Nous somme le <span className='text-normal' ref={messageRef}></span></p>
        </div>
      </section>
      <ListCard events={events} />
    </main>
  );
};

export default Devices;
