import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export default function SermonPage() {
    return (
        <div className="container py-20 px-4 md:px-6">
            <h1 className="text-4xl font-bold mb-8">예배/말씀</h1>

            {/* Featured Sermon */}
            <div className="mb-12 rounded-2xl overflow-hidden bg-slate-900 text-white shadow-xl">
                <div className="grid md:grid-cols-2">
                    <div className="bg-slate-800 flex items-center justify-center min-h-[300px]">
                        <PlayCircle className="w-20 h-20 text-white/50" />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <span className="text-blue-400 font-bold mb-2">이번 주 주일 설교</span>
                        <h2 className="text-3xl font-bold mb-4">믿음으로 승리하는 삶</h2>
                        <p className="text-slate-300 mb-6">
                            로마서 8장 28절 말씀을 통해 주시는 하나님의 은혜를 나눕니다.
                        </p>
                        <Button size="lg" className="w-fit">영상 보기</Button>
                    </div>
                </div>
            </div>

            {/* List */}
            <h2 className="text-2xl font-bold mb-6">지난 설교</h2>
            <div className="grid gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:bg-slate-50">
                        <div className="w-full sm:w-48 aspect-video bg-slate-200 rounded flex items-center justify-center">
                            <PlayCircle className="w-8 h-8 text-slate-400" />
                        </div>
                        <div>
                            <div className="text-sm text-slate-500 mb-1">2026.01.{10 + i}</div>
                            <h3 className="font-bold text-lg">하나님의 뜻을 구하라 {i}</h3>
                            <p className="text-slate-600 line-clamp-1">설교 본문 및 요약 내용이 들어갑니다...</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
