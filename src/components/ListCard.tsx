import React from 'react';

import Event from '../types/Event';
import CardEvent from './CardEvent';

interface Props {
  events: Event[];
}


const ListCard: React.FC<Props> = (Props) => {
  return (
    <div className="listCard">
      <span className='shadow'></span>
      <h2 className='listCard__title'>Nos prochains events :</h2>
        <div className='listCard__content'>
          {
            Props.events.map((event) => {
              return (
                <CardEvent key={event.id} event={event} />
              )
            })
          }

        </div>
      <span className='shadow'></span>
    </div>
  );
};

export default ListCard;
