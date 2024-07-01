import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Filter } from '../src/components';

// Clean up after each test to avoid side effects
afterEach(() => {
    cleanup();
});

describe('Filter Component', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];

    it('renders correctly with given label and options', () => {
        render(<Filter label="Filter by:" options={options} selectedOption="" onOptionChange={() => {}} />);

        expect(screen.getByLabelText('Filter by:')).to.exist;
        expect(screen.getByRole('combobox')).to.exist;
        expect(screen.getByRole('option', { name: 'All' })).to.exist;

        options.forEach(option => {
            expect(screen.getByRole('option', { name: option })).to.exist;
        });
    });

    it('calls onOptionChange with the selected option value when changed', () => {
        const onOptionChangeMock = vi.fn();
        render(<Filter label="Filter by:" options={options} selectedOption="" onOptionChange={onOptionChangeMock} />);

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Option 2' } });
        expect(onOptionChangeMock).toHaveBeenCalledWith('Option 2');
    });

    it('displays the correct selected option', () => {
        render(<Filter label="Filter by:" options={options} selectedOption="Option 3" onOptionChange={() => {}} />);
        const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
        expect(selectElement.value).toBe('Option 3');
    });
});
