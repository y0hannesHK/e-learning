'use client';

import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Course } from '@/types/model_types';

interface EditCourseFormProps {
  course: Course;
}

const EditCourseForm: React.FC<EditCourseFormProps> = ({ course }) => {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCourse: Course = {
      ...course,
      title,
      description,
    };

    try {
      const res = await fetch(`/api/courses/${updatedCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        // dev  currently the api only accetps the title and description
        body: JSON.stringify({
          title: updatedCourse.title,
          description: updatedCourse.description,
        }),
      });

      if (res.ok) {
        router.push(`/instructor/courses/${course.id}`);
      }
    } catch (error) {
      console.log('failed to update course');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Course</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-around">
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-500 transition"
        >
          Save Changes
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          onClick={() => {
            router.push('/instructor/courses');
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditCourseForm;
