import React from 'react';
import { useNavigate } from 'react-router-dom'
import { EventProvider } from '../../context/EventContext';
import jwt_decode from 'jwt-decode';
import  Cookies from 'js-cookie';

import '../../assets/views/dashboard.scss';

import displayService from '../../services/displayService';
import Event from '../../types/Event';
import school from '../../types/School';
import Batch from '../../types/Batch'

import ListCard from '../../components/ListCard';
import LinkDevice from '../../components/LinkDevice';
import DashboardConfig from '../../components/DashboardConfig';


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
  const [ cookieToken ] = React.useState(Cookies.get('token'));
  const [school, setSchool] = React.useState<school[]>();
  const [events, setEvents] = React.useState<Event[]>();
  const [batch, setBatch] = React.useState<Batch[]>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [display_path, setDisplayPath] = React.useState<string>('');
  const navigate = useNavigate();

  const decodeToken = (token: string) => {
    const decoded = jwt_decode(token) as decoded;
    console.log(decoded);
    return decoded;
  }

  // // Callback function to fetch display infos
  const fetchDisplay = async (display_path: string) =>{
     try {
      const data = await getDisplay(`/display/${display_path}`);
       setBatch(data.school.batches);
       console.log(data.school.batches);
       setEvents(data.events);
       setLoading(false);
     } catch (error) {
       window.location.href = '/not-found';
     }
   }

  React.useEffect(() => {
    if (cookieToken === undefined || cookieToken === '' || cookieToken === null) {
      navigate('/login');
    } else {
      const decoded = decodeToken(cookieToken) as decoded;
      setDisplayPath(decoded.schools[0].display_path);
      setSchool(decoded.schools);
      setTimeout(() => {
        fetchDisplay(decoded.schools[0].display_path);
      }, 500);
    }
  }, [display_path, navigate, cookieToken]);

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
                <img className='logo' src='./images/Logo_wagon_white.png' alt='Wagon Logo'></img>
                <div className='header__txt'>
                  <h2>Hello Marina !</h2>
                  <LinkDevice displayPath={display_path}/>
                </div>
              </div>
            </header>
            <DashboardConfig
              school={school ? school : []}
              events={events ? events : []}
              batch= {batch ? batch : []}
            />
          </section>
          <ListCard events={events ? events : []}/>
        </EventProvider>
      )}
    </main>
  );
};

export default Dashboard;
