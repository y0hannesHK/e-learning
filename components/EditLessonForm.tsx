'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lesson } from '@/types/model_types'; // Optional: define Lesson type in types/lesson.ts
import { Loader2 } from 'lucide-react';

interface EditLessonFormProps {
  lesson: Lesson;
  courseId: string;
}

export default function EditLessonForm({
  lesson,
  courseId,
}: EditLessonFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(lesson.title);
  const [videoUrl, setVideoUrl] = useState(lesson.videoUrl || '');
  const [orderIndex, setOrderIndex] = useState(lesson.orderIndex ?? 0);
  const [contents, setContents] = useState<string[]>(lesson.contents || []);
  const [changeLoading, setChangeLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContentChange = (index: number, value: string) => {
    const updated = [...contents];
    updated[index] = value;
    setContents(updated);
  };

  const handleAddContent = () => {
    setContents([...contents, '']);
  };

  const handleRemoveContent = (index: number) => {
    setContents(contents.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeLoading(true);
    setError('');

    try {
      const res = await fetch(
        `http://localhost:3000/api/lessons/${lesson.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId: lesson.courseId,
            title,
            videoUrl,
            contents: contents.map((content, idx) => ({
              contentIndex: idx,
              content,
            })),
            orderIndex,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update lesson');
      }

      router.push(`/instructor/courses/${courseId!}/lessons`); // go to lessons list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setChangeLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/lessons/${lesson.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to delete lesson: ${res.statusText}`);
      }
      // dev- 'courseId' alone was returning undfied then 'course!' returns the id
      router.push(`/instructor/courses/${courseId!}/lessons`); // go back to lessons list
    } catch (error) {
      console.error('Error deleting lesson:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-6"
    >
      <h2 className="text-xl font-bold">Edit Lesson</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Video URL</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Order Index</label>
        <input
          type="number"
          min={0}
          value={orderIndex}
          onChange={(e) => setOrderIndex(Number(e.target.value))}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Contents</label>
        {contents.map((content, idx) => (
          <div key={idx} className="flex items-center gap-2 mt-2">
            <textarea
              value={content}
              onChange={(e) => handleContentChange(idx, e.target.value)}
              className="flex-1 rounded border-gray-300 shadow-sm"
            />
            <button
              type="button"
              onClick={() => handleRemoveContent(idx)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddContent}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
        >
          Add Content
        </button>
      </div>

      <div className="flex justify-around">
        <button
          type="submit"
          disabled={changeLoading}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded flex items-center gap-2"
        >
          {changeLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          Save Changes
        </button>

        <button
          onClick={() => handleDelete()}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded flex items-center gap-2"
        >
          {deleteLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          Delete
        </button>
      </div>
    </form>
  );
}
