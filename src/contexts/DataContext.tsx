// Main Data Context - Now using Neon PostgreSQL
// Re-export from NeonDataContext for backward compatibility
export { NeonDataProvider as DataProvider, useNeonData as useData } from './NeonDataContext';
export type { AppData } from '../hooks/useNeonDataStore';