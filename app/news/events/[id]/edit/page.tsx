import { notFound } from "next/navigation"
import { getPost } from "../../actions"
import { PostForm } from "@/components/news/PostForm"
import { createClient } from "@/lib/supabase/server"

export default async function EditEventPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const post = await getPost(id)
    if (!post) notFound()

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user?.id !== post.authorId) {
        return <div className="container py-20 text-center text-red-500">수정 권한이 없습니다.</div>
    }

    return (
        <div className="container py-12 px-4 md:px-6">
            <PostForm post={post} />
        </div>
    )
}
