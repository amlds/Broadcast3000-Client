import React from 'react';

import displayService from '../services/displayService';
import Display from '../types/Display'
import ChallengeView from '../components/ChallengesView';

const getDisplay = (display_path: string) => {
  const display = displayService.getDisplayInfos(display_path);
  return display;
}

const DisplayView: React.FC = () => {
  const [displays, setDisplays] = React.useState<Display>();
  const [date, setDate] = React.useState<Date>(new Date());
  const messageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    getDisplay(`${window.location.pathname}/lyondisplayurl`).then((data) => {
      setDisplays(data);
      console.log(displays);
      console.log(displays.school.batches);
      console.log(displays.events)
    });
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
      messageRef.current!.innerHTML = date.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', weekday: 'long' });
    }, 50000);
    return () => clearInterval(interval);
  });

  return (
    <main className='device'>
      <section className='device__content'>
        <img className='logo' src='./images/Logo_wagon.png' alt='Wagon Logo'></img>
        <div className='device__content--text'>
          <h1>Hello wagoners !</h1>
          <p>Nous somme le <span className='text-normal' ref={messageRef}></span></p>
          <p>Ici une phase que Marina pourra changer à sa guise</p>
          <div className="align-row">
            <p>Aujourd’hui au programme :</p>
            {displays.school.batches.map((batch) => {
              console.log(batch);
              return (<ChallengeView key={batch.number} Batch={batch} />)})}
          </div>
        </div>
      </section>
      {/* <ListCard events={displays.events} /> */}
    </main>
  );
};

export default DisplayView;
