import React from 'react';
import { useNavigate } from 'react-router-dom'
import { EventProvider } from '../../context/EventContext';
import jwt_decode from 'jwt-decode';

import EventService from '../../services/EventService';
import Event from '../../types/Event';
import DashboardInfos from '../../types/DashboardInfos';
import school from '../../types/School';
import dashboardService from '../../services/dashboardSerivce';

import '../../assets/views/dashboard.scss';

import { TokenContext } from '../../context/TokenContext';
import DashboardConfig from '../../components/DashboardConfig';
import ListCard from '../../components/ListCard';
import LinkDevice from '../../components/LinkDevice';

const decodeToken = (token: string) => {
  const decoded = jwt_decode(token);
  return decoded;
}

const getDashboardInfos = async (schoolInfos: school, token: string) => {
  const dashboardInfos = await dashboardService.getDashInfos(schoolInfos, token);
  return dashboardInfos;
}


const Dashboard: React.FC = () => {
  const { token , setToken } = React.useContext(TokenContext);
  const [dashboardInfos, setDashboardInfos] = React.useState<DashboardInfos | any>();
  const [schoolInfos, setSchoolInfos] = React.useState<any>([]);
  const navigate = useNavigate();
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    if(!token.token) navigate('/login');
    else {
      const decoded = decodeToken(token.token);
      setSchoolInfos((decoded as any).schools[0]);
      console.log(schoolInfos);
      getDashboardInfos(schoolInfos, token.token).then((data) => {
        setDashboardInfos(data);
      });
    }
  }, [token]);

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
                <LinkDevice displayPath={schoolInfos.display_path}/>
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
