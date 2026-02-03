export default function NewsPage() {
    return (
        <div className="container py-20 px-4 md:px-6">
            <h1 className="text-4xl font-bold mb-8">교회 소식</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* List will go here */}
                <div className="col-span-full text-center py-20 bg-slate-50 rounded-lg text-slate-500">
                    게시판 목록이 표시될 예정입니다.
                </div>
            </div>
        </div>
    );
}
