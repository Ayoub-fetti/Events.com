'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useEvents } from '@/hooks/use-events';
import { Event } from '@/types/event.types';

export default function EditEvent() {
  const router = useRouter();
  const params = useParams();
  const { fetchEvent, updateEvent, loading } = useEvents();
  const [formData, setFormData] = useState<Partial<Event>>({});
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    const event = await fetchEvent(params.id as string);
    if (event) setFormData(event);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateEvent(params.id as string, formData, image || undefined);
    router.push('/admin/events');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
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
            value={formData.title || ''}
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
            value={formData.description || ''}
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
            value={formData.date || ''}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            value={formData.location || ''}
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
            value={formData.capacity || 0}
            onChange={(e) =>
              setFormData({ ...formData, capacity: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          {formData.image && (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${formData.image}`}
              alt="Current"
              className="w-32 h-32 object-cover mb-2"
            />
          )}
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
            Update
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
