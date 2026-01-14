'use client';

import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    DropAnimation,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { ContentItem, ContentStatus } from '@/types';
import { KanbanColumn } from './kanban/column';
import { KanbanCard } from './kanban/card';
import { createPortal } from 'react-dom';

interface KanbanViewProps {
    items: ContentItem[];
}

const statusOrder: ContentStatus[] = ['Idea', 'Script', 'Recording', 'Editing', 'Scheduled', 'Published'];

export function KanbanView({ items: initialItems }: KanbanViewProps) {
    const [items, setItems] = useState(initialItems);
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const columns = statusOrder;

    function findContainer(id: string) {
        if (columns.includes(id as any)) {
            return id;
        }
        const item = items.find((i) => i.id === id);
        return item?.status;
    }

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string);
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        const overId = over?.id;

        if (!overId || active.id === overId) {
            return;
        }

        const activeContainer = findContainer(active.id as string);
        const overContainer = findContainer(overId as string);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        // Move item to different column
        // For now, we update state locally. Ideally trigger server action.
        setItems((prev) => {
            const activeItems = prev.filter((i) => i.status === activeContainer);
            const overItems = prev.filter((i) => i.status === overContainer);
            const activeIndex = prev.findIndex((i) => i.id === active.id);
            const overIndex = prev.findIndex((i) => i.id === overId);

            let newIndex;
            if (columns.includes(overId as any)) {
                newIndex = overItems.length + 1;
            } else {
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                    over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            const newItems = [...prev];
            const item = newItems[activeIndex];
            item.status = overContainer as ContentStatus;

            return newItems;
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const activeContainer = findContainer(active.id as string);
        const overContainer = findContainer(over?.id as string);

        if (
            activeContainer &&
            overContainer &&
            activeContainer === overContainer
        ) {
            // Reorder within same column
            // const activeIndex = items.findIndex((i) => i.id === active.id);
            // const overIndex = items.findIndex((i) => i.id === over?.id);

            // if (activeIndex !== overIndex) {
            //     setItems((items) => arrayMove(items, activeIndex, overIndex));
            // }
        }

        setActiveId(null);
    }

    const dropAnimation: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    const activeItem = activeId ? items.find((i) => i.id === activeId) : null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-140px)]">
                {columns.map((status) => (
                    <KanbanColumn
                        key={status}
                        id={status}
                        title={status}
                        items={items.filter((item) => item.status === status)}
                    />
                ))}
            </div>
            {createPortal(
                <DragOverlay dropAnimation={dropAnimation}>
                    {activeItem ? <KanbanCard item={activeItem} overlay /> : null}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
}
