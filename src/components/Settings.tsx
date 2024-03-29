import React from 'react';
import  Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import Batch from '../types/Batch';
import School from '../types/School';
import BatchSettings from './BatchSettings';

import SchoolService from '../services/SchoolService';

interface Props {
  school: School[];
  batch: Batch[];
}

const Settings: React.FC<Props> = (Props) => {
  const token = Cookies.get('token');
  const [school, setSchool] = React.useState<School>();
  const [nbrCarrousel, setNbrCarrousel] = React.useState<number>(0);
  const [message_display, setMessage_display] = React.useState<string>('');
  const navigate = useNavigate();


  const handleClick = () => {
    Cookies.remove('token');
    navigate('/login');
  }

  React.useEffect(() => {
    setSchool(Props.school[0]);
    if(school) {
      setNbrCarrousel(school.nbr_carrousel);
      setMessage_display(school.message_display);
    }
  }, [Props.school, school]);

  const onOptionChange = (e: { target: { value: string; }; }) => {
    setNbrCarrousel(parseInt(e.target.value))
  }

  const updateSchool = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nbrCarrousel = e.currentTarget.number.value;
    const message_display = e.currentTarget.message.value;
    const schoolToCreate = {
      nbr_carrousel: nbrCarrousel,
      message_display: message_display
    };
    const res = await SchoolService.updateSchool(schoolToCreate, school!.id, token);
    if (res) {
      setSchool(res);
    }
  }

  return (
    <section className='settings'>
      <BatchSettings school={Props.school} batch={Props.batch}/>
      <div className='settings__carrousel'>
        <h3>Display infos</h3>
        <div className="extra">
          <form onSubmit={updateSchool}>
            <label>Extra info sentence
              <input className='input--txt' type="text" name="message" value={message_display} onChange={(e) => setMessage_display(e.target.value)} />
            </label>
            <label>Number of images</label>
            <ul className='settings__carrousel__radio'>
              <li className="checkbox"><label  htmlFor='1'>1</label><input type="radio" name="number" value="1" checked={nbrCarrousel === 1} onChange={onOptionChange} /></li>
              <li className="checkbox"><label  htmlFor='1'>2</label><input type="radio" name="number" value="2" checked={nbrCarrousel === 2} onChange={onOptionChange} /></li>
              <li className="checkbox"><label  htmlFor='1'>3</label><input type="radio" name="number" value="3" checked={nbrCarrousel === 3} onChange={onOptionChange} /></li>
              <li className="checkbox"><label  htmlFor='1'>4</label><input type="radio" name="number" value="4" checked={nbrCarrousel === 4} onChange={onOptionChange} /></li>
              <li className="checkbox"><label  htmlFor='1'>5</label><input type="radio" name="number" value="5" checked={nbrCarrousel === 5} onChange={onOptionChange} /></li>
            </ul>
            <input type="submit" className='button--secondary' value="Save" />
          </form>
        </div>
      </div>
      <div className="settings__sadBad">
        <button className="button--secondary">You’re sad ? Click here !</button>
        <button className='button--secondary button--secondary--red' onClick={handleClick}>
          Log out !
          <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.75 7V3.25C11.75 2.65326 11.5129 2.08097 11.091 1.65901C10.669 1.23705 10.0967 1 9.5 1H3.5C2.90326 1 2.33097 1.23705 1.90901 1.65901C1.48705 2.08097 1.25 2.65326 1.25 3.25V16.75C1.25 17.3467 1.48705 17.919 1.90901 18.341C2.33097 18.7629 2.90326 19 3.5 19H9.5C10.0967 19 10.669 18.7629 11.091 18.341C11.5129 17.919 11.75 17.3467 11.75 16.75V13M8 7L5 10M5 10L8 13M5 10H17.75" stroke="#E60F05" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Settings;
