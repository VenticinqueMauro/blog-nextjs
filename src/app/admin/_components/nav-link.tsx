'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'block py-2.5 px-4 rounded transition duration-200',
        isActive ? 'bg-gray-800' : 'hover:bg-gray-800'
      )}
    >
      {children}
    </Link>
  );
}
