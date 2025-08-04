import { PrismaClient } from '@prisma/client';
import { Post } from "@/interfaces/post";
import { Author } from "@/interfaces/author";

const prisma = new PrismaClient();

export async function getPostSlugs() {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
    },
  });
  return posts.map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
    },
  });
  if (!post) return null as unknown as Post;
  return {
    ...post,
    publishedAt: post.publishedAt?.toISOString() || '',
  } as unknown as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });
  return posts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt?.toISOString() || '',
  })) as unknown as Post[];
}

export async function getAllAuthors(): Promise<Author[]> {
  const authors = await prisma.author.findMany();
  return authors;
}

export async function getAuthorById(id: string): Promise<Author> {
  const author = await prisma.author.findUnique({
    where: { id },
  });
  return author as unknown as Author;
}
