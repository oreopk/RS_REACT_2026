import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

describe('Modal', () => {
  it('does not render closed model', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        content
      </Modal>
    );
    expect(screen.queryByText('content')).toBeNull();
  });

  it('renders open Modal', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        content
      </Modal>
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('close button clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        {' '}
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('closes on ESC', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        content
      </Modal>
    );
    fireEvent.keyDown(screen.getByText('content'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('not clicking inside content', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        content
      </Modal>
    );
    fireEvent.click(screen.getByText('content'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
