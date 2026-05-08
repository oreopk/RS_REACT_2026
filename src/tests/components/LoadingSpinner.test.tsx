import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
