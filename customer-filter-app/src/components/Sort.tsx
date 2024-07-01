import React from 'react';

// Define the interface for the props that the Sort component will receive
interface SortProps {
    options: { value: string; label: string }[]; // Array of options with value and label
    selectedOption: string; // Currently selected option
    onSortChange: (sortOption: string) => void; // The function to call when the sort option changes
}

const Sort: React.FC<SortProps> = ({ options, selectedOption, onSortChange }) => {
    // Generate an id for the select element
    const selectId = `select-sort`;

    // Handler function for when the sort option changes
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor={selectId}>Sort by:</label>
            <select
                id={selectId}
                value={selectedOption}
                onChange={handleSortChange}
            >
                {/* Map over the options array to render each sorting option */}
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Sort;