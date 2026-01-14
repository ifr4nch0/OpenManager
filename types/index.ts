export type ContentStatus = 'Idea' | 'Script' | 'Recording' | 'Editing' | 'Scheduled' | 'Published';

export type Platform = 'YouTube' | 'Short' | 'Reel' | 'Podcast' | 'Email' | 'Other';

export interface ContentItem {
    id: string;
    title: string;
    platform: Platform;
    status: ContentStatus;
    type: string;
    targetDate: string; // ISO date string
    isSponsored: boolean;
    notes?: string;
    links?: string;
    createdAt: string;
    updatedAt: string;
}
