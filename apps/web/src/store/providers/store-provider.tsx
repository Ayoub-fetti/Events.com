'use client';

import { Provider } from 'react-redux';
import { store } from '../index';

// injecte dans tous l'application dans layout global

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
