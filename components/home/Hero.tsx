import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
            {/* Background Overlay (Replace with Image later) */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-black opacity-80 z-0" />

            {/* Content */}
            <div className="relative z-10 container px-4 md:px-6 flex flex-col items-center text-center space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter shadow-sm animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-5">
                    하나님의 사랑이 <br className="md:hidden" />
                    가득한 교회
                </h1>
                <p className="max-w-[700px] text-lg sm:text-xl md:text-2xl text-gray-200 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                    모든 세대가 함께 예배하고 성장하는 <br className="hidden md:inline" />
                    은혜로운 공동체로 여러분을 초대합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                    <Button size="lg" className="text-lg px-8 py-6 rounded-full" asChild>
                        <Link href="/about">교회 소개</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full text-black hover:bg-white/90" asChild>
                        <Link href="/sermon">설교 듣기</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
