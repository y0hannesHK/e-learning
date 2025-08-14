'use client';

import { useState } from 'react';
import { z } from 'zod';
import { createLessonSchema } from '@/types/zod_schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function CreateLessonForm({ courseId }: { courseId: string }) {
  const router = useRouter();

  const [formData, setFormData] = useState<z.infer<typeof createLessonSchema>>({
    courseId,
    title: '',
    videoUrl: '',
    contents: [{ contentIndex: 0, content: '' }],
    orderIndex: 0,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) {
    const { name, value } = e.target;

    if (name.startsWith('content') && typeof index === 'number') {
      const updatedContents = [...formData.contents];
      updatedContents[index].content = value;
      setFormData({ ...formData, contents: updatedContents });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function addContentBlock() {
    setFormData((prev) => ({
      ...prev,
      contents: [
        ...prev.contents,
        { contentIndex: prev.contents.length, content: '' },
      ],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const parsed = createLessonSchema.safeParse(formData);
    if (!parsed.success) {
      setError('Please fill out all required fields correctly.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        throw new Error('Failed to create lesson');
      }

      router.push(`/instructor/courses/${courseId}/lessons`);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Create Lesson</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Lesson Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="videoUrl">Video URL (optional)</Label>
          <Input
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl || ''}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="orderIndex">Order Index</Label>
          <Input
            id="orderIndex"
            name="orderIndex"
            type="number"
            value={formData.orderIndex}
            onChange={(e) =>
              setFormData({ ...formData, orderIndex: Number(e.target.value) })
            }
            min={0}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Lesson Contents</Label>
          {formData.contents.map((block, i) => (
            <Textarea
              key={i}
              name={`content-${i}`}
              value={block.content}
              onChange={(e) => handleChange(e, i)}
              placeholder={`Content block ${i + 1}`}
              required
            />
          ))}
          <Button type="button" variant="secondary" onClick={addContentBlock}>
            + Add Content Block
          </Button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-500"
        >
          {loading ? 'Creating...' : 'Create Lesson'}
        </Button>
      </form>
    </div>
  );
}
