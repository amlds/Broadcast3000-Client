import React from 'react';
import { EventContext } from '../context/EventContext';

import Event from '../types/Event';

import AddEventForm from '../components/AddEventForm';
import UpdateEventForm from '../components/UpdateEventForm';

interface Props {
  schoolId: number;
  events: Event[];
}

const EventFormContainer: React.FC<Props> = (Props) => {
  const { isUpdate } = React.useContext(EventContext);
  const { schoolId, events } = Props;

  return <>{isUpdate ? <UpdateEventForm schoolId={schoolId} events={events}/> : <AddEventForm schoolId={schoolId}/>}</>;
};

export default EventFormContainer;
