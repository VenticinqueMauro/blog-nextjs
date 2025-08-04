'use client';

import { useState, useRef, useEffect } from 'react';
import { createPost } from '../actions';
import markdownToHtml from '@/lib/markdownToHtml';
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  ListBulletIcon,
  LinkIcon,
  PhotoIcon,
  MinusIcon,
  CodeBracketIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  NumberedListIcon,
  ChatBubbleLeftIcon,
  CodeBracketSquareIcon
} from '@heroicons/react/24/outline';

interface PostFormProps {
  initialData?: {
    title: string;
    excerpt?: string;
    content: string;
    coverImage?: string;
    ogImage?: string;
    authorName: string;
  };
  action: (formData: FormData) => void;
}

export default function PostFormClient({ initialData, action }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [ogImage, setOgImage] = useState(initialData?.ogImage || '');
  const [authorName, setAuthorName] = useState(initialData?.authorName || '');
  const [previewContent, setPreviewContent] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialData?.content) {
      markdownToHtml(initialData.content).then(html => setPreviewContent(html));
    }
  }, [initialData?.content]);

  const handleContentChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    const html = await markdownToHtml(newContent || '');
    setPreviewContent(html);
  };

  const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let newContent;
    let newCursorPos;

    if (selectedText) {
      newContent = textarea.value.substring(0, start) + before + selectedText + after + textarea.value.substring(end);
      newCursorPos = start + before.length + selectedText.length + after.length;
    } else {
      newContent = textarea.value.substring(0, start) + before + placeholder + after + textarea.value.substring(end);
      newCursorPos = start + before.length + placeholder.length;
    }

    setContent(newContent);
    // Manually update preview
    markdownToHtml(newContent).then(html => setPreviewContent(html));

    // Restore cursor position
    setTimeout(() => {
      if (textarea) {
        textarea.selectionStart = newCursorPos;
        textarea.selectionEnd = newCursorPos;
        textarea.focus();
      }
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('content', content); // Ensure the content from state is used
    action(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row h-full p-4">
      <div className={`flex-1 flex flex-col bg-white rounded-md shadow-md overflow-y-auto p-6 mb-4 md:mb-0 ${showPreview ? 'md:mr-4' : ''}`}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2" />
        </div>
        <div className="mb-6">
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <textarea id="excerpt" name="excerpt" rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2"></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown)</label>
          <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden">
            <div className="flex flex-wrap bg-gray-100 border-b border-gray-300 p-2 space-x-1">
              <button type="button" onClick={() => insertMarkdown('**', '**', 'bold text')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><BoldIcon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('*', '*', 'italic text')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><ItalicIcon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('~~', '~~', 'strikethrough')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><StrikethroughIcon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('`', '`', 'code')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><CodeBracketSquareIcon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('```\n', '\n```', 'code block')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><CodeBracketIcon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('> ', '', 'quote')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><ChatBubbleLeftIcon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('# ', '', 'Heading 1')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><H1Icon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('## ', '', 'Heading 2')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><H2Icon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('### ', '', 'Heading 3')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><H3Icon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('- ', '', 'list item')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><ListBulletIcon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('1. ', '', 'list item')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><NumberedListIcon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('[', '](url)', 'link text')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><LinkIcon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('![', '](url)', 'alt text')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><PhotoIcon className="h-4 w-4" /></button>
              <button type="button" onClick={() => insertMarkdown('---', '', '')} className="p-1 text-gray-700 hover:bg-gray-200 rounded"><MinusIcon className="h-4 w-4" /></button>
            </div>
            <textarea
              id="content"
              name="content"
              rows={10}
              value={content}
              onChange={handleContentChange}
              required
              className="block w-full focus:outline-none focus:ring-0 sm:text-sm p-2"
              ref={contentRef}
            ></textarea>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
          <input type="text" id="coverImage" name="coverImage" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2" />
        </div>
        <div className="mb-6">
          <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700 mb-1">Open Graph Image URL</label>
          <input type="text" id="ogImage" name="ogImage" value={ogImage} onChange={(e) => setOgImage(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2" />
        </div>
        <div className="mb-6">
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
          <input type="text" id="authorName" name="authorName" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2" />
        </div>
      </div>
      {showPreview && (
        <div className="flex-1 flex flex-col p-6 border border-gray-300 rounded-md bg-white overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          {coverImage && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Cover Image</h3>
              <img src={coverImage} alt="Cover Preview" className="w-full h-auto object-cover rounded-md" />
            </div>
          )}
          {ogImage && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Open Graph Image</h3>
              <img src={ogImage} alt="OG Preview" className="w-full h-auto object-cover rounded-md" />
            </div>
          )}
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{excerpt}</p>
          <div className="prose" dangerouslySetInnerHTML={{ __html: previewContent }} />
        </div>
      )}
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="bg-gray-200 text-black px-6 py-3 rounded-md shadow-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
        <button type="submit" className="bg-black text-white px-6 py-3 rounded-md shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">Save</button>
      </div>
    </form>
  );
}