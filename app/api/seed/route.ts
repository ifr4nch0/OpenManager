import { NextResponse } from 'next/server';
import { saveContentItems } from '@/lib/storage';
import { ContentItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export async function POST() {
    const seedData: ContentItem[] = [
        {
            id: '1',
            title: 'Next.js 14 Tutorial for Beginners',
            platform: 'YouTube',
            status: 'Published',
            type: 'Video',
            targetDate: new Date().toISOString(),
            isSponsored: false,
            notes: 'Cover App Router and Server Actions',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: '2',
            title: 'Top 5 VS Code Extensions 2024',
            platform: 'Short',
            status: 'Editing',
            type: 'Video',
            targetDate: new Date(Date.now() + 86400000).toISOString(),
            isSponsored: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: '3',
            title: 'Weekly Newsletter #42',
            platform: 'Email',
            status: 'Script',
            type: 'Post',
            targetDate: new Date(Date.now() + 172800000).toISOString(),
            isSponsored: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: '4',
            title: 'React vs Vue 2025',
            platform: 'YouTube',
            status: 'Idea',
            type: 'Video',
            targetDate: new Date(Date.now() + 604800000).toISOString(),
            isSponsored: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    await saveContentItems(seedData);

    return NextResponse.json({ message: 'Database seeded successfully', count: seedData.length });
}
