'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUsers } from '@/hooks/use-users';
import { User, Role } from '@/types/user.types';
import { userSchema } from '@/lib/validations';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await fetchUser(params.id as string);
    setUser(data);
    reset({
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      isActive: data.isActive,
    });
  };

  const onSubmit = async (data: UserFormData) => {
    await updateUser(params.id as string, data);
    router.push('/admin/users');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">User Details</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            {...register('fullName')}
            className="w-full border rounded px-3 py-2"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            {...register('role')}
            className="w-full border rounded px-3 py-2"
          >
            <option value={Role.PARTICIPANT}>Participant</option>
            <option value={Role.ADMIN}>Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="isActive" {...register('isActive')} />
          <label htmlFor="isActive" className="text-sm font-medium">
            Active
          </label>
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
