import { getPostBySlug } from "@/lib/api";
import { updatePost } from '../../actions';
import PostFormClient from "../../_components/PostFormClient";

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-8">Post not found</h1>
      </div>
    );
  }

  const updatePostWithSlug = updatePost.bind(null, params.slug);

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold p-10">Edit Post: {post.title}</h1>
      <div className="flex-1 overflow-hidden">
        <PostFormClient
          initialData={{
            title: post.title,
            excerpt: post.excerpt || '',
            content: post.content,
            coverImage: post.coverImage || '',
            ogImage: post.ogImage || '',
            authorName: post.author.name,
          }}
          action={updatePostWithSlug}
        />
      </div>
    </div>
  );
}
