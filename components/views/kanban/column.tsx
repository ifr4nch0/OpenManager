'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ContentItem } from '@/types';
import { KanbanCard } from './card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface KanbanColumnProps {
    id: string;
    title: string;
    items: ContentItem[];
}

export function KanbanColumn({ id, title, items }: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div className="flex flex-col w-80 shrink-0">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Badge variant={title.toLowerCase() as any} className="uppercase px-2 py-0.5 text-[0.65rem] tracking-wider">
                        {title}
                    </Badge>
                    <span className="text-muted-foreground ml-2 text-xs">{items.length}</span>
                </h3>
            </div>

            <div
                ref={setNodeRef}
                className={cn(
                    "flex-1 bg-muted/20 rounded-xl p-2 space-y-3 min-h-[200px] border border-transparent transition-colors",
                    // "hover:border-primary/20 hover:bg-muted/30"
                )}
            >
                <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                    {items.map((item) => (
                        <KanbanCard key={item.id} item={item} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}
