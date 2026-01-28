// Main Data Context - Switching to Supabase for Realtime support
export { SupabaseDataProvider as DataProvider, useSupabaseData as useData } from './SupabaseDataContext';
export type { AppData } from '../hooks/useSupabaseDataStore';