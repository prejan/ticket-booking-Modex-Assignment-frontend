import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchJSON } from '../api/client';

type Show = {
  id: number;
  name: string;
  start_time: string;
  total_seats: number;
};

type ShowContextType = {
  shows: Show[];
  reload: () => Promise<void>;
};

const ShowContext = createContext<ShowContextType | undefined>(undefined);

export const ShowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shows, setShows] = useState<Show[]>([]);

  const load = async () => {
    const data = await fetchJSON('/shows');
    setShows(data);
  };


  useEffect(() => {
    load().catch(console.error);
  }, []);

  return (
    <ShowContext.Provider value={{ shows, reload: load }}>
      {children}
    </ShowContext.Provider>
  );
};

export const useShows = () => {
  const ctx = useContext(ShowContext);
  if (!ctx) throw new Error('useShows must be used within ShowProvider');
  return ctx;
};
