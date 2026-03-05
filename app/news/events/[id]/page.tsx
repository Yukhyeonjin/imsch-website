import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import { getPost, deletePost } from "../actions"
import { createClient } from "@/lib/supabase/server"

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const post = await getPost(id)
    if (!post) {
        notFound()
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const isAuthor = user?.id === post.authorId

    async function deleteAction() {
        "use server"
        await deletePost(id)
    }

    return (
        <div className="container py-10 px-4 md:px-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <Button variant="outline" size="sm" asChild className="mb-4">
                    <Link href="/news/events">← 목록으로</Link>
                </Button>

                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium px-2 py-1 bg-secondary rounded-md">
                        {post.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {format(post.createdAt, "yyyy.MM.dd HH:mm", { locale: ko })}
                    </span>
                </div>

                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

                <div className="flex items-center justify-between pb-4 border-b">
                    <div className="text-sm text-muted-foreground">
                        작성자: {post.author.email.split("@")[0]}
                    </div>

                    {isAuthor && (
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/news/events/${post.id}/edit`}>수정</Link>
                            </Button>
                            <form action={deleteAction}>
                                <Button variant="destructive" size="sm" type="submit">
                                    삭제
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <div className="prose prose-stone max-w-none min-h-[300px]">
                <div className="whitespace-pre-wrap">
                    {post.content}
                </div>
            </div>

            <Separator className="my-8" />

            <div className="flex justify-center">
                <Button variant="secondary" asChild>
                    <Link href="/news/events">목록으로 돌아가기</Link>
                </Button>
            </div>
        </div>
    )
}
