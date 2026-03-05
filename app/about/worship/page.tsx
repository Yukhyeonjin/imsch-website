import { StaticPageLayout } from "@/components/common/StaticPageLayout";

const worshipSchedule = [
    { name: "주일대예배", time: "오전 11:00" },
    { name: "수요예배", time: "오후 7:30" },
    { name: "새벽기도회", time: "오전 5:30" },
];

export default function WorshipPage() {
    return (
        <StaticPageLayout title="예배 안내" subtitle="예배 시간 및 장소 안내">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            <th className="py-3 px-4 text-left font-semibold">예배명</th>
                            <th className="py-3 px-4 text-left font-semibold">시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {worshipSchedule.map((row) => (
                            <tr key={row.name} className="border-b last:border-0">
                                <td className="py-3 px-4">{row.name}</td>
                                <td className="py-3 px-4 text-muted-foreground">{row.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </StaticPageLayout>
    );
}
