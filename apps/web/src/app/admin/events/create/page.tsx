'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEvents } from '@/hooks/use-events';
import { Status } from '@/types/event.types';

export default function CreateEvent() {
  const router = useRouter();
  const { createEvent } = useEvents();
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: 0,
    status: Status.DRAFT,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEvent(formData, image || undefined);
    router.push('/admin/events');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            required
            className="w-full border rounded px-3 py-2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="datetime-local"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capacity</label>
          <input
            type="number"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({ ...formData, capacity: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
