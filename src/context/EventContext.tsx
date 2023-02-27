import React from 'react';

interface IEventContext {
  eventIdUpdate: number;
  setId: (id: number) => void;
  isUpdate: boolean;
  toggleUpdate: () => void;
}

export const defaultState: IEventContext = {
  eventIdUpdate: 0,
  isUpdate: false,
  setId: (id: number) => {},
  toggleUpdate: () => {},
};

const EventContext = React.createContext<IEventContext>(defaultState);

interface IEventProviderProps {
  children: React.ReactNode;
}

const EventProvider: React.FC<IEventProviderProps> = ({ children }) => {
  const [eventIdUpdate, setEventIdUpdate] = React.useState(defaultState.eventIdUpdate);
  const [isUpdate, setIsUpdate] = React.useState(defaultState.isUpdate);

  const setId = (id: number) => {
    setEventIdUpdate(id);
  };

  const toggleUpdate = () => {
    setIsUpdate((prevState) => !prevState);
  };

  const eventContextValue = {
    eventIdUpdate,
    setId,
    isUpdate,
    toggleUpdate,
  };

  return <EventContext.Provider value={eventContextValue}>{children}</EventContext.Provider>;
};

export { EventContext, EventProvider };
