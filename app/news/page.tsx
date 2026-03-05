import Link from "next/link";

const subMenus = [
    { href: "/news/bulletin", title: "주보", desc: "매주 발행되는 교회 주보" },
    { href: "/news/gallery", title: "갤러리", desc: "교회 행사 사진 모음" },
    { href: "/news/events", title: "행사와 소식", desc: "교회의 다양한 행사와 소식" },
];

export default function NewsPage() {
    return (
        <div>
            <div className="bg-slate-900 text-white py-16">
                <div className="container px-4 md:px-6">
                    <h1 className="text-4xl font-bold tracking-tight">교회 소식</h1>
                    <p className="mt-3 text-slate-300 text-lg">우리 교회의 다양한 소식들을 확인하세요</p>
                </div>
            </div>
            <div className="container px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
