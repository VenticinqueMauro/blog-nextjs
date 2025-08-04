'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const coverImage = formData.get('coverImage') as string;
  const ogImage = formData.get('ogImage') as string;
  const authorName = formData.get('authorName') as string;

  // Basic validation
  if (!title || !content || !authorName) {
    throw new Error('Title, content, and author are required.');
  }

  let author = await prisma.author.findFirst({
    where: { name: authorName },
  });

  if (!author) {
    author = await prisma.author.create({
      data: {
        name: authorName,
        picture: '/assets/blog/authors/default.jpeg', // Default picture for new authors
      },
    });
  }

  let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
  let slug = baseSlug;
  let counter = 1;

  // Ensure slug uniqueness
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      ogImage,
      authorId: author.id,
      status: 'DRAFT', // Default status
      publishedAt: new Date(),
      keywords: [],
      newsKeywords: [],
    },
  });

  revalidatePath('/admin/posts');
  redirect('/admin/posts');
}

export async function updatePost(slug: string, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const coverImage = formData.get('coverImage') as string;
  const ogImage = formData.get('ogImage') as string;
  const authorName = formData.get('authorName') as string;

  // Basic validation
  if (!title || !content || !authorName) {
    throw new Error('Title, content, and author are required.');
  }

  let author = await prisma.author.findFirst({
    where: { name: authorName },
  });

  if (!author) {
    author = await prisma.author.create({
      data: {
        name: authorName,
        picture: '/assets/blog/authors/default.jpeg', // Default picture for new authors
      },
    });
  }

  await prisma.post.update({
    where: { slug },
    data: {
      title,
      content,
      excerpt,
      coverImage,
      ogImage,
      authorId: author.id,
    },
  });

  revalidatePath('/admin/posts');
  redirect('/admin/posts');
}

export async function deletePost(slug: string) {
  await prisma.post.delete({
    where: { slug },
  });
  revalidatePath('/admin/posts');
}

export async function updatePostStatus(slug: string, status: string) {
  await prisma.post.update({
    where: { slug },
    data: { status: status as any }, // Cast to any because Prisma's Status enum is not directly compatible with string
  });
  revalidatePath('/admin/posts');
}
