import { StaticPageLayout } from "@/components/common/StaticPageLayout"

export default function DirectionsPage() {
    return (
        <StaticPageLayout title="오시는 길" subtitle="인천국제명성교회 위치 안내">
            <div className="not-prose">
                <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center mb-8">
                    <p className="text-slate-500">지도 API (Kakao/Google) 영역</p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">주소</h2>
                    <p>서울시 강남구 테헤란로 123</p>
                    <h2 className="text-2xl font-semibold mt-4">연락처</h2>
                    <p>02-1234-5678</p>
                </div>
            </div>
        </StaticPageLayout>
    )
}
