import React from 'react';

// Define the interface for the props that the Filter component will receive
interface FilterProps {
    label: string; // The label for the filter
    options: string[]; // The array of options to display in the select dropdown
    selectedOption: string; // The currently selected option
    onOptionChange: (option: string) => void; // The function to call when the selected option changes
}

const Filter: React.FC<FilterProps> = ({ label, options, selectedOption, onOptionChange }) => {
    // Generate a unique id for the select element by transforming the label
    const selectId = `select-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div>
            <label htmlFor={selectId}>{label}</label>
            <select
                id={selectId}
                value={selectedOption}
                onChange={(e) => onOptionChange(e.target.value)}
            >
                {/* Render the default "All" option */}
                <option value="">All</option>
                {/* Map over the options array to render each option */}
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;