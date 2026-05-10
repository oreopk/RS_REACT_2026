import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../../components/Search';

describe('Search', () => {
  it('should call fake search the enter clicked', () => {
    const mockChange = vi.fn();
    const mockFetch = vi.fn();
    const searchWords = 'harry';

    render(<Search searchWords={searchWords} onSearchChange={mockChange} fetch={mockFetch} />);

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
