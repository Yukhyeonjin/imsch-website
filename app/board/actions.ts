"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"

// Schema for Post
const PostSchema = z.object({
    title: z.string().min(1, "제목을 입력해주세요."),
    content: z.string().min(1, "내용을 입력해주세요."),
    category: z.string().min(1, "카테고리를 선택해주세요."),
})

export type PostInput = z.infer<typeof PostSchema>

export async function createPost(data: PostInput) {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        return { error: "로그인이 필요합니다." }
    }

    // Check if profile exists
    const profile = await prisma.profile.findUnique({
        where: { id: user.id }
    })

    if (!profile) {
        // Fallback: create profile if missing (though signup should have handled it)
        try {
            await prisma.profile.create({
                data: {
                    id: user.id,
                    email: user.email!,
                    role: "MEMBER"
                }
            })
        } catch (e) {
            return { error: "프로필 정보를 찾을 수 없습니다." }
        }
    }

    try {
        await prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                category: data.category,
                authorId: user.id,
            },
        })
    } catch (e) {
        return { error: "게시글 작성 중 오류가 발생했습니다." }
    }

    revalidatePath("/board")
    redirect("/board")
}

export async function getPosts(page = 1, limit = 10, category?: string) {
    const skip = (page - 1) * limit

    const where = category ? { category } : {}

    const [posts, total] = await Promise.all([
        prisma.post.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: { email: true } // or name if available
                }
            }
        }),
        prisma.post.count({ where })
    ])

    return { posts, total, totalPages: Math.ceil(total / limit) }
}

export async function getPost(id: string) {
    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: { email: true }
            }
        }
    })

    return post
}

export async function updatePost(id: string, data: PostInput) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: "로그인이 필요합니다." }

    const post = await prisma.post.findUnique({ where: { id } })
    if (!post) return { error: "게시글을 찾을 수 없습니다." }

    if (post.authorId !== user.id) {
        // Check admin role? For now, only author can update
        return { error: "수정 권한이 없습니다." }
    }

    try {
        await prisma.post.update({
            where: { id },
            data: {
                title: data.title,
                content: data.content,
                category: data.category
            }
        })
    } catch (e) {
        return { error: "게시글 수정 중 오류가 발생했습니다." }
    }

    revalidatePath(`/board/${id}`)
    revalidatePath("/board")
    redirect(`/board/${id}`)
}

export async function deletePost(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: "로그인이 필요합니다." }

    const post = await prisma.post.findUnique({ where: { id } })
    if (!post) return { error: "게시글을 찾을 수 없습니다." }

    if (post.authorId !== user.id) {
        // Check admin role? For now, only author can delete
        return { error: "삭제 권한이 없습니다." }
    }

    try {
        await prisma.post.delete({ where: { id } })
    } catch (e) {
        return { error: "게시글 삭제 중 오류가 발생했습니다." }
    }

    revalidatePath("/board")
    redirect("/board")
}
