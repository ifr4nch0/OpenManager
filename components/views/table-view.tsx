'use client';

import { ContentItem, ContentStatus, Platform } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, FileText, Video, Mic, Mail, Calendar as CalendarIcon, Youtube, Instagram, Twitter } from 'lucide-react';
import { format } from 'date-fns';

interface TableViewProps {
    items: ContentItem[];
}

const platformIcons: Record<string, React.ReactNode> = {
    YouTube: <Youtube className="w-4 h-4 text-red-500" />,
    Short: <Youtube className="w-4 h-4 text-red-500" />, // Using YouTube for Shorts
    Reel: <Instagram className="w-4 h-4 text-pink-500" />,
    Podcast: <Mic className="w-4 h-4 text-purple-500" />,
    Email: <Mail className="w-4 h-4 text-blue-500" />,
    Other: <FileText className="w-4 h-4 text-gray-500" />,
};

export function TableView({ items }: TableViewProps) {
    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                    <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Platform</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Sponsored</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-muted/20 transition-colors group">
                            <td className="px-6 py-4 font-medium text-foreground">
                                <div className="flex flex-col">
                                    <span>{item.title}</span>
                                    {item.notes && (
                                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">{item.notes}</span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    {platformIcons[item.platform]}
                                    <span>{item.platform}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <Badge variant={item.status.toLowerCase() as any}>
                                    {item.status}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 text-muted-foreground">{item.type}</td>
                            <td className="px-6 py-4 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-3 h-3" />
                                    {format(new Date(item.targetDate), 'MMM d, yyyy')}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {item.isSponsored ? (
                                    <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
                                        Sponsored
                                    </Badge>
                                ) : (
                                    <span className="text-muted-foreground">-</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
