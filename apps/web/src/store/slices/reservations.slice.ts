import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reservation } from '@/types/reservation.types';

interface ReservationsState {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationsState = {
  reservations: [],
  loading: false,
  error: null,
};

// fonctions pour modifier l'etat
const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setReservations: (state, action: PayloadAction<Reservation[]>) => {
      state.reservations = action.payload;
    },
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload);
    },
    updateReservation: (state, action: PayloadAction<Reservation>) => {
      const index = state.reservations.findIndex(
        (r) => r._id === action.payload._id,
      );
      if (index !== -1) state.reservations[index] = action.payload;
    },
    removeReservation: (state, action: PayloadAction<string>) => {
      state.reservations = state.reservations.filter(
        (r) => r._id !== action.payload,
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setReservations,
  addReservation,
  updateReservation,
  removeReservation,
  setLoading,
  setError,
} = reservationsSlice.actions;
export default reservationsSlice.reducer;
