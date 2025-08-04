'use client';

import { useState } from 'react';
import { deletePost } from '../actions';
import PostStatusUpdater from './PostStatusUpdater';
import ConfirmationModal from '@/app/admin/_components/ConfirmationModal';
import toast from 'react-hot-toast';
import { Post } from '@/interfaces/post';
import DateFormatter from '@/app/_components/date-formatter';

interface PostListClientProps {
  posts: Post[];
}

export default function PostListClient({ posts }: PostListClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDeleteSlug, setPostToDeleteSlug] = useState<string | null>(null);

  const handleDeleteClick = (slug: string) => {
    setPostToDeleteSlug(slug);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (postToDeleteSlug) {
      try {
        await deletePost(postToDeleteSlug);
        toast.success('Post deleted successfully!');
      } catch (error) {
        toast.error(`Failed to delete post: ${(error as Error).message}`);
      }
    }
    setIsModalOpen(false);
    setPostToDeleteSlug(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setPostToDeleteSlug(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex-1">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published At</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{post.author.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <PostStatusUpdater initialStatus={post.status} slug={post.slug} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <DateFormatter dateString={post.publishedAt} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href={`/admin/posts/${post.slug}/edit`} className="text-black hover:text-gray-700">Edit</a>
                <button
                  onClick={() => handleDeleteClick(post.slug)}
                  className="text-red-600 hover:text-red-900 ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  );
}