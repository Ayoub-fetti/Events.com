import { render } from '@testing-library/react';
import Loading from '../loading';

describe('Loading', () => {
  it('affiche le spinner', () => {
    const { container } = render(<Loading />);
    expect(container.firstChild).toHaveClass(
      'flex',
      'justify-center',
      'items-center',
    );
  });
});
