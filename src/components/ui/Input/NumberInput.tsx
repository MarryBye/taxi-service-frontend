import React from 'react';

type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function NumberInput({
                                className = '',
                                ...props
                            }: NumberInputProps): React.ReactElement {
    return (
        <input
            type="number"
            className={`w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none ${className}`}
            {...props}
        />
    );
}
