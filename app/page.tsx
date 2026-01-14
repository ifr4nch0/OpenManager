import { TableView } from '@/components/views/table-view';
import { getContentItems } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const items = await getContentItems();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Content Overview</h1>
      </div>
      <TableView items={items} />
    </div>
  );
}
