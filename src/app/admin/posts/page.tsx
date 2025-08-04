import Link from 'next/link';
import { getAllPosts } from "@/lib/api";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PostsDataTable from './_components/data-table';

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col h-full p-4 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="text-gray-500">Manage the posts of your blog.</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">New Post</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>
            A list of all the posts in your blog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostsDataTable posts={posts} />
        </CardContent>
      </Card>
    </div>
  );
}