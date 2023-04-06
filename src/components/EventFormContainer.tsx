import React from 'react';
import { EventContext } from '../context/EventContext';

import Event from '../types/Event';
import School from '../types/School';

import AddEventForm from '../components/AddEventForm';
import UpdateEventForm from '../components/UpdateEventForm';

interface Props {
  School: School[];
  events: Event[];
}

const EventFormContainer: React.FC<Props> = (Props) => {
  const { isUpdate } = React.useContext(EventContext);
  const { School, events } = Props;
  const schoolId = School[0].id;

  return <>{isUpdate ? <UpdateEventForm schoolId={schoolId ? schoolId : 0} events={events}/> : <AddEventForm schoolId={schoolId ? schoolId : 0}/>}</>;
};

export default EventFormContainer;
