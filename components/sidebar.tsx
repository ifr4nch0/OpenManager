'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Table, Calendar, Settings, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ContentDialog } from '@/components/content-dialog';

const navItems = [
    { href: '/', label: 'Table', icon: Table },
    { href: '/kanban', label: 'Kanban', icon: LayoutGrid },
    { href: '/calendar', label: 'Calendar', icon: Calendar },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-xl h-screen fixed left-0 top-0 flex flex-col p-4 z-50">
                <div className="flex items-center gap-2 px-2 py-4 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <LayoutGrid className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Content OS</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto space-y-4">
                    <Button className="w-full gap-2" size="lg" onClick={() => setIsDialogOpen(true)}>
                        <PlusCircle className="w-4 h-4" />
                        New Item
                    </Button>
                    <div className="pt-4 border-t border-border">
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                            <Settings className="w-4 h-4" />
                            Settings
                        </Link>
                    </div>
                </div>
            </aside>

            <ContentDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        </>
    );
}
