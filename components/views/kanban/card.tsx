'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ContentItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Calendar, Youtube, Instagram, Twitter, Mail, Mic, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface KanbanCardProps {
    item: ContentItem;
    overlay?: boolean;
}

const platformIcons: Record<string, React.ReactNode> = {
    YouTube: <Youtube className="w-3 h-3" />,
    Short: <Youtube className="w-3 h-3" />,
    Reel: <Instagram className="w-3 h-3" />,
    Podcast: <Mic className="w-3 h-3" />,
    Email: <Mail className="w-3 h-3" />,
    Other: <FileText className="w-3 h-3" />,
};

export function KanbanCard({ item, overlay }: KanbanCardProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: item.id,
        data: {
            type: 'Item',
            item,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-50 h-[120px] rounded-xl bg-muted/20 border border-dashed border-primary/50"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn("outline-none", overlay && "cursor-grabbing")}
        >
            <Card className={cn(
                "cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors bg-card/80 backdrop-blur-sm",
                overlay ? "shadow-xl border-primary scale-105" : "shadow-sm"
            )}>
                <CardHeader className="p-4 pb-2 space-y-0">
                    <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded-md">
                            {platformIcons[item.platform]}
                            {item.platform}
                        </span>
                        {item.isSponsored && (
                            <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                        )}
                    </div>
                    <CardTitle className="text-sm font-semibold pt-2 leading-tight">
                        {item.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(item.targetDate), 'MMM d')}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
