import { KanbanView } from '@/components/views/kanban-view';
import { getContentItems } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export default async function KanbanPage() {
    const items = await getContentItems();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Content Pipeline</h1>
            </div>
            <KanbanView items={items} />
        </div>
    );
}
