import React from "react";

import ButtonEdit from "./ButtonEdit";
import event from "../types/Event";
import { useParams } from "react-router-dom";

type props = {
  event: event;
};

const CardEvent: React.FC<props> = (event: props) => {
  const eventRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  let id = useParams().id as unknown as number;

  const structureTime = (time: string) => {
    const date = new Date(time);
    return `${date.toLocaleDateString('fr-FR', {year:'numeric', month: 'long', day: 'numeric' })} à ${date.toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' })}`;
  };

  React.useEffect(() => {
    const card = cardRef.current!;
    // eslint-disable-next-line eqeqeq
    if (event.event.id == id) {
      card.classList.add('cardEvent__content--active');
    } else {
      card.classList.remove('cardEvent__content--active');
    }
  }, [event.event.id, id]);

  React.useEffect(() => {
    const event = eventRef.current!;
    const card = cardRef.current!;
    const toggle = () => {
      const cards = document.querySelectorAll('.cardEvent__content');
      cards.forEach((card) => {
        card.classList.remove('cardEvent__content--active');
      });
      card.classList.toggle('cardEvent__content--active');
    };
    event.addEventListener('click', toggle);
    return () => {
      event.removeEventListener('click', toggle);
    };
  }, []);

  return (
    <div className="cardEvent" ref={eventRef}>
      <div className="cardEvent__header">
        <h3>
          {structureTime(event.event.start_time)}
        </h3>
        <div className="cardEvent__header__button">
          <ButtonEdit key={event.event.id} id={event.event.id} />
        </div>
      </div>
      <div ref={cardRef} className="cardEvent__content">
        <h3 className="cardEvent__content__title">{event.event.name}</h3>
        <p className="cardEvent__content__description">
          {event.event.description}
        </p>
      </div>
    </div>
  );
};

export default CardEvent;
