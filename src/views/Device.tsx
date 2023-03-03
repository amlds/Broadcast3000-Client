import React from 'react';

import EventService from '../services/EventService';
import Event from '../types/Event';

import FocusImage from '../components/FocusImage';
/*import LectureDay from '../components/LectureDay';*/
import ListCard from '../components/ListCard';

import '../assets/views/device.scss'

const getEvents = async () => {
  const events = await EventService.getEvents(1);
  return events;
}

const Devices: React.FC = () => {
  /* const [date, setDate] = React.useState(new Date());
  const [dayMonth, setDayMonth] = React.useState(date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric'})); */
  const messageRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
   /*  getEvents().then((events) => {
      const sortedEvents = events.sort((a, b) => {
        return new Date(a.endEvent).getTime() - new Date(b.endEvent).getTime();
      });
      const filteredEvents = sortedEvents.filter((event) => {
        return new Date(event.endEvent).getTime() > new Date().getTime();
      });
      setEvents(filteredEvents);
    }); */
    getEvents().then((events) => {
      setEvents(events);
    });
  }, []);

  /* React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
      setDayMonth(date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric'}));
    }, 5000);
    return () => clearInterval(interval);
  }, [date]);

  React.useEffect(() => {
    if (messageRef.current) {
      messageRef.current.innerHTML = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', weekday: 'long',});
    }
  }, [date]);
 */
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    getEvents().then((events) => {
      const sortedEvents = events.sort((a, b) => {
        return new Date(a.end_time).getTime() - new Date(b.end_time).getTime();
      });
      const filteredEvents = sortedEvents.filter((event) => {
        return new Date(event.end_time).getTime() > new Date().getTime();
      });
      setEvents(filteredEvents);
    });
    getEvents().then((events) => {
      setEvents(events);
    });
  }, []);

    return (
    <main className='device'>
      <section className='device__content'>
        <img className='logo' src='./images/Logo_wagon.png' alt='Wagon Logo'></img>
        <div className='device__content--text'>
          <h1>Hello wagoners !</h1>
          <p>Nous somme le <span className='text-medium' ref={messageRef}></span></p>
          {/* <LectureDay date={dayMonth}/> */}
          <FocusImage />
        </div>
      </section>
      <ListCard events={events} />
    </main>
  );
};

export default Devices;
