import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { getGalleryItem, deleteGalleryItem } from "../actions";

export default async function GalleryDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const item = await getGalleryItem(id);
    if (!item) notFound();

    async function handleDelete() {
        "use server";
        await deleteGalleryItem(id);
    }

    return (
        <div className="container py-12 px-4 md:px-6 max-w-4xl mx-auto">
            <Button variant="outline" size="sm" asChild className="mb-6">
                <Link href="/news/gallery">← 갤러리로</Link>
            </Button>

            <div className="rounded-lg overflow-hidden bg-muted mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full max-h-[600px] object-contain"
                />
            </div>

            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
                    {item.description && (
                        <p className="text-muted-foreground mb-2">{item.description}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                        {format(item.date, "yyyy년 M월 d일", { locale: ko })}
                    </p>
                </div>
                <form action={handleDelete}>
                    <Button variant="destructive" size="sm" type="submit">
                        삭제
                    </Button>
                </form>
            </div>
        </div>
    );
}
