import { TableView } from '@/components/views/table-view';
import { getContentItems } from '@/lib/data';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await getSession();
  if (!session) redirect('/login');

  const items = await getContentItems(session.userId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Content Overview</h1>
      </div>
      <TableView items={items} />
    </div>
  );
}
