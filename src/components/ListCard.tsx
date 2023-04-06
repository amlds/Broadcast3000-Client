import React from 'react';

import Event from '../types/Event';
import CardEvent from './CardEvent';

interface Props {
  events: Event[];
}


const ListCard: React.FC<Props> = (Props) => {
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    Props.events.sort((a, b) => {
      return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
    });
    // ne pas afficher les events passés (end_time < now)
    const eventsFiltered = Props.events.filter((event) => {
      const date = new Date(event.end_time);
      const now = new Date();
      return date > now;
    });
    setEvents(eventsFiltered);
  }, [Props.events]);

  return (
    <div className="listCard">
      <span className='shadow'></span>
      <h2 className='listCard__title'>Nos prochains events :</h2>
        <div className='listCard__content'>
          {events.map((event) => {
            return (
              <CardEvent key={event.id} event={event} />
            )
          })}
        </div>
      <span className='shadow'></span>
    </div>
  );
};

export default ListCard;
