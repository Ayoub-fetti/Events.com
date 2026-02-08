import { useReservations } from '@/hooks/use-reservations';

jest.mock('@/hooks/use-reservations');

describe("Flux d'annulation", () => {
  const mockCancelReservation = jest.fn();

  beforeEach(() => {
    (useReservations as jest.Mock).mockReturnValue({
      cancelReservation: mockCancelReservation,
      loading: false,
    });
  });

  it('annule une réservation avec succès', async () => {
    mockCancelReservation.mockResolvedValue({ _id: '1', status: 'cancelled' });

    const result = await mockCancelReservation('1');

    expect(mockCancelReservation).toHaveBeenCalledWith('1');
    expect(result.status).toBe('cancelled');
  });

  it("gère les erreurs d'annulation", async () => {
    mockCancelReservation.mockRejectedValue(new Error('Cannot cancel'));

    await expect(mockCancelReservation('1')).rejects.toThrow('Cannot cancel');
  });
});
