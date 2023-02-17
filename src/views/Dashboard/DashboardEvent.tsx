import React from 'react';

import EventService from '../../services/EventService';
import Event from '../../types/Event';

import '../../assets/views/dashboard.scss';

import ListCard from '../../components/ListCard';
import FormulaireUpdateEvent from '../../components/FormulaireUpdateEvent';

const getEvents = async () => {
  const events = await EventService.getEvents();
  return events;
}


const DashboardEvent: React.FC = () => {
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    getEvents().then((events) => {
      const sortedEvents = events.sort((a, b) => {
        return new Date(a.endEvent).getTime() - new Date(b.endEvent).getTime();
      });
      const filteredEvents = sortedEvents.filter((event) => {
        return new Date(event.endEvent).getTime() > new Date().getTime();
      });
      setEvents(filteredEvents);
    });
  }, []);



  return (
    <main className='dashboard'>
      <section className='dashboard__content'>
        <header>
          <img className='logo' src='./images/Logo_wagon_white.png' alt='Wagon Logo'></img>
          <div className='header__txt'>
            <h2>Hello 'const [name, setName] = React.useState(get.api)'</h2>
            <p className='text-normal'>[Insérer une phrase drôle ici]</p>
          </div>
        </header>
        <div className='dashboard__content--form'>
          <div className='form__link'>
            <p className='text-normal'>Lien de la session</p>
          </div>
          <FormulaireUpdateEvent />
        </div>
      </section>
      <ListCard events={events} />
    </main>
  );
};

export default DashboardEvent;
