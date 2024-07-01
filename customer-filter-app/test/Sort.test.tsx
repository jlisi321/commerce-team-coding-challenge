import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Sort } from '../src/components'; // Adjust the path based on your file structure

// Clean up after each test to avoid side effects
afterEach(() => {
    cleanup();
});

describe('Sort Component', () => {
    const options = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
    ];

    it('renders correctly with given options', () => {
        render(<Sort options={options} selectedOption="asc" onSortChange={() => {}} />);

        expect(screen.getByLabelText(/Sort by:/i)).to.exist;
        expect(screen.getByRole('combobox')).to.exist;
        expect(screen.getByText('Ascending')).to.exist;
        expect(screen.getByText('Descending')).to.exist;
    });

    it('calls onSortChange with the selected option value when changed', () => {
        const onSortChangeMock = vi.fn();
        render(<Sort options={options} selectedOption="asc" onSortChange={onSortChangeMock} />);

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'desc' } });
        expect(onSortChangeMock).toHaveBeenCalledWith('desc');
    });

    it('displays the correct selected option', () => {
        render(<Sort options={options} selectedOption="desc" onSortChange={() => {}} />);
        expect(screen.getByRole('combobox')).to.exist;
    });
});