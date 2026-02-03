import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ServiceInfo() {
    const services = [
        { title: "주일 1부 예배", time: "오전 09:00", place: "본당 대예배실" },
        { title: "주일 2부 예배", time: "오전 11:00", place: "본당 대예배실" },
        { title: "주일 청년 예배", time: "오후 02:00", place: "비전홀" },
        { title: "수요 예배", time: "수요일 오후 07:30", place: "본당 대예배실" },
        { title: "새벽 기도회", time: "매일 오전 05:30", place: "소예배실" },
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        예배 안내
                    </h2>
                    <p className="text-lg text-slate-600">
                        하나님을 만나는 거룩한 시간, 예배의 자리로 초대합니다.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center max-w-6xl mx-auto">
                    {services.map((svc, i) => (
                        <Card key={i} className="border-none shadow-md hover:shadow-xl transition-shadow">
                            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-xl">{svc.title}</h3>
                                <div className="text-slate-500 space-y-1">
                                    <p>{svc.time}</p>
                                    <p className="text-sm flex items-center justify-center gap-1">
                                        <MapPin className="w-3 h-3" /> {svc.place}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
