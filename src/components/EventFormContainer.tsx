import React from 'react';
import { EventContext } from '../context/EventContext';

import AddEventForm from '../components/AddEventForm';
import UpdateEventForm from '../components/UpdateEventForm';

const EventFormContainer: React.FC = () => {
  const { isUpdate } = React.useContext(EventContext);

  return <>{isUpdate ? <UpdateEventForm /> : <AddEventForm />}</>;
};

export default EventFormContainer;
