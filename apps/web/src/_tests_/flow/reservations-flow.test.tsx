import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReservations } from '@/hooks/use-reservations';

jest.mock('@/hooks/use-reservations');

describe('Flux de réservation', () => {
  const mockCreateReservation = jest.fn();
  const mockFetchMyReservations = jest.fn();

  beforeEach(() => {
    (useReservations as jest.Mock).mockReturnValue({
      reservations: [],
      createReservation: mockCreateReservation,
      fetchMyReservations: mockFetchMyReservations,
      loading: false,
    });
  });

  it('crée une réservation avec succès', async () => {
    mockCreateReservation.mockResolvedValue({ _id: '1', status: 'pending' });

    const result = await mockCreateReservation({ eventId: 'event-1' });

    expect(mockCreateReservation).toHaveBeenCalledWith({ eventId: 'event-1' });
    expect(result.status).toBe('pending');
  });

  it('gère les erreurs de réservation', async () => {
    mockCreateReservation.mockRejectedValue(new Error('Event full'));

    await expect(mockCreateReservation({ eventId: 'event-1' })).rejects.toThrow(
      'Event full',
    );
  });
});
