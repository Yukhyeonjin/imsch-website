export default function GalleryPage() {
    return (
        <div className="container py-20 px-4 md:px-6">
            <h1 className="text-4xl font-bold mb-8">갤러리</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Gallery Grid */}
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                        이미지 {i}
                    </div>
                ))}
            </div>
        </div>
    );
}
