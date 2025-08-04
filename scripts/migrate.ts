import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

const prisma = new PrismaClient();
const postsDirectory = path.join(process.cwd(), '_posts');

async function main() {
  const fileNames = fs.readdirSync(postsDirectory);

  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const authorName = data.author.name;
    const authorPicture = data.author.picture;

    let author = await prisma.author.findFirst({
      where: { name: authorName },
    });

    if (!author) {
      author = await prisma.author.create({
        data: {
          name: authorName,
          picture: authorPicture,
        },
      });
    }

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: fileName.replace(/\.md$/, ''),
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        ogImage: data.ogImage?.url, // Add ogImage here
        publishedAt: new Date(data.date),
        content: content,
        authorId: author.id,
        status: 'PUBLISHED',
        keywords: [],
        newsKeywords: [],
      },
    });

    console.log(`Migrated post: ${post.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
