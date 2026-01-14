import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 ml-64 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
