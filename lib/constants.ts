export const CHURCH_INFO = {
    name: "은혜로운 교회",
    address: "서울시 강남구 테헤란로 123",
    phone: "02-1234-5678",
    email: "contact@church.com",
    copyright: "© 2026 Grace Church. All rights reserved.",
    social: {
        youtube: "https://youtube.com",
        instagram: "https://instagram.com",
    },
};

export interface NavChild {
    name: string;
    href: string;
}

export interface NavLink {
    name: string;
    href: string;
    children: NavChild[];
}

export const NAV_LINKS: NavLink[] = [
    {
        name: "교회 소개",
        href: "/about",
        children: [
            { name: "인사말", href: "/about/greeting" },
            { name: "연혁", href: "/about/history" },
            { name: "비전", href: "/about/vision" },
            { name: "섬기는 사람들", href: "/about/people" },
            { name: "예배 안내", href: "/about/worship" },
            { name: "오시는 길", href: "/about/directions" },
        ],
    },
    {
        name: "새가족",
        href: "/newcomer",
        children: [
            { name: "안내", href: "/newcomer/guide" },
            { name: "사진", href: "/newcomer/photos" },
            { name: "신청", href: "/newcomer/apply" },
        ],
    },
    {
        name: "교회 소식",
        href: "/news",
        children: [
            { name: "주보", href: "/news/bulletin" },
            { name: "갤러리", href: "/news/gallery" },
            { name: "행사와 소식", href: "/news/events" },
        ],
    },
    {
        name: "다음 세대",
        href: "/generation",
        children: [
            { name: "영아·유치부", href: "/generation/infant" },
            { name: "사랑부", href: "/generation/love" },
            { name: "어린이부", href: "/generation/children" },
            { name: "중고등부", href: "/generation/youth" },
            { name: "청년부", href: "/generation/young-adult" },
        ],
    },
    {
        name: "선교",
        href: "/mission",
        children: [
            { name: "국내 선교", href: "/mission/domestic" },
            { name: "해외 선교", href: "/mission/overseas" },
        ],
    },
    {
        name: "자료실",
        href: "/resources",
        children: [
            { name: "악보", href: "/resources/sheet-music" },
            { name: "다운로드", href: "/resources/downloads" },
        ],
    },
];
