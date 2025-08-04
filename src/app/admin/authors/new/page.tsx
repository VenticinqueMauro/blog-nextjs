import { createAuthor } from '../actions';

export default function NewAuthorPage() {
  return (
    <div className="flex flex-col h-full p-10">
      <h1 className="text-2xl font-bold mb-8">New Author</h1>
      <form action={createAuthor} className="flex-1 bg-white p-6 rounded-md shadow-md overflow-y-auto">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2" />
        </div>
        <div className="mb-6">
          <label htmlFor="picture" className="block text-sm font-medium text-gray-700 mb-1">Picture URL</label>
          <input type="text" id="picture" name="picture" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2" />
        </div>
        <div className="fixed bottom-4 right-4">
          <button type="submit" className="bg-black text-white px-6 py-3 rounded-md shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">Save</button>
        </div>
      </form>
    </div>
  );
}
