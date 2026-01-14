import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, LayoutGrid, Zap } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="px-6 h-16 flex items-center justify-between border-b border-white/5 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <LayoutGrid className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">OpenManager</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost">Log In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Get Started <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-24 px-6 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10" />

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                        Manage your content like a professional.
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        OpenManager is the all-in-one workspace for creators. Organize, schedule, and track your content across all platforms with Table, Kanban, and Calendar views.
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <Link href="/signup">
                            <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all">
                                Start for Free
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full bg-background/50 backdrop-blur-sm">
                                View Demo
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-20 px-6 bg-muted/5">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-16">Everything you need to create.</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<LayoutGrid className="w-6 h-6 text-blue-500" />}
                                title="Kanban Board"
                                description="Visualize your workflow with a powerful drag-and-drop Kanban board."
                            />
                            <FeatureCard
                                icon={<Zap className="w-6 h-6 text-yellow-500" />}
                                title="Fast & Fluid"
                                description="Built with Next.js for instant page loads and smooth interactions."
                            />
                            <FeatureCard
                                icon={<CheckCircle className="w-6 h-6 text-green-500" />}
                                title="Track Everything"
                                description="Monitor status, sponsorships, and dates in one central hub."
                            />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-8 px-6 border-t border-white/5 text-center text-sm text-muted-foreground">
                © 2026 OpenManager. All rights reserved.
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-6 rounded-2xl border border-white/5 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-background border border-white/10 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}
