import React from 'react';

import EventFormContainer from './EventFormContainer';
import Settings from './Settings';

import School from '../types/School';
import SchoolService from '../services/SchoolService';

const getSchool = async () => {
  const school = await SchoolService.getSchool(1);
  return school;
}

const DashboardConfig: React.FC = () => {
  const [menu, setMenu] = React.useState('Events');
  const [school, setSchool] = React.useState<School>();

  React.useEffect(() => {
    getSchool().then((school) => {
      setSchool(school);
    });
  }, []);


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
        {menu === 'Events' && <EventFormContainer />}
        {menu === 'Settings' && <Settings />}
      </div>
    </section>
  )
};

export default DashboardConfig;
