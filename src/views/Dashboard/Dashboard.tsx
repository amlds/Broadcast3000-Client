import React from 'react';
import { useNavigate } from 'react-router-dom'
import { EventProvider } from '../../context/EventContext';
import jwt_decode from 'jwt-decode';

import EventService from '../../services/EventService';
import Event from '../../types/Event';
import DashboardInfos from '../../types/DashboardInfos';
import dashboardService from '../../services/dashboardSerivce';

import '../../assets/views/dashboard.scss';

import { TokenContext } from '../../context/TokenContext';
import DashboardConfig from '../../components/DashboardConfig';
import ListCard from '../../components/ListCard';
import LinkDevice from '../../components/LinkDevice';

const getEvents = async () => {
  const events = await EventService.getEvents(1);
  return events;
}

const decodeToken = (token: string) => {
  const decoded = jwt_decode(token);
  return decoded;
}

const getDashboardInfos = async (token: string) => {
  const dashboardInfos = await dashboardService.getDashboardInfos(token);
  return dashboardInfos;
}


const Dashboard: React.FC = () => {
  const { token , setToken } = React.useContext(TokenContext);
  const [dashboardInfos, setDashboardInfos] = React.useState<DashboardInfos | any>();
  const navigate = useNavigate();
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    if(!token.token) navigate('/login');
    else {
      getDashboardInfos(token.token).then((data) => {
        setDashboardInfos(data);
      });
      console.log(dashboardInfos);
    }
  }, [token]);

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
    navigate('/login');
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
