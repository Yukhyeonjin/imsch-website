import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";

// Mock Data (추후 DB 연동 예정)
const MOCK_NEWS_DETAIL = {
    id: "1",
    title: "2026년 봄 정기 심방 안내",
    category: "공지",
    author: "교역자실",
    date: "2026-03-01",
    content: `할렐루야! 주님의 이름으로 문안드립니다.

3월 1일부터 5월 31일까지 2026년 봄 정기 심방이 진행됩니다.
이번 심방을 통해 각 가정에 하나님의 위로와 축복이 임하길 소망합니다.

[심방 일정]
• 1교구: 3월 1주 ~ 3월 4주
• 2교구: 4월 1주 ~ 4월 4주
• 3교구: 5월 1주 ~ 5월 4주

구체적인 일정은 각 교구 목사님과 상의해주시길 바랍니다.`,
};

export default async function NewsDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    // 추후 DB 연동: const news = await getNews(id);
    const news = MOCK_NEWS_DETAIL;

    if (!news) return notFound();

    return (
        <div className="container max-w-4xl py-12 px-4 md:px-6">
            <div className="mb-8 flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/news">
                        <ArrowLeft className="mr-2 h-4 w-4" /> 목록으로
                    </Link>
                </Button>
            </div>

            <div className="border-b pb-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium px-2 py-1 bg-secondary rounded-md">
                        {news.category}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <User className="w-4 h-4" /> {news.author}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {news.date}
                    </span>
                </div>
            </div>

            <div className="prose prose-stone max-w-none min-h-[300px]">
                <div className="whitespace-pre-wrap">{news.content}</div>
            </div>

            <div className="mt-12 pt-8 border-t flex justify-center">
                <Button variant="secondary" asChild>
                    <Link href="/news">목록으로 돌아가기</Link>
                </Button>
            </div>
        </div>
    );
}
