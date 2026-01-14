import { db } from '@/lib/db';
import { ContentItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export interface User {
    id: string;
    email: string;
    password?: string;
    name?: string;
    createdAt: string;
    updatedAt: string;
}

// User Operations
export function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const id = uuidv4();
    const now = new Date().toISOString();
    const stmt = db.prepare(`
    INSERT INTO users (id, email, password, name, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
    stmt.run(id, user.email, user.password, user.name, now, now);
    return { id, ...user, createdAt: now, updatedAt: now };
}

export function getUserByEmail(email: string): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
}

export function getUserById(id: string): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | undefined;
}

// Content Operations
export function getContentItems(userId: string): ContentItem[] {
    const stmt = db.prepare('SELECT * FROM content_items WHERE userId = ? ORDER BY updatedAt DESC');
    const rows = stmt.all(userId) as any[];
    return rows.map(row => ({
        ...row,
        isSponsored: Boolean(row.isSponsored)
    }));
}

export function createContentItem(item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>, userId: string): ContentItem {
    const id = uuidv4();
    const now = new Date().toISOString();
    const stmt = db.prepare(`
    INSERT INTO content_items (id, title, platform, status, type, targetDate, isSponsored, notes, createdAt, updatedAt, userId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    stmt.run(
        id,
        item.title,
        item.platform,
        item.status,
        item.type,
        item.targetDate,
        item.isSponsored ? 1 : 0,
        item.notes,
        now,
        now,
        userId
    );

    return { id, ...item, createdAt: now, updatedAt: now };
}

export function updateContentItem(id: string, userId: string, item: Partial<ContentItem>): void {
    const fields = [];
    const values = [];

    if (item.title !== undefined) { fields.push('title = ?'); values.push(item.title); }
    if (item.platform !== undefined) { fields.push('platform = ?'); values.push(item.platform); }
    if (item.status !== undefined) { fields.push('status = ?'); values.push(item.status); }
    if (item.type !== undefined) { fields.push('type = ?'); values.push(item.type); }
    if (item.targetDate !== undefined) { fields.push('targetDate = ?'); values.push(item.targetDate); }
    if (item.isSponsored !== undefined) { fields.push('isSponsored = ?'); values.push(item.isSponsored ? 1 : 0); }
    if (item.notes !== undefined) { fields.push('notes = ?'); values.push(item.notes); }

    fields.push('updatedAt = ?');
    values.push(new Date().toISOString());

    values.push(id);
    values.push(userId);

    const stmt = db.prepare(`UPDATE content_items SET ${fields.join(', ')} WHERE id = ? AND userId = ?`);
    stmt.run(...values);
}

export function deleteContentItem(id: string, userId: string): void {
    const stmt = db.prepare('DELETE FROM content_items WHERE id = ? AND userId = ?');
    stmt.run(id, userId);
}
