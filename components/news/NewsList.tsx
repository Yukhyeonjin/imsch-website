"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock Data Type
interface NewsItem {
    id: string;
    title: string;
    category: "공지" | "새가족" | "행사" | "모임";
    author: string;
    date: string;
    excerpt: string;
}

// Mock Data
const MOCK_NEWS: NewsItem[] = [
    {
        id: "1",
        title: "2026년 봄 정기 심방 안내",
        category: "공지",
        author: "교역자실",
        date: "2026-03-01",
        excerpt: "성도님들의 가정에 하나님의 은혜가 함께하시길 기도합니다. 3월부터 봄 정기 심방이 시작됩니다...",
    },
    {
        id: "2",
        title: "새가족 환영회 (2월)",
        category: "새가족",
        author: "새가족팀",
        date: "2026-02-28",
        excerpt: "2월에 교회에 등록하신 새가족 분들을 환영하는 자리를 마련했습니다.",
    },
    {
        id: "3",
        title: "청년부 연합 수련회",
        category: "행사",
        author: "청년부",
        date: "2026-02-15",
        excerpt: "청년부 연합 수련회가 'Always with God'이라는 주제로 개최됩니다.",
    },
    {
        id: "4",
        title: "구역장 모임 안내",
        category: "모임",
        author: "목회지원팀",
        date: "2026-02-10",
        excerpt: "이번 주 금요일 저녁 8시, 소예배실에서 구역장 모임이 있습니다.",
    },
    {
        id: "5",
        title: "교회 주차장 이용 안내",
        category: "공지",
        author: "관리팀",
        date: "2026-02-05",
        excerpt: "교회 주차장 공사로 인해 이번 주일 주차 이용이 제한됩니다. 대중교통 이용 부탁드립니다.",
    },
];

export function NewsList() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_NEWS.map((news) => (
                <Link href={`/news/${news.id}`} key={news.id} className="group">
                    <Card className="h-full transition-colors hover:bg-slate-50 dark:hover:bg-slate-900">
                        <CardHeader className="space-y-1">
                            <div className="flex items-center justify-between">
                                <Badge variant={news.category === "공지" ? "default" : "secondary"}>
                                    {news.category}
                                </Badge>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    {format(new Date(news.date), "yyyy.MM.dd")}
                                </div>
                            </div>
                            <CardTitle className="line-clamp-1 group-hover:text-blue-600 transition-colors">
                                {news.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {news.excerpt}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <User className="mr-1 h-3 w-3" />
                                {news.author}
                            </div>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
