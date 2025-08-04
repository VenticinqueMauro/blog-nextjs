import Link from 'next/link';
import { getAllAuthors } from "@/lib/api";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AuthorsDataTable from './_components/data-table';

export default async function AdminAuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <div className="flex flex-col h-full p-4 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Authors</h1>
          <p className="text-gray-500">Manage the authors of your blog.</p>
        </div>
        <Button asChild>
          <Link href="/admin/authors/new">New Author</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Authors</CardTitle>
          <CardDescription>
            A list of all the authors in your blog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthorsDataTable authors={authors} />
        </CardContent>
      </Card>
    </div>
  );
}
