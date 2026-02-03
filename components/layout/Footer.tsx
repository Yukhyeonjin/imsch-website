import { CHURCH_INFO } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="border-t bg-muted/40 text-muted-foreground">
            <div className="container py-8 md:py-12 px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Info */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-foreground">
                            {CHURCH_INFO.name}
                        </h3>
                        <p className="text-sm leading-relaxed">
                            하나님의 사랑을 실천하는 믿음의 공동체입니다.
                            <br />
                            누구나 환영합니다.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-foreground">Contact</h3>
                        <ul className="text-sm space-y-1">
                            <li>주소: {CHURCH_INFO.address}</li>
                            <li>전화: {CHURCH_INFO.phone}</li>
                            <li>이메일: {CHURCH_INFO.email}</li>
                        </ul>
                    </div>

                    {/* Service Times (Simple Placeholder) */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-foreground">예배 안내</h3>
                        <ul className="text-sm space-y-1">
                            <li className="flex justify-between max-w-[200px]">
                                <span>주일 대예배</span>
                                <span>오전 11:00</span>
                            </li>
                            <li className="flex justify-between max-w-[200px]">
                                <span>수요 예배</span>
                                <span>오후 07:30</span>
                            </li>
                            <li className="flex justify-between max-w-[200px]">
                                <span>새벽 기도회</span>
                                <span>오전 05:30</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-xs">
                    {CHURCH_INFO.copyright}
                </div>
            </div>
        </footer>
    );
}
