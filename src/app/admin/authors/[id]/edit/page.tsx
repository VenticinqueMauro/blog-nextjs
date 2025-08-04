import { getAuthorById } from "@/lib/api";
import { updateAuthor } from '../../actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function EditAuthorPage({ params }: { params: { id: string } }) {
  const author = await getAuthorById(params.id);

  if (!author) {
    return (
      <div className="flex flex-col h-full p-10">
        <h1 className="text-2xl font-bold mb-8">Author not found</h1>
      </div>
    );
  }

  const updateAuthorWithId = updateAuthor.bind(null, params.id);

  return (
    <form action={updateAuthorWithId}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Edit Author</h1>
          <p className="text-gray-500">Update the details of the author.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{author.name}</CardTitle>
          <CardDescription>
            Update the details below for the author.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                className="w-full"
                defaultValue={author.name}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="picture">Picture URL</Label>
              <Input
                id="picture"
                name="picture"
                type="text"
                className="w-full"
                defaultValue={author.picture || ''}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit">Save</Button>
        </CardFooter>
      </Card>
    </form>
  );
}