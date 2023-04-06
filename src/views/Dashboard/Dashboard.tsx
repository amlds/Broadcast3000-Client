import React from 'react';
import { useNavigate } from 'react-router-dom'
import { EventProvider } from '../../context/EventContext';
import jwt_decode from 'jwt-decode';

import '../../assets/views/dashboard.scss';

import displayService from '../../services/displayService';
import Event from '../../types/Event';
import school from '../../types/School';
import Batch from '../../types/Batch'

import { TokenContext } from '../../context/TokenContext';
import ListCard from '../../components/ListCard';
import LinkDevice from '../../components/LinkDevice';
import DashboardConfig from '../../components/DashboardConfig';

const decodeToken = (token: string) => {
  const decoded = jwt_decode(token);
  return decoded;
}

const getDisplay = (display_path: string) => {
  const display = displayService.getDisplayInfos(display_path);
  return display;
}

interface decoded {
  schools: [{
    id: number,
    city_id: number,
    batches: Batch[],
    display_path: string,
    message_display: string,
    nbr_carrousel: number,
    created_at: string,
    updated_at: string
  }]
}


const Dashboard: React.FC = () => {
  const { token , setToken } = React.useContext(TokenContext);
  const [school, setSchool] = React.useState<school[]>();
  const [events, setEvents] = React.useState<Event[]>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [display_path, setDisplayPath] = React.useState<string>('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if(!token.token) navigate('/login');
    else {
      const decoded = decodeToken(token.token) as decoded;
      setDisplayPath(decoded.schools[0].display_path);
      setSchool(decoded.schools);
      const fetchDisplay = async () => {
        setTimeout(async () => {
          try {
            const data = await getDisplay(`/display/${display_path}`);
            setEvents(data.events);
            setLoading(false);
          } catch (error) {
            window.location.href = '/not-found';
          }
        }, 2000);
      };
      fetchDisplay();
    }
  }, [display_path, navigate, token]);

  const handleClick = () => {
    setToken('');
    navigate('/login');
  }

  return (
    <main className='dashboard'>
      { loading ? (
        <div className="loader">
          <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          <p>loading</p>
        </div>
      ) : (
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
                  <LinkDevice displayPath={display_path}/>
                </div>
              </div>
            </header>
            <DashboardConfig school={school ? school : []} events={events ? events : []}/>
          </section>
          <ListCard events={events ? events : []}/>
        </EventProvider>
      )}
    </main>
  );
};

export default Dashboard;
