import { getAllAuthors } from "@/lib/api";
import { deleteAuthor } from './actions';

export default async function AdminAuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <div className="flex flex-col h-full p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Authors</h1>
        <a href="/admin/authors/new" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">New Author</a>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex-1">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Picture</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {authors.map((author) => (
              <tr key={author.id}>
                <td className="px-6 py-4 whitespace-nowrap">{author.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {author.picture && <img src={author.picture} alt={author.name} className="h-10 w-10 rounded-full" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href={`/admin/authors/${author.id}/edit`} className="text-black hover:text-gray-700">Edit</a>
                  <form action={deleteAuthor.bind(null, author.id)} className="inline-block ml-4">
                    <button type="submit" className="text-red-600 hover:text-red-900">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}