import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ControlledForm from '../components/forms/ControlledForm';

describe('ControlledForm', () => {
  it('renders all label in form', () => {
    render(<ControlledForm onClose={() => {}} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });
});
