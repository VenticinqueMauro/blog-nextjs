'use client';

import { useState, useRef, useEffect } from 'react';
import { updatePostStatus } from '../actions';
import toast from 'react-hot-toast';

interface PostStatusUpdaterProps {
  initialStatus: string;
  slug: string;
}

const statusOptions = [
  { value: 'DRAFT', label: 'Draft', icon: '📝', color: 'text-gray-500' },
  { value: 'PUBLISHED', label: 'Published', icon: '✅', color: 'text-green-500' },
  { value: 'ARCHIVED', label: 'Archived', icon: '📦', color: 'text-blue-500' },
];

export default function PostStatusUpdater({ initialStatus, slug }: PostStatusUpdaterProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentStatus = statusOptions.find(option => option.value === status);

  const handleStatusChange = async (newStatus: string) => {
    try {
      setStatus(newStatus);
      setIsOpen(false);
      await updatePostStatus(slug, newStatus);
      toast.success(`Post status updated to ${newStatus}`);
    } catch (error) {
      toast.error(`Failed to update post status: ${(error as Error).message}`);
      setStatus(initialStatus); // Revert to initial status on error
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`${currentStatus?.color} mr-2`}>{currentStatus?.icon}</span>
          {currentStatus?.label}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id={`menu-item-${option.value}`}
              >
                <span className={`${option.color} mr-2`}>{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
