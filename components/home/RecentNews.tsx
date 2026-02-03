import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RecentNews() {
    const news = [
        {
            id: 1,
            title: "2026년 신년 특별 새벽기도회 안내",
            date: "2026-01-01",
            summary: "한 해를 기도로 시작하는 특별한 시간에 성도님들을 초대합니다.",
            category: "공지사항",
        },
        {
            id: 2,
            title: "봄맞이 전교인 체육대회",
            date: "2026-03-15",
            summary: "성도 간의 교제와 하나됨을 위한 체육대회가 열립니다.",
            category: "행사",
        },
        {
            id: 3,
            title: "새가족 환영회 및 교육 일정",
            date: "2026-02-10",
            summary: "새로 오신 분들을 위한 4주 과정의 교육이 시작됩니다.",
            category: "새가족",
        },
    ];

    return (
        <section className="py-20">
            <div className="container px-4 md:px-6">
                <div className="flex justify-between items-end mb-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">교회 소식</h2>
                        <p className="text-slate-500">우리 교회의 새로운 소식들을 전해드립니다.</p>
                    </div>
                    <Button variant="ghost" asChild className="hidden sm:flex">
                        <Link href="/news" className="gap-2">
                            더보기 <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {news.map((item) => (
                        <Card key={item.id} className="flex flex-col hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="text-sm font-medium text-blue-600 mb-2">{item.category}</div>
                                <CardTitle className="text-xl line-clamp-2">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-slate-600 line-clamp-3">{item.summary}</p>
                            </CardContent>
                            <CardFooter className="text-sm text-slate-400 border-t pt-4 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {item.date}
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/news">소식 더보기</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
