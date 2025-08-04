import { Toaster } from 'react-hot-toast';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import NavLink from './_components/nav-link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navLinks = (
    <nav className="mt-10 flex-1">
      <NavLink href="/admin">Dashboard</NavLink>
      <NavLink href="/admin/posts">Posts</NavLink>
      <NavLink href="/admin/authors">Authors</NavLink>
      <NavLink href="/admin/categories">Categories</NavLink>
      <NavLink href="/admin/tags">Tags</NavLink>
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex-1">
            {navLinks}
          </div>
        </div>
      </aside>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Admin Panel</SheetTitle>
              </SheetHeader>
              {navLinks}
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
        <Toaster />
      </div>
    </div>
  );
}