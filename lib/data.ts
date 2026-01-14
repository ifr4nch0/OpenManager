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
export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const id = uuidv4();
    const now = new Date().toISOString();

    await db.execute({
        sql: `INSERT INTO users (id, email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [id, user.email, user.password || '', user.name || '', now, now]
    });

    return { id, ...user, createdAt: now, updatedAt: now };
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
    const rs = await db.execute({
        sql: 'SELECT * FROM users WHERE email = ?',
        args: [email]
    });

    if (rs.rows.length === 0) return undefined;
    return rs.rows[0] as unknown as User;
}

export async function getUserById(id: string): Promise<User | undefined> {
    const rs = await db.execute({
        sql: 'SELECT * FROM users WHERE id = ?',
        args: [id]
    });

    if (rs.rows.length === 0) return undefined;
    return rs.rows[0] as unknown as User;
}

// Content Operations
export async function getContentItems(userId: string): Promise<ContentItem[]> {
    const rs = await db.execute({
        sql: 'SELECT * FROM content_items WHERE userId = ? ORDER BY updatedAt DESC',
        args: [userId]
    });

    return rs.rows.map(row => ({
        id: row.id as string,
        title: row.title as string,
        platform: row.platform as any,
        status: row.status as any,
        type: row.type as string,
        targetDate: row.targetDate as string,
        isSponsored: Boolean(row.isSponsored),
        notes: (row.notes as string | null) || undefined,
        createdAt: row.createdAt as string,
        updatedAt: row.updatedAt as string,
        userId: row.userId as string
    }));
}

export async function createContentItem(item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<ContentItem> {
    const id = uuidv4();
    const now = new Date().toISOString();

    await db.execute({
        sql: `INSERT INTO content_items (id, title, platform, status, type, targetDate, isSponsored, notes, createdAt, updatedAt, userId)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
            id,
            item.title,
            item.platform,
            item.status,
            item.type,
            item.targetDate,
            item.isSponsored ? 1 : 0,
            item.notes || null,
            now,
            now,
            userId
        ]
    });

    return { id, ...item, createdAt: now, updatedAt: now };
}

export async function updateContentItem(id: string, userId: string, item: Partial<ContentItem>): Promise<void> {
    const fields = [];
    const args = [];

    if (item.title !== undefined) { fields.push('title = ?'); args.push(item.title); }
    if (item.platform !== undefined) { fields.push('platform = ?'); args.push(item.platform); }
    if (item.status !== undefined) { fields.push('status = ?'); args.push(item.status); }
    if (item.type !== undefined) { fields.push('type = ?'); args.push(item.type); }
    if (item.targetDate !== undefined) { fields.push('targetDate = ?'); args.push(item.targetDate); }
    if (item.isSponsored !== undefined) { fields.push('isSponsored = ?'); args.push(item.isSponsored ? 1 : 0); }
    if (item.notes !== undefined) { fields.push('notes = ?'); args.push(item.notes); }

    fields.push('updatedAt = ?');
    args.push(new Date().toISOString());

    args.push(id);
    args.push(userId);

    await db.execute({
        sql: `UPDATE content_items SET ${fields.join(', ')} WHERE id = ? AND userId = ?`,
        args: args
    });
}

export async function deleteContentItem(id: string, userId: string): Promise<void> {
    await db.execute({
        sql: 'DELETE FROM content_items WHERE id = ? AND userId = ?',
        args: [id, userId]
    });
}
