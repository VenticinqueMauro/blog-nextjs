import { type Author } from "./author";

export type Post = {
  id: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  title: string;
  publishedAt: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage?: string;
  content: string;
  preview?: boolean;
};
