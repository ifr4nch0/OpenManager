import fs from 'fs/promises';
import path from 'path';
import { ContentItem } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'content.json');

// Ensure data directory exists
async function ensureDb() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }

    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.writeFile(DB_PATH, JSON.stringify([], null, 2));
    }
}

export async function getContentItems(): Promise<ContentItem[]> {
    await ensureDb();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export async function saveContentItems(items: ContentItem[]): Promise<void> {
    await ensureDb();
    await fs.writeFile(DB_PATH, JSON.stringify(items, null, 2));
}

export async function addContentItem(item: ContentItem): Promise<ContentItem> {
    const items = await getContentItems();
    items.push(item);
    await saveContentItems(items);
    return item;
}

export async function updateContentItem(updatedItem: ContentItem): Promise<ContentItem> {
    const items = await getContentItems();
    const index = items.findIndex((i) => i.id === updatedItem.id);
    if (index !== -1) {
        items[index] = updatedItem;
        await saveContentItems(items);
        return updatedItem;
    }
    throw new Error('Item not found');
}

export async function deleteContentItem(id: string): Promise<void> {
    let items = await getContentItems();
    items = items.filter((i) => i.id !== id);
    await saveContentItems(items);
}
