import { createAuthor } from '../actions';
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

export default function NewAuthorPage() {
  return (
    <form action={createAuthor}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">New Author</h1>
          <p className="text-gray-500">Create a new author for your blog.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Author Details</CardTitle>
          <CardDescription>
            Fill in the details below to create a new author.
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