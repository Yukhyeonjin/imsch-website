import React from "react"

interface StaticPageLayoutProps {
    title: string
    subtitle?: string
    children: React.ReactNode
}

export function StaticPageLayout({ title, subtitle, children }: StaticPageLayoutProps) {
    return (
        <div>
            <div className="bg-slate-900 text-white py-16">
                <div className="container px-4 md:px-6">
                    <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
                    {subtitle && (
                        <p className="mt-3 text-slate-300 text-lg">{subtitle}</p>
                    )}
                </div>
            </div>
            <div className="container px-4 md:px-6 py-12">
                <div className="prose prose-stone max-w-none">
                    {children}
                </div>
            </div>
        </div>
    )
}
