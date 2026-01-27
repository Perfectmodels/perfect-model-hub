import { neon } from '@neondatabase/serverless';

// Neon PostgreSQL connection
const DATABASE_URL = 'postgresql://neondb_owner:npg_5sIOgfn4pKWX@ep-old-glade-ahcud42w-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

export const sql = neon(DATABASE_URL);

// Helper function for executing queries
export async function query<T = unknown>(queryString: string, params?: unknown[]): Promise<T[]> {
  try {
    const result = await sql(queryString, params);
    return result as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Helper for single row queries
export async function queryOne<T = unknown>(queryString: string, params?: unknown[]): Promise<T | null> {
  const results = await query<T>(queryString, params);
  return results.length > 0 ? results[0] : null;
}

// Helper for insert/update operations
export async function execute(queryString: string, params?: unknown[]): Promise<void> {
  try {
    await sql(queryString, params);
  } catch (error) {
    console.error('Database execute error:', error);
    throw error;
  }
}

export default sql;
