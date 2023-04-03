import React from 'react';
import { useNavigate } from 'react-router-dom'
import { EventProvider } from '../../context/EventContext';

import EventService from '../../services/EventService';
import Event from '../../types/Event';

import '../../assets/views/dashboard.scss';

import { TokenContext } from '../../context/TokenContext';
import DashboardConfig from '../../components/DashboardConfig';
import ListCard from '../../components/ListCard';
import LinkDevice from '../../components/LinkDevice';

const getEvents = async () => {
  const events = await EventService.getEvents(1);
  return events;
}

const Dashboard: React.FC = () => {
  const { token , setToken } = React.useContext(TokenContext);
  const navigate = useNavigate();
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    if (token === '' || token.error) {
      console.log("can't you go hear");
      navigate('/')
    }
  }, [token, navigate])

  React.useEffect(() => {
    getEvents().then((events) => {
      const sortedEvents = events.sort((a, b) => {
        return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
      });
      const filteredEvents = sortedEvents.filter((event) => {
        return new Date(event.start_time).getTime() > new Date().getTime();
      });
      setEvents(filteredEvents);
    });
  }, []);

  const handleClick = () => {
    setToken('');
  }

  return (
    <main className='dashboard'>
      <EventProvider>
        <section className='dashboard__content'>
          <header>
            <div className="container--dashboard">
              <div className="align-row">
                <img className='logo' src='./images/Logo_wagon_white.png' alt='Wagon Logo'></img>
                <button className='button--primary' onClick={handleClick}>Disconnect</button>
              </div>
              <div className='header__txt'>
                <h2>Hello Marina !</h2>
                <LinkDevice/>
              </div>
            </div>
          </header>
          <DashboardConfig />
        </section>
        <ListCard events={events} />
      </EventProvider>
    </main>
  );
};

export default Dashboard;
