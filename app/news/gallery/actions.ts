"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

// 갤러리 목록 조회
export async function getGalleryItems(
    page = 1,
    limit = 12,
    category?: string
) {
    const skip = (page - 1) * limit;
    const where = category ? { category } : {};

    const [items, total] = await Promise.all([
        prisma.gallery.findMany({
            where,
            skip,
            take: limit,
            orderBy: { date: "desc" },
        }),
        prisma.gallery.count({ where }),
    ]);

    return { items, total, totalPages: Math.ceil(total / limit) };
}

// 갤러리 단일 조회
export async function getGalleryItem(id: string) {
    return prisma.gallery.findUnique({ where: { id } });
}

// 갤러리 항목 생성 (imageUrl은 클라이언트에서 Storage 업로드 후 전달)
export async function createGalleryItem(data: {
    title: string;
    description?: string;
    imageUrl: string;
    category?: string;
    date?: string;
}) {
    try {
        await prisma.gallery.create({
            data: {
                title: data.title,
                description: data.description || null,
                imageUrl: data.imageUrl,
                category: data.category || "GENERAL",
                date: data.date ? new Date(data.date) : new Date(),
            },
        });
    } catch {
        return { error: "갤러리 등록 중 오류가 발생했습니다." };
    }

    revalidatePath("/news/gallery");
    redirect("/news/gallery");
}

// 갤러리 항목 삭제
export async function deleteGalleryItem(id: string) {
    const item = await prisma.gallery.findUnique({ where: { id } });
    if (!item) return { error: "항목을 찾을 수 없습니다." };

    try {
        await prisma.gallery.delete({ where: { id } });
    } catch {
        return { error: "삭제 중 오류가 발생했습니다." };
    }

    revalidatePath("/news/gallery");
    redirect("/news/gallery");
}
