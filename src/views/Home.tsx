import React from 'react';

/* import EventContext, { defaultState } from '../context/EventContext'; */

import Event from '../types/Event';
import EventService from '../services/EventService';

import Toolbar from '../components/Toolbar';
import ListCard from '../components/ListCard';

const getEvents = async () => {
  const events = await EventService.getEvents();
  return events;
};

const Home: React.FC = () => {
  /* const eventIdUpdate = defaultState.eventIdUpdate;
  const [isUpdate, toggleUpdate] = React.useState<boolean>(defaultState.isUpdate); */
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
    <div>
      <Toolbar />
      <ListCard events={events} />
    </div>
  );
};

export default Home;
