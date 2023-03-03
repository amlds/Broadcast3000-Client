import React, { useContext } from "react";

import ButtonEdit from "./ButtonEdit";
import event from "../types/Event";
import { useParams } from "react-router-dom";
import EventTypeStyle from "./EventTypeStyle";
import { EventContext } from "../context/EventContext";

type props = {
  event: event;
};

const CardEvent: React.FC<props> = (event: props) => {
  const eventRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const { eventIdUpdate } = useContext(EventContext);

  const structureTime = (time: string) => {
    const date = new Date(time);
    return `${date.toLocaleDateString('fr-FR', {year:'numeric', month: 'long', day: 'numeric' })} à ${date.toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' })}`;
  };

  React.useEffect(() => {
    if (eventRef.current && cardRef.current) {
      if (event.event.id === eventIdUpdate) {
        cardRef.current.classList.add("cardEvent__content--active");
      } else {
        cardRef.current.classList.remove("cardEvent__content--active");
      }
    }
  }, [event.event.id, eventIdUpdate]);

  return (
    <div key={event.event.id} className="cardEvent cardEvent" ref={eventRef}>
      <div className="cardEvent__header">
        <h3>
          {structureTime(event.event.start_time)}
        </h3>
        <div className="cardEvent__header__button">
          <EventTypeStyle event_type_id={event.event.event_type_id} />
          <ButtonEdit id={event.event.id} />
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
