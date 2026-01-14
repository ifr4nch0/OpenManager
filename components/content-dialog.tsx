'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ContentItem, ContentStatus, Platform } from '@/types';
import { createItem } from '@/app/actions';

interface ContentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    item?: ContentItem;
}

export function ContentDialog({ isOpen, onClose, item }: ContentDialogProps) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            // Only create is implemented for now via sidebar.
            // Update logic would need dynamic action calling.
            await createItem(formData);
            onClose();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={item ? "Edit Content" : "New Content"}>
            <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input name="title" required defaultValue={item?.title} placeholder="Content title" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Platform</label>
                        <div className="relative">
                            <select name="platform" className="flex h-9 w-full appearance-none rounded-md border border-input bg-background/50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" defaultValue={item?.platform || 'YouTube'}>
                                <option value="YouTube">YouTube</option>
                                <option value="Short">Short</option>
                                <option value="Reel">Reel</option>
                                <option value="Podcast">Podcast</option>
                                <option value="Email">Email</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <div className="relative">
                            <select name="status" className="flex h-9 w-full appearance-none rounded-md border border-input bg-background/50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" defaultValue={item?.status || 'Idea'}>
                                <option value="Idea">Idea</option>
                                <option value="Script">Script</option>
                                <option value="Recording">Recording</option>
                                <option value="Editing">Editing</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Type</label>
                        <Input name="type" defaultValue={item?.type || 'Video'} placeholder="e.g. Video, Post" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <Input name="date" type="date" required defaultValue={item?.targetDate ? new Date(item.targetDate).toISOString().split('T')[0] : ''} />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" name="isSponsored" id="isSponsored" defaultChecked={item?.isSponsored} className="rounded border-gray-300 bg-background/50" />
                    <label htmlFor="isSponsored" className="text-sm font-medium">Is Sponsored?</label>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Input name="notes" defaultValue={item?.notes} placeholder="Add notes..." />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Content'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
