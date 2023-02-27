import React from 'react';
import { EventProvider } from '../../context/EventContext';

import EventService from '../../services/EventService';
import Event from '../../types/Event';

import '../../assets/views/dashboard.scss';

import DashboardConfig from '../../components/DashboardConfig';
import ListCard from '../../components/ListCard';
import LinkDevice from '../../components/LinkDevice';

const getEvents = async () => {
  const events = await EventService.getEvents();
  return events;
}

const Dashboard: React.FC = () => {
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
      <EventProvider>
        <section className='dashboard__content'>
          <header>
            <div className="container--dashboard">
              <img className='logo' src='./images/Logo_wagon_white.png' alt='Wagon Logo'></img>
              <div className='header__txt'>
                <h2>Hello Marina !</h2>
                <LinkDevice/>
              </div>
            </div>
          </header>
          <DashboardConfig />
        </section>
        <ListCard events={events} />
      </EventProvider>
    </main>
  );
};

export default Dashboard;
