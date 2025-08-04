import PostFormClient from '../_components/PostFormClient';
import { createPost } from '../actions';

export default function NewPostPage() {
  return <PostFormClient action={createPost} />;
}