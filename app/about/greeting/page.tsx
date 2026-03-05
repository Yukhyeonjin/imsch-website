import { StaticPageLayout } from "@/components/common/StaticPageLayout";

export default function GreetingPage() {
    return (
        <StaticPageLayout title="인사말" subtitle="담임 목사님의 인사말">
            <div className="text-center py-12 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">콘텐츠 준비 중입니다.</p>
            </div>
        </StaticPageLayout>
    );
}
