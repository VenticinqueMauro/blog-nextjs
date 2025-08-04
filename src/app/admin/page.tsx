import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
            <CardDescription>Manage your blog posts.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>123</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Authors</CardTitle>
            <CardDescription>Manage your blog authors.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>45</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Manage your blog categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>6</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Manage your blog tags.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>78</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}