import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PasswordStrength from '../components/PasswordStrength/PasswordStrength';

describe('PasswordStrength', () => {
  it('empty password', () => {
    render(<PasswordStrength password="" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-value', '0');
  });

  it('onlyDigits', () => {
    render(<PasswordStrength password="123" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-value', '1');
  });

  it('lower+upper', () => {
    render(<PasswordStrength password="bA" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-value', '2');
  });

  it('digits+lower+upper', () => {
    render(<PasswordStrength password="bA1" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-value', '3');
  });

  it('allCategories', () => {
    render(<PasswordStrength password="bA1!" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-value', '4');
  });
});
