import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// pour dispatcher des actions
export const useAppDispatch = () => useDispatch<AppDispatch>();

// pour lire l'etat
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
