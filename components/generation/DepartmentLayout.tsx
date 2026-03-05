import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DepartmentLayoutProps {
    name: string
    target: string
    schedule: string
    description: string
    children?: React.ReactNode
}

export function DepartmentLayout({ name, target, schedule, description, children }: DepartmentLayoutProps) {
    return (
        <div>
            <div className="bg-slate-900 text-white py-16">
                <div className="container px-4 md:px-6">
                    <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
                </div>
            </div>

            <div className="container px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base text-muted-foreground">예배 대상</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-medium">{target}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base text-muted-foreground">예배 시간 / 장소</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-medium">{schedule}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">부서 소개</h2>
                    <p className="text-muted-foreground leading-relaxed">{description}</p>
                </div>

                {children}
            </div>
        </div>
    )
}
