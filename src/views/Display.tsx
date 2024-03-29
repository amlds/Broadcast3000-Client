import React from 'react';
import '../assets/views/display.scss'

import displayService from '../services/displayService';
import Batch from '../types/Batch'
import Event from '../types/Event'

import ChallengeView from '../components/ChallengesView';
import ListCard from '../components/ListCard';
import ImageDisplay from '../components/ImageDisplay';

const getDisplay = (display_path: string) => {
  const display = displayService.getDisplayInfos(display_path);
  return display;
}

const DisplayView: React.FC = () => {
  const [batch, setBatch] = React.useState<Batch[]>();
  const [events, setEvents] = React.useState<Event[]>();
  const [message_display, setMessage_display] = React.useState<string>('');
  const [date, setDate] = React.useState<Date>(new Date());
  const [carrousel, setCarrousel] = React.useState<number>(1);
  const messageRef = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchDisplay = async () => {
      try {
        const data = await getDisplay(`${window.location.pathname}`);
        setBatch(data.school.batches);
        setEvents(data.events);
        setMessage_display(data.school.message_display);
        setCarrousel(data.school.nbr_carrousel);
        setLoading(false);
        console.log(data);
      } catch (error) {
        window.location.href = '/not-found';
      }
    };
    fetchDisplay();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
      messageRef.current!.innerHTML = date.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', weekday: 'long' });
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <main className='device'>
    {loading ? (
      <div className="loader">
          <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <p>loading</p>
      </div>
    ) : (
      <>
        <section className='device__content'>
          <img className='logo' src='../../images/Logo_wagon.png' alt='Wagon Logo'></img>
          <div className='device__content--text'>
            <h1>Hello wagoners !</h1>
            <p>Nous somme le <span className='text-normal' ref={messageRef}></span></p>
            <p>{message_display}</p>
              {
                batch?.map((Batch) => {
                  if(!Batch.challenge){
                    return (
                      <div className="align-row">
                        <p>C'est le week end ! Bon lait à vous !</p>
                      </div>
                    )
                  }else {
                    return (
                      <div className="align-row">
                        <p>Aujourd’hui au programme :</p>
                        <ChallengeView Batch={Batch} />
                      </div>
                    )
                  }
                })
              }
            <div className="carrousel">
              <ImageDisplay carrousel={carrousel} events={events ? events : []}/>
            </div>
          </div>
        </section>
        <ListCard events={events ? events : []} />
      </>
    )}
    </main>
  );
};

export default DisplayView;
