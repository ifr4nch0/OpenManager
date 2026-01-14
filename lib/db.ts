import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'openmanager.db');
console.log('Opening database at:', dbPath);

export const db = new Database(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');

// Initialize Schema
function initDb() {
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

  db.exec(userTable);
  db.exec(contentTable);
}

initDb();
