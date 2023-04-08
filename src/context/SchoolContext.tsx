import React from 'react';

import School from '../types/School';

interface ISchoolContext {
  schools: School[];
  setSchools: (schools: School[]) => void;
}

export const defaultState: ISchoolContext = {
  schools: [],
  setSchools: () => {},
};

const SchoolContext = React.createContext<ISchoolContext>({
  schools: [],
  setSchools: () => {},
});

interface ISchoolProviderProvider {
  children: React.ReactNode;
}

const SchoolProvider: React.FC<ISchoolProviderProvider> = ({ children }) => {
  const [schools, setSchools] = React.useState<School[]>([]);
  return (
    <SchoolContext.Provider value={{ schools, setSchools }}>
      {children}
    </SchoolContext.Provider>
  );
};

export { SchoolContext, SchoolProvider };
