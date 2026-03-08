import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getGalleryItems } from "./actions";

export default async function GalleryPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page: pageStr } = await searchParams;
    const page = Number(pageStr) || 1;

    const { items, totalPages } = await getGalleryItems(page, 12);

    return (
        <div>
            <div className="bg-slate-900 text-white py-16">
                <div className="container px-4 md:px-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">갤러리</h1>
                        <p className="mt-3 text-slate-300 text-lg">교회 행사 사진 모음</p>
                    </div>
                    <Button asChild variant="secondary">
                        <Link href="/news/gallery/new">사진 등록</Link>
                    </Button>
                </div>
            </div>
            <div className="container px-4 md:px-6 py-12">
                {items.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        등록된 사진이 없습니다.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {items.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/gallery/${item.id}`}
                                className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-sm font-medium truncate">{item.title}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 pt-8">
                        {page > 1 && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/news/gallery?page=${page - 1}`}>이전</Link>
                            </Button>
                        )}
                        <span className="text-sm text-muted-foreground">
                            {page} / {totalPages}
                        </span>
                        {page < totalPages && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/news/gallery?page=${page + 1}`}>다음</Link>
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
