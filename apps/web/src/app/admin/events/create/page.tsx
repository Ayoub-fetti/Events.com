'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEvents } from '@/hooks/use-events';
import { Status } from '@/types/event.types';
import { eventSchema } from '@/lib/validations';
import { toast } from 'react-toastify';

type EventFormData = {
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  status: Status;
};

export default function CreateEvent() {
  const router = useRouter();
  const { createEvent } = useEvents();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      status: Status.DRAFT,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      setIsSubmitting(true);
      await createEvent(data, image || undefined);
      toast.success('Event Created Successfully');
      setTimeout(() => router.push('/admin/events'), 1000);
    } catch (err: any) {
      console.error('Error message:', err);
      toast.error('Error happened');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold mb-1">Create New Event</h1>
          <p className="text-gray-500">
            Fill in the details below to create a new event
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Main Form Card */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Event Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register('title')}
              placeholder="Enter event title"
              className="w-full bg-[#0B0F1A] text-white px-4 py-3 rounded-xl 
                       border border-white/10 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-cyan-500/60 
                       focus:border-cyan-500 transition-all duration-200
                       hover:border-white/20"
            />
            {errors.title && (
              <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{errors.title.message}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register('description')}
              rows={5}
              placeholder="Describe your event in detail..."
              className="w-full bg-[#0B0F1A] text-white px-4 py-3 rounded-xl 
                       border border-white/10 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-cyan-500/60 
                       focus:border-cyan-500 transition-all duration-200
                       hover:border-white/20 resize-none"
            />
            {errors.description && (
              <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{errors.description.message}</span>
              </div>
            )}
          </div>

          {/* Date & Time and Location Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date & Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Date & Time <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="datetime-local"
                  {...register('date')}
                  className="w-full bg-[#0B0F1A] text-white pl-12 pr-4 py-3 rounded-xl 
                           border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-cyan-500/60 
                           focus:border-cyan-500 transition-all duration-200
                           hover:border-white/20"
                />
              </div>
              {errors.date && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{errors.date.message}</span>
                </div>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Location <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  {...register('location')}
                  placeholder="Event venue or address"
                  className="w-full bg-[#0B0F1A] text-white pl-12 pr-4 py-3 rounded-xl 
                           border border-white/10 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-cyan-500/60 
                           focus:border-cyan-500 transition-all duration-200
                           hover:border-white/20"
                />
              </div>
              {errors.location && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{errors.location.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Capacity <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <input
                type="number"
                {...register('capacity', { valueAsNumber: true })}
                placeholder="Maximum number of attendees"
                min="1"
                className="w-full bg-[#0B0F1A] text-white pl-12 pr-4 py-3 rounded-xl 
                         border border-white/10 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-cyan-500/60 
                         focus:border-cyan-500 transition-all duration-200
                         hover:border-white/20"
              />
            </div>
            {errors.capacity && (
              <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{errors.capacity.message}</span>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Event Image
            </label>

            {!imagePreview ? (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/10 rounded-xl cursor-pointer bg-[#0B0F1A] hover:bg-white/5 hover:border-cyan-500/30 transition-all duration-200"
                >
                  <svg
                    className="w-12 h-12 text-gray-500 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm text-gray-400 mb-1">
                    Click to upload event image
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl border border-white/10"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3.5 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-cyan-500 to-blue-600
                     hover:from-cyan-400 hover:to-blue-500
                     shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
                     transition-all duration-200
                     active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Creating Event...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Create Event</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl font-semibold text-gray-300
                     bg-white/5 border border-white/10
                     hover:bg-white/10 hover:border-white/20
                     transition-all duration-200
                     active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
