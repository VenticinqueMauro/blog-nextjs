import { getAllPosts } from "@/lib/api";
import PostListClient from './_components/PostListClient';

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col h-full p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Posts</h1>
        <a href="/admin/posts/new" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">New Post</a>
      </div>
      <PostListClient posts={posts} />
    </div>
  );
}
