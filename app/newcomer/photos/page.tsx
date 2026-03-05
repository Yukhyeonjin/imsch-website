import { StaticPageLayout } from "@/components/common/StaticPageLayout";

export default function NewcomerPhotosPage() {
    return (
        <StaticPageLayout title="새가족 사진" subtitle="새가족과 함께한 소중한 순간들">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center"
                    >
                        <span className="text-muted-foreground text-xs">사진 준비 중</span>
                    </div>
                ))}
            </div>
        </StaticPageLayout>
    );
}
