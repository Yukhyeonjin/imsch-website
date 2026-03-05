import { StaticPageLayout } from "@/components/common/StaticPageLayout";

export default function SheetMusicPage() {
    return (
        <StaticPageLayout title="악보" subtitle="예배에 사용되는 악보를 제공합니다">
            <div className="text-center py-12 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">악보 목록 준비 중입니다.</p>
            </div>
        </StaticPageLayout>
    );
}
