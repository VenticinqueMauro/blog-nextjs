import PostFormClient from '../_components/PostFormClient';
import { createPost } from '../actions';

export default function NewPostPage() {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold p-10">New Post</h1>
      <div className="flex-1 overflow-hidden">
        <PostFormClient action={createPost} />
      </div>
    </div>
  );
}
