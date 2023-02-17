import React from 'react';

import EventsConfig from './EventsConfig';
import Settings from './Settings';


const DashboardConfig: React.FC = () => {
  const [menu, setMenu] = React.useState('Events');

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
        {menu === 'Events' && <EventsConfig />}
        {menu === 'Settings' && <Settings />}
      </div>
    </section>
  )
};

export default DashboardConfig;
