'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function createAuthor(formData: FormData) {
  const name = formData.get('name') as string;
  const picture = formData.get('picture') as string;

  if (!name) {
    throw new Error('Author name is required.');
  }

  await prisma.author.create({
    data: {
      name,
      picture,
    },
  });

  revalidatePath('/admin/authors');
  redirect('/admin/authors');
}

export async function updateAuthor(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const picture = formData.get('picture') as string;

  if (!name) {
    throw new Error('Author name is required.');
  }

  await prisma.author.update({
    where: { id },
    data: {
      name,
      picture,
    },
  });

  revalidatePath('/admin/authors');
  redirect('/admin/authors');
}

export async function deleteAuthor(id: string) {
  await prisma.author.delete({
    where: { id },
  });
  revalidatePath('/admin/authors');
}
