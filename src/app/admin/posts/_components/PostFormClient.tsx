'use client';

import { useState, useRef, useEffect } from 'react';
import markdownToHtml from '@/lib/markdownToHtml';
import {
  Bold, Italic, Strikethrough, List, Link, Image, Minus, Code2, Heading1, Heading2, Heading3, ListOrdered, Quote, Code, Eye, EyeOff
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
    markdownToHtml(newContent).then(html => setPreviewContent(html));

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
    formData.set('content', content);
    action(formData);
  };

  const toolbarButtons = [
    { icon: Bold, onClick: () => insertMarkdown('**', '**', 'bold text') },
    { icon: Italic, onClick: () => insertMarkdown('*', '*', 'italic text') },
    { icon: Strikethrough, onClick: () => insertMarkdown('~~', '~~', 'strikethrough') },
    { icon: Code, onClick: () => insertMarkdown('`', '`', 'code') },
    { icon: Code2, onClick: () => insertMarkdown('```\n', '\n```', 'code block') },
    { icon: Quote, onClick: () => insertMarkdown('> ', '', 'quote') },
    { icon: Heading1, onClick: () => insertMarkdown('# ', '', 'Heading 1') },
    { icon: Heading2, onClick: () => insertMarkdown('## ', '', 'Heading 2') },
    { icon: Heading3, onClick: () => insertMarkdown('### ', '', 'Heading 3') },
    { icon: List, onClick: () => insertMarkdown('- ', '', 'list item') },
    { icon: ListOrdered, onClick: () => insertMarkdown('1. ', '', 'list item') },
    { icon: Link, onClick: () => insertMarkdown('[', '](url)', 'link text') },
    { icon: Image, onClick: () => insertMarkdown('![', '](url)', 'alt text') },
    { icon: Minus, onClick: () => insertMarkdown('---', '', '') },
  ];

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 h-full">
      <div className="lg:col-span-4 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>Fill in the main details of your post.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" name="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="authorName">Author Name</Label>
              <Input id="authorName" name="authorName" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>Write your post content using Markdown.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex flex-wrap items-center gap-1 rounded-t-md border bg-muted p-2">
              {toolbarButtons.map((ButtonComponent, index) => (
                <Button key={index} type="button" variant="outline" size="icon" onClick={ButtonComponent.onClick}>
                  <ButtonComponent.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
            <Textarea
              id="content"
              name="content"
              value={content}
              onChange={handleContentChange}
              required
              className="flex-1 rounded-t-none focus-visible:ring-0"
              ref={contentRef}
              rows={15}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
            <CardDescription>Add images to your post.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input id="coverImage" name="coverImage" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="ogImage">Open Graph Image URL</Label>
              <Input id="ogImage" name="ogImage" value={ogImage} onChange={(e) => setOgImage(e.target.value)} />
            </div>
          </CardContent>
        </Card>
      </div>

      {showPreview && (
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 overflow-y-auto">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>This is how your post will look.</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert">
              {coverImage && <img src={coverImage} alt="Cover Preview" className="w-full h-auto object-cover rounded-md mb-4" />}
              <h1>{title}</h1>
              <p className="text-muted-foreground">{excerpt}</p>
              <div dangerouslySetInnerHTML={{ __html: previewContent }} />
            </CardContent>
          </Card>
        </div>
      )}

      <div className="fixed bottom-4 right-4 flex space-x-2 z-10">
        <Button type="button" variant="secondary" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
        <Button type="submit">Save Post</Button>
      </div>
    </form>
  );
}