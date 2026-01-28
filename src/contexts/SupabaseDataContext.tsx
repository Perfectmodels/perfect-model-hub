import React, { createContext, useContext } from 'react';
import { useSupabaseDataStore, AppData } from '../hooks/useSupabaseDataStore';
import { Model, CastingApplication } from '../../types';

interface SupabaseDataContextType {
  data: AppData | null;
  saveData: (newData: AppData) => Promise<void>;
  isInitialized: boolean;
  error: string | null;
  saveModel: (model: Model) => Promise<void>;
  saveCastingApplication: (app: CastingApplication) => Promise<void>;
  refetch: () => Promise<void>;
}

const SupabaseDataContext = createContext<SupabaseDataContextType | null>(null);

export const SupabaseDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useSupabaseDataStore();
  return <SupabaseDataContext.Provider value={store}>{children}</SupabaseDataContext.Provider>;
};

export const useSupabaseData = (): SupabaseDataContextType => {
  const context = useContext(SupabaseDataContext);
  if (!context) {
    throw new Error('useSupabaseData must be used within a SupabaseDataProvider');
  }
  return context;
};
