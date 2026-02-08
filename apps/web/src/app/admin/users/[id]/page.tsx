'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUsers } from '@/hooks/use-users';
import { User, Role } from '@/types/user.types';
import { userSchema } from '@/lib/validations';
import { toast } from 'react-toastify';

type UserFormData = {
  fullName: string;
  email: string;
  role: Role;
  isActive: boolean;
};

export default function UserDetail() {
  const params = useParams();
  const router = useRouter();
  const { fetchUser, updateUser } = useUsers();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
  });

  const isActive = watch('isActive');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await fetchUser(params.id as string);
      setUser(data);
      reset({
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        isActive: data.isActive,
      });
    } catch (error) {
      console.error('Error loading user:', error);
      toast.error('Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      setIsSubmitting(true);
      await updateUser(params.id as string, data);
      toast.success('User updated successfully');
      setTimeout(() => router.push('/admin/users'), 1000);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-gray-400 font-medium mb-2">User not found</p>
            <button
              onClick={() => router.back()}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold mb-1">User Details</h1>
          <p className="text-gray-500">View and edit user information</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="space-y-6">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 text-center space-y-4">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
              <span className="text-white font-bold text-3xl">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {user.fullName}
              </h3>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Role</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin'
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.isActive
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Account Info
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  User ID
                </p>
                <p className="text-sm text-white font-mono break-all">
                  {user._id}
                </p>
              </div>
              {user.createdAt && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Created
                  </p>
                  <p className="text-sm text-white">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
              {user.updatedAt && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Last Updated
                  </p>
                  <p className="text-sm text-white">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-semibold text-white">
                Edit User Information
              </h2>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Full Name <span className="text-red-400">*</span>
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder="Enter full name"
                    className="w-full bg-[#0B0F1A] text-white pl-12 pr-4 py-3 rounded-xl 
                             border border-white/10 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-cyan-500/60 
                             focus:border-cyan-500 transition-all duration-200
                             hover:border-white/20"
                  />
                </div>
                {errors.fullName && (
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
                    <span>{errors.fullName.message}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Email Address <span className="text-red-400">*</span>
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
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="user@example.com"
                    className="w-full bg-[#0B0F1A] text-white pl-12 pr-4 py-3 rounded-xl 
                             border border-white/10 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-cyan-500/60 
                             focus:border-cyan-500 transition-all duration-200
                             hover:border-white/20"
                  />
                </div>
                {errors.email && (
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
                    <span>{errors.email.message}</span>
                  </div>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Role <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative flex items-center gap-3 p-4 rounded-xl border-2 border-white/10 cursor-pointer transition-all duration-200 hover:border-blue-500/30 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500/5">
                    <input
                      type="radio"
                      value="participant"
                      {...register('role')}
                      className="w-5 h-5 text-blue-500 focus:ring-2 focus:ring-blue-500/60"
                    />
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-white">
                        Participant
                      </span>
                    </div>
                  </label>
                  <label className="relative flex items-center gap-3 p-4 rounded-xl border-2 border-white/10 cursor-pointer transition-all duration-200 hover:border-purple-500/30 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-500/5">
                    <input
                      type="radio"
                      value="admin"
                      {...register('role')}
                      className="w-5 h-5 text-purple-500 focus:ring-2 focus:ring-purple-500/60"
                    />
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-white">
                        Admin
                      </span>
                    </div>
                  </label>
                </div>
                {errors.role && (
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
                    <span>{errors.role.message}</span>
                  </div>
                )}
              </div>

              {/* Active Status */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Account Status
                </label>
                <label
                  className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'border-green-500 bg-green-500/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-green-500/10' : 'bg-white/5'
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 ${isActive ? 'text-green-400' : 'text-gray-500'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Active Account
                      </p>
                      <p className="text-xs text-gray-400">
                        User can login and access the platform
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    {...register('isActive')}
                    className="w-12 h-6 appearance-none bg-gray-700 rounded-full relative cursor-pointer transition-colors
                             checked:bg-green-500
                             before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-5 before:h-5 before:bg-white before:rounded-full before:transition-transform
                             checked:before:translate-x-6"
                  />
                </label>
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
                    <span>Updating...</span>
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
                    <span>Update User</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl font-semibold text-gray-500
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
      </div>
    </div>
  );
}
