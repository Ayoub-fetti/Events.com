export const dateUtils = {
  formatDate: (
    date: string | Date,
    format: 'short' | 'long' | 'full' = 'short',
  ): string => {
    const d = new Date(date);

    if (format === 'short') {
      return d.toLocaleDateString('fr-FR');
    }

    if (format === 'long') {
      return d.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  isPast: (date: string | Date): boolean => {
    return new Date(date) < new Date();
  },

  isFuture: (date: string | Date): boolean => {
    return new Date(date) > new Date();
  },

  isToday: (date: string | Date): boolean => {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  },

  formatDateTime: (date: string | Date): string => {
    return new Date(date).toLocaleString('fr-FR');
  },

  getRelativeTime: (date: string | Date): string => {
    const d = new Date(date);
    const now = new Date();
    const diff = d.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Aujourd'hui";
    if (days === 1) return 'Demain';
    if (days === -1) return 'Hier';
    if (days > 0) return `Dans ${days} jours`;
    return `Il y a ${Math.abs(days)} jours`;
  },
};
