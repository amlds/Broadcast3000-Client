import React from 'react';

import Event from '../data/event.json';

interface Props {
  id: number;
  end: string;
  image: string;
}

const getEventByTime = (time: string) => {
  return Object.values(Event).filter((event: Props) => {
    return event.end > time;
  });
};

const FocusImage: React.FC = () => {
  let Time = new Date().toISOString();
  const [time, setTime] = React.useState(Time);
  const [CommingEvent, setCommingEvent] = React.useState(getEventByTime(time));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toISOString());
    }, 10000);
    return () => clearInterval(interval);
  }, [time]);

  React.useEffect(() => {
    setCommingEvent(getEventByTime(time));
  }, [time]);

  return (
    <div className='focusImages'>
      <img className='focusImages_content' src={CommingEvent[0].image} alt='Wagon Logo'></img>
      <img className='focusImages_content' src={CommingEvent[1].image} alt='Wagon Logo'></img>
    </div>
  );
};

export default FocusImage;
