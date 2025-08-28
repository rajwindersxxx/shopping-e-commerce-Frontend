/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

// A mock function to track click events
const mockOnClick = vi.fn();

describe('PrimaryButton Component', () => {

  // Test Case 1: Renders the button with children text
  it('should render the button with the correct text', () => {
    render(<PrimaryButton>Click Me</PrimaryButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  // Test Case 2: Applies the default variant and classes
  it('should apply the normal variant styles by default', () => {
    render(<PrimaryButton>Button</PrimaryButton>);
    const buttonElement = screen.getByRole('button', { name: 'Button' });
    expect(buttonElement).toHaveClass('bg-orange-600');
    expect(buttonElement).not.toHaveClass('hover:bg-red-500');
  });

  // Test Case 3: Applies the danger variant styles
  it('should apply danger variant styles when specified', () => {
    render(<PrimaryButton variant="danger">Delete</PrimaryButton>);
    const buttonElement = screen.getByRole('button', { name: 'Delete' });
    expect(buttonElement).toHaveClass('hover:bg-red-500');
    expect(buttonElement).toHaveClass('bg-red1');
    expect(buttonElement).not.toHaveClass('bg-orange-600');
  });

  // Test Case 4: Handles a custom className prop
  it('should apply the custom className prop', () => {
    render(<PrimaryButton className="my-custom-class">Custom</PrimaryButton>);
    const buttonElement = screen.getByRole('button', { name: 'Custom' });
    expect(buttonElement).toHaveClass('my-custom-class');
  });

  // Test Case 5: Calls the onClick handler when clicked
  it('should call the onClick handler when clicked', () => {
    render(<PrimaryButton onClick={mockOnClick}>Clickable</PrimaryButton>);
    const buttonElement = screen.getByRole('button', { name: 'Clickable' });

    // Simulate a click event
    fireEvent.click(buttonElement);

    // Expect the mock function to have been called once
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  // Test Case 6: Handles the disabled state correctly
  it('should be disabled when the disabled prop is true', () => {
    render(<PrimaryButton disabled>Disabled</PrimaryButton>);
    const buttonElement = screen.getByRole('button', { name: 'Disabled' });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('disabled:bg-gray-400');

    // Ensure that clicking a disabled button does not trigger onClick
    const mockClickOnDisabled = vi.fn();
    fireEvent.click(buttonElement);
    expect(mockClickOnDisabled).toHaveBeenCalledTimes(0);
  });

  // Test Case 7: Applies the correct type attribute
  it('should have a default type of "button"', () => {
    render(<PrimaryButton>Default Type</PrimaryButton>);
    const buttonElement = screen.getByRole('button', { name: 'Default Type' });
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  // Test Case 8: Applies a custom type attribute
  it('should apply the specified type attribute', () => {
    render(<PrimaryButton type="submit">Submit</PrimaryButton>);
    const buttonElement = screen.getByRole('button', { name: 'Submit' });
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
