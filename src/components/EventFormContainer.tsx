import React from 'react';
import { EventContext } from '../context/EventContext';

import AddEventForm from '../components/AddEventForm';
import UpdateEventForm from '../components/UpdateEventForm';

const EventFormContainer: React.FC = () => {
  const { isUpdate } = React.useContext(EventContext);

  React.useEffect(() => {
    console.log('isUpdate changed:', isUpdate);
  }, [isUpdate]);

  return <>{isUpdate ? <UpdateEventForm /> : <AddEventForm />}</>;
};

export default EventFormContainer;
