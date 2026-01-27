import React, { createContext, useContext } from 'react';
import { useNeonDataStore, AppData } from '../hooks/useNeonDataStore';
import { Model, CastingApplication } from '../../types';

interface NeonDataContextType {
  data: AppData | null;
  saveData: (newData: AppData) => Promise<void>;
  isInitialized: boolean;
  error: string | null;
  saveModel: (model: Model) => Promise<void>;
  saveCastingApplication: (app: CastingApplication) => Promise<void>;
  refetch: () => Promise<void>;
}

const NeonDataContext = createContext<NeonDataContextType | null>(null);

export const NeonDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useNeonDataStore();
  return <NeonDataContext.Provider value={store}>{children}</NeonDataContext.Provider>;
};

export const useNeonData = (): NeonDataContextType => {
  const context = useContext(NeonDataContext);
  if (!context) {
    throw new Error('useNeonData must be used within a NeonDataProvider');
  }
  return context;
};

// Re-export for backward compatibility
export const useData = useNeonData;
export const DataProvider = NeonDataProvider;
