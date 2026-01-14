import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL || 'file:openmanager.db';
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log('Connecting to database at:', url);

export const db = createClient({
  url,
  authToken,
});

// Helper to initialize schema since LibSQL doesn't verify on connect same way
export async function initDb() {
  const userTable = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `;

  const contentTable = `
    CREATE TABLE IF NOT EXISTS content_items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      platform TEXT NOT NULL,
      status TEXT NOT NULL,
      type TEXT NOT NULL,
      targetDate TEXT NOT NULL,
      isSponsored INTEGER DEFAULT 0,
      notes TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      userId TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  await db.execute(userTable);
  await db.execute(contentTable);
}

// Auto-run init in dev/build (careful in serverless, better to call explicitly or check existence)
// For simplicity in this app, we'll run it on import but catch errors if it fails strictly.
initDb().catch(console.error);
