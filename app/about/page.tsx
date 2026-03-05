import Link from "next/link";

const subMenus = [
    { href: "/about/greeting", title: "인사말", desc: "담임 목사님의 인사말" },
    { href: "/about/history", title: "연혁", desc: "교회의 역사와 발자취" },
    { href: "/about/vision", title: "비전", desc: "우리 교회의 비전과 사명" },
    { href: "/about/people", title: "섬기는 사람들", desc: "교역자 및 봉사자 소개" },
    { href: "/about/worship", title: "예배 안내", desc: "예배 시간 및 장소 안내" },
    { href: "/about/directions", title: "오시는 길", desc: "교회 위치 및 교통 안내" },
];

export default function AboutPage() {
    return (
        <div>
            <div className="bg-slate-900 text-white py-16">
                <div className="container px-4 md:px-6">
                    <h1 className="text-4xl font-bold tracking-tight">교회 소개</h1>
                    <p className="mt-3 text-slate-300 text-lg">인천국제명성교회를 소개합니다</p>
                </div>
            </div>
            <div className="container px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subMenus.map((menu) => (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className="block p-6 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <h2 className="text-xl font-semibold mb-2">{menu.title}</h2>
                            <p className="text-muted-foreground text-sm">{menu.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
