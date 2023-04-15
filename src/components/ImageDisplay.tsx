import React from 'react';

import Event from '../types/Event';

interface Props {
  carrousel: number;
  events: Event[];
}

const ImageDisplay: React.FC<Props> = (Props) => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [image, setImage] = React.useState<string[]>([]);
  const [carrousel, setCarrousel] = React.useState<number>(0);
  const timingAnimation = carrousel * 8;
  const divStyle = {
    animation: `slide${carrousel} ${timingAnimation}s infinite alternate ease-in-out`,
  };

  React.useEffect(() => {
    setEvents(Props.events);
    setCarrousel(Props.carrousel);
  }, [Props.events, Props.carrousel, events, carrousel]);

  React.useEffect(() => {
    const imageArray: string[] = [];
    events.forEach((event, index) => {
      if(index < carrousel){
        imageArray.push(event.photo_url);
      } else {
        return null;
      }
    });
    setImage(imageArray);
  }, [carrousel, events]);

  return (
    <div className='wrapper' style={divStyle}>
      {
        image.map((img, index) => {
          return (
            <>
              <img
                src={img}
                key={index}
                alt="Affiche de l'évenement affiché"
              />
            </>

          );
        })
      }
    </div>
  );
};

export default ImageDisplay;
