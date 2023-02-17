import React from 'react';

interface IEventContext {
  eventIdUpdate: number;
  isUpdate: boolean;
  toggleUpdate: () => void;
}

export const defaultState = {
  eventIdUpdate: 0,
  isUpdate: false,
};

const EventContext = React.createContext(defaultState as unknown as IEventContext);

export default EventContext;
