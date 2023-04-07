import React from 'react';

import EventFormContainer from './EventFormContainer';
import Settings from './Settings';
import Event from '../types/Event';
import School from '../types/School';

interface Props {
  school: School[];
  events: Event[];
}

const DashboardConfig: React.FC<Props> = (Props) => {
  const [menu, setMenu] = React.useState('Events');
  const { school, events } = Props;

  console.log(school);

  const handlClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent)
    setMenu(e.currentTarget.textContent);
  };

  React.useEffect(() => {
    const buttons = document.querySelectorAll('.nav__button');
    buttons.forEach((button) => {
      button.classList.remove('nav__button--active');
      if(button.textContent === menu) {
        button.classList.add('nav__button--active');
      }
    });
  }, [menu]);

  return (
    <section className="dashboard__config">
      <div className="container--dashboard">
        <nav>
          <button className="nav__button"
                  onClick={handlClick}>
                  Events
          </button>
          <button className="nav__button"
                  onClick={handlClick}>
                  Settings
          </button>
        </nav>
        {menu === 'Events' && <EventFormContainer School={school ? school : []} events={events ? events : []}/>}
        {menu === 'Settings' && <Settings school={school}/>}
      </div>
    </section>
  )
};

export default DashboardConfig;
