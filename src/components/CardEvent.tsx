import React from "react";

import ButtonEdit from "./ButtonEdit";
import Edit from "./svg/Edit";
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
    return `${date.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric' })} à ${date.toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' })}`;
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
          {structureTime(event.event.startEvent)}
        </h3>
        <div className="cardEvent__header__button">
          <button className="button--edit cardEvent__content__buttonEdit"><Edit /> Edit</button>
          <ButtonEdit key={id} id={id} />
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
