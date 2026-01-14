import { CalendarView } from '@/components/views/calendar-view';
import { getContentItems } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export default async function CalendarPage() {
    const items = await getContentItems();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Content Calendar</h1>
            </div>
            <CalendarView items={items} />
        </div>
    );
}
