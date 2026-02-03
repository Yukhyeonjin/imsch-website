import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

// Mock Data (in real app, fetch from DB)
const MOCK_NEWS_DETAIL = {
    id: "1",
    title: "2026년 봄 정기 심방 안내",
    category: "공지",
    author: "교역자실",
    date: "2026-03-01",
    content: `
    <p>할렐루야! 주님의 이름으로 문안드립니다.</p>
    <br/>
    <p>3월 1일부터 5월 31일까지 2026년 봄 정기 심방이 진행됩니다.</p>
    <p>이번 심방을 통해 각 가정에 하나님의 위로와 축복이 임하길 소망합니다.</p>
    <br/>
    <h3>[심방 일정]</h3>
    <ul>
        <li>1교구: 3월 1주 ~ 3월 4주</li>
        <li>2교구: 4월 1주 ~ 4월 4주</li>
        <li>3교구: 5월 1주 ~ 5월 4주</li>
    </ul>
    <br/>
    <p>구체적인 일정은 각 교구 목사님과 상의해주시길 바랍니다.</p>
  `,
};

export default function NewsDetailPage({ params }: { params: { id: string } }) {
    // In real app: const news = await getNews(params.id);
    const news = MOCK_NEWS_DETAIL; // Mock

    if (!news) return notFound();

    return (
        <div className="container max-w-4xl py-20 px-4 md:px-6">
            <div className="mb-8 flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/news">
                        <ArrowLeft className="mr-2 h-4 w-4" /> 목록으로
                    </Link>
                </Button>
            </div>

            <div className="border-b pb-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        {news.category}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
                <div className="flex items-center justify-between text-slate-500 text-sm">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1"><User className="w-4 h-4" /> {news.author}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {news.date}</span>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: news.content }}
            />

            <div className="mt-12 pt-8 border-t flex justify-end">
                <Button asChild>
                    <Link href="/news">목록보기</Link>
                </Button>
            </div>
        </div>
    );
}
