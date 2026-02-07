'use client';

import { useEffect, useState } from 'react';
import eventsService from '@/services/api/events.service';
import usersService from '@/services/api/users.service';
import reservationsService from '@/services/api/reservations.service';
import { StatusReservation } from '@/types/reservation.types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUsers: 0,
    pendingReservations: 0,
    confirmedReservations: 0,
    refusedReservations: 0,
    canceledReservations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [events, users, reservations] = await Promise.all([
          eventsService.findAll(),
          usersService.findAll(),
          reservationsService.findAll(),
        ]);

        setStats({
          totalEvents: events.length,
          totalUsers: users.length,
          pendingReservations: reservations.filter(
            (r) => r.status === StatusReservation.PENDING,
          ).length,
          confirmedReservations: reservations.filter(
            (r) => r.status === StatusReservation.CONFIRMED,
          ).length,
          refusedReservations: reservations.filter(
            (r) => r.status === StatusReservation.REFUSED,
          ).length,
          canceledReservations: reservations.filter(
            (r) => r.status === StatusReservation.CANCELED,
          ).length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Chart data configurations
  const reservationsStatusData = {
    labels: ['Pending', 'Confirmed', 'Refused', 'Canceled'],
    datasets: [
      {
        label: 'Reservations by Status',
        data: [
          stats.pendingReservations,
          stats.confirmedReservations,
          stats.refusedReservations,
          stats.canceledReservations,
        ],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderColor: [
          'rgb(251, 191, 36)',
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
          'rgb(59, 130, 246)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Mock data for events over time (you can replace with real data)
  const eventsOverTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Events Created',
        data: [12, 19, 15, 25, 22, 30],
        fill: true,
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        borderColor: 'rgb(6, 182, 212)',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: 'rgb(6, 182, 212)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Mock data for users growth (you can replace with real data)
  const usersGrowthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'New Users',
        data: [45, 62, 58, 75],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#9ca3af',
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9ca3af',
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
          <svg
            className="w-5 h-5 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-gray-400 text-sm">Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Events Card */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-200 group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg
                className="w-6 h-6 text-cyan-400"
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
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-medium">
              +12%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">
            Total Events
          </h3>
          <p className="text-3xl font-bold text-white">
            {loading ? (
              <span className="inline-block w-16 h-8 bg-white/10 rounded animate-pulse"></span>
            ) : (
              stats.totalEvents
            )}
          </p>
        </div>

        {/* Total Users Card */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-200 group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium">
              +8%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-white">
            {loading ? (
              <span className="inline-block w-16 h-8 bg-white/10 rounded animate-pulse"></span>
            ) : (
              stats.totalUsers
            )}
          </p>
        </div>

        {/* Pending Reservations Card */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-200 group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 text-xs font-medium">
              Pending
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">
            Pending Reservations
          </h3>
          <p className="text-3xl font-bold text-white">
            {loading ? (
              <span className="inline-block w-16 h-8 bg-white/10 rounded animate-pulse"></span>
            ) : (
              stats.pendingReservations
            )}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events Over Time Chart */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-1">
              Events Created
            </h2>
            <p className="text-sm text-gray-400">
              Monthly event creation trends
            </p>
          </div>
          <div className="h-80">
            {!loading && (
              <Line data={eventsOverTimeData} options={chartOptions} />
            )}
          </div>
        </div>

        {/* Reservations Status Chart */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-1">
              Reservations Status
            </h2>
            <p className="text-sm text-gray-400">
              Current reservation distribution
            </p>
          </div>
          <div className="h-80">
            {!loading && (
              <Doughnut
                data={reservationsStatusData}
                options={doughnutOptions}
              />
            )}
          </div>
        </div>

        {/* Users Growth Chart */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-1">
              User Growth
            </h2>
            <p className="text-sm text-gray-400">
              New user registrations per week
            </p>
          </div>
          <div className="h-80">
            {!loading && <Bar data={usersGrowthData} options={chartOptions} />}
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Reservation Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span className="text-sm text-gray-300">Pending</span>
              </div>
              <span className="text-sm font-semibold text-yellow-400">
                {stats.pendingReservations}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm text-gray-300">Confirmed</span>
              </div>
              <span className="text-sm font-semibold text-green-400">
                {stats.confirmedReservations}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <span className="text-sm text-gray-300">Refused</span>
              </div>
              <span className="text-sm font-semibold text-red-400">
                {stats.refusedReservations}
              </span>
            </div>{' '}
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-sm text-gray-300">Canceled</span>
              </div>
              <span className="text-sm font-semibold text-blue-400">
                {stats.canceledReservations}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-200">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-sm font-medium">Create New Event</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all duration-200">
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <span className="text-sm font-medium">Add New User</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all duration-200">
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
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm font-medium">Export Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
