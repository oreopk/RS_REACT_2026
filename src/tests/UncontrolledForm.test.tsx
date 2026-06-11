import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import UncontrolledForm from '../components/forms/UncontrolledForm';
import userEvent from '@testing-library/user-event';

describe('UncontrolledForm', () => {
  it('renders all label in form', () => {
    render(<UncontrolledForm onClose={() => {}} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('empty form', async () => {
    render(<UncontrolledForm onClose={() => {}} />);
    fireEvent.submit(screen.getByRole('button', { name: /Submit/i }).closest('form')!);
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
  });

  it('handles file selection', async () => {
    render(<UncontrolledForm onClose={() => {}} />);
    const fileInput = screen.getByLabelText('Image') as HTMLInputElement;
    const file = new File(['data'], 'test.png', { type: 'image/png' });

    await userEvent.upload(fileInput, file);

    expect(fileInput.files?.[0]).toBe(file);
  });
});
