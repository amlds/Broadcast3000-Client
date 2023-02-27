import React from 'react';

import Event from '../types/Event';
import CardEvent from './CardEvent';
import ButtonEdit from './ButtonEdit'

const id = [1,2,3,4]

interface Props {
  events: Event[];
}

const ListCard: React.FC<Props> = ({ events }) => {
  return (
    <div className="listCard">
      <span className='shadow'></span>
      <h2 className='listCard__title'>Nos prochains events :</h2>
      {Object.values(id).map((id: number) => (
        <ButtonEdit key={id} id={id} />
      ))}
      <div className='listCard__content'>
        {Object.values(events).map((event: Event) => (
          <CardEvent key={event.id} event={event}/>
        ))}
      </div>
      <span className='shadow'></span>
    </div>
  );
};

export default ListCard;
