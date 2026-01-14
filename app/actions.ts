'use server';

import { createContentItem, updateContentItem, deleteContentItem } from '@/lib/data';
import { ContentItem, ContentStatus, Platform } from '@/types';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getAuthenticatedUser() {
    const session = await getSession();
    if (!session) {
        throw new Error('Unauthorized');
    }
    return session;
}

export async function createItem(formData: FormData) {
    const session = await getAuthenticatedUser();

    const title = formData.get('title') as string;
    const platform = formData.get('platform') as Platform;
    const status = formData.get('status') as ContentStatus;
    const type = formData.get('type') as string;
    const date = formData.get('date') as string;
    const isSponsored = formData.get('isSponsored') === 'on';
    const notes = formData.get('notes') as string;

    await createContentItem({
        title,
        platform,
        status,
        type,
        targetDate: new Date(date).toISOString(),
        isSponsored,
        notes,
    }, session.userId);

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/kanban');
    revalidatePath('/dashboard/calendar');
}

export async function updateItemAction(id: string, formData: FormData) {
    const session = await getAuthenticatedUser();

    const title = formData.get('title') as string;
    const platform = formData.get('platform') as Platform;
    const status = formData.get('status') as ContentStatus;
    const type = formData.get('type') as string;
    const date = formData.get('date') as string;
    const isSponsored = formData.get('isSponsored') === 'on';
    const notes = formData.get('notes') as string;

    await updateContentItem(id, session.userId, {
        title,
        platform,
        status,
        type,
        targetDate: new Date(date).toISOString(),
        isSponsored,
        notes,
    });

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/kanban');
    revalidatePath('/dashboard/calendar');
}
