import { StaticPageLayout } from "@/components/common/StaticPageLayout";

export default function BulletinPage() {
    return (
        <StaticPageLayout title="주보" subtitle="매주 발행되는 교회 주보입니다">
            <div className="text-center py-12 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">주보 목록 준비 중입니다.</p>
            </div>
        </StaticPageLayout>
    );
}
