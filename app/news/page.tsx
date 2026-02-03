import { NewsList } from "@/components/news/NewsList";

export default function NewsPage() {
    return (
        <div className="container py-20 px-4 md:px-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">교회 소식</h1>
                <p className="text-slate-500">
                    우리 교회의 다양한 소식들을 확인하세요.
                </p>
            </div>
            <NewsList />
        </div>
    );
}
