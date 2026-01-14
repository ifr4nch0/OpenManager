'use client';

import { ContentItem } from '@/types';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Youtube, Instagram, Twitter, Mail, Mic, FileText } from 'lucide-react';

interface CalendarViewProps {
    items: ContentItem[];
}

const platformIcons: Record<string, React.ReactNode> = {
    YouTube: <Youtube className="w-3 h-3 text-red-500" />,
    Short: <Youtube className="w-3 h-3 text-red-500" />,
    Reel: <Instagram className="w-3 h-3 text-pink-500" />,
    Podcast: <Mic className="w-3 h-3 text-purple-500" />,
    Email: <Mail className="w-3 h-3 text-blue-500" />,
    Other: <FileText className="w-3 h-3 text-gray-500" />,
};

export function CalendarView({ items }: CalendarViewProps) {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-7 border-b border-border bg-muted/30">
                {weekDays.map((day) => (
                    <div key={day} className="p-3 text-center text-sm font-semibold text-muted-foreground">
                        {day}
                    </div>
                ))}
            </div>
            <div className="flex-1 grid grid-cols-7 grid-rows-5 lg:grid-rows-6">
                {calendarDays.map((day, dayIdx) => {
                    const dayItems = items.filter((item) => isSameDay(new Date(item.targetDate), day));

                    return (
                        <div
                            key={day.toString()}
                            className={cn(
                                "min-h-[100px] border-b border-r border-border p-2 transition-colors hover:bg-muted/5 relative group",
                                !isSameMonth(day, monthStart) && "bg-muted/10 text-muted-foreground"
                            )}
                        >
                            <div className={cn(
                                "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1",
                                isToday(day) ? "bg-primary text-primary-foreground" : "text-foreground"
                            )}>
                                {format(day, 'd')}
                            </div>

                            <div className="space-y-1">
                                {dayItems.map((item) => (
                                    <div key={item.id} className="text-xs p-1.5 rounded-md bg-muted/50 border border-border/50 truncate hover:bg-muted transition-colors flex items-center gap-1.5 cursor-pointer">
                                        {platformIcons[item.platform]}
                                        <span className="truncate">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
